/**
 * Feedback service for displaying toast notifications
 * @fileoverview Provides functionality to show temporary feedback messages to users
 * @module services/feedback
 */
import { Injectable, signal } from '@angular/core';

/**
 * FeedbackServiceService
 * @description Manages the display of temporary notification messages
 */
@Injectable({
  providedIn: 'root'
})
export class FeedbackServiceService {
  /** Private signal for message content */
  private _message = signal<string | null>(null);
  
  /** Private signal for visibility state */
  private _visible = signal(false);
  
  /** Public readonly signal for message content */
  readonly message = this._message;
  
  /** Public readonly signal for visibility state */
  readonly visible = this._visible;

  /**
   * Constructor for FeedbackServiceService
   */
  constructor() { }

  /**
   * Shows a feedback message for a specified duration
   * @param {string} message - The message to display
   * @param {number} duration - How long to show the message in milliseconds (default: 1500)
   */
  show(message: string, duration = 1500) {
    this._message.set(message);
    this._visible.set(true);

    setTimeout(() => {
      this._visible.set(false);
      setTimeout(() => this._message.set(null), 300); 
    }, duration);
  }
}