import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { JsonSummaryComponent } from './json-summary/json-summary.component';
import { JsonAggregateComponent } from './json-aggregate/json-aggregate.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from "src/app/shared/auth.guard";
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [

  { path: 'welcome', component: WelcomeComponent },
  { path: 'json-aggregate', component: JsonAggregateComponent, canActivate: [AuthGuard] },
  { path: 'json-summary', component: JsonSummaryComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
