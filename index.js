const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', async function (ctx, next) {
  console.log(ctx);
  console.log('hello');
  ctx.body = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
      <title>jarvis</title>
      <style media="screen">
        * {
          margin: 0;
          box-sizing: border-box;
        }
        body {
          background-color: #108ee9;
          color: #fff;
          font-family: sans-serif;
          display: flex;
          align-items: center;
          height: 100vh;
          flex-flow: column;
          justify-content: center;
        }

        .title {
          font-size: 24px;
          font-weight: normal;
          margin-bottom: 4em;
        }

        .sign {
          font-size: 12px;
          text-align: right;
          width: 100%;
          padding: 0 2em;
        }
      </style>
    </head>
    <body>
      <h1 class="title">Hi there, website is in building.</h1>
      <p class="sign">-- Jarvis<p>
    </body>
  </html>
  `
  // ctx.router available
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8000, () => {
  console.log('app run on http://127.0.0.1:8000');
})
