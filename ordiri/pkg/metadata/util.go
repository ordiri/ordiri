package metadata

import (
	"net/http"
	"text/template"

	"github.com/Masterminds/sprig"
)

func metaErrResponse(w http.ResponseWriter, r *http.Request, message string) {
	tplString := `{{ .Message }}`
	errorResponse(w, r, tplString, struct {
		Message string
	}{
		Message: message,
	})
}

func errorResponse(w http.ResponseWriter, r *http.Request, tplString string, vars interface{}) {
	errorResponseWithCode(w, r, tplString, vars, http.StatusBadRequest)
}
func errorResponseWithCode(w http.ResponseWriter, r *http.Request, tplString string, vars interface{}, code int) {
	tpl := template.Must(
		template.New("base").Funcs(sprig.TxtFuncMap()).Funcs(ipxeFuncs()).Parse(tplString),
	)

	w.WriteHeader(code)
	tpl.Execute(w, vars)
}
func successResponse(w http.ResponseWriter, r *http.Request, tplString string, vars interface{}) {
	tpl := template.Must(
		template.New("base").Funcs(sprig.TxtFuncMap()).Funcs(ipxeFuncs()).Parse(tplString),
	)
	tpl.Execute(w, vars)
}
