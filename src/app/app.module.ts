import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequirementsRepository } from './data/requirements-repository.service';
import { StudentRepository } from './data/student-repository.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    StudentRepository,
    RequirementsRepository,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
