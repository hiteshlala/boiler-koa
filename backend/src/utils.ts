/**
 * boiler-koa
 * Utility functions used by multiple modules
 * File: utils.ts
 * by Hitesh Lala
 */


import * as crypt from 'crypto-js';

export function hashify( data: string, salt: string ): string {
  return crypt.SHA3(data + salt).toString();
}

export function encode64( data: string ): string {
  let confuse = crypt.enc.Utf8.parse( data );
  let base64 = crypt.enc.Base64.stringify( confuse );
  return base64;
}

export function decode64( data: string ): string {
  let readable = crypt.enc.Base64.parse( data );
  let english = readable.toString( crypt.enc.Utf8 );
  return english;
}

export function encrypt( data: string | Object, key: string = '' ): string {
  if ( typeof data === 'object' ) {
    data = JSON.stringify( data );
  }
  let cipher =  crypt.AES.encrypt( data, key );
  return cipher.toString();
}

export function decrypt( data: string, key: string = ''): string {
  let bytes = crypt.AES.decrypt( data, key );
  return bytes.toString( crypt.enc.Utf8 );
}

export function createRandomKey( key:string = 'xx-xxxx-xxxx' ): string {
  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  return key.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0;
    let v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}