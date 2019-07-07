import { Component, OnInit } from '@angular/core';
import { ComunService } from '../../comun.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  temas: any;

  constructor(private data: ComunService, private router: Router) { }

  ngOnInit() {
    this.data.getTemas().subscribe( data => this.temas = data )
  }
}
