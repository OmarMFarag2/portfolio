import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { IHome } from '../../core/models/ihome';
import { HomeApi } from '../../core/services/home-api';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  home!:IHome
  constructor(private _home:HomeApi,private _cdr:ChangeDetectorRef){}
  ngOnInit(): void {
    this._home.getHome().subscribe(data=>{
      this.home=data[0]
      this._cdr.detectChanges()
    })
  }
}
