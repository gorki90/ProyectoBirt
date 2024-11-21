import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
/*
export class AppComponent {
  title = 'zuhaitzguneappFrontend00';
}
*/
export class AppComponent implements OnInit{
  title = 'zuhaitzguneappFrontend00';
nombre: any|string;


  constructor(){
    console.log("Componente principal generado!!!")
  }
  ngOnInit(): void {
    
  }
}