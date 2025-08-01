import { Component, OnInit } from '@angular/core';
import { ProduitsService, Produit } from '../../services/produits.service';
import { PanierService } from '../../services/panier.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule, LoaderComponent, SearchComponent],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.scss'
})
export class ProduitComponent implements OnInit {
  produits: Produit[] = [];
  isLoading = true;
  currentSearchTerm = '';
  
  constructor(
    private produitsService: ProduitsService,
    public panierService: PanierService
  ) {}

  ngOnInit() {
    this.produitsService.getAll().subscribe({
      next: (data: Produit[]) => {
        this.produits = data;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des produits:', error);
        this.isLoading = false;
      }
    });
  }

  // Méthode pour filtrer les produits en fonction du terme de recherche
  get filteredProduits(): Produit[] {
    if (!this.currentSearchTerm.trim()) {
      return this.produits;
    }
    
    const searchTerm = this.currentSearchTerm.toLowerCase().trim();
    return this.produits.filter(produit => 
      produit.title.toLowerCase().includes(searchTerm) ||
      produit.description.toLowerCase().includes(searchTerm) ||
      produit.category?.toLowerCase().includes(searchTerm)
    );
  }

  // Méthode pour obtenir les produits en promotion
  get produitsEnPromotion(): Produit[] {
    return this.filteredProduits.filter(produit => produit.discountPercent > 0);
  }

  // Méthode pour obtenir les produits normaux (non en promotion)
  get produitsNormaux(): Produit[] {
    return this.filteredProduits.filter(produit => produit.discountPercent === 0);
  }

  // Méthode pour gérer la soumission de la recherche (seulement quand on clique sur le bouton)
  onSearchSubmitted(searchTerm: string): void {
    this.currentSearchTerm = searchTerm;
    console.log('Recherche soumise:', searchTerm);
  }

  ajouterAuPanier(produit: Produit): void {
    this.panierService.ajouterProduit(produit);
  }

  estDansPanier(id: number): boolean {
    return this.panierService.estDansPanier(id);
  }

  getQuantite(id: number): number {
    return this.panierService.getQuantite(id);
  }
}
