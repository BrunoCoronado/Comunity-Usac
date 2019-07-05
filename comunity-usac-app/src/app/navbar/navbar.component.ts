import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarCollapsed = true;
  sesionActiva = false;

  constructor(private sessionStorage: SessionStorageService, private router: Router) { }

  ngOnInit() {
  }

  cerrarSesion(){
    this.sessionStorage.clear('usr');
    this.sesionActiva = false;
    this.router.navigate(['comunity-usac/autenticacion/login']);
  }
}
