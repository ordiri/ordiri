package ipxe

import (
	"net/http"
	"text/template"

	"github.com/Masterminds/sprig"
)

func ipxeErrorResponse(w http.ResponseWriter, r *http.Request, message string) {
	tplString := `#!ipxe

{{ .Message | IpxeEcho }}
sleep 100000`
	errorResponse(w, r, tplString, struct {
		Message string
	}{
		Message: message,
	})
}

func errorResponse(w http.ResponseWriter, r *http.Request, tplString string, vars interface{}) {
	tpl := template.Must(
		template.New("base").Funcs(sprig.TxtFuncMap()).Funcs(ipxeFuncs()).Parse(tplString),
	)

	tpl.Execute(w, vars)
}
func successResponse(w http.ResponseWriter, r *http.Request, tplString string, vars interface{}) {
	tpl := template.Must(
		template.New("base").Funcs(sprig.TxtFuncMap()).Funcs(ipxeFuncs()).Parse(tplString),
	)
	tpl.Execute(w, vars)
}
