import ruamel.yaml as yaml
import json
import shutil
import glob
import os
from jinja2 import Environment, FileSystemLoader, select_autoescape
import hashlib


## If file exists, delete it ##
root_dir = os.path.dirname(os.path.abspath(__file__))
dist_dir = "%s/dist" % root_dir
if os.path.isdir(dist_dir):
    shutil.rmtree(dist_dir)
os.mkdir(dist_dir)

# stack overflow
def yaml_include_constructor(loader, node):
    value = loader.construct_scalar(node)
    template = tpl_env.get_template(value)
    rendered = template.render()
    return rendered

yaml.SafeLoader.add_constructor(u'!include', yaml_include_constructor)

# stack overflow
def str_presenter(dumper, data):
    if len(data) > 30:  # check for multiline string
        return dumper.represent_scalar('tag:yaml.org,2002:str', data, style='|')
    return dumper.represent_scalar('tag:yaml.org,2002:str', data)

# to use with safe_dump:
yaml.representer.SafeRepresenter.add_representer(str, str_presenter)

tpl_env = Environment(
    loader=FileSystemLoader("%s/files" % root_dir)
)
def with_local_file(local_path, remote_path, executable=False, **tplvars):
    template = tpl_env.get_template(local_path)
    content = template.render(**tplvars)
    # print(content)
    tag = "tag_%s" % hashlib.sha256(content.encode('utf-8')).hexdigest()[0:5]

    start_tag = tag
    if executable == False:
        start_tag = "'%s'" % tag
    return """tee %s <<%s
%s
%s
""" % (remote_path, start_tag, content, tag)

tpl_env.globals['with_local_file'] = with_local_file

files = glob.glob("*.yaml") # list of all .yaml files in a directory 
def read_yaml_file(filename):
    with open(filename, 'r') as stream:
        try:
            doccos = yaml.safe_load_all(stream)
            docs = list(doccos)
            with open("%s/%s" % (dist_dir, filename), 'a') as file:
                file.write(yaml.safe_dump_all(docs, width=float("inf")))

            return docs

        except yaml.YAMLError as exc:
            raise exc

doccos = []
for file in files:
    doccos = doccos + read_yaml_file(file)

print(yaml.safe_dump_all(doccos, width=float("inf")))
