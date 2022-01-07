import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayOutComponent } from './layout/layout.component';
import { JsonSummaryComponent } from './json-summary/json-summary.component';
import { JsonAggregateComponent } from './json-aggregate/json-aggregate.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayOutComponent,
    children: [
      { path: 'json-summary', component: JsonSummaryComponent },
      { path: 'json-aggregate', component: JsonAggregateComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  // { path: 'json-summary', component: JsonSummaryComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
