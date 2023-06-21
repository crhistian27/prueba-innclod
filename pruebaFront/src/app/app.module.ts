import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {  HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ToastModule
  ],
  providers: [HttpClientModule,{provide:LocationStrategy,useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
