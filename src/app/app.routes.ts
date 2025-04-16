import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: 'summary', pathMatch: 'full',
  },
  {
    path: 'summary', loadComponent: () => import('./main-content/summary/summary.component').then((m) => m.SummaryComponent),
  },
  {
    path: 'add-task',loadComponent: () => import('./main-content/add-task/add-task.component').then( (m) => m.AddTaskComponent),
  },
  {
    path: 'board', loadComponent: () => import('./main-content/board/bord.component').then((m) => m.BordComponent),
  },
  {
    path: 'contacts',loadComponent: () => import('./main-content/contact/contact.component').then((m) => m.ContactComponent),
  },
//   {
//     path: 'privacy-policy', loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then((m) => m.PrivacyPolicyComponent),
//   },
//   {
//     path: 'legal-notice',loadComponent: () => import('./pages/legal-notice/legal-notice.component').then((m) => m.LegalNoticeComponent),
//   },
];