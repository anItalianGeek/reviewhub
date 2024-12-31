import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-access',
    imports: [
        NgIf
    ],
  templateUrl: './access.component.html',
  styleUrl: './access.component.css'
})
export class AccessComponent {
    showPasswordRecoveryForm: boolean = false;

    requestPasswordRecovery(email: string): void {

    }
}
