import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'

@Component({
  selector: 'app-administracion-facultad',
  templateUrl: './administracion-facultad.component.html',
  styleUrls: ['./administracion-facultad.component.css']
})
export class AdministracionFacultadComponent implements OnInit {

  facultades$: Object;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getFacultades().subscribe( data =>{
      this.facultades$ = data;
      console.log(this.facultades$);
    });
  }
}
