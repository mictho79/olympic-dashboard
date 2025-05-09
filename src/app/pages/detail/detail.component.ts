// Import des modules Angular et de tes propres composants/services
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Pour lire les paramètres de l’URL
import { olympic } from 'src/app/core/models/Olympic'; // Modèle de données olympiques
import { OlympicService } from 'src/app/core/services/olympic.service'; // Service de récupération des données
import { Router } from '@angular/router';
import { LinechartComponent } from 'src/app/linechart/linechart.component'; // Import du composant graphique
import { StatComponent } from 'src/app/stat/stat.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [LinechartComponent,StatComponent], // Import du linechart dans ce composant standalone
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  // Observable retournant tous les pays olympiques
  public olympics$ = this.olympicService.getOlympics();

  // Tableau de tous les pays (sera rempli à partir de olympics$)
  public olympic: olympic[] = [];

  // Données du pays sélectionné (trouvé à partir de l’URL)
  public detailOlympic?: olympic;

  // Variables pour affichage dans la vue
  public numberEntries?: number; // nombre d’éditions (participations)
  public numberMedals?: number;  // total des médailles
  public numberAthlete?: number; // total des athlètes
  public nomPays?: string;       // nom du pays

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private olympicService: OlympicService
  ) {}

  ngOnInit() {
    this.chargement(); // Initialisation des données au chargement du composant
  }

  /**
   * Méthode qui :
   * - récupère le nom du pays dans l’URL
   * - charge les données de tous les pays
   * - filtre pour trouver le pays correspondant
   * - extrait les infos nécessaires
   */
  chargement(): void {
    const pays = this.route.snapshot.paramMap.get('pays'); // ex : 'France'
    
    // On s’abonne à l’observable qui contient toutes les données olympiques
    this.olympics$.subscribe(data => {
      this.olympic = [...data]; // Clonage du tableau pour déclencher les bindings

      // On cherche le pays correspondant au nom passé dans l’URL
      this.detailOlympic = this.olympic.find(
        o => o.country === pays
      );

      // On extrait les infos du pays
      this.nomPays = this.detailOlympic?.country;

      this.numberEntries = this.detailOlympic?.participations.length;

      // Total des médailles toutes années confondues
      this.numberMedals = this.detailOlympic?.participations.reduce(
        (total, part) => total + part.medalsCount, 0
      );

      // Total des athlètes envoyés sur toutes les années
      this.numberAthlete = this.detailOlympic?.participations.reduce(
        (total, part) => total + part.athleteCount, 0
      );
    });
  }

  /**
   * Méthode appelée pour revenir à la page d’accueil
   */
  click(event: any): void {
    this.router.navigate(['/']);
  }
}