/**
 * boiler-koa
 * koa route
 * File: home.ts
 * by Hitesh Lala
 */

import * as Router from 'koa-router';

import { sessioncookiename } from '../server';

let home = new Router();

home.get( '/', ctx => {
  ctx.log( `${ctx.method} - ${ctx.host} - ${ctx.path}` );
  let cookie = ctx.cookies.get( sessioncookiename );
  let data = { 
    year: new Date().getFullYear(),
  };
  return ctx.render( 'home', { data } );
});

export default home;
