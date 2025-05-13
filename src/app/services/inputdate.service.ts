/**
 * Date input handling service
 * @fileoverview Provides utility functions for date manipulation and validation
 * @module services/inputdate
 */
import { Injectable } from '@angular/core';

/**
 * InputdateService
 * @description Service for handling date input operations, formatting, and validation
 */
@Injectable({
  providedIn: 'root'
})
export class InputdateService {
  /**
   * Constructor for InputdateService
   */
  constructor() { }

  /**
   * Gets today's date in ISO format (YYYY-MM-DD)
   * @returns {string} Today's date in ISO format
   */
  getTodayISOString(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Formats date components into ISO format
   * @param {number} day - Day of month
   * @param {number} month - Month (1-12)
   * @param {number} year - Full year
   * @returns {string} Date in ISO format (YYYY-MM-DD)
   */
  formatDateISO(day: number, month: number, year: number): string {
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  /**
   * Formats date components into display format
   * @param {number} day - Day of month
   * @param {number} month - Month (1-12)
   * @param {number} year - Full year
   * @returns {string} Date in display format (DD/MM/YYYY)
   */
  formatDateDisplay(day: number, month: number, year: number): string {
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  }

  /**
   * Gets today's date at midnight
   * @returns {Date} Today's date with time set to 00:00:00
   */
  getTodayAtMidnight(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  /**
   * Checks if a date is in the future
   * @param {Date} date - Date to check
   * @returns {boolean} True if date is today or in the future
   */
  isFutureDate(date: Date): boolean {
    const today = this.getTodayAtMidnight();
    return date >= today;
  }

  /**
   * Validates if a date object is valid
   * @param {Date} date - Date to validate
   * @returns {boolean} True if date is valid
   */
  isValidDate(date: Date): boolean {
    return !isNaN(date.getTime());
  }

  /**
   * Parses a date string in display format (DD/MM/YYYY)
   * @param {string} dateString - Date string to parse
   * @returns {Object|null} Object with day, month, year properties or null if invalid
   */
  parseDateFromDisplay(dateString: string): { day: number, month: number, year: number } | null {
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= new Date().getFullYear()) {
      return { day, month, year };
    }
    return null;
  }

  /**
   * Automatically adds slashes to date input
   * @param {string} value - Current input value
   * @returns {string} Input with slashes added at appropriate positions
   */
  addSlashes(value: string): string {
    if (value.length === 2 && !value.includes('/')) {
      value += '/';
    } else if (value.length === 5 && value.charAt(2) === '/' && !value.includes('/', 3)) {
      value += '/';
    }
    return value;
  }

  /**
   * Limits input to maximum length
   * @param {string} value - Input value
   * @returns {string} Truncated value if necessary
   */
  limitLength(value: string): string {
    return value.length > 10 ? value.slice(0, 10) : value;
  }

  /**
   * Removes non-numeric and non-slash characters
   * @param {string} value - Input value to sanitize
   * @returns {string} Sanitized input
   */
  sanitizeInput(value: string): string {
    return value.replace(/[^\d\/]/g, '');
  }

  /**
   * Checks if a keypress should be allowed
   * @param {string} key - Key pressed
   * @returns {boolean} True if key should be allowed
   */
  isInputAllowed(key: string): boolean {
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
    ];

    return /\d/.test(key) || key === '/' || allowedKeys.includes(key);
  }

  /**
   * Determines if input should be blocked
   * @param {number} inputLength - Current input length
   * @param {string} key - Key pressed
   * @returns {boolean} True if input should be blocked
   */
  shouldBlockInput(inputLength: number, key: string): boolean {
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
    ];

    return inputLength >= 10 &&
           !allowedKeys.includes(key) &&
           !['Backspace', 'Delete'].includes(key);
  }

  /**
   * Parses an ISO date string into component parts
   * @param {string} isoDate - Date in ISO format (YYYY-MM-DD)
   * @returns {Object} Object with day, month, year properties
   */
  parseISOToParts(isoDate: string): { day: number, month: number, year: number } {
    const date = new Date(isoDate);
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
  }
}