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
    } else if(token.tkn === 'String') {
        return 'string'
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

export default function App() {

    const contentRef = useRef<HTMLDivElement>(null)
    const [tokens,setTokens] = useState<Array<Record<string,any>>>([])

    const contentInput = (e: FormEvent<HTMLDivElement>) => {
        if('insertCompositionText' === e.nativeEvent.type) {
            return
        }
        parseToken(e.currentTarget.textContent || '',function (data: Array<Record<string,any>>) {
            setTokens(data)
        })
    }

    return (
        <main className='main'>
            <div className='description'>
                <div ref={contentRef} contentEditable="plaintext-only" onInput={contentInput}></div>
            </div>
            <div className='description'>
                <div>
                    {
                        tokens?.map((token: Record<string,any>) =>
                            <span key={`${token.tkn}-${token.index}`} className={`token-${token.tkn}`} dangerouslySetInnerHTML={{__html: token.literal}}></span>
                        )
                    }
                </div>
            </div>
        </main>
    )
}
