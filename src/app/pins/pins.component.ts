import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseListObservable,
  FirebaseObjectObservable } from 'angularfire2';
import { Subscription }   from 'rxjs/Subscription';
import { AuthService } from '../navbar/auth.service';

import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

import { Logger } from '../shared/logger.service';
import { FirebaseDbService } from '../shared/firebase-db.service';
import { ActivatedRoute } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pins',
  templateUrl: './pins.view.html',
  styleUrls: ['./pins.view.css']
})
export class PinsComponent implements OnInit { 
  private currentRoute: string;
  private pinList$: FirebaseListObservable<any>;
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


  ngOnInit(): void {
    this.subs[this.subs.length] = this.route.url.subscribe(url => {
      this.currentRoute = url.pop().path;
    });
  }

  open(content) {
    this._log['log']( "Open Modal: ", content);
    this.modalService.open(content).result.then((result) => {
    this._log['log']( "Close Modal: ", result);
    }, (reason) => {
      this._log['log']( "Dismissed, do nothing" );
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
}