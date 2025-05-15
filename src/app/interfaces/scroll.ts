import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class ScrollService {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const tree = this.router.parseUrl(this.router.url);
          if (tree.fragment) {
            const el = document.getElementById(tree.fragment);
            if (el) {
              setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }));
            }
          }
        }
      });
  }
};