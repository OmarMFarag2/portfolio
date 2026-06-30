import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHome } from '../models/ihome';

@Injectable({
  providedIn: 'root',
})
export class HomeApi {
  constructor(private _http: HttpClient) { }
  api = "http://localhost:3000/api/home"
  getHome() {
    return this._http.get<IHome[]>(this.api)
  }
  addHome(home: IHome) {
    const data= this.createFormData(home)
    return this._http.post<IHome>(this.api + '/addHome/', data)

  }
  deleteHome(id: string) {
    return this._http.delete<IHome>(this.api + '/deleteHome/' + id)

  }
  updateHome(id: string, home: IHome) {
    const data= this.createFormData(home)

    return this._http.put<IHome>(this.api + '/updateHome/' + id, data)

  }
  createFormData(home: IHome) {
    const formData = new FormData();
    formData.append('title', home.title);
    formData.append('desc', home.desc);
    formData.append('keyword', home.keyword);
    if (home.imgURL instanceof File) {
      formData.append('img', home.imgURL, home.imgURL.name);
    } else {
      formData.append('img', home.imgURL);
    }
    if (home.cv instanceof File) {
      formData.append('cv', home.cv, home.cv.name);
    } else {
      formData.append('cv', home.cv);
    }
    return formData
  }
}
