import { Component, OnInit } from '@angular/core';
import { AccesoComunService } from '../acceso-comun.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  estadistica: any;

  constructor(private acceso: AccesoComunService) { }

  ngOnInit() {
    this.acceso.validarAcceso(0);
  }

  verEstadistica(){
    console.log(this.estadistica);
  }
}
