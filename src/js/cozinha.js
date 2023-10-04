listarPedidos();

let listaProd = document.querySelector('#lista-produtos')

function listarPedidos(){
    let linha = ""
    const url = `https://.firebaseio.com/goodfood.json`

    const options = {
        method: 'GET',
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
            if(data) {
                console.log(data)
                listaProd.innerHTML = ""

                for (let pedido in data) {
                    if (data.hasOwnProperty(pedido)) {
                        const childData = data[pedido];

                        console.log(pedido)
                        const tr = document.createElement("tr")
                        tr.classList.add("user-row")
                        tr.setAttribute("id", pedido)

                        tr.innerHTML = `
                            <td>Pedido: ${pedido}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        `
                        listaProd.appendChild(tr)

                        for (let kkey in childData){

                            console.log(childData[kkey].desc)
                            console.log(kkey)

                            const tr = document.createElement("tr")
                            tr.classList.add("user-row")
                            tr.setAttribute("id", kkey)

                            tr.innerHTML = `
                                <td>${childData[kkey].item}</td>
                                <td>${childData[kkey].desc}</td>
                                <td>${childData[kkey].valor}</td>
                                <td>${childData[kkey].status}</td>
                                <td>X</td>
                            `
                            // listaProd.appendChild(tr)
                        }
                    }
                }
            } else {
                linha = '<h5> Cesta está vazia</h5>';
                listaProd.innerHTML = linha;
            }
            return
        }
    ).catch( ()=> {
        linha = '<h5> Erro ao buscar dados</h5>';
        listaProd.innerHTML = linha;
    })
}
