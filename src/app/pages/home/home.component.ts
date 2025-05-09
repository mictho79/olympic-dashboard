// Import des modules nécessaires
import { Component, OnInit } from '@angular/core';
import { olympic } from 'src/app/core/models/Olympic'; // Modèle d’un pays avec ses participations
import { OlympicService } from 'src/app/core/services/olympic.service'; // Service pour accéder aux données


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  // Observable retournant tous les pays olympiques
  public olympics$ = this.olympicService.getOlympics();

  // Tableau local pour stocker les pays récupérés
  public olympic: olympic[] = [];

  // Variables d’affichage
  public nombreJO?: number;    // Nombre d’éditions (ex : 10)
  public nombrePays?: number;  // Nombre de pays dans le tableau (ex : 5)

  constructor(private olympicService: OlympicService) {}

  ngOnInit() {
    this.chargement(); // On charge les données
  }

  /**
   * Fonction qui s’abonne à l’observable, stocke les données,
   * et calcule les totaux à afficher sur la page d’accueil
   */
  chargement(): void {
    this.olympics$.subscribe(data => {
      this.olympic = [...data]; // Clonage du tableau 
      
      if (this.olympic.length > 0) {
        // On suppose que tous les pays ont participé au même nombre d’éditions
        // => on prend la longueur du tableau de participations du premier pays
        this.nombreJO = this.olympic[0].participations.length;

        // Nombre total de pays dans le tableau
        this.nombrePays = this.olympic.length;
      }
    });
  }
}