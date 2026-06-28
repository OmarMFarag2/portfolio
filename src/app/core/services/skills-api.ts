import { Injectable } from '@angular/core';
import { ISkills } from '../models/iskills';

@Injectable({
  providedIn: 'root',
})
export class SkillsApi {
  skills: ISkills[] = [{
    name: 'Frontend Engineering', desc: "Building responsive, accessible, and performant web applications with modern frameworks.", tags: ["asd","asdsad"] },{
    name: 'Frontend Engineering', desc: "Building responsive, accessible, and performant web applications with modern frameworks.", tags: ["asd","asdsad"] }]
  getSkills(){
    return this.skills
  }
  addSkill(skill: ISkills[]){

  }
}
