import { Routes } from '@angular/router';
import { LegalNoticeComponent } from './shared/components/header/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './shared/components/header/privacy-policy/privacy-policy.component';
import { ContactComponent } from './main-content/contact/contact.component';
import { HelpComponent } from './shared/components/header/help/help.component';

export const routes: Routes = [
    {
        path: '', component: ContactComponent
    },
    {
        path: 'legal-notice', component: LegalNoticeComponent
    },
    {
        path: 'privacy', component: PrivacyPolicyComponent
    },
//   {
//     path: '', redirectTo: 'summary', pathMatch: 'full',
//   },
//   {
//     path: 'summary', loadComponent: () => import('./pages/summary/summary.component').then((m) => m.SummaryComponent),
//   },
//   {
//     path: 'add-task',loadComponent: () => import('./pages/add-task/add-task.component').then( (m) => m.AddTaskComponent),
//   },
//   {
//     path: 'board', loadComponent: () => import('./pages/board/board.component').then((m) => m.BoardComponent),
//   },
//   {
//     path: 'contacts',loadComponent: () => import('./pages/contacts/contacts.component').then((m) => m.ContactsComponent),
//   },
//   {
//     path: 'privacy-policy', loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then((m) => m.PrivacyPolicyComponent),
//   },
//   {
//     path: 'legal-notice',loadComponent: () => import('./pages/legal-notice/legal-notice.component').then((m) => m.LegalNoticeComponent),
//   },

{ path: 'help', component: HelpComponent }, 
];
