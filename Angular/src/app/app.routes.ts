import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { DepositeComponent } from './components/main/deposite/deposite.component';
import { MainComponent } from './components/main/main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WithdrawComponent } from './components/main/withdraw/withdraw.component';
import { HistoryComponent } from './components/main/history/history.component';
import { InfomationComponent } from './components/main/infomation/infomation.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', redirectTo: '/main/dashboard', pathMatch: 'full' },
  { path: 'infomation', redirectTo: '/main/infomation', pathMatch: 'full' },
  { path: 'deposite', redirectTo: '/main/deposite', pathMatch: 'full' },
  { path: 'withdraw', redirectTo: '/main/withdraw', pathMatch: 'full' },
  { path: 'history', redirectTo: '/main/history', pathMatch: 'full' },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'infomation', component: InfomationComponent },
      { path: 'deposite', component: DepositeComponent },
      { path: 'withdraw', component: WithdrawComponent },
      { path: 'history', component: HistoryComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
