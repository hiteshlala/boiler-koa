/**
 * boiler-koa
 * in memory 'database' module
 *   replace this with mongo or file system module
 * File: database.ts
 * by Hitesh Lala
 */

import * as utils from './utils';

const users = {
  'admin' : {
    password: '4e396f3a387807ebcb1c6051cb2b66172cb933ea2281ce6c8e68a8105f7e854cc142adc958c0cf3da53c31a833beeba5812af4653d2b35447dc48198fb7d1c9f',
    id: '596fa03900d6a600071e08c0',
    name: 'admin'
  }
}

const salt = '6e65a532a00fcf311491';


export function getUser( name, password ): Promise< any > {
  let user = users[ name ];
  if ( user && utils.hashify( password, salt ) === user.password ) {
    return Promise.resolve({ name: user.name, id: user.id });
  }
  else {
    return Promise.reject( new Error( 'Unauthorized' ) );
  }
}

