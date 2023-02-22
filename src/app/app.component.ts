import {Component, OnInit, Output} from '@angular/core';
import {environment} from "../environments/environment";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  Pagamento: any;
   @Output() message: string = "";

  @Output() title:string = "";

  @Output() tipo :string = "";


  ngOnInit(): void {

    document.addEventListener('click', (event)=>{


        (document.getElementById('loading') as HTMLElement).classList.remove('d-none');
        setTimeout(() => {
          (document.getElementById('loading') as HTMLElement).classList.add('d-none');
        }, 2000);

    });
    setTimeout(()=>{
      (document.getElementById('loading') as HTMLElement).classList.add('d-none');
    },2000);
  }




}
