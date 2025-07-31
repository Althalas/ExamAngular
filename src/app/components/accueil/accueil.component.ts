import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitsService } from '../../services/produits.service';
import { LoaderComponent } from '../loader/loader.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, LoaderComponent, RouterModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent implements OnInit {
  produitsPromo: any[] = [];
  isLoading = true;
  constructor(private produitsService: ProduitsService) {}

  ngOnInit() {
    this.produitsService.getAll().subscribe({
      next: (data) => {
        // Filtrer les produits avec une promotion différente de 0
        this.produitsPromo = data.filter(produit => produit.discountPercent > 0);
        this.isLoading = false;
        },
      error: (error) => {
        console.error('Erreur lors du chargement des produits:', error);
        this.isLoading = false;
      }
    });
  }
}
