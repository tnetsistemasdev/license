import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() tipo: string = '';
  @Input() title: string ='';
  @Input() message: string ='';

  success(message: string,title: string){
    this.message = message;
    this.title = title;
    this.tipo = 'success';
  }

  error(message: string,title: string){
    this.message = message;
    this.title = title;
    this.tipo = 'error';
  }

}
