// @ts-ignore

import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AxiosService} from "../../../services/axios.service";
import axios from "axios";
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  title: any;
  routeLogin: any;
  criptrouteLogin: string = "";


  constructor(private route: ActivatedRoute, private axios: AxiosService,private toastr: ToastrService) {

    this.title = this.route.snapshot.paramMap.get('aplication')
    this.routeLogin = this.route.snapshot.paramMap.get('dominio');
    if (this.title == null || this.title == undefined || this.title == "") {
      window.location.href = "/not-found/Pagina Não existe";
    }
    if (typeof this.routeLogin === "string") {
      this.criptrouteLogin = this.routeLogin;
      this.routeLogin = atob(this.routeLogin);
    }


    console.log(this.routeLogin);

    if (this.title == null || this.title == undefined || this.title == "") {
      window.location.href = "/not-found/Pagina Não existe";
    }
  }
  showSuccessMessage(){
    this.toastr.success('Cadastro realizado com sucesso. Agora realize o login');
  }
  createUsuario() {
    let email = (document.getElementById("email") as HTMLInputElement).value;



    if (email != "" && email != null && email != undefined) {
      this.axios.post(this.routeLogin + '/api/v2/unique', {email: email}, {
        "Content-Type": "application/json; charset=UTF-8"
      }).then((response) => {
        let validation = true;

        //valida se o email é unico
        if (response.data.success == true) {
          (document.getElementById('emailDisplayError') as HTMLElement).setAttribute('class', 'form-label d-none');

        } else {
          (document.getElementById('emailDisplayError') as HTMLElement).setAttribute('class', 'form-label ');
          validation =false;
        }

        let nome = (document.getElementById("nome") as HTMLInputElement).value;
        let password = (document.getElementById("password") as HTMLInputElement).value;
        let confirmPassword = (document.getElementById("confirm-password") as HTMLInputElement).value;

        //vlida se os passowrd são iguais
        if (confirmPassword !== password) {
          (document.getElementById('passwordDisplayError') as HTMLElement).setAttribute('class', 'form-label');
          (document.getElementById('passwordDisplayError') as HTMLElement).innerHTML='Senhas não iguais';
          validation =false;
        } else if (confirmPassword.length<6) {
          (document.getElementById('passwordDisplayError') as HTMLElement).setAttribute('class', 'form-label');
          (document.getElementById('passwordDisplayError') as HTMLElement).innerHTML='É nescessários no minimo 6 caracteres';
          validation = false;
        } else {
          (document.getElementById('passwordDisplayError') as HTMLElement).setAttribute('class', 'form-label d-none');
        }
        //vlida nome
        if(nome.length<6){

            (document.getElementById('nomeDisplayError') as HTMLElement).setAttribute('class', 'form-label');
            (document.getElementById('nomeDisplayError') as HTMLElement).innerHTML='É nescessários no minimo 6 caracteres';
            validation = false;

        }


        if(validation){
         this.showSuccessMessage()
          axios.post(this.routeLogin+'/api/v2/users/store',
            {nome: nome, email: email, password: password})
            .then(function (response) {
              if(response.data.success){

                  setTimeout(function () {

                  },5000)
                // window.location.href= (document.getElementById('back') as HTMLElement).href;
              }
          })
        }


      })
    }


  }
}
