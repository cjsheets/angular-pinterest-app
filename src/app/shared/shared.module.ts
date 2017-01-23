import { NgModule, ErrorHandler }  from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DefaultImageDirective } from './default-image.directive';
import { Logger, ConsoleLogService } from './logger.service';

import { RavenErrorHandler } from './sentry-io.service';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DefaultImageDirective
  ],
  declarations: [
    DefaultImageDirective
  ],
  providers: [ 
    { provide: Logger, useClass: ConsoleLogService },
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
})
export class SharedModule { }
