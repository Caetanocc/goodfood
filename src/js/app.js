let notaModal = document.querySelector('#notaModal')
let bodyModalDados = document.querySelector('#bodyModalDados')

function CarrinhosDeCompras() {
    const url = `https://etec22s2-default-rtdb.firebaseio.com/goodfood/${mesa}.json`;
    console.log(mesa)
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(dados => {
            if (dados.error) {
                linha = '<h5> Erro ao consultar BD</h5>';
                bodyModalDados.innerHTML = linha;
                return;
            }

            if (dados) {
                console.log(dados);
                let tabela = document.getElementById('tabelaCompras');
                let tbody = tabela.querySelector('tbody');

                tbody.innerHTML = '';
                
                for (let chave in dados) {
                    let item = dados[chave];
                    if(item.status == 1){
                      let chaves = chave
                      console.log(chaves)
                        let row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${item.desc}</td>
                            <td>${item.qtde}</td>
                            <td>${item.valor}</td>
                            <td onclick="Excluir('${chaves}')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                          </svg></td>
                        `;
                        tbody.appendChild(row);
                    }
                  
                }
            
            } else {
                // Handle the case where there are no data
            }
        });

       
}

function Excluir(chaves){

    console.log(chaves);

    const url = `https://etec22s2-default-rtdb.firebaseio.com/goodfood/${mesa}/${chaves}.json`
    const options = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json;charset=utf-8'
        }
      }
    fetch(url,options).then(
        response => response.json()
    ).then(
        data => {
            console.log(data)
            location.reload();
        }
    )    
}



buttonadicionar = document.getElementById('carrinhoEnviar');
buttonadicionar.addEventListener('click',function atualizarItem(){
    const url = `https://etec22s2-default-rtdb.firebaseio.com/goodfood/${mesa}.json`;
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    };

    fetch(url, options)
    .then(response => response.json())
    .then(dados => {   
        if (dados.error) {

        }else{
            if(dados){
                document.getElementById("snackbar").style.backgroundColor = "red";
                for(let chave in dados) {
                    if (dados[chave].status==1){

                        const url = `https://etec22s2-default-rtdb.firebaseio.com/goodfood/${mesa}/${chave}.json`
                        console.log(dados)
                        const options = {
                            method: 'PATCH',
                            mode: 'cors',
                            headers: {
                                'Accept': 'application/json',
                                'content-type': 'application/json;charset=utf-8'
                            },
                            body: `{
                                "produto": "${dados[chave].produto}",
                                "desc": "${dados[chave].desc}",
                                "valor": "${dados[chave].valor}",
                                "qtde": "1",
                                "status": "2" }`,
                            }
                        fetch(url,options).then(
                            response => response.json()
                        ).then(
                            data => {
                                console.log(data)
                            }
                        )    
                    }
                    
                }
            }
        }
    })

                
})
