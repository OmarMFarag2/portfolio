import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidateUploads {

  validateUploads(form: NgForm, imgURL: string | File, fileURL: string, fileCV?: string, CV?: string | File | undefined) {
    const test = (form.invalid || (imgURL === '' && fileURL == ''))
    if (CV !== undefined) {
      return (test || (fileCV === '') && CV === '')
    }
    return test
  }
}
