import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { Question3Component } from './pages/question3/question3.component';
import { Question7Component } from './pages/question7/question7.component';
import { Question4Component } from './pages/question4/question4.component';
import { Question1Component } from './pages/question1/question1.component';
import { Question2Component } from './pages/question2/question2.component';
import { Question5Component } from './pages/question5/question5.component';
import { Question6Component } from './pages/question6/question6.component';

const routes: Routes = [
  { path: "question6", component: Question6Component, title: "Pregunta 6"},
  { path: "question5", component: Question5Component, title: "Pregunta 5"},
  { path: "question4", component: Question4Component, title: "Pregunta 4"},
  { path: "question3", component: Question3Component, title: "Pregunta 3"},
  { path: "question2", component: Question2Component, title: "Pregunta 2"},
  { path: "question1", component: Question1Component, title: "Pregunta 1"},
  { path: "question7", component: Question7Component, title: "Pregunta 7"},
  { path: "principal", component: PrincipalComponent},
  { path: "**", redirectTo: "principal" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
