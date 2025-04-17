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
  colours: string[] = [
    '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD',
    '#2ECC71', '#E74C3C', '#3498DB', '#9B59B6', '#1ABC9C',
    '#D35400', '#34495E', '#27AE60', '#E67E22', '#2980B9',
    '#BDC3C7', '#7F8C8D', '#16A085', '#C0392B', '#F39C12',
    '#E84393', '#6C5CE7', '#00CEC9', '#FAB1A0', '#81ECEC',
    '#74B9FF', '#A29BFE', '#D63031', '#0984E3', '#636E72',
    '#55EFC4', '#FD79A8', '#FFEAA7', '#00B894', '#E17055',
    '#2D3436', '#6AB04C', '#F0932B', '#130F40', '#4834D4',
    '#22A6B3', '#BE2EDD', '#30336B', '#535C68', '#B33771',
    '#3B3B98', '#FD7272', '#58B19F', '#CAD3C8', '#BDC581'
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
    let newContactName = item.name;
    await addDoc(this.getContactsRef(), item).catch(
      (err)=>{console.error(err)}
    ).then(
      (docRef)=>{ console.log("doc", docRef?.id);
      }
    );
    this.checkContactListLaters();
    this.showNewContact(newContactName);
  }

  showNewContact(name: string){
    this.contactList.forEach((contact) => {
      if(contact.name === name ){
        this.selectItem(contact.id);
      }
    });
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

