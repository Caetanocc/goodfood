listarPedidos();

let listaProd = document.querySelector('#lista-produtos')

function listarPedidos(){
    let linha = ""
    const url = `https://etec22s2-default-rtdb.firebaseio.com/goodfood.json`

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

                for (let mesa in data) {
                    if (data.hasOwnProperty(mesa)) {
                        const childData = data[mesa];

                        console.log(mesa)
                        const tr = document.createElement("tr")
                        tr.classList.add("user-row")
                        tr.setAttribute("id", mesa)

                        tr.innerHTML = `
                            <td>Mesa: ${mesa}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            
                        `
                        listaProd.appendChild(tr)

                        for (let kkey in childData){

                           if(childData[kkey].status==2){

                            console.log(childData[kkey].desc)
                            console.log(kkey)

                            const tr = document.createElement("tr")
                            tr.classList.add("user-row")
                            tr.setAttribute("id", kkey)
                            
                            for (let kkey in childData){
                                const status = childData[kkey].status;
                                let statusColor = "";
                                if (status == 1) {
                                    statusColor = "red";
                                } else if (status == 2) {
                                    statusColor = "yellow";
                                } else if (status == 3) {
                                    statusColor = "green";
                                }
                                const tr = document.createElement("tr");
                                tr.classList.add("user-row");
                                tr.setAttribute("id", kkey);
                                tr.style.backgroundColor = statusColor;
                                tr.innerHTML = `
                                    <td>${childData[kkey].desc}</td>
                                    <td>${childData[kkey].valor}</td>
                                    <td>${status}</td>
                                `;
                                listaProd.appendChild(tr);
                            }
                               
                               
                            tr.innerHTML = `
                                <td>${childData[kkey].desc}</td>
                                <td>${childData[kkey].valor}</td>
                                <td>${childData[kkey].status}</td>
                                
                            `
                               
                             listaProd.appendChild(tr)
                           } 
                           

                           
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
