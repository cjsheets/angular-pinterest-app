import { Directive, Input } from '@angular/core';
// http://stackoverflow.com/questions/36429903/angular-2-check-if-image-url-is-valid-or-broken

@Directive({
  selector: 'img[default]',
  host: {
    '(error)':'updateUrl()',
    '[src]':'src'
   }
})
export class DefaultImageDirective {
  @Input() src:string;
  @Input() default:string;

  updateUrl() {
    this.src = this.default;
  }
}