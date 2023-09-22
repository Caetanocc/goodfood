let produtos = [
    {"id": "p1", "desc": "Tigela de abacate", "valor": "20"},
    {"id": "p2", "desc": "Salada de kiwi", "valor": "45"},
    {"id": "p3", "desc": "Mix de vegetais", "valor": "30"},
    {"id": "p4", "desc": "Pimentões à Juliana", "valor": "35"},
    {"id": "p5", "desc": "Prato oriental", "valor": "40"},
    {"id": "p6", "desc": "Beterrabas assadas", "valor": "15"},
    
]

let allbtnpedir = document.querySelectorAll(".btn-success")

allbtnpedir.forEach(botao =>{
    botao.addEventListener('click', ()=>{
        console.log(botao.id)

        addItemPedido(botao.id)
    })
})

let qtdeItens = 0;
let valorPedido = 0;

function addItemPedido(idProduto){
    let valor = 0
    let desc  = ""
    qtdeItens++

    produtos.forEach( (elemento) =>{
        if (elemento.id == idProduto){
            valor = elemento.valor
            desc = elemento.desc
        }
    })

    const url = `https://etec23-e0755-default-rtdb.firebaseio.com/goodfood.json`
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Accept': 'application/json', 
        'content-type': 'application/json;charset=utf8'},
        body: `{
            "produto": "${idProduto}",
            "desc": "${desc}",
            "valor": "${valor}",
            "qtde": "1",
            "status": "1"
        }`
    }

    fetch(url,options).then(
        response => response.json()
    ).then(
        data =>{
            console.log(data)

            valorPedido += parseInt(valor)
            let resumo = document.querySelector("#snackbar")
            resumo.innerHTML = "itens:" + qtdeItens + "  total $: " + valorPedido
            resumo.className = "show"
            
        }
    ).catch(error =>{
        console.log(error)
    })


}