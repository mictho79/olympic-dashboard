// Import des modules nécessaires Angular, Chart.js, ng2-charts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { olympic } from '../core/models/Olympic'; // Modèle du pays avec participations
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';

// Import des éléments nécessaires au Line Chart de Chart.js
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from 'chart.js';

// Enregistrement des composants nécessaires à Chart.js pour afficher un line chart
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

@Component({
  selector: 'app-linechart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './linechart.component.html',
  styleUrl: './linechart.component.scss'
})
export class LinechartComponent implements OnChanges {

  // Donnée d’entrée : un seul pays avec ses participation
  @Input() data?: olympic;

  // Données du graphique : au départ vide
  public lineChartData: ChartData<'line'> = {
    labels: [], // Les années 
    datasets: [
      {
        data: [], // Les médailles
        borderColor: 'black', 
      }
    ]
  };

  // Options pour personnaliser le graphique
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true, // Le graphique s’adapte à la taille de l’écran
    plugins: {
      legend: {
        display: false, // Pas de légende affichée 
      },
    }
  };

  // Labels pour les années 
  public paysLabels?: any;

  // Valeurs pour le nombre de médailles 
  public paysMedals?: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      // On extrait les années de participation du pays
      this.paysLabels = this.data.participations.map(p => p.year);

      // On extrait le nombre de médailles pour chaque année
      this.paysMedals = this.data.participations.map(p => p.medalsCount);

      // On affecte les données au graphique
      this.lineChartData.labels = this.paysLabels;
      this.lineChartData.datasets[0].data = this.paysMedals;
    }
  }
}