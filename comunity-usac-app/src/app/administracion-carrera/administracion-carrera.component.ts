import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-administracion-carrera',
  templateUrl: './administracion-carrera.component.html',
  styleUrls: ['./administracion-carrera.component.css']
})
export class AdministracionCarreraComponent implements OnInit {

  carreras$: any;
  facultades$: any[];
  constructor(private data: DataService) { }

  ngOnInit() {
    this.obtenerCarreras();
  }

  obtenerCarreras(){
    this.data.getCarreras().subscribe( data => {
      this.carreras$ = data;
      this.facultades$ = [];
      this.carreras$.map(c => {
        if(!this.facultades$.includes(c.facultad))
          this.facultades$.push(c.facultad);
      });
    });
  }

  eliminarCarrera(codigo){
    this.data.deleteCarrera(codigo).subscribe( data => {
      this.obtenerCarreras();
    });
  }
}
