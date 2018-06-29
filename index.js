const Koa = require('koa')
const Router = require('koa-router')
const crypto = require('crypto')

const app = new Koa()
const router = new Router()
const token = 'jarvisTokenTest'

router.get('/', async function(ctx, next) {
  // 添加wx的token验证
  let { signature, timestamp, nonce, echostr } = ctx.query
  if (signature) {
    var oriArray = [nonce, timestamp, token]
    oriArray.sort()
    var original = oriArray.join('')
    var scyptoString = sha1(original)
    if (signature === scyptoString) {
      ctx.body = echostr
    } else {
      ctx.body = 'false'
    }
  } else {
    // console.log(ctx);
    // console.log('hello');
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
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-4663925920186650",
            enable_page_level_ads: true
          });
        </script>
      </head>
      <body>
        <h1 class="title">Hi there, website is in building.</h1>
        <p class="sign">-- Jarvis<p>
      </body>
    </html>
    `
  }
  // ctx.router available
})

// old link redirect handler
app.use(async function(ctx, next) {
  if (/^\/\d{4}\/\d{2}\/\d{2}\/.+/.test(ctx.url)) {
    ctx.redirect(`http://blog.jiasm.org${ctx.url}`)
  }

  return next()
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8000, () => {
  console.log('app run on http://127.0.0.1:8000')
})

function sha1(str) {
  var md5sum = crypto.createHash('sha1')
  md5sum.update(str)
  str = md5sum.digest('hex')
  return str
}
