/**
 * boiler-koa
 * koa route
 * File: login.ts
 * by Hitesh Lala
 */

import * as Router from 'koa-router';

import { sessioncookiename } from '../server';
import * as session from '../session';
import * as database from '../database';

let login = new Router();

// log out
login.get( '/login', ctx => {
  ctx.log( `${ctx.method} - ${ctx.host} - ${ctx.path}` );
  if ( ctx.session ) {
    session.deleteSessionById( ctx.session.id );
  }
  ctx.session = undefined;
  ctx.cookies.set( sessioncookiename, '', { signed: true } );
  ctx.redirect( '/' );
});


login.post( '/login', ctx => {
  ctx.log( `${ctx.method} - ${ctx.host} - ${ctx.path}` );
  let cookie = ctx.cookies.get( sessioncookiename );
  // log out
  if ( ctx.session ) {
    session.deleteSessionById( ctx.session.id );
    ctx.session = undefined;
    ctx.cookies.set( sessioncookiename, '', { signed: true } );
    ctx.redirect( '/' );
  }
  // log in
  else {
    const name = ctx.request.body.name;
    const pswd = ctx.request.body.password;
    if ( !name || !pswd ) {
      let data = { 
        year: new Date().getFullYear(),
        message: 'User not found or incorrect password.'
      };
      return ctx.render( 'home', { data } );
    }
    return database.getUser( name, pswd )
    .then( user => {
      const newsession = session.createSession( user );
      ctx.session = newsession;
      ctx.cookies.set( sessioncookiename, newsession.id, { signed: true } );
      return ctx.redirect( '/content' );
    })
    .catch( error => {
      let data = { 
        year: new Date().getFullYear(),
        message: 'User not found or incorrect password.'
      };
      return ctx.render( 'home', { data } );
    });
  }
});


export default login;
