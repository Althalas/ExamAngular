import { RouterLink, Routes } from '@angular/router';
import { ProduitComponent } from './components/produit/produit.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { PanierComponent } from './components/panier/panier.component';
import { AccueilComponent } from './components/accueil/accueil.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'presentation', component: PresentationComponent },
  { path: 'produits', component: ProduitComponent },
  { path: 'panier', component: PanierComponent },
  { path: '**', redirectTo: '' }
];
