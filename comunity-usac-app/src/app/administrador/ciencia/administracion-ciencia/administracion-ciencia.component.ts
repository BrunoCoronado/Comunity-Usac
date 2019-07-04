import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../administracion.service';

@Component({
  selector: 'app-administracion-ciencia',
  templateUrl: './administracion-ciencia.component.html',
  styleUrls: ['./administracion-ciencia.component.css']
})
export class AdministracionCienciaComponent implements OnInit {

  ciencias$: any;

  constructor(private data: AdministracionService) { }

  ngOnInit() {
    this.obtenerCiencias();
  }

  obtenerCiencias(){
    this.data.getCiencias().subscribe( data => this.ciencias$ = data );
  }

  eliminarCiencia(codigo){
    this.data.deleteCiencia(codigo).subscribe( data => this.obtenerCiencias() );
  }
}
