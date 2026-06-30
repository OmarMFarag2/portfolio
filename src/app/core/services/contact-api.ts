import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icontact } from '../models/icontact';

@Injectable({
  providedIn: 'root',
})
export class ContactApi {
  constructor(private _http: HttpClient) { }
  api = "http://localhost:3000/api/contact"
  getContact() {
    return this._http.get<Icontact>(this.api)
  }
  addContact(contact: Icontact) {
    return this._http.post<Icontact>(this.api + '/addContact', contact)
  }
  updateContact(contact: Icontact,id:string) {
    return this._http.put<Icontact>(this.api + '/updateContact/'+id, contact)
  }
    deleteContact(id: string) {
    return this._http.delete<Icontact>(this.api + '/deleteContact/'+id)
  }
}
