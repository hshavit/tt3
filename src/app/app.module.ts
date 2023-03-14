

import {DemoMaterialModule} from './material-modules'
import { FormsModule ,ReactiveFormsModule  } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutocompleteLibModule } from  './modules/autocomplete-lib-module.module'
import { HttpClientModule } from '@angular/common/http';
import { AngularDraggableModule } from 'angular2-draggable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EmpLoginComponent } from './emp-login/emp-login.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({

  imports: [
    DemoMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AngularDraggableModule,
    TableModule,
    BrowserModule,
    AppRoutingModule,
    AutocompleteLibModule,
    HttpClientModule,

  ],
  declarations: [
    AppComponent,
    EmpLoginComponent,
    ModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
