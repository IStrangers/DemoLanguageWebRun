package main

import (
	"bytes"
	"github.com/gin-gonic/gin"
	"github.com/istrangers/demolanguage/vm"
)

func registerRunCodeController(engine *gin.Engine) {
	engine.POST("/runCode/run", run)
}

func run(c *gin.Context) {
	content, _ := c.GetRawData()
	var printContext bytes.Buffer
	vm.RuntimePrintWrite = &printContext
	vm := vm.CreateVM()
	result, err := vm.RunScript(string(content))
	if err != nil {
		c.String(200, "%v", err.Error())
		return
	}
	c.String(200, "%s运行结果: %v", printContext.String(), result)
}
