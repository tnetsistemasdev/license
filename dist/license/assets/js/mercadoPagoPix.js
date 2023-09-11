function liberarLicencaPix(unidade, product_id, contact_id) {
  let api_host_gestor = document.getElementById('api_host').value;
  let days = 0;
  if (unidade == 'UNID' || unidade == 'DIAS') {
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
  let body = JSON.stringify({
    "contact_id": contact_id,
    "product_id": product_id,
    "days": days
  });
  fetch(api_host_gestor + '/api/v2/license/create', {
    body: body,
    headers: {
      "token": "ZmluYW5jZWlyby0wMTpDZXJ0aWZpY2FkbzEyMw==",
      "Content-Type": "application/json; charset=UTF-8"
    },
    method:"POST"
  }) .then(result => result.json())
    .then((response) => {
      if (response.success) {
        alert('Pagamento Realizado');
        window.location.href = window.atob(document.getElementById('url_system').value);
      } else {
        alert('Houve um problema entre em contato com o desenvolvedor');
        console.log(response);
      }
    }).catch((error) => {
    console.log(error);
  });
}

setTimeout(() => {
  let intervaloEscuta;
  let product = JSON.parse(document.getElementById('product').value);
  let user = JSON.parse(document.getElementById('user').value);
  let public_key = document.getElementById('public_key').value;
  let private_key = document.getElementById('private_key').value;
  let typepessoa = "CNPJ";
  if(user.cpf_cnpj.length==11){

    typepessoa = "CPF"
  }
  const mp = new MercadoPago(public_key);
  console.log(parseFloat(product.selling_price));
  let body = JSON.stringify({
    "transaction_amount": parseFloat(product.selling_price),
    "description": product.name,
    "payment_method_id": "pix",
    "payer": {
      "email": user.email,
      "identification": {
        "type": typepessoa,
        "number": user.cpf_cnpj
      }
    }
  });

  let response;
  fetch('https://api.mercadopago.com/v1/payments', {
      body: body,
      headers: {
        "Authorization":
          "Bearer "+private_key,
        "Content-Type": "application/json"
      },
      method: 'POST'
    }
  ).then(result=>result.json())
    .then((response)=>{
    var transaction_pix_id = response.id;

      document.querySelector('#qr-code-pix').setAttribute('src', "data:image/png;base64," + response.point_of_interaction.transaction_data.qr_code_base64)
      document.querySelector('#code-qr-code').removeAttribute('readonly');
      document.querySelector('#code-qr-code').value =response.point_of_interaction.transaction_data.qr_code;
      document.querySelector('#code-qr-code').setAttribute('readonly', 'readonly');
      body = {
        "capture": true
      };
      intervaloEscuta = setInterval(function () {
        fetch('https://api.mercadopago.com/v1/payments/' + transaction_pix_id, {
          method: 'PUT',
          headers: {
            "Authorization": "Bearer " + private_key,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }).then(result=>result.json())
          .then(function (reponsePayments) {


          if (reponsePayments.status == 'approved') {
            liberarLicencaPix(product.unit,product.product_id,user.id)

            clearInterval(intervaloEscuta);

          }
        });
      }, 5000);
    })
}, 1500);

