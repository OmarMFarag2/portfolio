import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessage } from '../models/imessage';

@Injectable({
  providedIn: 'root',
})
export class MessageApi {
    constructor(private _http: HttpClient) { }
    api = "http://localhost:3000/api/messages"
    getMessages() {
      return this._http.get<IMessage[]>(this.api)
    }
    addMessage(message: IMessage) {
      return this._http.post<IMessage>(this.api+'/addMessage', message)
  
    }
    deleteMessage(id: string) {
      return this._http.delete<IMessage>(this.api + '/deleteMessage/' + id)
  
    }

}
