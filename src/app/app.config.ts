// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding() // Routen-Params → automatisch als Inputs
    ),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'join-demo-57e8f',
        appId: '1:567987311327:web:c1af8e819ca705a4804f6a',
        storageBucket: 'join-demo-57e8f.firebasestorage.app',
        apiKey: 'AIzaSyB5aR44kqFRj2s-LaSV-l0nhSCkR4Jr9H4',
        authDomain: 'join-demo-57e8f.firebaseapp.com',
        messagingSenderId: '567987311327',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideAnimationsAsync(),
  ],
};
