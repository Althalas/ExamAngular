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
  public placeholder = input<string>('Rechercher un produit...');
  public showClearButton = input<boolean>(true);
  
  // Output pour émettre des événements vers le composant parent
  public searchSubmitted = output<string>();

  public searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchInput: ['']
    });
  }

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe(values => {
       if (this.searchForm.valid) {
      const searchValue = values.searchInput
      if (searchValue && searchValue.trim()) {
        this.searchSubmitted.emit(searchValue.trim());
      }
    }
    } )
  }
  // Méthode pour soumettre la recherche
  onSubmitSearch(): void {
    if (this.searchForm.valid) {
      const searchValue = this.searchForm.get('searchInput')?.value;
      if (searchValue && searchValue.trim()) {
        this.searchSubmitted.emit(searchValue.trim());
      }
    }
  }

  // Méthode pour effacer la recherche
  clearSearch(): void {
    this.searchForm.patchValue({ searchInput: '' });
    this.searchSubmitted.emit('');
  }
}
