/**
 * boiler-koa
 * in memory sessions module
 * File: session.ts
 * by Hitesh Lala
 */

import * as moment from 'moment';
import * as cron from 'cron';
import { createRandomKey } from './utils';

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
  let job = new cron.CronJob({
    cronTime: `0 0 */1 * * *`,    // every 1 hour
    onTick: removeExpired,
    start: false
  });
  job.start();
}

function removeExpired() {
  let keys = Object.keys( sessions );
  keys.forEach( key => {
    let sess = sessions[ key ];
    if( sess && moment( sess.expire ).isBefore() ) {
      delete sessions[ key ];
    }
  });
}

function createSessionId(): string {
  return createRandomKey( 'xxxx-xxxxxxx' );
}

