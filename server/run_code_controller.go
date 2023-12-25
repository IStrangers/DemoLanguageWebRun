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
	result, err := vm.RunScript(string(content))
	if err != nil {
		c.String(200, "%v", err.Error())
		return
	}
	c.String(200, "%v", result)
}
