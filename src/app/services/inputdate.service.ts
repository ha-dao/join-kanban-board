import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputdateService {

  constructor() { }

  getTodayISOString(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatDateISO(day: number, month: number, year: number): string {
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  formatDateDisplay(day: number, month: number, year: number): string {
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  }

  getTodayAtMidnight(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  isFutureDate(date: Date): boolean {
    const today = this.getTodayAtMidnight();
    return date >= today;
  }

  isValidDate(date: Date): boolean {
    return !isNaN(date.getTime());
  }

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

  addSlashes(value: string): string {
    if (value.length === 2 && !value.includes('/')) {
      value += '/';
    } else if (value.length === 5 && value.charAt(2) === '/' && !value.includes('/', 3)) {
      value += '/';
    }
    return value;
  }

  limitLength(value: string): string {
    return value.length > 10 ? value.slice(0, 10) : value;
  }

  sanitizeInput(value: string): string {
    return value.replace(/[^\d\/]/g, '');
  }

  isInputAllowed(key: string): boolean {
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
    ];

    return /\d/.test(key) || key === '/' || allowedKeys.includes(key);
  }

  shouldBlockInput(inputLength: number, key: string): boolean {
    const allowedKeys = [
      'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
    ];

    return inputLength >= 10 &&
           !allowedKeys.includes(key) &&
           !['Backspace', 'Delete'].includes(key);
  }

  parseISOToParts(isoDate: string): { day: number, month: number, year: number } {
    const date = new Date(isoDate);
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
  }
}
