import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevGuard } from './shared/support/dev.guard';
import { SecurityGuard } from '../app/security/support/security.guard';
import { DashboardComponent } from '../app/dashboard/dashboard/dashboard.component'
import { QueriesComponent } from './queries/queries.component';

import { SettingComponent } from './setting/setting.component'
import { FeedComponent } from './feed/feed.component'



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'appsapps'
  },
  {
    path: 'dashboard',
    canActivate: [SecurityGuard],
    component: DashboardComponent,
    data: {
      authenticate: true,
      roles: ['ROLE_VIEW']
    },
  },
    {
      path: 'queries',
      canActivate: [SecurityGuard],
      component: QueriesComponent,
      data: {
        authenticate: true,
        roles: ['ROLE_VIEW']
     }
    },
   
    { 
       path:"feed",
       component:FeedComponent,
       pathMatch:"full"
     },
     { 
       path:"layout",
       component:SettingComponent,
       pathMatch:"full"
     }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
