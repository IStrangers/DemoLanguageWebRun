package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	engine := gin.Default()
	engine.Use(cors.Default())
	registerParserController(engine)
	registerRunCodeController(engine)
	engine.Run()
}
