/**
 * boiler-koa
 * koa route
 * File: content.ts
 * by Hitesh Lala
 */

import * as Router from 'koa-router';

import { sessioncookiename } from '../server';

let content = new Router();

content.get( '/content', ctx => {
  ctx.log( `${ctx.method} - ${ctx.host} - ${ctx.path}` );

  if ( !ctx.session ) {
    ctx.log( `No session redirecting to login` );
    let message = encodeURIComponent( 'Login required for secure content.' );
    ctx.redirect( `/?message=${message}&dest=content` );
    return;
  }

  let data = {
    year: new Date().getFullYear(),
  }

  return ctx.render( 'content', { data } );
});


export default content;
