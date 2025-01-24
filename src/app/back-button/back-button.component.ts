import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-back-button',
  imports: [],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css'
})
export class BackButtonComponent {

    @Input() noRedirectHome?: boolean;

    constructor(private router: Router) {
    }

    route() {
        if (this.noRedirectHome)
            window.history.back();
        else
            this.router.navigateByUrl('/home');
    }

}
