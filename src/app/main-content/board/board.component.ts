import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bord',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BordComponent {
  constructor(
      public contactService: ContactService,
      //private overlayService: ContactOverlayService
    ) {}
}
