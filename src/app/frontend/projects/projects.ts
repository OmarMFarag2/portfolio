import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  colArray = [8, 4, 4, 4, 12]
  calcCols(i: number) {
    return this.colArray[i%5]
  }
}
