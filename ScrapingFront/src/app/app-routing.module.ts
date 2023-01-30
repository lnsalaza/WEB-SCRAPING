import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { Question3Component } from './pages/question3/question3.component';
import { Question7Component } from './pages/question7/question7.component';
import { Question4Component } from './pages/question4/question4.component';
import { Question1Component } from './pages/question1/question1.component';
import { Question2Component } from './pages/question2/question2.component';

const routes: Routes = [
  { path: "question4", component: Question4Component},
  { path: "question3", component: Question3Component},
  { path: "question2", component: Question2Component},
  { path: "question1", component: Question1Component},
  { path: "question7", component: Question7Component},
  { path: "principal", component: PrincipalComponent},
  { path: "**", redirectTo: "principal" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
