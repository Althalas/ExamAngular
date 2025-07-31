import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitsService } from '../../services/produits.service';
import { PanierService } from '../../services/panier.service';
import { LoaderComponent } from '../loader/loader.component';
import { RouterModule } from '@angular/router';
import { inject } from '@angular/core';

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
  
  private produitsService = inject(ProduitsService);
  public panierService = inject(PanierService);

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

  ajouterAuPanier(produit: any): void {
    this.panierService.ajouterProduit(produit);
  }

  estDansPanier(id: number): boolean {
    return this.panierService.estDansPanier(id);
  }

  getQuantite(id: number): number {
    return this.panierService.getQuantite(id);
  }
  isDarkMode = false;
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }
}
