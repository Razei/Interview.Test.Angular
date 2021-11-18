import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequirementsRepositoryService } from './data/requirements-repository/requirements-repository.service';
import { StudentRepositoryService } from './data/student-repository/student-repository.service';
import { DiplomasRepositoryService } from './data/diplomas-repository/diplomas-repository.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    StudentRepositoryService,
    RequirementsRepositoryService,
    DiplomasRepositoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
