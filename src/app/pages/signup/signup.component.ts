import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  usuario: UsuarioModel;
  remember = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel;
  }

  onSubmit(form:NgForm){
    if(form.invalid){
      return;
    }

    Swal.fire({
      title:'Creando cuenta',
      text:'Espere un momento',
      icon:'info',
      allowOutsideClick:false
    })
    Swal.showLoading()

    this.auth.nuevoUsuario(this.usuario)
        .subscribe(resp =>{
          Swal.close();
          if(this.remember){
            localStorage.setItem('email',this.usuario.email);
          }
          this.router.navigateByUrl('/home')
        },(err)=>{
          Swal.fire({
            title: 'Error',
            text: err.error.error.message,
            icon:'error',
            allowOutsideClick: false
          });
        });

    
  }

}
