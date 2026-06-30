import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SkillsApi } from '../../core/services/skills-api';
import { ISkills } from '../../core/models/iskills';
import { Chips } from '../../shared/chips/chips';

@Component({
  selector: 'app-skills',
  imports: [MatButtonModule, MatFormFieldModule, MatChipsModule, FormsModule, MatIconModule, MatInputModule, MatSelectModule, Chips],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {
  skillList!: ISkills[]
  constructor(private _skills: SkillsApi, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this._skills.getSkills().subscribe(data => {
      this.skillList = data
      this.cdr.detectChanges()
      console.log(data);
    })
  }

  addInput() {
    let data: ISkills = { _id: "", name: '', desc: '', tags: [] }
    this.skillList.push(data)
  }
  delete(index: number, id?: string) {
    this.skillList = this.skillList.filter((e, i) => i !== index)
    if(id)
    this._skills.deleteSkill(id).subscribe()
  }
  update(index: number, id: string, data: ISkills) {
    this._skills.updateSkill(id, data).subscribe(data => {
      console.log(data);

    })
  }
  submit(form: NgForm, i: number) {
    const body = {
      ...form.value,
      tags: this.skillList[i].tags
    };
    if (this.skillList[i]._id === '')
      this._skills.addSkill(body).subscribe(data => {
        this.skillList[i] = data
        this.cdr.detectChanges()
      })
    else
      this.update(i, this.skillList[i]._id!, body)
  };
}
