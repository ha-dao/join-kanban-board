import { Routes } from '@angular/router';
import { LegalNoticeComponent } from './shared/components/header/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './shared/components/header/privacy-policy/privacy-policy.component';
import { ContactComponent } from './main-content/contact/contact.component';
import { HelpComponent } from './shared/components/header/help/help.component';
import { SummaryComponent } from './main-content/summary/summary.component';
import { AddTaskComponent } from './main-content/add-task/add-task.component';
import { BordComponent } from './main-content/board/board.component';

export const routes: Routes = [
  { path: '', redirectTo: '/summary', pathMatch: 'full' },
  {
    path: '', component: SummaryComponent,
  },
  {
    path: 'summary', component: SummaryComponent,
  },
  {
    path: 'add-task', component: AddTaskComponent,
  },
  {
    path: 'board', component: BordComponent,
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
];
