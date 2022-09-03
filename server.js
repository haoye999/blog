const Koa = require('koa');
const next = require('next');
const Router = require('@koa/router');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const fmp = require('hexo-front-matter');
const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.get('/a', async ctx => {
    await app.render(ctx.req, ctx.res, '/about', ctx.query);
    ctx.respond = false;
  })

  router.get('/api/posts', async ctx => {
    const postNames = await readdir('./posts');
    const posts = await Promise.all(postNames.map(async postName => await parsePost(postName)));
    ctx.body = posts.sort((a, b) => b.mtime - a.mtime);
  })

  router.get('/api/post/:postName', async ctx => {
    try {
      const post = await parsePost(`${ctx.params.postName}.md`);
      ctx.body = post;
    } catch (e) {
      ctx.body = e;
      ctx.status = 500;
    }
  })

  router.get('(.*)', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  })

  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  })
})

async function parsePost(postName) {
  const fileName = path.resolve(__dirname, 'posts', `${postName}`);
  const file = await readFile(fileName, 'utf-8');
  const ParsedFileObject = fmp.parse(file);
  const fileStat = await stat(fileName);
  return {
    name: postName.replace('.md', ''),
    ...fileStat,
    ...ParsedFileObject,
  };
}
