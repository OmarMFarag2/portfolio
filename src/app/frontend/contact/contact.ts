import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { Icontact } from '../../core/models/icontact';
import { ContactApi } from '../../core/services/contact-api';
import { MessageApi } from '../../core/services/message-api';
import { IMessage } from '../../core/models/imessage';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  contact!: Icontact | null
  constructor(private _msg:MessageApi,private _contact: ContactApi, private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._contact.getContact().subscribe(data => {
      this.contact = data
      this._cdr.detectChanges()
      console.log(data);
      
    })

  }
  onsubmit(form: NgForm) {
      this._msg.addMessage(form.value).subscribe(data=>{
        console.log(data);
      
    })
    
  }
}
