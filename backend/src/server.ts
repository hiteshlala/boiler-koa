/**
 * boiler-koa
 * koa server
 * File: server.ts
 * by Hitesh Lala
 */

import * as path from 'path';
import * as http from 'http';
import * as fs from 'fs';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyparse from 'koa-bodyparser';
import * as render from 'koa-ejs';
import * as assets from 'koa-static';

import * as session from './session';

import home from './routes/home';
import login from './routes/login';
import content from './routes/content';

const viewsPath = path.resolve( __dirname, '../../', 'frontend/dist/views' );
const staticAssets = path.resolve( __dirname, '../../', 'frontend/dist' );


export const sessioncookiename = 'boiler.koa';

function logger() {
  // Set up any logging here, like bunyan...
  let logs = [];
  return ( message ) => {
    logs.push( message );
    console.log( message );
    if ( logs.length === 500 ) {
      fs.appendFileSync( 'logs.txt', JSON.stringify( logs, null, 2 ), { encoding: 'utf8' } );
      logs = [];
    }
  };
};

function sessionMiddleware() {
  return ( ctx: Router.IRouterContext, next: () => Promise<any> ) => {
    const sessId = ctx.cookies.get( 'boiler.koa' );
    return session.getSessionById( sessId )
    .then( ses => {
      ctx.session = ses;
      return next()
    })
    .catch( error => {
      ctx.log( `Error retrieving session - ${sessId}` );
      ctx.session = undefined;
      return next();
    });
  }
}

function createServer(): Koa {
  let app: Koa = new Koa();
  app.keys = [ 'pink elephants', 'fluffy aligators', 'bald poodles', 'stinky mushrooms', 'square planets' ];
  render( app, {
    root: viewsPath,
    layout: false,
    viewExt: 'html',
    cache: false
  });
  app.on('error', ( err, ctx ) => {
    console.log(`Server Error: ${err}`);
    ctx.body = err;
  });
  app.context.log = logger();
  app.use( bodyparse() );
  app.use( sessionMiddleware() );
  app.use( assets( staticAssets ) );
  app.use( home.routes() );
  app.use( home.allowedMethods() );
  app.use( login.routes() );
  app.use( login.allowedMethods() );
  app.use( content.routes() );
  app.use( content.allowedMethods() );
  return app;
}


export function start( port, host ): Promise< http.Server > {
  return new Promise(( resolve, reject ) => {
    try {
      let app: Koa = createServer();
      session.initSessions();
      resolve( app.listen( port, host ) );
    }
    catch( error ) {
      reject( error );
    }
  });
}


