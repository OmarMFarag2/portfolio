import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IProjects } from '../../core/models/iprojects';
import { Chips } from '../../shared/chips/chips';
import { ProjectsApi } from '../../core/services/projects-api';

@Component({
  selector: 'app-projects',
  imports: [MatButtonModule, MatFormFieldModule, MatChipsModule, FormsModule, MatIconModule, MatInputModule, MatSelectModule, Chips],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  projectList!: IProjects[];
  
  // We only keep this dictionary to display the plain-text name next to the button in the HTML template
  fileNames: { [key: number]: string } = {};

  constructor(private _project: ProjectsApi, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._project.getProjects().subscribe(data => {
      this.projectList = data;
      this.cdr.detectChanges();
      console.log(data);
    });
  }

  addInput() {
    let data: IProjects = { _id: "", name: '', desc: '', techs: [], imgURL: '', link: '' };
    this.projectList.push(data);
  }

  delete(index: number, id: string) {
    this.projectList = this.projectList.filter((_, i) => i !== index);
    delete this.fileNames[index];
    
    if (id) {
      this._project.deleteProject(id).subscribe();
    }
  }

  update(id: string, data: IProjects) {
    
    this._project.updateProject(id, data).subscribe(res => {
      console.log('Update payload response:', res);
    });
  }

  submit(form: NgForm, i: number) {
    
    
    const currentProject = this.projectList[i];
    console.log(currentProject,12222222);

    if (currentProject._id === '') {
      console.log(currentProject);
      
      this._project.addProject(currentProject).subscribe(data => {
        this.projectList[i]._id = data._id;
        this.cdr.detectChanges();
        console.log('Project added:', data);
      });
    } else {
      // Update existing project entry
      this.update(currentProject._id!, currentProject);
    }
  }

  onFileSelected(event: Event, index: number): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      console.log("here");
      
      // 1. Keep template string state up to date
      this.fileNames[index] = file.name;
      
      // 2. Put the native File instance directly onto the data model item slot 
      // Your service's createFormData() method reads this exact property.
      this.projectList[index].imgURL = file;
      console.log(this.fileNames[index]);
      
    }
  }
}