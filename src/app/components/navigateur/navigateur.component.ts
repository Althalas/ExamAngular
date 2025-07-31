import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanierService } from '../../services/panier.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-navigateur',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigateur.component.html',
  styleUrl: './navigateur.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigateurComponent {
  public panierService = inject(PanierService);

  // Getter pour le nombre d'articles dans le panier
  get nombreArticles() {
    return this.panierService.nombreArticles();
  }
}
