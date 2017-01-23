import { Component, Directive, Input, OnInit, ViewChild } from '@angular/core';
import { FirebaseListObservable,
  FirebaseObjectObservable } from 'angularfire2';
import { Subscription }   from 'rxjs/Subscription';
import { AuthService } from '../navbar/auth.service';

import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

import { Logger } from '../shared/logger.service';
import { FirebaseDbService } from '../shared/firebase-db.service';
import { ActivatedRoute } from '@angular/router';
import { DefaultImageDirective } from '../shared/default-image.directive';

import {NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'pins',
  templateUrl: './pins.view.html',
  styleUrls: ['./pins.view.css']
})
export class PinsComponent implements OnInit { 
  private currentRoute: string;
  private pinList$: FirebaseListObservable<any>;
  private pinObj$: FirebaseObjectObservable<any>;
  private myPinList$: FirebaseListObservable<any>;
  private myResultObj$: FirebaseObjectObservable<any>;
  private bricks: Array<{}> = [];
  private subs: Subscription[] = [];

  private pinToDelete = '';
  @ViewChild('t1') public tooltip1: NgbTooltip;
  @ViewChild('t2') public tooltip2: NgbTooltip;
  @ViewChild('t3') public tooltip3: NgbTooltip;

  constructor(
    private modalService: NgbModal,
    private _log: Logger,
    private _FireDb: FirebaseDbService,
    private _auth: AuthService,
    private route: ActivatedRoute,
  ) { }

  public model;


  ngOnInit(): void {
    this.subs[this.subs.length] = this.route.url.subscribe(url => {
      this.currentRoute = url.pop().path;

      if(this.currentRoute == 'ap'){
        //this._log['log']('PinsComponent :: ngOnInit()')
        this.pinList$ = this._FireDb.getPins();
        this.setupPins();

      } else { // Route: my-pins
        this.subs[this.subs.length] = this._auth.af.auth.subscribe(auth => {
          if(auth) {
            this.pinList$ = this._FireDb.getMyPins(this._auth.getUID());
            this.setupPins();
          }
        });
      }
    });
  }

  setupPins(): void {
    this.subs[this.subs.length] = this.pinList$.subscribe(pins => {
      this.bricks = [];
      this._log['log']('setupPolls(): ', pins)
      pins.forEach(pin => {
        if (pin['votes']){
          pin['numvotes'] = Object.keys(pin.votes).length;
          pin['myvote'] = (pin.votes[this._auth.getUID()]) ? true : false;
        } else {
          pin['numvotes'] = 0;
          pin['myvote'] = false;
        }
         this.bricks.push(pin)
      });
    });
  }

  addPin(url) {
    let results = {owner: this._auth.getUID(), url: url};
    this.pinList$.push(results);
  }

  open() {
    const modalRef = this.modalService.open(EditDialogContent);
    modalRef.componentInstance.selectedCaption = 'Some caption';
    modalRef.result.then((closeResult) => {
      if(closeResult){
        this.addPin(closeResult)
      }
    });
  }

  openTooltip(number){
    switch(number){
      case 1: this.tooltip1.open(); break;
      case 2: this.tooltip2.open(); break;
      case 3: this.tooltip3.open(); break;
    }
    console.log('fired')
    
  }
  closeTooltip(number){
    switch(number){
      case 1: this.tooltip1.close(); break;
      case 2: this.tooltip2.close(); break;
      case 3: this.tooltip3.close(); break;
    }
  }

  addHeart(key){
    this.pinObj$ = this._FireDb.getPin(key);
    let sub = this.pinObj$.subscribe(results => {
      let newVotes = {}, oldVotes = results.votes;
      newVotes[this._auth.getUID()] = true;
      console.log('preparing to update...', newVotes, oldVotes)
      this.pinObj$.update({votes: Object.assign(newVotes, oldVotes)});
      console.log('updated wiht: ', newVotes)
    });
  }

  deletePin(key){
    this.pinList$.remove(key);
  }
 
}

// http://stackoverflow.com/questions/40381862/angular-2-selector-with-template-content
@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header">
    <h5 class="modal-title">Link to a Pin</h5>
  </div>
  <div class="modal-footer">
    <form #f="ngForm" novalidate (ngSubmit)="checkUrl()">
        <div class="input-group" [class.has-danger]="linkError">
          <input class="form-control input-sm" placeholder="Image URL"
            [(ngModel)]="model" name="stocksymbol">
          <span class="input-group-btn">
            <button class="btn col-form-label-sm" type="button" [class.btn-success]="!linkError"
            (click)="checkUrl()" [class.btn-danger]="linkError">Pin</button>
          </span>
        </div>
        <div class="alert alert-danger" *ngIf="linkError">There was an issue with this url.</div>
    </form>
    <img [src]="testImage" (error)="errorHandler($event, callerID)" class="pixel-image">
  </div>
  `,
  styleUrls: ['./pins.view.css']
})
export class EditDialogContent {
  constructor(public activeModal: NgbActiveModal) {}
  model;
  public testImage = "/assets/img/1x1.png";
  public linkError = false;
  callerID;

  urlSubmit(){
    this.model = null;
    this.activeModal.close(this.model);
  }

  checkUrl(){
    let cUrl = this.cleanUrl(this.model)
    this.callerID = setTimeout( _ => {
      //this.addPin(cUrl)
      this.linkError = false;
      this.activeModal.close(this.model);
    }, 500);
    this.testImage = cUrl;
  }

  cleanUrl(url){
    return url.replace(/[^-A-Za-z0-9+&@#/%?=~_|!:,.;\(\)]/g, "");
  }

  errorHandler(event, callerID) {
    clearTimeout(callerID);
    this.linkError = true;
    this.testImage = "/assets/img/1x1.png"
  }

}