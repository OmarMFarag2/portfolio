import { Component, OnInit } from '@angular/core';
import { ISkills } from '../../core/models/iskills';
import { SkillsApi } from '../../core/services/skills-api';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit{
  skillList!:ISkills[]
  constructor(private _skillSer:SkillsApi){}
  ngOnInit(): void {
    this.skillList=this._skillSer.getSkills()    
  }
}
