import {Component, Input, TemplateRef} from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() pixModal: any;
  @Input() cardModal: any;
  @Input() modalVisible: any;


  constructor() {

  }


  onCloseModal(cardModal: string) {
    this.modalVisible =  {
      'display': 'none',
    };
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

  copiar() {
    const input = document.getElementById("code-qr-code") as HTMLInputElement; // substitua "meuInput" pelo ID do seu elemento <input>
    input.select();
    input.setSelectionRange(0, 99999); // Para dispositivos móveis

    document.execCommand("copy");

    const button = document.getElementById('copy-btn') as HTMLElement;
    button.innerHTML = 'Copiado ✓';
    setTimeout( function(){
      button.innerHTML = 'Copiar';
    },1500);

  }
}
