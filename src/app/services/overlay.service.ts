import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  isOpen = signal(false)
  setTemplate:string = ''

  private contactDataSource = new BehaviorSubject<{ name: string; email: string; phone: string } | null>(null);
  contactData$ = this.contactDataSource.asObservable();

  buttonLeft = 'Cancel';
  buttonRight = 'Create';

  openOverlay(target:string) {
    this.getTemplate(target)
    this.isOpen.set(true);
    
  }

  getTemplate(target:string){
    this.setTemplate = target
  }
  
  closeOverlay() {
    this.isOpen.set(false);  
    
  }

  setOverlayButtons(left: string, right: string) {
    this.buttonLeft = left;
    this.buttonRight = right;
  }

  setContactData(data: { name: string; email: string; phone: string }) {
    this.contactDataSource.next(data);
  }
}
