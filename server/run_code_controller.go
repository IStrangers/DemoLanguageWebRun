package main

import (
	"github.com/gin-gonic/gin"
	"github.com/istrangers/demolanguage/vm"
)

func registerRunCodeController(engine *gin.Engine) {
	engine.POST("/runCode/run", run)
}

func run(c *gin.Context) {
	content, _ := c.GetRawData()
	vm := vm.CreateVM()
	result := vm.RunScript(string(content))
	c.String(200, "%v", result)
}
