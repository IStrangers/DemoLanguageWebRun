import './App.css'
import {FormEvent, useRef, useState} from 'react'

const keywords = [
    'true',
    'false',
    'null',
    'var',
    'fun',
    'return',
    'if',
    'else',
    'break',
    'for',
    'switch',
    'case',
    'default',
    'continue',
    'this',
    'throw',
    'try',
    'catch',
    'finally'
]

const brackets = [
    '(',
    ')',
    '{',
    '}',
    '[',
    ']',
]

function transformTkn(token: Record<string, any>): string {
    if(keywords.includes(token.tkn)) {
        return 'keyword'
    } else if(token.tkn === 'IDENTIFIER') {
        return 'identifier'
    } else if(brackets.includes(token.tkn)) {
        return 'bracket'
    } else if(token.tkn === 'NUMBER') {
        return 'number'
    } else if(token.tkn === 'STRING') {
        return 'string'
    } else if(token.tkn === 'COMMENT' || token.tkn === 'MULTI_COMMENT') {
        if (token.tkn === 'MULTI_COMMENT') {
            token.literal = token.literal.replace(/\n/g,'</br>')
        }
        return 'comment'
    } else if(token.tkn === 'WHITE_SPACE') {
        if(token.literal === '\n') {
            token.literal = '</br>'
            return 'newline'
        }
        token.literal = '&nbsp;'
        return 'white-space'
    }
    return ''
}

const transformTokens = (tokens: Array<Record<string,any>>): Array<Record<string,any>> => {
    tokens?.map(token => {
        token.tkn = transformTkn(token)
    })
    return tokens
}

const parseToken = (content: string,callback: (tokens: Array<Record<string,any>>) => void) => {
    fetch('http://localhost:8080/parser/parseToken',{
        method: 'post',
        body: content,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        res.text().then((data: string) => {
            callback(transformTokens(JSON.parse(data)))
        })
    })
}

const runCode = (content: string,callback: (data: string) => void) => {
    fetch('http://localhost:8080/runCode/run',{
        method: 'post',
        body: content,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        res.text().then((data: string) => {
            callback(data)
        })
    })
}

export default function App() {

    const contentRef = useRef<HTMLDivElement>(null)
    const [tokens, setTokens] = useState<Array<Record<string, any>>>([])
    const [runCodeResult, setRunCodeResult] = useState<string>('')

    const onContentInput = (e: FormEvent<HTMLDivElement>) => {
        if ('insertCompositionText' === e.nativeEvent.type) {
            return
        }
        parseToken(e.currentTarget.textContent || '', function (data: Array<Record<string, any>>) {
            setTokens(data)
        })
    }

    const onRunCode = () => {
        runCode(contentRef.current?.textContent || '', function (data: string) {
            setRunCodeResult(data.replace(/\n/g, '</br>'))
        })
    }

    return (
        <main className='main'>
            <div className='run-code-btn' onClick={onRunCode}>运行</div>
            <div className='code-container'>
                <div className='description'>
                    <div ref={contentRef} contentEditable="plaintext-only" onInput={onContentInput}></div>
                </div>
                <div style={{margin: '0 2px 0 2px'}}></div>
                <div className='description'>
                    <div>
                        {
                            tokens?.map((token: Record<string, any>) =>
                                <span key={`${token.tkn}-${token.index}`} className={`token-${token.tkn}`}
                                      dangerouslySetInnerHTML={{__html: token.literal}}></span>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='run-code-result-container'>
                <span dangerouslySetInnerHTML={{__html: runCodeResult}}></span>
            </div>
        </main>
    )
}