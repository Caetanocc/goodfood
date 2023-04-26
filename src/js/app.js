
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
  