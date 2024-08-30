import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-box.component.html',
  styleUrl: './color-box.component.css',
})
export class ColorBoxComponent {
  @Input() inputData: any;
}
