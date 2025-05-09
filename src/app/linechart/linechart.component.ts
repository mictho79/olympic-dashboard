import { Component, Input, OnChanges,OnInit, SimpleChanges } from '@angular/core';
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
export class LinechartComponent implements OnInit, OnChanges {
  @Input() data?: olympic;

  public lineChartData: any[] = [];
  public view: [number, number] = [600, 300];

  ngOnInit(): void {
    this.view = this.getSize();


    window.addEventListener('resize', () => {
      this.view = this.getSize();
    });
  }

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

  getSize(): [number, number] {
    const w = window.innerWidth;
    return w < 720 ? [320, 200] : [600, 300];
  }
}