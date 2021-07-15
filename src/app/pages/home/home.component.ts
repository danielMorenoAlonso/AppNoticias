import { Component, OnInit } from '@angular/core';
import { ApinewsService } from '../../services/news/apinews.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noticiasArray :any[] = [];
  paises : any[] = [
    {
      nombre: 'México',
      code: 'mx'
    },
    {
      nombre: 'Estados Unidos',
      code: 'us'
    },
    {
      nombre: 'Gran Bretaña',
      code: 'gb'
    },
    {
      nombre: 'Brasil',
      code: 'br'
    },
    {
      nombre: 'Canada',
      code: 'ca'
    }
  ];

  categorias : any[] = [
    'General','Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'
  ];

  code: string;
  category:string

  constructor(private noticias: ApinewsService,
              private auth: AuthService,
              private router: Router) {
   }

  ngOnInit(): void {
    this.alertaNoticias();
    Swal.showLoading();

    this.topNoticias();
  }

  buscar(){
    this.alertaNoticias();
    Swal.showLoading();

    if(this.code === undefined && this.category === undefined){
      this.alerta('Seleccione al menos el país');
    }else if(this.code !== undefined && this.category === undefined){
      this.topNoticiasPais(this.code);
    }else if(this.code === undefined && this.category !== undefined){
      this.alerta('Seleccione al menos el país');
    }else{
      this.topNoticiasFilter(this.code, this.category);
    }

  
  }

  onClick(event): string{
    const countryCode = String(event.target.value);
    return this.code = countryCode;
  };

  funcCategoria(event){
    const category = String(event.target.value).toLowerCase();
    return this.category = category;
  };

  topNoticias(){
    this.noticias.topHeading().subscribe((resp:any) => {
      
      this.noticiasArray = resp.articles;
       
      this.noticiasArray.forEach(element => {
        const date = new Date(element.publishedAt).toDateString();
        element.datePublished = date;

        if (element.author === null){
          element.author = 'Anónimo'
        }
        return element;
      })

      Swal.close();
    });

  }

  topNoticiasPais(code:string){
    this.noticias.topHeadingCountry(code).subscribe((resp:any)=>{
      this.noticiasArray = resp.articles;
       
      this.noticiasArray.forEach(element => {
        const date = new Date(element.publishedAt).toDateString();
        element.datePublished = date;

        if (element.author === null){
          element.author = 'Anónimo'
        }
        return element;
      })

      Swal.close();
    });
  }

  topNoticiasFilter(code:string , category: string){
    this.noticias.topHeadingFilter(code,category).subscribe((resp:any)=>{
      Swal.close();

      this.noticiasArray = resp.articles;

      this.noticiasArray.forEach(element => {
        const date = new Date(element.publishedAt).toDateString();
        element.datePublished = date;

        if (element.author === null){
          element.author = 'Anónimo';
        }
        return element;
      })
    });
  }

  salir(){
    this.auth.logOut();
    this.router.navigateByUrl('/login')
  }

  alerta(err :string){
    return Swal.fire({
              title: 'Error',
              text: err,
              icon: 'warning'
          });
  }

  alertaNoticias(){
    return Swal.fire({
      title:'Cargando',
      text:'Obteniendo noticias',
      icon:'info',
      allowOutsideClick:false
    });
  }

}
