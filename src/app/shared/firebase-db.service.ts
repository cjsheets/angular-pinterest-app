import { Injectable } from '@angular/core';
import { AngularFire,
  FirebaseObjectObservable,
  FirebaseListObservable } from 'angularfire2';

import { Logger } from './logger.service';

@Injectable()
export class FirebaseDbService {

  constructor(
    private af: AngularFire,
    private _log: Logger,
  ) {}

  getPins(): FirebaseListObservable<any> {
    this._log['log']('getPins(), limit: 20');
    return this.af.database.list('/pinterestApp/pins', {query: {limitToLast: 20}});
  }

  getMyPins(id): FirebaseListObservable<any> {
    this._log['log']('getMyPins(), limit: 20, UID: ', id);
    return this.af.database.list('/pinterestApp/pins', {
      query: {limitToLast: 20, orderByChild: 'owner', equalTo: id}
    });
  }

  getVotes(id): FirebaseListObservable<any> {
    this._log['log']('getVotes(), limit: 20, UID: ', id);
    return this.af.database.list('/pinterestApp/pins/' + id + '/votes', {query: {limitToLast: 20}});
  }

  getPin(id): FirebaseObjectObservable<any> {
    this._log['log']('getPin(id): ' + id);
    return this.af.database.object('/pinterestApp/pins/' + id);
  }

  getUser(id): FirebaseObjectObservable<any> {
    this._log['log']('getUser(id): ' + id);
    let user$ = this.af.database.object('/pinterestApp/users/' + id)
    user$.subscribe(user => {
      if(!user.created){
        user$.update({created: Date.now()})
      }
    });
    return ;
  }
}