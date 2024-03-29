import React, { ReactNode } from 'react'
import Highlight from 'react-highlight.js'

interface CodeBlockProps {
  language: string
  value: ReactNode
}

const CodeBlock = (props: CodeBlockProps) => {
  const { language, value } = props

  return <Highlight language={language}>{value}</Highlight>
}
export default CodeBlock
