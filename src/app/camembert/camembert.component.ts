import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { olympic } from '../core/models/Olympic';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-camembert',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './camembert.component.html',
  styleUrl: './camembert.component.scss'
})
export class CamembertComponent implements OnChanges,OnInit {
  @Input() data?: olympic[];

  public chartData: { name: string, value: number }[] = [];

  view: [number, number] = [0,0];

  constructor(private router: Router) {}


   ngOnInit(): void {
    this.view = this.getSize();


    window.addEventListener('resize', () => {
      this.view = this.getSize();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.update();
    }
  }
  // Formate les données reçues en entrée pour le camembert
  private update(): void {
    this.chartData = this.data!.map(p => ({
      name: p.country,// Le nom du pays sera affiché dans le camembert
      value: p.participations.reduce((sum, part) => sum + part.medalsCount, 0)// Total des médailles par pays
    }));
  }

   // Gère le clic sur une part du camembert : redirige vers la page de détail du pays
  click(event: any): void {
    const country = event.name;
    if (country) {
      this.router.navigate(['/detail', country]);// Redirection avec le nom du pays comme paramètre
    }
  }

  getSize(): [number, number] {
    const w = window.innerWidth;
    return w < 720 ? [380, 280] : [800, 400];
  }
}