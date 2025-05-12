import { Injectable, inject } from '@angular/core';
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
import { ContactService } from './contact.service';
import { Router } from '@angular/router';
import { FeedbackServiceService } from './feedback.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  emailAlreadyUsed: boolean = false;
  UserLoggedIn: string|null = localStorage.getItem('loggedIn');
  contactService= inject(ContactService)
  router= inject(Router)
  feedbackService= inject(FeedbackServiceService)
  constructor(private auth: Auth, private firestore: Firestore) {}

  async login(emailOrUsername: string, password: string) {
    let email = emailOrUsername;
    const isEmail = emailOrUsername.includes('@');
    if (!isEmail) {
      const q = query(collection(this.firestore, 'users'), where('username', '==', emailOrUsername));
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

   getUsername(email:string){
      let userName=''
      this.contactService.contactList.forEach(c =>{
        if(c.email == email){          
          userName=  c.name
        }
      })
      return userName

      
    }


  logout() {
    this.UserLoggedIn= ''
    this.router.navigate(['/login'])
    this.feedbackService.show('Log out successfull')
    localStorage.setItem('loggedIn', this.UserLoggedIn)
    return signOut(this.auth);
    
  }
}
