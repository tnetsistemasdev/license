import {Component, Input, OnInit} from '@angular/core';
import {AxiosService} from "../../services/axios.service";
import {environment} from "../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {ScriptsService} from "../../services/js/scripts.service";
import {MercadoPago} from "../../utils/mercado.class";
import {ToastrService} from "ngx-toastr";



// import {AlertComponent} from "../widgets/alert/alert.component";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  pixModal: any = {};
  cardModal: any = {};
  contact_id?: string | null = "";
  location?: string | null = "";

  tipo: string = "";
  message: string = "";
  title: string = "";

  mercadoPago: any = {}
   contactNome: string = "";


  constructor(private axios: AxiosService, private route: ActivatedRoute, private script: ScriptsService,private toastr: ToastrService) {
    //adquire o id do contato
    this.contact_id = this.route.snapshot.paramMap.get('contact_id');

    //faz a requisição http para o mersmo funcionar corretamente
    this.axios.post(environment.API + '/api/v2/contacts/view', {"id": this.contact_id}, {
      "token": "ZmluYW5jZWlyby0wMTpDZXJ0aWZpY2FkbzEyMw==",
      "Content-Type": "application/json; charset=UTF-8"
    }).then((response) => {

      //verifica se o id existe e caso não avisa para o usuário
      if (response.data.id == null || response.data.id == undefined || response.data.id == "") {
        window.location.href = "/not-found/O contato não existe: " + this.contact_id
      }
      this.contactNome = response.data.name;
    }).catch((error) => {
      console.log(error);
    });

    //define em caso de sucesso para onde o mesmo se reincaminhara
    this.location = atob(<string>this.route.snapshot.paramMap.get('redirect'));


  }

  ngOnInit() {
    //lista os produtos conforme o sistema
    this.axios.post(environment.API + '/api/v2/products', {
      "search": "1",
      "columns": ["is_service"],
      "category": this.route.snapshot.paramMap.get('redirect')
    }, {
      "token": "ZmluYW5jZWlyby0wMTpDZXJ0aWZpY2FkbzEyMw==",
      "Content-Type": "application/json; charset=UTF-8"
    }).then((response) => {
      this.products = response.data;
      console.log(this.products);
    }).catch((error) => {
      console.log(error);
    });


  }

  openModalWithComponent(template: string) {
    if (template == 'pix-modal') {
      this.pixModal = {
        'display': 'block',
      }
    } else if (template == 'card-modal') {
      this.cardModal = {
        'display': 'block',
      }
    } else {
      console.log('Erro na linha 37 de products components');
    }
  }

  liberar(unidade: string, product_id: bigint) {

    let days = 0;
    if (unidade == 'UNID' || unidade == 'DIA') {
      days = 1;
    } else if (unidade == 'SEMANA') {
      days = 7;
    } else if (unidade == 'QUINZENA') {
      days = 15;
    } else if (unidade == 'MÊS') {
      days = 30;
    } else if (unidade == 'ANO') {
      days = 365;
    } else if (unidade == 'VITAL') {
      days = 36500;
    } else {
      console.log('UNIDADE INVALIDA');
    }
    this.axios.post(environment.API + '/api/v2/license/create', {
      "contact_id": this.contact_id, "product_id": product_id, "days": days
    }, {
      "token": "ZmluYW5jZWlyby0wMTpDZXJ0aWZpY2FkbzEyMw==",
      "Content-Type": "application/json"
    }).then((response) => {
      if (response.data.success) {
     this.toastr.success('Licença emitida com sucesso');
        setTimeout(function () {
        }, 5000);
        if (this.location != null) {
          window.location.href = this.location;
        }
      } else {
        this.toastr.error(response.data.message);
        console.log(response);
      }
    }).catch((error) => {
      console.log(error);
      this.toastr.error(error.response.data.message);
    });
  }


}
