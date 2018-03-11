/**
 * boiler-koa
 * koa start script
 * File: start.ts
 * by Hitesh Lala
 */

import * as fs from 'fs';
import * as http from 'http';
import * as app from './server';

const config = require( '../../config.json' );

let port = config.server.port;
let host = config.server.host;

app.start( port, host )
.then(( server: http.Server ) => {
  console.log( `
  -------------------------------------------------
                Server Started
  -------------------------------------------------
  host: ${host} 
  port: ${port}
  `);
})
.catch( error => {
  console.log( `
  -------------------------------------------------
                  Server Error 
  -------------------------------------------------
  ${error}
  `)
});