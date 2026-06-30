import { Injectable } from '@angular/core';
import { ISkills } from '../models/iskills';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SkillsApi {

  constructor(private _http: HttpClient) { }
  api = "http://localhost:3000/api/skills"
  getSkills() {
    return this._http.get<ISkills[]>(this.api)
  }
  addSkill(skill: ISkills) {
    return this._http.post<ISkills>(this.api+'/addSkill/', skill)

  }
  deleteSkill(id: string) {
    return this._http.delete<ISkills>(this.api + '/deleteSkill/' + id)

  }
  updateSkill(id: string, data: ISkills) {
    return this._http.put<ISkills>(this.api + '/updateSkill/' + id, data)

  }
}
