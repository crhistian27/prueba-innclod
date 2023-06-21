import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeGuard } from './guards/home.guard';
import { IndexGuard } from './guards/index.guard';
import { LoginComponent } from './pages/auth/login/login.component';

const routes: Routes = [
  {
		path: 'login', component: LoginComponent,
		canActivate:[IndexGuard],
	},
	{
		path: 'dashboard',
		loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
		canActivate:[HomeGuard],
	},
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
