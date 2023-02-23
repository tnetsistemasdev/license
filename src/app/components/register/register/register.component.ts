// @ts-ignore

import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AxiosService} from "../../../services/axios.service";
import axios from "axios";
import {ToastrService} from 'ngx-toastr';
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  title: any;
  routeLogin: any;
  criptrouteLogin: string = "";


  constructor(private route: ActivatedRoute, private axios: AxiosService, private toastr: ToastrService) {
    //pega os parametros da rota
    this.title = this.route.snapshot.paramMap.get('aplication')
    this.routeLogin = this.route.snapshot.paramMap.get('dominio');

    //verifica sa integridade do titulo
    if (this.title == null || this.title == "") {
      window.location.href = "/not-found/Pagina Não existe";
    }
    //verifica  se o login não é nullo
    if (this.routeLogin == null || this.title == undefined || this.routeLogin == "") {
      window.location.href = "/not-found/Pagina Não existe";
    }
    //verifica a integridade da rota
    if (typeof this.routeLogin === "string") {
      this.criptrouteLogin = this.routeLogin;
      this.routeLogin = atob(this.routeLogin);
    }

    //mostra o link em que trabalharemos
    console.log(this.routeLogin);

  }

  createUsuario() {
    //pega o valod do email digitado
    let email = (document.getElementById("email") as HTMLInputElement).value;

    //valida o email
    if (email != "" && email != null) {

      //verifica se o email é unico
      this.axios.post(this.routeLogin + '/api/v2/unique', {email: email}, {
        "Content-Type": "application/json; charset=UTF-8"
      }).then((response) => {

        //define a validação como verdadeira para inicar a verificação;
        let validation = true;

        //valida se o email é unico
        if (response.data.success == true) {
          (document.getElementById('emailDisplayError') as HTMLElement).setAttribute('class', 'form-label d-none');

        } else {
          (document.getElementById('emailDisplayError') as HTMLElement).setAttribute('class', 'form-label ');
          validation = false;
        }

        //define os inputs
        let nome = (document.getElementById("nome") as HTMLInputElement).value;
        let password = (document.getElementById("password") as HTMLInputElement).value;
        let confirmPassword = (document.getElementById("confirm-password") as HTMLInputElement).value;
        let cnpj_cpf = (document.getElementById("cnpj_cpf") as HTMLInputElement).value;
        cnpj_cpf = cnpj_cpf.replaceAll('-', '').replaceAll('.', '').replaceAll('/', '');

        //verifica se há só numeros
        let valida_cnpj_cpf = cnpj_cpf
          .replaceAll('1', '')
          .replaceAll('2', '')
          .replaceAll('3', '')
          .replaceAll('4', '')
          .replaceAll('5', '')
          .replaceAll('6', '')
          .replaceAll('7', '')
          .replaceAll('8', '')
          .replaceAll('9', '')
          .replaceAll('0', '');

        console.log('valida_cnpj_cpf: ' + valida_cnpj_cpf)
        if (cnpj_cpf.length != 11 && cnpj_cpf.length != 14 && valida_cnpj_cpf != "" || cnpj_cpf == "") {
          (document.getElementById('cnpjcpfDisplayError') as HTMLElement).setAttribute('class', 'form-label');
          (document.getElementById('cnpjcpfDisplayError') as HTMLElement).innerHTML = 'Código de pessoa inválido';
          validation = false;
        } else {
          (document.getElementById('cnpjcpfDisplayError') as HTMLElement).setAttribute('class', 'form-label d-none');
        }

        //faz a validação do password
        if (confirmPassword !== password) {
          (document.getElementById('passwordDisplayError') as HTMLElement).setAttribute('class', 'form-label');
          (document.getElementById('passwordDisplayError') as HTMLElement).innerHTML = 'Senhas não iguais';
          validation = false;
        } else if (confirmPassword.length < 6) {
          (document.getElementById('passwordDisplayError') as HTMLElement).setAttribute('class', 'form-label');
          (document.getElementById('passwordDisplayError') as HTMLElement).innerHTML = 'É nescessários no minimo 6 caracteres';
          validation = false;
        } else {
          (document.getElementById('passwordDisplayError') as HTMLElement).setAttribute('class', 'form-label d-none');
        }

        //valida se há um nome valido
        if (nome.length < 6) {

          (document.getElementById('nomeDisplayError') as HTMLElement).setAttribute('class', 'form-label');
          (document.getElementById('nomeDisplayError') as HTMLElement).innerHTML = 'É nescessários no minimo 6 caracteres';
          validation = false;

        }
        //se o mesmo passar em todos os pré requitos o mesmo entra no if
        if (validation) {
          this.axios.post(environment.API + '/api/v2/contacts/store',
            {name: nome, email: email, cpf_cnpj: cnpj_cpf}, {
              "token": "ZmluYW5jZWlyby0wMTpDZXJ0aWZpY2FkbzEyMw==",
              "Content-Type": "application/json; charset=UTF-8"
            }).then((response) => {
            if (response.data.success) {
              axios.post(this.routeLogin + '/api/v2/users/store',
                {
                  nome: nome,
                  email: email,
                  password: password,
                  cnpj_cpf: cnpj_cpf,
                  contact_id: response.data.contact_id
                })
                .then((response) => {

                  // se inserido  o mesmo mostra o sucesso ao usuário
                  if (response.data.success) {
                    this.toastr.success('Usuário Registrado agora faça o login', 'Sucesso');
                    (document.getElementById('register') as HTMLFormElement).reset();
                    this.debilitarFor()

                    //aguarda 6 segundos para redirecionar
                    setTimeout(function () {
                      window.location.href = (document.getElementById('back') as HTMLAnchorElement).href;
                    }, 6000)

                    //caso não ele mostra erro
                  } else {
                    this.toastr.error("Tente novamente mais tarde", 'Erro')
                  }
                })
            } else {
              this.toastr.error("problemas ao armazenar", 'Erro')
            }
          }).catch((error) => {
            console.log(error);
          });

        }


      });
    }


  }

  private debilitarFor() {
    let inputs = (document.getElementById('register') as HTMLFormElement).getElementsByTagName('input')
    let i = 0;

    while (inputs.length > i) {
      inputs[i].setAttribute('disabled', 'disabled');
      console.log(inputs[i]);
      i++;
    }
  }
}
