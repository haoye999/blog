import {promisify} from 'util'
import path from 'path'
import fs from 'fs'
import fmp from 'hexo-front-matter'
import {Post} from '../interfaces'
import { pick } from 'lodash'

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const stat = promisify(fs.stat)

const normalizeJSON = (data: any) => JSON.parse(JSON.stringify(data))

async function parsePost(postName: string) {
  const fileName = path.resolve(process.cwd(), 'posts', `${postName}`)
  const file = await readFile(fileName, 'utf-8')
  const ParsedFileObject = fmp.parse(file)
  const fileStat = await stat(fileName)
  return {
    name: postName.replace('.md', ''),
    ...pick(fileStat, ['mtime', 'ctime', 'birthtime']),
    ...ParsedFileObject,
  }
}

export async function getAllPosts() {
  const postNames = await readdir(path.resolve(process.cwd(), 'posts'))
  const posts = await Promise.all(
    postNames.map(async postName => await parsePost(postName))
  )

  return normalizeJSON(posts.sort((a, b) => +b.mtime - +a.mtime)) as Post[]
}

export async function getPostByName(name: string) {
  const postData = await parsePost(`${name}.md`)
  return normalizeJSON(postData) as Post
}
