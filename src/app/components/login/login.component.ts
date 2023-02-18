import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AxiosService} from "../../services/axios.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title: string | null = "";
  routeLogin: string | null = "";
  criptrouteLogin: string | null = "";

  constructor(private route: ActivatedRoute, private axios: AxiosService) {

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

  login() {
    let email = (document.getElementById('email') as HTMLInputElement).value;
    let password = (document.getElementById('password') as HTMLInputElement).value

    if (this.routeLogin != null) {
      this.axios.post(this.routeLogin + '/api/v2/login', {email: email, password: password}, {
        "Content-Type": "application/json; charset=UTF-8"
      }).then(response => {
        if (response.data.success) {
          if (typeof this.routeLogin === "string") {
           let url = this.routeLogin +'/users/login';
            (document.getElementById('loginForm') as HTMLInputElement).setAttribute('action',url);
            (document.getElementById('loginForm') as HTMLInputElement).setAttribute('method','POST');
          }
          let myForm = <HTMLFormElement>document.getElementById('loginForm');
          myForm.submit();
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }


}
