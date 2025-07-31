import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../services/panier.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanierComponent {
  public panierService = inject(PanierService);

  // Getter pour accéder au panier
  get panier() {
    return this.panierService.panier;
  }

  // Getter pour le nombre total d'articles
  get nombreArticles() {
    return this.panierService.nombreArticles();
  }

  // Getter pour le prix total
  get prixTotal() {
    return this.panierService.prixTotal();
  }

  // Méthodes pour gérer le panier
  modifierQuantite(id: number, nouvelleQuantite: number): void {
    this.panierService.modifierQuantite(id, nouvelleQuantite);
  }

  supprimerProduit(id: number): void {
    this.panierService.supprimerProduit(id);
  }

  viderPanier(): void {
    this.panierService.viderPanier();
  }

  // Calculer le prix d'un produit avec réduction
  calculerPrixProduit(produit: any): number {
    return produit.fullPrice * (1 - produit.discountPercent);
  }
}
