import { Injectable, signal, computed } from '@angular/core';
import { Produit } from './produits.service';

export interface ProduitPanier extends Produit {
  quantite: number;
}

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private readonly STORAGE_KEY = 'panier';
  
  // Signal pour le panier
  private panierSignal = signal<ProduitPanier[]>(this.chargerPanier());
  
  // Signal computed pour le nombre total d'articles
  nombreArticles = computed(() => {
    return this.panierSignal().reduce((total, item) => total + item.quantite, 0);
  });
  
  // Signal computed pour le prix total
  prixTotal = computed(() => {
    return this.panierSignal().reduce((total, item) => {
      const prixReduit = item.fullPrice * (1 - item.discountPercent);
      return total + (prixReduit * item.quantite);
    }, 0);
  });
  
  // Getter pour accéder au panier
  get panier() {
    return this.panierSignal();
  }

  constructor() { }

  // Charger le panier depuis localStorage
  private chargerPanier(): ProduitPanier[] {
    try {
      const panierStocke = localStorage.getItem(this.STORAGE_KEY);
      return panierStocke ? JSON.parse(panierStocke) : [];
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error);
      return [];
    }
  }

  // Sauvegarder le panier dans localStorage
  private sauvegarderPanier(panier: ProduitPanier[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(panier));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier:', error);
    }
  }

  // Ajouter un produit au panier
  ajouterProduit(produit: Produit): void {
    const panierActuel = this.panierSignal();
    const produitExistant = panierActuel.find(item => item.id === produit.id);
    
    if (produitExistant) {
      // Si le produit existe déjà, augmenter la quantité
      const nouveauPanier = panierActuel.map(item => 
        item.id === produit.id 
          ? { ...item, quantite: item.quantite + 1 }
          : item
      );
      this.panierSignal.set(nouveauPanier);
    } else {
      // Si le produit n'existe pas, l'ajouter avec une quantité de 1
      const nouveauProduit: ProduitPanier = {
        ...produit,
        quantite: 1
      };
      this.panierSignal.set([...panierActuel, nouveauProduit]);
    }
    
    this.sauvegarderPanier(this.panierSignal());
  }

  // Supprimer un produit du panier
  supprimerProduit(id: number): void {
    const nouveauPanier = this.panierSignal().filter(item => item.id !== id);
    this.panierSignal.set(nouveauPanier);
    this.sauvegarderPanier(nouveauPanier);
  }

  // Modifier la quantité d'un produit
  modifierQuantite(id: number, nouvelleQuantite: number): void {
    if (nouvelleQuantite <= 0) {
      this.supprimerProduit(id);
      return;
    }
    
    const nouveauPanier = this.panierSignal().map(item => 
      item.id === id 
        ? { ...item, quantite: nouvelleQuantite }
        : item
    );
    this.panierSignal.set(nouveauPanier);
    this.sauvegarderPanier(nouveauPanier);
  }

  // Vider le panier
  viderPanier(): void {
    this.panierSignal.set([]);
    this.sauvegarderPanier([]);
  }

  // Vérifier si un produit est dans le panier
  estDansPanier(id: number): boolean {
    return this.panierSignal().some(item => item.id === id);
  }

  // Obtenir la quantité d'un produit dans le panier
  getQuantite(id: number): number {
    const produit = this.panierSignal().find(item => item.id === id);
    return produit ? produit.quantite : 0;
  }
}
