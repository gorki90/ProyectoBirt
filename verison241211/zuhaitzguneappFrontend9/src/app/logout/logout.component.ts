import { Component, OnInit } from '@angular/core';
import { WfsService } from '../servicio/wfs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {

  constructor(private _http:WfsService, private router: Router){}

  ngOnInit(): void {
    
  }

logOut():void{
  this._http.logout();
  this.router.navigate(['/']);
}

}
