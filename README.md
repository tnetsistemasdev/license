### lICENCIAMENTO API

### LISTAR  E LOCALIZAR PRODUTOS ok
POST http://localhost:8000/api/v2/products
Content-Type: application/json
token:ZmluYW5jZWlyby0wMTpDZXJ0aWZpY2FkbzEyMw==

{
"search": "",
"columns": [""]
}

### ADICIONAR CLIENTES
POST http://localhost:8000/api/v2/contacts/store
Content-Type: application/json
token:ZmluYW5jZWlyby0wMTpDZXJ0aWZpY2FkbzEyMw==

{
"cpf_cnpj": "806.810.001-09",
"ie_rg": "23123123123123",
"name": "Renann Kretschmer Maia",
"supplier_business_name": "SUPERMERCADO GALVAO",
"uf": "AC",
"nascimento": null,
"type": "customer",
"consumidor_final": "1",
"contribuinte": "0",
"cod_pais": "1058",
"id_estrangeiro": null,
"email": "zaredonline@gmail.com",
"landline": null,
"alternate_number": "69993627752",
"mobile": null,
"cep": "76963662",
"rua": "Rua Holanda",
"numero": "3046",
"bairro": "SETOR 01",
"complement": null,
"city_id": "1",
"landmark": null,
"shipping_address": "avenida Belo Horizonte",
"opening_balance": "0",
"pay_term_number": null,
"pay_term_type": null,
"crm_life_stage": null,
"tax_number": null,
"contact_id": null,
"crm_source": null,
"custom_field1": null,
"custom_field2": null,
"custom_field3": null,
"custom_field4": null,
"position": null,
"city": null,
"state": null,
"country": null
}

### EDITAR CLIENTES
POST http://localhost:8000/api/v2/contacts/update
Content-Type: application/json
token:ZmluYW5jZWlyby0wMTpDZXJ0aWZpY2FkbzEyMw==

{
"id": "74912",
"_token": "eOKwi2fLL2B5D08J30HvbO65qVBLywlNLlWRxLYw",
"type": "customer",
"name": "Luan Marcos Figueira Nascimento",
"supplier_business_name": null,
"contact_id": null,
"tax_number": null,
"crm_source": null,
"crm_life_stage": null,
"opening_balance": "0",
"pay_term_number": null,
"pay_term_type": "months",
"customer_group_id": null,
"tipo": "j",
"cpf_cnpj": "36.373.007\/0001-42",
"ie_rg": null,
"nascimento": null,
"city_id": "5304",
"cod_pais": "1058",
"id_estrangeiro": null,
"consumidor_final": "1",
"contribuinte": "0",
"rua": "Rua Antonio Moreira Lima",
"numero": "1929",
"bairro": "SETOR 01",
"cep": "76961838",
"complement": "LOJA",
"email": "luanmarcosfgns@gmail.com",
"mobile": "69999604701",
"alternate_number": null,
"landline": null,
"city": null,
"state": null,
"country": null,
"landmark": null,
"custom_field1": null,
"custom_field2": null,
"custom_field3": null,
"custom_field4": null,
"shipping_address": "Rua Ant\u00f4nio Moreira Lima",
"position": null
}

### VER CLIENTES
POST http://localhost:8000/api/v2/contacts/view
Content-Type: application/json
token:ZmluYW5jZWlyby0wMTpDZXJ0aWZpY2FkbzEyMw==

{
"id": "74912"
}


### ADICIONAR LINCENÇA
POST http://localhost:8000/api/v2/license/store
Content-Type: application/json
token:ZmluYW5jZWlyby0wMTpDZXJ0aWZpY2FkbzEyMw==

{
"contact_id": "74906",
"product_id": "164576",
"days": "50"
}

### VERIFICAR LINCENÇA
POST http://localhost:8000/api/v2/license/view
Content-Type: application/json
token:ZmluYW5jZWlyby0wMTpDZXJ0aWZpY2FkbzEyMw==

{

    "contact_id": "74905",
    "product_id": "164576"
}



