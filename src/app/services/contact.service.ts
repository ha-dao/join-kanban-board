import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot, addDoc} from '@angular/fire/firestore';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  unsubContactList: any;
  firestore:Firestore = inject(Firestore);
  /* contacts  = collectionData(this.getContactsRef()); */
  contactList: Contact[] = [];
  constructor() {
    this.snap();
  }

  snap(){
    this.unsubContactList = onSnapshot(this.getContactsRef(), (list)=>{
      this.contactList= [];
      list.forEach(element => {
        this.contactList.push(this.setContactObj(element.data(), element.id));
        
        console.log(this.contactList);
      })
    });
  }

  ngonDestroy(){
    this.unsubContactList();
  }

  async addContact(item:any){
    await addDoc(this.getContactsRef(), item).catch(
      (err)=>{console.error(err)}
    ).then(
      (docRef)=>{ console.log("doc", docRef?.id);
      }
    );
  }

  setContactObj(obj: any, id: string):Contact{
    return {
      id: id,
      name: obj.name || '',
      email: obj.email || '',
      phone : obj.phone || ''
    }
  }

  getContactsRef(){
    return collection(this.firestore, 'contacts');
  }

  getSingleContact(collectionRef: string, docId: string){
    return doc( collection(this.firestore, collectionRef), docId);
  }
}
