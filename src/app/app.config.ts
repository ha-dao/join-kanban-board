import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { getAuth, provideAuth } from '@angular/fire/auth';

/**
 * @fileoverview
 * Application configuration for Angular, including routing, Firebase, Firestore, Animations, and Auth providers.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Provides the Angular router with application routes.
     */
    provideRouter(routes),

    /**
     * Initializes and provides the Firebase application.
     */
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'join-1-46a2d',
        appId: '1:414847680321:web:1f023837141c2935ac6bc0',
        storageBucket: 'join-1-46a2d.firebasestorage.app',
        apiKey: 'AIzaSyCXcBokA4SNkxf0PRKFrD0_E0GnPnrnUAs',
        authDomain: 'join-1-46a2d.firebaseapp.com',
        messagingSenderId: '414847680321',
        measurementId: 'G-RXQNVD7VXR',
      })
    ),

    /**
     * Provides Firestore database service.
     */
    provideFirestore(() => getFirestore()),

    /**
     * (Duplicate) Initializes and provides the Firebase application.
     */
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'join-1-46a2d',
        appId: '1:414847680321:web:1f023837141c2935ac6bc0',
        storageBucket: 'join-1-46a2d.firebasestorage.app',
        apiKey: 'AIzaSyCXcBokA4SNkxf0PRKFrD0_E0GnPnrnUAs',
        authDomain: 'join-1-46a2d.firebaseapp.com',
        messagingSenderId: '414847680321',
        measurementId: 'G-RXQNVD7VXR',
      })
    ),

    /**
     * (Duplicate) Provides Firestore database service.
     */
    provideFirestore(() => getFirestore()),

    /**
     * Provides asynchronous animations support.
     */
    provideAnimationsAsync(),

    /**
     * (Duplicate) Initializes and provides the Firebase application.
     */
    provideFirebaseApp(() => 
      initializeApp({
        "projectId":"join-1-46a2d",
        "appId":"1:414847680321:web:1f023837141c2935ac6bc0",
        "storageBucket":"join-1-46a2d.firebasestorage.app",
        "apiKey":"AIzaSyCXcBokA4SNkxf0PRKFrD0_E0GnPnrnUAs",
        "authDomain":"join-1-46a2d.firebaseapp.com",
        "messagingSenderId":"414847680321",
        "measurementId":"G-RXQNVD7VXR"
      })
    ),

    /**
     * Provides Firebase Authentication service.
     */
    provideAuth(() => getAuth()),

    /**
     * (Duplicate) Provides Firestore database service.
     */
    provideFirestore(() => getFirestore()),
  ],
};
