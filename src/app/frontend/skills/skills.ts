import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  constructor(private _skillSer:SkillsApi, private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
       this._skillSer.getSkills().subscribe(data=>{
        this.skillList = data
        this.cdr.detectChanges()
        console.log(data);
        
       })
  }
}
