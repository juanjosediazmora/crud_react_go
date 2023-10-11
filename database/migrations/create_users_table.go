package migrations

import (
	"time"

	"gorm.io/gorm"
)

type Users struct {
	ID       uint    `gorm:"primary key:autoIncrement" json:"id"`
	Nombre   *string `json:"nombre"`
	Paterno  *string `json:"paterno"`
	Materno  *string `json:"materno"`
	Email    *string `json:"email"`
	Telefono *string `json:"telefono"`
	Entidad  *string `json:"entidad"`
	Registro *string `json:"registro"`

	//Name    *string   `json:"name"`
	Date time.Time `json:"date"`
	City *string   `json:"city"`
	//Country *string   `json:"country"`

}

type Entidades struct {
	ID     uint    `gorm:"primary key:autoIncrement" json:"id"`
	Nombre *string `json:"nombre"`
}

func MigrateUsers(db *gorm.DB) error {
	err := db.AutoMigrate(&Users{})
	return err
}
