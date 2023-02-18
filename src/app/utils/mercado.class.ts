import {ScriptsService} from "../services/js/scripts.service";

export class MercadoPago {
  constructor(environment: { production: boolean; PUBLIC_KEY_MERCADO_PAGO: string; API: string; PRIVATE_KEY_MERCADO_PAGO: string },script:ScriptsService) {
      script.script( "./assets/mercadopago.js","");
    script.script( "", "const mp = new MercadoPago('"+environment.PUBLIC_KEY_MERCADO_PAGO+"');");


  }

}
