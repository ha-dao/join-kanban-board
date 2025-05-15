import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
/**
 * @component
 * The PrivacyPolicyComponent displays the privacy policy information for the application.
 */
@Component({
  selector: 'app-privacy-policy',
  standalone: true,

imports: [CommonModule,RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

}
