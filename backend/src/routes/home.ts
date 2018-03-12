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
  let dest = ctx.query.dest;
  let message = ctx.query.message;
  let data = { 
    year: new Date().getFullYear(),
  };
  if ( message !== undefined ) {
    data[ 'message' ] = message;
  }
  if ( dest !== undefined ) {
    data[ 'dest' ] = dest;
  }
  return ctx.render( 'home', { data } );
});

export default home;
