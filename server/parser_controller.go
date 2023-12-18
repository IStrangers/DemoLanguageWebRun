package main

import (
	"github.com/gin-gonic/gin"
	"github.com/istrangers/demolanguage/parser"
	"github.com/istrangers/demolanguage/token"
)

func registerParserController(engine *gin.Engine) {
	engine.POST("/parser/parseToken", parseToken)
}

func parseToken(c *gin.Context) {
	content, _ := c.GetRawData()
	parser := parser.CreateParser(1, "", string(content))
	var tokens []Token
	for tkn, literal, index := parser.ScanNextToken(); tkn != token.EOF; tkn, literal, index = parser.ScanNextToken() {
		tokens = append(tokens, Token{Tkn: tkn.String(), Literal: literal, Index: int(index)})
	}
	c.JSON(200, tokens)
}
