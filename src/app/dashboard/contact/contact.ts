import { ChangeDetectorRef, Component } from '@angular/core';
import { Icontact } from '../../core/models/icontact';
import { ContactApi } from '../../core/services/contact-api';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatChipsModule, MatIconModule, MatInputModule, MatSelectModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
   contact!: Icontact | null;
  constructor(private _contact: ContactApi, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._contact.getContact().subscribe(data => {
      this.contact = data;
      console.log(data);
      
      this.cdr.detectChanges();
    });
  }

  createContact() {
    let data: Icontact = { _id: "", email: '',location:''};
    this.contact = data;
  }

  delete(id: string) {
    this.contact = null
    if (id) {
      this._contact.deleteContact(id).subscribe();
    }
  }

  update(id: string, data: Icontact) {

    this._contact.updateContact(data,id).subscribe(res => {
      console.log('Update payload response:', res);
    });
  }

  submit(form: NgForm) {
    if (this.contact!._id === '') {
      this._contact.addContact(this.contact!).subscribe(data => {
        this.contact!._id = data._id;
        this.cdr.detectChanges();
        console.log('Contact added:', data);
      });
    } else {
      this.update(this.contact!._id!, this.contact!);
    }
  }
}
