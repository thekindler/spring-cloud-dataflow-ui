import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { FormsModule } from '@angular/forms';
import { AboutModule } from './about/about.module';
import { AboutService } from './shared/api/about.service';
import { SharedModule } from './shared/shared.module';
import { StreamsModule } from './streams/streams.module';
import { TasksJobsModule } from './tasks-jobs/tasks-jobs.module';
import { ManageModule } from './manage/manage.module';
import { SecurityModule } from './security/security.module';
import { SettingsModule } from './settings/settings.module';
import { SecurityService } from './security/service/security.service';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Security } from './shared/model/security.model';
import { of } from 'rxjs';
import { ROOT_REDUCERS, metaReducers } from './reducers/reducer';
import { EffectsModule } from '@ngrx/effects';
import { SettingsService } from './settings/settings.service';
import { AppsModule } from './apps/apps.module';
import { QueriesComponent } from './queries/queries.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { LicencePlateComponent } from './licence-plate/licence-plate.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { LayoutViewComponent } from './layout-view/layout-view.component';
import { ChartComponent } from './layout-view/chart/chart.component';
import { DragCardComponent } from './layout-view/drag-card/drag-card.component';
import { TableComponent } from './layout-view/table/table.component';
import {MatTableModule} from '@angular/material/table';
import { GraphPopupComponent } from './layout-view/drag-card/graph-popup/graph-popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [
    AppComponent,
    QueriesComponent,
    LicencePlateComponent,
    LayoutViewComponent,
    ChartComponent,
    DragCardComponent,
    TableComponent,
    GraphPopupComponent
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
    AboutModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    // DevModule,
    StreamsModule,
    TasksJobsModule,
    ManageModule,
    SecurityModule,
    SettingsModule,
    MatTableModule,
    AppsModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([])
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (securityService: SecurityService, aboutService: AboutService, settingsService: SettingsService) => {
        return () => {
          return securityService.load()
            .pipe(
              mergeMap((security: Security) => {
                securityService.loaded(security.authenticationEnabled, security.authenticated, security.username, security.roles);
                if (security.authenticated || !security.authenticationEnabled) {
                  return aboutService.load()
                    .pipe(
                      map(about => security)
                    );
                }
                return of(security);
              })
            )
            .pipe(
              switchMap(() => settingsService.load())
            )
            .toPromise();
        };
      },
      deps: [SecurityService, AboutService, SettingsService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
