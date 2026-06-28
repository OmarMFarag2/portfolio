import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';

@Component({
  selector: 'app-frontend',
  imports: [RouterOutlet,Navbar],
  templateUrl: './frontend.html',
  styleUrl: './frontend.css',
})
export class Frontend {}
