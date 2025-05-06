import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { olympic } from '../core/models/Olympic';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-camembert',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './camembert.component.html',
  styleUrl: './camembert.component.scss'
})
export class CamembertComponent implements OnChanges {
  @Input() data?: olympic[];

  public chartData: { name: string, value: number }[] = [];

  view: [number, number] = [600, 400];
  legend: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Below;

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.update();
    }
  }

  private update(): void {
    this.chartData = this.data!.map(p => ({
      name: p.country,
      value: p.participations.reduce((sum, part) => sum + part.medalsCount, 0)
    }));
  }

  // Clic sur une part du camembert
  click(event: any): void {
    const country = event.name;
    if (country) {
      this.router.navigate(['/detail', country]);
    }
  }
}