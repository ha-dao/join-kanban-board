import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, query, where, doc, getDocs, setDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  // Login
  async login(emailOrUsername: string, password: string) {
    let email = emailOrUsername;

    // Prüfen, ob es eine gültige E-Mail ist (rudimentär)
    const isEmail = emailOrUsername.includes('@');

    if (!isEmail) {
      // Suche Firestore nach E-Mail zu Benutzername
      const q = query(
        collection(this.firestore, 'users'),
        where('username', '==', emailOrUsername)
      );
      const result = await getDocs(q);

      if (result.empty) {
        throw new Error('Benutzername nicht gefunden');
      }

      // E-Mail aus Firestore lesen
      const userData = result.docs[0].data();
      email = userData['email'];
    }

    // Login mit E-Mail durchführen
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Registrierung
  async register(email: string, password: string, username: string) {
    
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const uid = userCredential.user.uid;
  
      await setDoc(doc(this.firestore, 'users', uid), {
        username: username,
        email: email,
      });
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.error('Diese E-Mail-Adresse wird bereits verwendet.');
      } else {
        console.error('Registrierungsfehler:', error.message);
      }
      throw error;
    }
  }
  

  // Logout
  logout() {
    return signOut(this.auth);
  }
}
