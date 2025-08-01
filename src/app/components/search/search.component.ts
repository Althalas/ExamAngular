import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  // Input pour recevoir des données du composant parent
  public placeholder = input<string>('Rechercher un produit...'); // placeholder du formulaire
  public showClearButton = input<boolean>(true); // bouton de nettoyage
  
  // Output pour émettre des événements vers le composant parent
  public searchSubmitted = output<string>(); // événement de recherche soumise

  public searchForm: FormGroup; // formulaire de recherche

  constructor(private fb: FormBuilder) { // constructeur du composant
    this.searchForm = this.fb.group({
      searchInput: ['']
    });
  }

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe(values => { // écoute les changements du formulaire
       if (this.searchForm.valid) { // si le formulaire est valide
      const searchValue = values.searchInput
      if (searchValue && searchValue.trim()) {
        this.searchSubmitted.emit(searchValue.trim()); // soumet la recherche
      }
    }
    } )
  }
  // Méthode pour soumettre la recherche
  onSubmitSearch(): void {
    if (this.searchForm.valid) {
      const searchValue = this.searchForm.get('searchInput')?.value;
      if (searchValue && searchValue.trim()) {
        this.searchSubmitted.emit(searchValue.trim()); // soumet la recherche
      }
    }
  }

  // Méthode pour effacer la recherche
  clearSearch(): void {
    this.searchForm.patchValue({ searchInput: '' });
    this.searchSubmitted.emit(''); // efface la recherche
  }
}
