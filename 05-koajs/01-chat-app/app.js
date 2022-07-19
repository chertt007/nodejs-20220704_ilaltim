const path = require("path");
const Koa = require("koa");
const app = new Koa();

app.use(require("koa-static")(path.join(__dirname, "public")));
app.use(require("koa-bodyparser")());

const Router = require("koa-router");
const router = new Router();

const requests = [];
router.get("/subscribe", async (ctx, next) => {
  console.log("subscribe");
  const promise = await new Promise((resolve, reject) => {
    console.log("subscribe promise");
    requests.push({ cbCtx: ctx, resolve });
  });
});

router.post("/publish", async (ctx, next) => {
  console.log("publish");
  console.log("message :", ctx.request.body.message);
  const message = ctx.request.body.message;
  requests.forEach(({ cbCtx, resolve }) => {
    if (!message) {
      ctx.throw(400, "msg empty");
      resolve();
    } else {
      cbCtx.body = message;
      cbCtx.status = 200;
      resolve();
    }
  });
  return next();
});

app.use(router.routes());

module.exports = app;

//*должен быть один сабскрайб который пошлется но будет ждатью
// на паблишь сабскрайб должен закрываться в тело сабскрайб должен вносится месседж
//*сааабскарйб должен вызвать себя сам потом
