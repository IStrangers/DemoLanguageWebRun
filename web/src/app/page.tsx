import Image from 'next/image'
import styles from './page.module.css'
import { FormEvent } from 'react'

const parseToken = (content: string) => {
  fetch("http://localhost:8080/parser/parseToken",{
    method: 'post',
    body: '',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    debugger
  })
}

const contentInputChange = (e: FormEvent<HTMLDivElement>) => {
  debugger
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div contentEditable="true" onInput={contentInputChange}></div>
      </div>
      <div className={styles.description}>
        <div>
          {
            
          }
        </div>
      </div>
    </main>
  )
}
