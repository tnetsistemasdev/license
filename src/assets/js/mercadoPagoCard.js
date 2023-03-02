setTimeout(() => {
  let public_key = document.getElementById('public_key').value;
  let amount = document.getElementById('amount').value;
  let product = JSON.parse(document.getElementById('product').value);
  let api_host_gestor = document.getElementById('api_host').value;
  let contact = JSON.parse(document.getElementById('user').value);
  const mp = new MercadoPago(public_key);

  const cardForm = mp.cardForm({
    amount: amount,
    iframe: true,
    form: {
      id: "form-checkout",
      cardNumber: {
        id: "form-checkout__cardNumber",
        placeholder: "Número do cartão",
      },
      expirationDate: {
        id: "form-checkout__expirationDate",
        placeholder: "MM/YY",
      },
      securityCode: {
        id: "form-checkout__securityCode",
        placeholder: "Código de segurança",
      },
      cardholderName: {
        id: "form-checkout__cardholderName",
        placeholder: "Titular do cartão",
      },
      issuer: {
        id: "form-checkout__issuer",
        placeholder: "Banco emissor",
      },
      installments: {
        id: "form-checkout__installments",
        placeholder: "Parcelas",
      },
      identificationType: {
        id: "form-checkout__identificationType",
        placeholder: "Tipo de documento",
      },
      identificationNumber: {
        id: "form-checkout__identificationNumber",
        placeholder: "Número do documento",
      },
      cardholderEmail: {
        id: "form-checkout__cardholderEmail",
        placeholder: "E-mail",
      },
    },
    callbacks: {
      onFormMounted: error => {
        if (error) return console.warn("Form Mounted handling error: ", error);
        console.log("Form mounted");
      },
      onSubmit: event => {
        event.preventDefault();
        document.querySelector('#form-checkout__submit').setAttribute('disabled', 'disabled');
        document.querySelector('#loading-spinner').classList.remove('d-none');
        document.querySelector('#form-checkout__submit').classList.add('disabled');

        const {
          paymentMethodId: payment_method_id,
          issuerId: issuer_id,
          cardholderEmail: email,
          amount,
          token,
          installments,
          identificationNumber,
          identificationType,
        } = cardForm.getCardFormData();

        let body = JSON.stringify({
          contact_id: contact.id,
          product_id: product.product_id,
          token,
          issuer_id,
          payment_method_id,
          transaction_amount: Number(amount),
          installments: Number(installments),
          description: product.name,
          payer: {
            email,
            identification: {
              type: identificationType,
              number: identificationNumber,
            },
          },
        });
        fetch(api_host_gestor + "/api/v2/subscription/pay-card", {
          method: "POST",
          headers: {
            "token": "ZmluYW5jZWlyby0wMTpDZXJ0aWZpY2FkbzEyMw==",
            "Content-Type": "application/json; charset=UTF-8"
          },
          body: body
        }).then(result => result.json())
          .then((response) => {
            if (response.success == 1) {
              liberarLicencaCard(product.unit, product.product_id, contact.id)

            } else {
              alert(response.message);
              habilitarButtonPagamento();
            }
          }).catch(function (error) {
          console.log(error);
          alert('Houve um erro no servidor');
          habilitarButtonPagamento();
        })
      },
      onFetching: (resource) => {
        console.log("Fetching resource: ", resource);
      }
    },
  });
}, 1500);

function habilitarButtonPagamento() {
  document.querySelector('#form-checkout__submit').removeAttribute('disabled');
  document.querySelector('#loading-spinner').classList.add('d-none');
  document.querySelector('#form-checkout__submit').classList.remove('disabled');
}

function liberarLicencaCard(unidade, product_id, contact_id) {
  let api_host_gestor = document.getElementById('api_host').value;
  let days = 0;
  let number_units = 0;
  if (unidade == 'DIA') {
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
    number_units = 1;
  }

  let body = JSON.stringify({
    "contact_id": contact_id,
    "product_id": product_id,
    "days": days,
    "number_units": number_units
  });
  fetch(api_host_gestor + '/api/v2/license/create', {
    body: body,
    headers: {
      "token": "ZmluYW5jZWlyby0wMTpDZXJ0aWZpY2FkbzEyMw==",
      "Content-Type": "application/json; charset=UTF-8"
    },
    method: "POST"
  }).then(result => result.json()).then((response) => {
      if (response.success) {
        alert('Pagamento Realizado');
        let location_app = atob(document.getElementById('url_system').value);
        //se a cobrança for por tempos ele redireciona
        if (days > 0) {

          window.location.href = location_app;
        }

        //se for unidade
          if (number_units == 1) {

          let body = JSON.stringify({
            "contact_id": contact_id,
            "product_id": product_id
          });

          fetch(location_app + '/api/v2/webhook', {
            body: body,
            headers: {
              "token": "ZmluYW5jZWlyby0wMTpDZXJ0aWZpY2FkbzEyMw==",
              "Content-Type": "application/json"
            },
            method: "POST"
          }).then(result => result.json())
            .then((response) => {
              console.log(response);
              if (response.success == true) {
                window.history.back();
              } else {
                this.toastr.error(response.message);
                console.log(response);
              }

            });


        }
      } else {
        alert(response.message);
        habilitarButtonPagamento();
        console.log(response);
      }
    }
  ).catch((error) => {
    console.log(error);
  });
}
