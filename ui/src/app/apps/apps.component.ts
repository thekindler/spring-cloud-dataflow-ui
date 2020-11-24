import { ChangeDetectorRef, Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { AppService } from '../shared/api/app.service';
import { ClrDatagridStateInterface } from '@clr/angular';
import { App, AppPage } from '../shared/model/app.model';
import { UnregisterComponent } from './unregister/unregister.component';
import { Router } from '@angular/router';
import { VersionComponent } from './version/version.component';
import { DatagridComponent } from '../shared/component/datagrid/datagrid.component';
import { ContextService } from '../shared/service/context.service';
import { SettingsService } from '../settings/settings.service';
import { SecurityService } from '../security/service/security.service' 

@Component({
  selector: 'app-apps-list',
  templateUrl: './apps.component.html'
})
export class AppsComponent extends DatagridComponent implements OnInit {
 
  loggedinUser$ = this.securityService.loggedinUser();

  page: AppPage;
  @ViewChild('unregisterModal', { static: true }) unregisterModal: UnregisterComponent;
  @ViewChild('versionModal', { static: true }) versionModal: VersionComponent;

  constructor(private appService: AppService,
              private router: Router,
              protected settingsService: SettingsService,
              protected changeDetectorRef: ChangeDetectorRef,
              protected contextService: ContextService,
              private securityService: SecurityService,
              ) {
    
    super(contextService, settingsService, changeDetectorRef, 'apps');
  }
  ngOnInit(): void {
    this.isAdmin();
  }

  logout(): void {
    this.securityService.logout().subscribe(security => {
      this.router.navigate(['/']);
    });
  }

  isAdmin():Boolean{

    let user:String;
    this.loggedinUser$.subscribe(data=>{user=data}) 
    console.log("in app component" ,user==="admin")
  
    if (user==="admin")
      return true
    else return false
  }

  refresh(state: ClrDatagridStateInterface) {
    if (this.isReady()) {
      super.refresh(state);
      const params = this.getParams(state, { name: '', type: '' });
      this.unsubscribe$ = this.appService.getApps(params.current - 1, params.size, params.name, params.type,
        `${params.by || 'name'}`, `${params.reverse ? 'DESC' : 'ASC'}`, true)
        .subscribe((page: AppPage) => {
          this.page = page;
          this.updateGroupContext(params);
          this.selected = [];
          this.loading = false;
        });
    }
  }

  details(app: App) {
    this.router.navigateByUrl(`apps/${app.type}/${app.name}`);
  }

  add() {
    this.router.navigateByUrl(`apps/add`);
  }

  unregistersApp(apps: App[]) {
    this.unregisterModal.open(apps);
  }

  manageVersion(app: App) {
    this.versionModal.open(app.name, app.type);
  }

}
