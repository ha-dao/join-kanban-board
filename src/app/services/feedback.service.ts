import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackServiceService {

  constructor() { }


  private _message = signal<string | null>(null);
  private _visible = signal(false);

  readonly message = this._message;
  readonly visible = this._visible;

  show(message: string, duration = 1500) {
    this._message.set(message);
    this._visible.set(true);

    setTimeout(() => {
      this._visible.set(false);
      setTimeout(() => this._message.set(null), 300); 
    }, duration);
  }
}
