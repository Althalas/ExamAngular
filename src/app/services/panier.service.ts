import { Injectable } from '@angular/core';
import { Produit } from './produits.service';

export interface ProduitPanier extends Produit {
  quantite: number;
}

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private readonly STORAGE_KEY = 'panier';
  
  // Propriété privée pour stocker le panier
  private _panier: ProduitPanier[] = this.chargerPanier();
  
  // Getter pour accéder au panier
  get panier(): ProduitPanier[] {
    return this._panier;
  }
  
  // Méthode pour obtenir le nombre total d'articles
  getNombreArticles(): number {
    return this._panier.reduce((total, item) => total + item.quantite, 0);
  }
  
  // Méthode pour obtenir le prix total
  getPrixTotal(): number {
    return this._panier.reduce((total, item) => {
      const prixReduit = item.fullPrice * (1 - item.discountPercent);
      return total + (prixReduit * item.quantite);
    }, 0);
  }

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
    const produitExistant = this._panier.find(item => item.id === produit.id);
    
    if (produitExistant) {
      // Si le produit existe déjà, augmenter la quantité
      this._panier = this._panier.map(item => 
        item.id === produit.id 
          ? { ...item, quantite: item.quantite + 1 }
          : item
      );
    } else {
      // Si le produit n'existe pas, l'ajouter avec une quantité de 1
      const nouveauProduit: ProduitPanier = {
        ...produit,
        quantite: 1
      };
      this._panier = [...this._panier, nouveauProduit];
    }
    
    this.sauvegarderPanier(this._panier);
  }

  // Supprimer un produit du panier
  supprimerProduit(id: number): void {
    this._panier = this._panier.filter(item => item.id !== id);
    this.sauvegarderPanier(this._panier);
  }

  // Modifier la quantité d'un produit
  modifierQuantite(id: number, nouvelleQuantite: number): void {
    if (nouvelleQuantite <= 0) {
      this.supprimerProduit(id);
      return;
    }
    
    this._panier = this._panier.map(item => 
      item.id === id 
        ? { ...item, quantite: nouvelleQuantite }
        : item
    );
    this.sauvegarderPanier(this._panier);
  }

  // Vider le panier
  viderPanier(): void {
    this._panier = [];
    this.sauvegarderPanier([]);
  }

  // Vérifier si un produit est dans le panier
  estDansPanier(id: number): boolean {
    return this._panier.some(item => item.id === id);
  }

  // Obtenir la quantité d'un produit dans le panier
  getQuantite(id: number): number {
    const produit = this._panier.find(item => item.id === id);
    return produit ? produit.quantite : 0;
  }
}
