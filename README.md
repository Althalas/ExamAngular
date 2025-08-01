# ExamAngular - Application E-commerce de Ventilation et Climatisation

##  Description

ExamAngular est une application e-commerce moderne développée avec Angular 18. L'application propose une interface utilisateur intuitive avec gestion de panier, recherche de produits, et navigation fluide.

## Fonctionnalités

### Fonctionnalités Principales
- **Catalogue de Produits** : Affichage des produits avec images, descriptions et prix
- **Gestion du Panier** : Ajout, suppression et modification des quantités
- **Recherche de Produits** : Filtrage en temps réel par nom
- **Mode Sombre** : Basculement entre thème clair et sombre
- **Responsive Design** : Interface adaptée à tous les écrans
- **Persistance des Données** : Sauvegarde du panier dans le localStorage

### Fonctionnalités E-commerce
- **Promotions** : Affichage des réductions et calcul automatique des prix
- **Gestion des Quantités** : Modification des quantités dans le panier
- **Calcul Automatique** : Prix total et nombre d'articles mis à jour en temps réel

## Architecture du Projet

### Structure des Dossiers
```
src/app/
├── components/           # Composants Angular
│   ├── accueil/         # Page d'accueil
│   ├── footer/          # Pied de page
│   ├── loader/          # Composant de chargement
│   ├── navigateur/      # Barre de navigation
│   ├── panier/          # Gestion du panier
│   ├── presentation/    # Page de présentation
│   ├── produit/         # Affichage des produits
│   └── search/          # Composant de recherche
├── services/            # Services Angular
│   ├── panier.service.ts    # Gestion du panier
│   ├── produits.service.ts  # Gestion des produits
│   └── search.service.ts    # Service de recherche
├── app.component.ts     # Composant racine
├── app.routes.ts        # Configuration des routes
└── app.config.ts        # Configuration de l'application
```

## Technologies Utilisées

### Framework et Librairies
- **Angular 18.2.0** : Framework principal
- **TypeScript 5.5.2** : Langage de programmation
- **Bootstrap 5.3.7** : Framework CSS
- **RxJS 7.8.0** : Programmation réactive

### Fonctionnalités Angular Modernes
- **Composants Standalone** : Architecture moderne sans NgModules
- **Signals** : Gestion d'état réactive (préparé pour Angular 18+)
- **Control Flow** : Nouvelle syntaxe `@if`, `@for` (préparé)
- **Reactive Forms** : Gestion des formulaires
- **Router** : Navigation entre les pages

## Composants Principaux

### 1. ProduitComponent
**Fichier** : `src/app/components/produit/produit.component.ts`

**Fonctionnalités** :
- Filtrage par recherche
- Séparation des produits en promotion et normaux
- Intégration avec le panier

**Méthodes Clés** :
```typescript
get filteredProduits(): Produit[]     // Produits filtrés par recherche
get produitsEnPromotion(): Produit[]  // Produits avec réduction
get produitsNormaux(): Produit[]      // Produits sans réduction
ajouterAuPanier(produit: Produit)     // Ajout au panier
```

### 2. PanierComponent
**Fichier** : `src/app/components/panier/panier.component.ts`

**Fonctionnalités** :
- Affichage du contenu du panier
- Modification des quantités
- Suppression d'articles
- Calcul du prix total

**Méthodes Clés** :
```typescript
modifierQuantite(id: number, nouvelleQuantite: number)  // Modifier quantité
supprimerProduit(id: number)                           // Supprimer produit
viderPanier()                                          // Vider le panier
calculerPrixProduit(produit: any): number              // Calcul prix avec réduction
```

### 3. SearchComponent
**Fichier** : `src/app/components/search/search.component.ts`

**Fonctionnalités** :
- Recherche en temps réel
- Formulaire réactif
- Bouton de suppression de recherche
- Émission d'événements vers le parent

**Inputs/Outputs** :
```typescript
public placeholder = input<string>('Rechercher un produit...')
public showClearButton = input<boolean>(true)
public searchSubmitted = output<string>()
```

### 4. NavigateurComponent
**Fichier** : `src/app/components/navigateur/navigateur.component.ts`

**Fonctionnalités** :
- Navigation entre les pages
- Affichage du nombre d'articles dans le panier
- Basculement du mode sombre
- Menu responsive

## Services

### 1. ProduitsService
**Fichier** : `src/app/services/produits.service.ts`

**Responsabilités** :
- Gestion des données produits
- Simulation d'appel API avec délai
- Interface Produit avec typage strict

**Interface Produit** :
```typescript
export interface Produit {
  id: number;
  title: string;
  description: string;
  image: string;
  fullPrice: number;
  discountPercent: number;
  category: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}
```

### 2. PanierService
**Fichier** : `src/app/services/panier.service.ts`

**Responsabilités** :
- Gestion du panier d'achat
- Persistance dans localStorage
- Calculs automatiques (prix, quantités)
- Interface ProduitPanier étendue

**Méthodes Principales** :
```typescript
ajouterProduit(produit: Produit): void           // Ajouter au panier
supprimerProduit(id: number): void               // Supprimer du panier
modifierQuantite(id: number, nouvelleQuantite: number)  // Modifier quantité
getNombreArticles(): number                       // Nombre total d'articles
getPrixTotal(): number                           // Prix total du panier
```

## Interface Utilisateur

### Design System
- **Bootstrap 5** : Framework CSS pour la responsivité
- **Icônes Material Design** : Interface cohérente
- **Mode Sombre** : Thème alternatif disponible
- **Animations** : Transitions fluides

### Pages Disponibles
1. **Accueil** (`/`) : Page d'accueil avec présentation
2. **Présentation** (`/presentation`) : Informations sur l'entreprise
3. **Produits** (`/produits`) : Catalogue avec recherche
4. **Panier** (`/panier`) : Gestion du panier d'achat

## Fonctionnalités de Recherche

### Filtrage Intelligent
- Recherche par nom de produit
- Recherche par description
- Recherche par catégorie
- Filtrage en temps réel
- Affichage séparé des promotions

### Catégories Disponibles
- **Ventilateur** : Ventilateurs de plafond, tour, mural, etc.
- **Climatiseur** : Climatiseurs mobiles et fixes
- **Refroidisseur** : Refroidisseurs d'air évaporatifs

## Persistance des Données

### LocalStorage
- **Clé** : `'panier'`
- **Format** : JSON stringifié
- **Gestion d'erreurs** : Try-catch pour la robustesse
- **Synchronisation** : Mise à jour automatique

### Structure des Données
```typescript
interface ProduitPanier extends Produit {
  quantite: number;
}
```
