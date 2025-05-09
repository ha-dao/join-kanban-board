import { Routes } from '@angular/router';
import { LegalNoticeComponent } from './shared/components/header/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './shared/components/header/privacy-policy/privacy-policy.component';
import { ContactComponent } from './main-content/contact/contact.component';
import { HelpComponent } from './shared/components/header/help/help.component';
import { SummaryComponent } from './main-content/summary/summary.component';
import { AddTaskComponent } from './main-content/add-task/add-task.component';
import { BoardComponent } from './main-content/board/board.component';
import { TaskComponent } from './main-content/task/task.component';
import { LoginComponent } from './landingpage/login/login.component';
import { SignupComponent } from './landingpage/signup/signup.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/summary', pathMatch: 'full' },
  {
    path: '', component: LoginComponent,
  },
  // {
  //   path: '', component: LoginComponent,
  // },
  {
    path: 'sign-up', component: SignupComponent,
  },
  {
    path: 'summary', component: SummaryComponent,
  },
  {
    path: 'add-task', component: AddTaskComponent,
  },
  {
    path: 'board', component: BoardComponent,
  },
  {
    path: 'contact', component: ContactComponent,
  },
  { path: 'help', component: HelpComponent },
  {
    path: 'privacy', component: PrivacyPolicyComponent,
  },
  {
    path: 'legal-notice', component: LegalNoticeComponent,
  },
  {
    path: 'login', component: LoginComponent,
  }
];
