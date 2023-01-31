import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { Question7Component } from './pages/question7/question7.component';
import { Question3Component } from './pages/question3/question3.component';
import { PrincipalComponent } from './pages/principal/principal.component';

//PARSER
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { Question4Component } from './pages/question4/question4.component';
import { Question1Component } from './pages/question1/question1.component';
import { Question2Component } from './pages/question2/question2.component';
import { Question5Component } from './pages/question5/question5.component';
import { Question6Component } from './pages/question6/question6.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    Question3Component,
    PrincipalComponent,
    Question7Component,
    Question4Component,
    Question1Component,
    Question2Component,
    Question5Component,
    Question6Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCsvParserModule,
    FontAwesomeModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  
}
