

const users = {
  'admin' : {
    password: 'admin',
    id: 'some hex string id',
    name: 'admin'
  }
}

export function getUser( name, password ): Promise< any > {
  let user = users[ name ];
  if ( user && user.password === password ) {
    return Promise.resolve( user );
  }
  else {
    return Promise.reject( new Error( 'Unauthorized' ) );
  }
}