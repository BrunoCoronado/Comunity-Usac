import { Component, OnInit } from '@angular/core';
import { AccesoAdministradorService } from '../acceso-administrador.service';

@Component({
  selector: 'app-panel-administracion',
  templateUrl: './panel-administracion.component.html',
  styleUrls: ['./panel-administracion.component.css']
})
export class PanelAdministracionComponent implements OnInit {

  constructor(private acceso: AccesoAdministradorService) { }

  ngOnInit() {
    this.acceso.validarAcceso();
  }
}
