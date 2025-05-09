import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.scss'
})
//stat récup les données dans le html
export class StatComponent {
  @Input() label?: string;
  @Input() value?: number;
}