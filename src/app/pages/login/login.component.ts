import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  remember = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel;

    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.remember = true;
    }
  }

  logIn(form:NgForm) {
    if(form.invalid){
      return;
    }

    Swal.fire({
      title:'Autenticando usuario',
      text:'Por favor espere',
      icon:'info',
      allowOutsideClick:false
    })
    Swal.showLoading()

    this.auth.logIn(this.usuario)
        .subscribe( resp =>{
          Swal.close()
          if(this.remember) {
            localStorage.setItem('email',this.usuario.email);
          }
          this.router.navigateByUrl('/home');
        }, (err)=> {
          Swal.fire({
            title:'Error de autenticacion',
            text: err.error.error.message,
            icon:'error'
          })
        })

  }

}
