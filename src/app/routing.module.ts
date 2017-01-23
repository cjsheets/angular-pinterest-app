import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { PinsComponent } from './pins/pins.component';

// Save space in the root module, export components here
export const routedComponents = [
  AppComponent,
  PinsComponent
];

const routes: Routes = [
  { path: 'ap/my-pins', component: PinsComponent },
  { path: 'ap', component: PinsComponent },
  { path: '**', redirectTo: 'ap', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }