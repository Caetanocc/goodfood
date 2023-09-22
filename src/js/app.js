
let notaModal = document.querySelector('#notaModal')
let bodyModalDados = document.querySelector('#bodyModalDados')

notaModal.addEventListener('focus', buscarAluno)



function buscarAluno() {
    const url = 'https://etec22s2-default-rtdb.firebaseio.com/atividade.json'
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    }

    let linha = '';
  
    fetch(url,options).then(
        response => response.json()
    ).then(
        dados => {
            
            if (dados.error) {
                linha = '<h5> Erro ao consultar BD</h5>';
                bodyModalDados.innerHTML = linha;
                return
            }

            if(dados) {
                console.log(dados)
                linha = '<h5> Aluno: '+ dados.aluno + ' Nota: ' + dados.nota + '</h5>';
            } else {
                linha = '<h5> Aluno: não encontrado</h5>';
            }
            
            bodyModalDados.innerHTML = linha;
            return
        }
    )
}  
function CarrinhosDeCompras() {
    console.log('foi');
    const url = 'https://etec22s2-default-rtdb.firebaseio.com/goodfood.json'
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    }
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
                    for (let subChave in dados[chave]) {
                        let item = dados[chave][subChave];
                        let row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${item.desc}</td>
                            <td>${item.qtde}</td>
                            <td>${item.valor}</td>
                        `;
                        tbody.appendChild(row);
                    }
                }
            } else {
            }
        });
}
