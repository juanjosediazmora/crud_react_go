package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/puskipus/golang-react/bootstrap"
)

func main() {
	app := fiber.New()
	bootstrap.InitializeApp(app)
}

/*
package main
import (
	"github.com/labstack/echo/v4"
	"github.com/puskipus/golang-react/bootstrap"
)

func main() {
	app := echo.New()
	bootstrap.InitializeApp(app)
}
*/
