import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { olympic } from '../core/models/Olympic';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-linechart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.scss'
})
export class LinechartComponent implements OnChanges {

  @Input() data?: olympic;

  public lineChartData: any[] = [];

  view: [number, number] = [600, 300];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.lineChartData = [
        {
          name: this.data.country,
          series: this.data.participations.map(p => ({
            name: p.year.toString(),
            value: p.medalsCount
          }))
        }
      ];
    }
  }
}