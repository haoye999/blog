declare module 'hexo-front-matter' {
  const fmp: {
    parse(mdx: string): Record<string, any>
  }
  export default fmp
}