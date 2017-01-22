import { ErrorHandler } from '@angular/core';
import * as Raven from 'raven-js';

Raven
  .config('https://204c42a2932c43448b0db4c25680fc40@sentry.io/131523')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err.originalError);
  }
}