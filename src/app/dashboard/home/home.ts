import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IHome } from '../../core/models/ihome';
import { HomeApi } from '../../core/services/home-api';
import { ValidateUploads } from '../../core/services/validate-uploads';
@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatFormFieldModule, MatChipsModule, FormsModule, MatIconModule, MatInputModule, MatSelectModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  home!: IHome | null;
  fileNames = {
    imgURL: '',
    cv: ''
  };
  constructor(private _home: HomeApi, private cdr: ChangeDetectorRef, private validate: ValidateUploads) { }

  ngOnInit(): void {
    this._home.getHome().subscribe(data => {
      this.home = data?.[0];
      console.log(data);
      
      this.cdr.detectChanges();
    });
  }

  createHome() {
    let data: IHome = { _id: "", title: '', desc: '', keyword: '', imgURL: '', cv: '' };
    this.home = data;
  }

  delete(id: string) {
    this.home = null
    this.fileNames = { imgURL: '', cv: '' }
    if (id) {
      this._home.deleteHome(id).subscribe();
    }
  }

  update(id: string, data: IHome) {

    this._home.updateHome(id, data).subscribe(res => {
      console.log('Update payload response:', res);
    });
  }

  submit(form: NgForm) {

    if (this.home!._id === '') {
      this._home.addHome(this.home!).subscribe(data => {
        this.home!._id = data._id;
        this.cdr.detectChanges();
        console.log('Home added:', data);
      });
    } else {
      this.update(this.home!._id!, this.home!);
    }
  }

  onFileSelected(event: Event, type: 'imgURL' | 'cv'): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    if (type === 'imgURL') {
      this.fileNames.imgURL = file.name;
      this.home!.imgURL = file;
    } else {
      this.fileNames.cv = file.name;
      this.home!.cv = file;
    }
  }
  validateUploads(form: NgForm) {
    return this.validate.validateUploads(form, this.home!.imgURL, this.fileNames.imgURL, this.fileNames.cv, this.home!.cv)
  }
}
