// Importation des modules nécessaires d'Angular, ng2-charts, chart.js, routing
import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';
import { olympic } from '../core/models/Olympic'; 
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { Router } from '@angular/router';

// Si on n'appelle pas Chart.register(...) alors le camembert ne se dessine pas !
// Cette ligne est obligatoire pour que Chart.js "active" les éléments nécessaires au pie chart
Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-camembert',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './camembert.component.html',
  styleUrl: './camembert.component.scss'
})
export class CamembertComponent implements OnChanges {
  
  constructor(private router: Router) {}

  //  Réception des données depuis le composant parent (homeComponent)
  @Input() data?: olympic[];

  // Ces deux tableaux vont contenir :
  // Ex : nomPays = ['France', 'USA', 'Japan']
  // Ex : totalMedaille = [45, 92, 30]
  public nomPays!: string[];
  public totalMedaille!: number[];

  // Définition du type de graphique
  public pieChartType: ChartType = 'pie';

  // Données initiales du graphique (vides au départ)
  public pieChartData: ChartData<'pie'> = {
    labels: [],       // Noms des pays
    datasets: [
      {
        data: [],      // Totaux de médailles
      }
    ]
  };

  //  Options d'affichage du pie chart
  public pieChartOptions = {
    responsive: true, // Le graphique s’adapte à la taille de l’écran
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const, // Position de la légende
        labels: {
          boxWidth: 20 // Taille de l’icône dans la légende
        }
      },
      tooltip: {
        displayColors: false, // On enlève le petit carré de couleur
        backgroundColor: '#23736b', // Couleur de fond des bulles info
        callbacks: {
          // Fonction exécutée quand on survole une portion du graphique
          title: (part: any[]) => part[0].label, // Affiche le nom du pays
          label: (part: any) => '🏅' + part.parsed, // Affiche le nombre de médailles
        }
      }
    }
  };

  // Méthode appelée automatiquement à chaque changement d'@Input() 'data'
  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.update(); // On actualise les données du graphique dès qu'elles arrivent
    }
  }

  // Méthode qui transforme les données brutes en données utilisables par le graphique
  private update(): void {
    // On extrait le nom de chaque pays dans un tableau
    this.nomPays = this.data!.map(p => p.country);

    // On calcule le total des médailles pour chaque pays
    this.totalMedaille = this.data!.map(p =>
      p.participations.reduce((total, part) => total + part.medalsCount, 0)
    );

    // On met à jour les données du graphique avec les tableaux créés ci-dessus
    this.pieChartData = {
      labels: this.nomPays,
      datasets: [
        {
          data: this.totalMedaille,
          backgroundColor: ['#885c5a','#c5d0ea','#8da3db','#69343c','#a28fb1'],
          borderWidth: 0 // Pas de bordure autour des parts du camembert
        }
      ]
    };
  }

  //  Méthode appelée quand l'utilisateur clique sur une part du graphique
  click(event: any): void {
    const chartElement = event.active[0]; // on récupère l’élément cliqué
    const index = chartElement.index; // ex : si on clique sur la 2e part, index = 1
    const pays = this.nomPays[index]; // on récupère le pays correspondant
    console.log(pays)
    // Redirection vers la page /detail/<pays>
    this.router.navigate(['/detail', pays]);
  }
}