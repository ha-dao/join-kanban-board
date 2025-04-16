import { Injectable, OnDestroy} from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot, addDoc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import { Contact } from '../interfaces/contact';
import { query, orderBy, limit } from 'firebase/firestore'; 


@Injectable({
  providedIn: 'root'
})
export class ContactService implements OnDestroy{
  unsubContactList: any;
  firestore:Firestore = inject(Firestore);
  /* contacts  = collectionData(this.getContactsRef()); */
  contactList: Contact[] = [];
  contactListLaters: number[] = [];
  contactListLater: string[] = [];
  currentContact: Contact = {name: '', email: '', phone: ''};
  currentIdex: number = 0;
  overlayDisplay: string = 'none';
  colours = [
    '#C1C88F',
    '#F6B68D',
    '#A0B9F9',
    '#F8E57D',
    '#A9D87B',
    '#B8E4E2',
    '#E1A58B',
    '#D8A2C8',
    '#F0D48A',
    '#B6A9F6',
    '#F4A6B7',
    '#D4E88D',
    '#D3C57C',
    '#A49AC8',
    '#B4A7F6',
    '#B6A68C',
    '#D1D4E7',
    '#F1B7D2',
    '#C1C88F',
    '#F6B68D',
    '#A0B9F9',
    '#F8E57D',
    '#A9D87B',
    '#B8E4E2',
    '#E1A58B',
    '#D8A2C8',
    '#F0D48A',
    '#B6A9F6',
    '#F4A6B7',
    '#D4E88D',
    '#D3C57C',
    '#A49AC8',
    '#B4A7F6',
    '#B6A68C',
    '#D1D4E7',
    '#F1B7D2',
  ];
  constructor() {
    this.snap();
    this.checkContactListLaters();
  }

  snap(){
    let q = query(this.getContactsRef(), orderBy('name'));
    this.unsubContactList = onSnapshot(q, (list)=>{
      this.contactList= [];
      list.forEach(element => {
          this.contactList.push(this.setContactObj(element.data(), element.id));
      })
      this.checkContactListLaters();
    });
  }

  checkContactListLaters(){
    let latter = 0;
    this.contactListLater= [];
    let condition = true;
    let startValue = 0;
    this.contactList.forEach(contact =>{
      while (condition) {
        if(contact.name.startsWith(String.fromCharCode(latter + 65))){
          if(!this.contactListLater.includes(String.fromCharCode(latter + 65)))
          this.contactListLater.push(String.fromCharCode(latter + 65))
          condition = false;
        }else{
          latter++;
        }

        if(latter == 26){
          condition = false;
        }
      }
      condition = true;
      latter = 0;
    });

  }

  ngOnDestroy(){
    if(this.unsubContactList()){
      this.unsubContactList();
    }
  }

  async addContact(item:any){
    await addDoc(this.getContactsRef(), item).catch(
      (err)=>{console.error(err)}
    ).then(
      (docRef)=>{ console.log("doc", docRef?.id);
      }
    );
    this.checkContactListLaters();
  }

  async updateContact(contactData: {}){
    if(this.currentContact.id){
      await updateDoc(this.getSingleContact('contacts', this.currentContact.id), contactData);
      this.selectItem(this.currentContact.id);
    }
  }

  async deleteContact(){
    if(this.currentContact.id){
      await deleteDoc(this.getSingleContact('contacts', this.currentContact.id))
      this.selectItem('');
      this.overlayDisplay = 'none';
    }
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

  selectedIndex: string | undefined = '';
  selectItem(id: string | undefined) {
    this.selectedIndex = id;
    this.contactList.forEach((contact, index) => {
      if(contact.id === id ){
        this.currentContact = contact;
        this.currentIdex = index;
        console.log(this.currentIdex);
        
      }
    });
    this.overlayDisplay = 'flex';
  }
}

