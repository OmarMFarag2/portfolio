import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProjects } from '../models/iprojects';

@Injectable({
  providedIn: 'root',
})
export class ProjectsApi {

  constructor(private _http: HttpClient) { }
  api = "http://localhost:3000/api/projects"
  getProjects() {
    return this._http.get<IProjects[]>(this.api)
  }
  addProject(project: IProjects) {
    
    const data = this.createFormData(project)
    
    return this._http.post<IProjects>(this.api + '/addProject', data)

  }
  deleteProject(id: string) {
    return this._http.delete<IProjects>(this.api + '/deleteProject/' + id)

  }
  updateProject(id: string, project: IProjects) {
    
    const data = this.createFormData(project)
    

    return this._http.put<IProjects>(this.api + '/updateProject/' + id, data)

  }
  createFormData(project: IProjects) {
    const formData = new FormData();
    formData.append('name', project.name);
    formData.append('desc', project.desc);
    formData.append('link', project.link);

    formData.append('techs', JSON.stringify(project.techs));
    console.log(JSON.stringify(project.techs));
    
    if (project.imgURL instanceof File) {
      formData.append('img', project.imgURL, project.imgURL.name);
    } else {
      formData.append('img', project.imgURL);
    }
    return formData
  }
}
