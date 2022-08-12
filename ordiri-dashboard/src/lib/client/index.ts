import * as k8s  from "@kubernetes/client-node"
export default function config() {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

    k8sApi.listNamespacedPod("default").then((res) => {
      console.log(res.body);
    });

}