
import * as path from 'path';
import * as http from 'http';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyparse from 'koa-bodyparser';
import * as render from 'koa-ejs';
import * as assets from 'koa-static';

import home from './routes/home';

const viewsPath = path.resolve( __dirname, '../../', 'frontend/dist/views' );
const staticAssets = path.resolve( __dirname, '../../', 'frontend/dist' );


function sessionMiddleware() {
  return ( ctx: Router.IRouterContext, next: () => Promise<any> ) => {
    return new Promise(( resove, reject ) => {
      const sessId = ctx.cookies.get( 'boiler.koa' );
      
    });
    if(sessId) {
      try {
        const s = await session.getSessionById(sessId)
        session.slide(sessId);
        ctx.session = s;
        // ctx.log.info(`Session retrieved ${s.sessionid}`);
        await next();
      }
      catch( err ) {
        ctx.cookies.set('nbdashboard.session', null);
        ctx.session = undefined;
        ctx.log.error(`Session ${sessId} does not exist or is expired`);
        await next();
      };
    }
    else {
      // This is an anonymous access. Nothing to do ...
      ctx.session = undefined;
      await next();
    }
  };
}

function createServer(): Koa {
  let app: Koa = new Koa();
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
  app.use( bodyparse() );
  app.use( assets( staticAssets ) );
  app.use( home.routes() );
  app.use( home.allowedMethods() );
  return app;
}


export function start( port, host ): Promise< http.Server > {
  return new Promise(( resolve, reject ) => {
    try {
      let app: Koa = createServer();
      resolve( app.listen( port, host ) );
    }
    catch( error ) {
      reject( error );
    }
  });
}


