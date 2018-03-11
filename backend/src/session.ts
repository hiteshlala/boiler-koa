import * as moment from 'moment';

const sessions:SessionsStore = {};

interface SessionsStore {
  [ id: string ]: Session;
}

export interface Session {
  id: string; // session id
  user: User;
  expire: moment.Moment;
  created: moment.Moment;
}

interface User {
  name: string;
  id: string; // db entry id
}

const sessionDuration: number = 30;
const sessionUnit: moment.unitOfTime.Base = 'minute';


export function getSessionById( id: string ): Promise< Session | void > {
  let sess = sessions[ id ];
  if ( sess  ) {
    if ( sess.expire.isAfter() ) {
      refreshSession( id );
    }
    else {
      delete sessions[ id ];
    }
  }
  return Promise.resolve( sessions[id] );
}

export function refreshSession( id: string ): void {
  let expiry = sessions[ id ].expire;
  const newexpire: moment.Moment = moment( expiry ).add( sessionDuration, sessionUnit );
  sessions[ id ].expire = newexpire;
}

export function deleteSessionById( id: string ): void {
  delete sessions[ id ];
}

export function createSession( user: User ): Session {
  let newSession: Session = {
    id: createSessionId(),
    user: { name: user.name, id: user.id },
    expire: moment().add( sessionDuration, sessionUnit ),
    created: moment()
  }
  sessions[ newSession.id ] = newSession;
  return newSession;
}

export function initSessions() {
  // setup a cron to remove expired sessions run every hour or so

}

function removeExpired() {}

function createSessionId(): string {
  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  return 'xxxx-xxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0;
    let v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

