import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '../security/support/security.guard';
import { QueriesComponent } from './queries.component';


const routes: Routes = [
  {
    path: 'queries',
    canActivate: [SecurityGuard],
    component: QueriesComponent,
    data: {
      authenticate: true,
      roles: ['ROLE_VIEW']
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueriesRoutingModule {
}
