import {Component, Inject, Input, OnInit, Renderer2} from '@angular/core';
import {AxiosService} from "../../services/axios.service";
import {environment} from "../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {ScriptsService} from "../../services/js/scripts.service";
import {ToastrService} from "ngx-toastr";
import {DOCUMENT} from "@angular/common";


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
  contactNome: string = "";
  public_key: string = "";
  user: string = "";
  private_key: string;
  api_host: string = "";


  constructor(private axios: AxiosService, private route: ActivatedRoute, private script: ScriptsService, private toastr: ToastrService, private _renderer2: Renderer2,@Inject(DOCUMENT) private _document: Document) {
    this.public_key = environment.PUBLIC_KEY_MERCADO_PAGO;
    this.private_key = environment.PRIVATE_KEY_MERCADO_PAGO;
    this.api_host = environment.API;
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
      this.user = JSON.stringify(response.data);

    }).catch((error) => {
      console.log(error);
    });

    //define em caso de sucesso para onde o mesmo se reincaminhara
    this.location = atob(<string>this.route.snapshot.paramMap.get('redirect'));


  }

  ngOnInit() {
    (document.getElementById('url_system') as HTMLInputElement).value = environment.URL_SYSTEM ;
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

  openModalWithComponent(template: string, public_key: string, product: any) {
    let amount: string = product.selling_price
    if (template == 'pix-modal') {
      this.displayPix(public_key, product);
      this.pixModal = {
        'display': 'block',
      }
    } else if (template == 'card-modal') {
      this.displayCard(public_key, product);
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


  private displayCard(public_key: string, product: any) {

    (document.getElementById('public_key') as HTMLInputElement).value = public_key;
    (document.getElementById('amount') as HTMLInputElement).value = product.selling_price;
    (document.getElementById('product') as HTMLInputElement).value = JSON.stringify(product);

    let script = this._renderer2.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.type = "text/javascript";
    this._renderer2.appendChild(this._document.body, script);

    setTimeout(() => {
      let scriptCard = this._renderer2.createElement('script');
      scriptCard.type = "text/javascript";
      scriptCard.src = './assets/js/mercadoPagoCard.js'
      this._renderer2.appendChild(this._document.body, scriptCard);
    }, 2000);

  }

  private displayPix(public_key: string, product: any) {

    (document.getElementById('public_key') as HTMLInputElement).value = public_key;
    (document.getElementById('product') as HTMLInputElement).value = JSON.stringify(product);

    let script = this._renderer2.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.type = "text/javascript";
    this._renderer2.appendChild(this._document.body, script);

    setTimeout(() => {
      let scriptCard = this._renderer2.createElement('script');
      scriptCard.type = "text/javascript";
      scriptCard.src = './assets/js/mercadoPagoPix.js'
      this._renderer2.appendChild(this._document.body, scriptCard);
    }, 2000);
  }

  liberarLicensaPaga() {
    let unidade_license = (document.getElementById('license') as HTMLInputElement).value
    if (unidade_license != "" && unidade_license !== undefined && unidade_license !== null) {
      unidade_license = atob(unidade_license)
      let product = JSON.parse((document.getElementById('product') as HTMLInputElement).value);
      this.liberar(unidade_license, product.product_id)
    }
  }
}
