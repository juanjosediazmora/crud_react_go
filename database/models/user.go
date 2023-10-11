package models

type User struct {
	Nombre   string `json:"nombre" validate:"required,min=3,max=40"`
	Paterno  string `json:"paterno" validate:"required,min=3,max=40"`
	Materno  string `json:"materno" validate:"required,min=3,max=40"`
	Email    string `json:"email" validate:"required,email,min=6,max=32"`
	Telefono string `json:"telefono" validate:"required,min=3,max=40"`
	Entidad  string `json:"entidad" validate:"required,min=3,max=40"`
	Registro string `json:"registro" validate:"required,min=3,max=40"`

	Date string `json:"date" validate:"required"`
	City string `json:"city" validate:"required,min=3,max=40"`
}

type Entidades struct {
	Nombre string `json:"nombre" validate:"required,min=3,max=40"`
}
