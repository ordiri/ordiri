package v1alpha1

func NewRestartOperation(requestedBy string) *Operation {
	return &Operation{
		Type: OperationTypeRestart,
	}
}
