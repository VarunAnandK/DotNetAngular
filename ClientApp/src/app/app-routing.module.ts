import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from 'src/Helper/AuthGuard';
import { LogoutComponent } from './logout/logout.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/Login',
    pathMatch: 'full'
  },
  { path: 'Login', component: LoginComponent },
  { path: 'Logout/:Id', component: LogoutComponent },
  { path: 'Admin/Dashboard', component: MainComponent, canActivate: [AuthGuard], loadChildren: () => import('./Admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'Admin/UserList', component: MainComponent, canActivate: [AuthGuard], loadChildren: () => import('./Admin/User/user-list/user-list.module').then(m => m.UserListModule) }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
