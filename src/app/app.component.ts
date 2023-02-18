import {Component, OnInit, Output} from '@angular/core';
import {environment} from "../environments/environment";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  Pagamento: any;
   @Output() message: string = "";

  @Output() title:string = "";

  @Output() tipo :string = "";



}
