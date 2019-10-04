const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const fmp = require('hexo-front-matter');

const port = parseInt(process.env.PORT, 10) || 3000;
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
    const posts = await readdir('./posts');
    ctx.body = posts.map(post => post.replace('.md', ''));
  })

  router.get('/api/post/:postName', async ctx => {
    const fileName = `./posts/${decodeURIComponent(ctx.params.postName)}.md`;
    const file = await readFile(fileName, 'utf-8');
    const ParsedFileObject = fmp.parse(file);
    const fileStat = await stat(fileName);
    ctx.body = {
      ...fileStat,
      ...ParsedFileObject,
    };
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  })

  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  })
})