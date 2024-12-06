import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { ResponseComponent } from './response/response.component';

//16474

const routes: Routes = [{ path: '', component: SurveyComponent },
  { path: 'response/:id', component: ResponseComponent },
  { path: '', redirectTo: '/survey', pathMatch: 'full' }, // Default route
  { path: 'survey', component: SurveyComponent },
  { path: 'response', component: ResponseComponent },
]; // :id is a dynamic parameter

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
