import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageApi } from '../../core/services/message-api';
import { IMessage } from '../../core/models/imessage';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages implements OnInit {
  messages!: IMessage[] | null
  constructor(private _msg:MessageApi, private _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._msg.getMessages().subscribe(data => {
      this.messages = data
      this._cdr.detectChanges()
      console.log(data)
    })

  }
  delete(index:number,id:string){
    if(this.messages)
     this.messages = this.messages?.filter((e,i)=>i!==index)
  }
 
}
