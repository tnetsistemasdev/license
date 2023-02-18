import {Component, Input, TemplateRef} from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() pixModal: any;
  @Input() cardModal: any;

  constructor() {

  }


  onCloseModal(cardModal: string) {
    if (cardModal == 'pix-modal') {
      this.pixModal = {
        'display': 'none',
      }
    } else if (cardModal == 'card-modal') {
      this.cardModal = {
        'display': 'none',
      }
    } else {
      console.log('Erro na linha 37 de products components');
    }
  }
}
