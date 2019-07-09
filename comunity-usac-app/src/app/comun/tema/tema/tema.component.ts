import { Component, OnInit } from '@angular/core';
import { ComunService } from '../../comun.service';
import { Router } from '@angular/router';
import { AccesoComunService } from '../../acceso-comun.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  temas: any;

  constructor(private data: ComunService, private router: Router, private acceso: AccesoComunService) { }

  ngOnInit() {
    this.acceso.validarAcceso(0);
    this.data.getTemas().subscribe( data => this.temas = data )
  }
}
