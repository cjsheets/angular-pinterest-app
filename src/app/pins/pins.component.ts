import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable,
  FirebaseObjectObservable } from 'angularfire2';
import { Subscription }   from 'rxjs/Subscription';
import { AuthService } from '../navbar/auth.service';

import { Logger } from '../shared/logger.service';
import { FirebaseDbService } from '../shared/firebase-db.service';
import { ActivatedRoute } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pins',
  templateUrl: './pins.view.html'
})
export class PinsComponent implements OnInit { 
  private currentRoute: string;
  private pinList$: FirebaseListObservable<any>;
  private myPinList$: FirebaseListObservable<any>;
  private myResultObj$: FirebaseObjectObservable<any>;
  private bricks: Array<{}> = [];
  private subs: Subscription[] = [];

  private pinToDelete = '';

  constructor(
    private modalService: NgbModal,
    private _log: Logger,
    private _FireDb: FirebaseDbService,
    private _auth: AuthService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.subs[this.subs.length] = this.route.url.subscribe(url => {
      this.currentRoute = url[1].path;

      if(this.currentRoute == 'pins'){
        //this._log['log']('PinsComponent :: ngOnInit()')
        this.pinList$ = this._FireDb.getPins();
        this.setupPins();

      } else { // Route: my-pins
        this.subs[this.subs.length] = this._auth.af.auth.subscribe(auth => {
          if(auth) {
            this.myPinList$ = this._FireDb.getMyPins(this._auth.getUID());
            this.setupMyPins();
          }
        });
      }
    });
  }

  setupPins(): void {
    this.subs[this.subs.length] = this.pinList$.subscribe(pins => {
      this.bricks = [];
      //this._log['log']('setupPins(): ', pins)
      pins.forEach(pin => {
        // Base64 Encode for minor obscurification
        pin.rKey = btoa(pin.results);
        this.bricks.push(pin)
      });
    });
  }

  setupMyPins(): void {
    this.subs[this.subs.length] = this.myPinList$.subscribe(pins => {
      this.bricks = [];
      //this._log['log']('setupMyPins(): ', pins)
      pins.forEach(pin => {
        // Base64 Encode for minor obscurification
        pin.pKey = btoa(pin.$key);
        pin.rKey = btoa(pin.results);
        this.bricks.push(pin)
      });
    });
  }

  getResultHandle(resultID: string): void {
    this.myResultObj$ = this._FireDb.getResults(resultID);
  }

  open(content, question, resultID, pinID) {
    this._log['log']( "Open Modal: ", atob(resultID), atob(pinID) );
    this.pinToDelete = question;
    this.modalService.open(content).result.then((result) => {
      this.getResultHandle(atob(resultID));
      this.myResultObj$.remove();
      this.myPinList$.remove(atob(pinID));
    }, (reason) => {
      this._log['log']( "Dismissed, do nothing" );
    });
  }

  deleteConfirmation(){
      this._log['log']( 'popover' )

  }

  deletePin(id): void {
      this._log['log']( 'delete this pin', id )
  }
  
  ngOnDestroy() {
    for(let sub of this.subs) sub.unsubscribe();
  }
}