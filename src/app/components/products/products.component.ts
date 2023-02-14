import {Component, OnInit} from '@angular/core';
import {AxiosService} from "../../services/axios.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  constructor(private axios: AxiosService){}
  ngOnInit() {
     this.axios.post(environment.API + '/api/v2/products', {
      "search": "1",
      "columns": ["is_service"]
    }, {
      "token": "ZmluYW5jZWlyby0wMTpDZXJ0aWZpY2FkbzEyMw==",
      "Content-Type": "application/json; charset=UTF-8"
    }).then( (response) =>{
       this.products = response.data;
       console.log(this.products);
    }).catch((error) => {
      console.log(error);
    });

  }
}
