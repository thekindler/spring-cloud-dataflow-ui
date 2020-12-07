import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityModule } from '../security/security.module';
import { SharedModule } from '../shared/shared.module';
import { QueriesComponent } from '../queries/queries.component'
import { QueriesRoutingModule } from '../queries/queries-routing-module'

@NgModule({
  declarations: [
    QueriesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ClarityModule,
    SecurityModule,
    QueriesRoutingModule
  ],
  providers: []
})
export class QueriesModule {
}
