import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProduitsService } from '../../services/produits.service';
import { PanierService } from '../../services/panier.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { inject } from '@angular/core';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProduitComponent implements OnInit {
  produits: any[] = [];
  isLoading = true;
  
  private produitsService = inject(ProduitsService);
  public panierService = inject(PanierService);

  ngOnInit() {
    this.produitsService.getAll().subscribe({
      next: (data) => {
        this.produits = data;
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
}
