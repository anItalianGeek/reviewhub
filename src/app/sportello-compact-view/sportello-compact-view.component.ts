import {Component, Input} from '@angular/core';
import {Sportello} from '../../models/Sportello';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-sportello-compact-view',
    imports: [
        NgForOf,
        DatePipe
    ],
  templateUrl: './sportello-compact-view.component.html',
  styleUrl: './sportello-compact-view.component.css'
})
export class SportelloCompactViewComponent {
    @Input() sportello!: Sportello;
}
