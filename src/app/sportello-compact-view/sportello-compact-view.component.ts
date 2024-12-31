import {Component, Input} from '@angular/core';
import {Sportello} from '../../models/Sportello';

@Component({
  selector: 'app-sportello-compact-view',
  imports: [],
  templateUrl: './sportello-compact-view.component.html',
  styleUrl: './sportello-compact-view.component.css'
})
export class SportelloCompactViewComponent {
    @Input() sportello!: Sportello;
}
