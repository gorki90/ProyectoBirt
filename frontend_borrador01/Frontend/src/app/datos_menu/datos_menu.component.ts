import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos_menu',
  templateUrl: './datos_menu.component.html',
  styleUrl: './datos_menu.component.css'
})
export class Datos_menuComponent implements OnInit {
  constructor(){
    console.log("Submenu generado!!!")
  }
  ngOnInit(): void {
    
  }

}

