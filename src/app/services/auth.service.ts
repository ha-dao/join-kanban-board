import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  query,
  where,
  doc,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  emailAlreadyUsed: boolean = false;
  UserLoggedIn: string = '';
  constructor(private auth: Auth, private firestore: Firestore) {}

  // Login
  async login(emailOrUsername: string, password: string) {
    let email = emailOrUsername;

    const isEmail = emailOrUsername.includes('@');

    if (!isEmail) {
      const q = query(
        collection(this.firestore, 'users'),
        where('username', '==', emailOrUsername)
      );
      const result = await getDocs(q);

      if (result.empty) {
        throw new Error('Username not found');
      }

      const userData = result.docs[0].data();
      email = userData['email'];
    }

    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(email: string, password: string, username: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      await setDoc(doc(this.firestore, 'users', uid), {
        username: username,
        email: email,
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.emailAlreadyUsed = true;
      } else {
      }
      throw error;
    }
  }

  logout() {
    return signOut(this.auth);
  }
}
