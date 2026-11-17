import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadBar } from './compenents/head-bar/head-bar';
import { SearchBar } from './compenents/search-bar/search-bar';

@Component({
  imports: [RouterOutlet, HeadBar, SearchBar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('movie-app');
}
