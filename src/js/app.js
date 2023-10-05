
let notaModal = document.querySelector('#notaModal')
let bodyModalDados = document.querySelector('#bodyModalDados')

function CarrinhosDeCompras() {
    console.log('foi');
    const url = `https://etec23-e0755-default-rtdb.firebaseio.com/goodfood/${mesa}.json`;
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
                    let row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.desc}</td>
                        <td>${item.qtde}</td>
                        <td>${item.valor}</td>
                    `;
                    tbody.appendChild(row);
                }
            } else {
                // Handle the case where there are no data
            }
        });
}

