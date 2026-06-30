import { ChangeDetectorRef, Component } from '@angular/core';
import { IProjects } from '../../core/models/iprojects';
import { ProjectsApi } from '../../core/services/projects-api';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  colArray = [8, 4, 4, 4, 12]
  projectList!: IProjects[]
  constructor(private _project: ProjectsApi, private cdr: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this._project.getProjects().subscribe(data => {
      this.projectList = data
      this.cdr.detectChanges()
    })
  }
}
