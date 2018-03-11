import * as Router from 'koa-router';

let home = new Router();

home.get( '/', ctx => {
  console.log( ctx.method, ctx.url, ctx.ip );
  console.log( ctx.host, ctx.protocol );


  let data = { 
    result: 'ok', 
    year: new Date().getFullYear()
  };
  return ctx.render( 'home', { data } );
});

export default home;