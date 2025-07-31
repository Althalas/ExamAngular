import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanierService } from '../../services/panier.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-navigateur',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigateur.component.html',
  styleUrl: './navigateur.component.scss'
})
export class NavigateurComponent {
  public panierService = inject(PanierService);
  
  // Propriété pour le mode sombre
  public isDarkMode = false;

  // Getter pour le nombre d'articles dans le panier
  get nombreArticles() {
    return this.panierService.nombreArticles();
  }

  // Méthode pour basculer le mode sombre
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    // Appliquer la classe au body pour le mode sombre
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
