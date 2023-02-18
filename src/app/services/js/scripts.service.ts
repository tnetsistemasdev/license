import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptsService {
src: string="";
innerHTML='';
  constructor() {
  }
  script(src: string, innerHTML: string) {
    this.src = src;
    this.innerHTML = innerHTML;
    let script = document.createElement('script');
    if(innerHTML!=''){
      script.innerHTML = this.innerHTML;
    }else if(src!=''){
      script.src = this.src;
    }else{
      console.log('Problemas  ao emitir o script')
    }

    let head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
  }
}
