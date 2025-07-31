import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavigateurComponent } from './components/navigateur/navigateur.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigateurComponent, RouterModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ExamAngular';
}
