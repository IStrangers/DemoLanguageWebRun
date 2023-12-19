package main

type Token struct {
	Tkn     string `json:"tkn"`
	Literal string `json:"literal"`
	Value   string `json:"value"`
	Index   int    `json:"index"`
}
