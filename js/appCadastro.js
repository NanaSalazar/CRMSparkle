
//======= Tela de Cadastro

let clientesCadastrados = []


let $cep = document.querySelector('#iCEP')
$cep.addEventListener('blur', function(e) {
    e.preventDefault()
    let cep = this.value
    cep = cep.replace('-', '')
    if(cep.length === 8 ) {
        const promise = obterEndereco(cep)
        .then(dado => {
            if(dado.erro) {
                document.querySelector('#errorMessage').style.display = 'block'
                document.querySelector('.messageTypeError').innerHTML = '<p class="textErrorMessage">CEP inexistente </p>'
            } else {
                mostraEndereco(dado)
            }
            
        })
        
    } else {
        document.querySelector('#errorMessage').style.display = 'block'
        document.querySelector('.messageTypeError').innerHTML = 'CEP inválido'
    }
})

function obterEndereco(cep) {
    let url = `https://viacep.com.br/ws/${cep}/json/`
    return fetch(url)
        .then(response => {
            if (!response.ok) throw Error('CEP inválido')
            return response
        
        })
        .then(response => response.json())

}

function mostraEndereco(dado) {
    document.querySelector('#iCEP').value = dado.cep
    document.querySelector('#iLogradouro').value = dado.logradouro
    document.querySelector('#iBairro').value = dado.bairro
    document.querySelector('#iCidade').value = dado.localidade
    document.querySelector('#iEstado').value = dado.uf
    document.querySelector('#iNumero').focus()
}
   

const $iCNPJCPF = document.querySelector('#iCNPJCPF')
    $iCNPJCPF.addEventListener('keypress', function(e) {
        if(!checkChar(e)) {
            e.preventDefault()
        }
    })

function checkChar(e) {
    const char = String.fromCharCode(e.keyCode)
    const pattern = '[0-9]'
    if(char.match(pattern)) {
        return true
    }
}

$iCNPJCPF.addEventListener('blur', function(e) {
    e.preventDefault()
    const iCNPJCPF = document.querySelector('#iCNPJCPF').value
    if (iCNPJCPF.length == 11 || iCNPJCPF.length == 15) {
        verificaClienteExistente(iCNPJCPF)           
    } else {
        document.querySelector('#errorMessage').style.display = 'block'
        document.querySelector('.messageTypeError').innerHTML = '<p class="textErrorMessage"><strong>ERRO</strong> Número inválido</p>'
        }
})


const $ValorPedido = document.querySelector('#iValorPedido')
    $ValorPedido.addEventListener('keypress', function(e) {
        if(!checkCharValue(e)) {
            e.preventDefault()
        }
    })

function checkCharValue(e) {
    const char = String.fromCharCode(e.keyCode)
    const pattern = '[0-9.]'
    if(char.match(pattern)) {
        return true
    }
}

const btnCadastro = document.querySelector('#btnCadastrar')



btnCadastro.addEventListener('click', function () { 
    const iRazaoSocial = document.querySelector('#iRazaoSocial').value
    const iCNPJCPF = document.querySelector('#iCNPJCPF').value             
    const iCEP = document.querySelector('#iCEP').value
    const iLogradouro = document.querySelector('#iLogradouro').value
    const iNumero = document.querySelector('#iNumero').value
    const iComplemento = document.querySelector('#iComplemento').value
    const iBairro = document.querySelector('#iBairro').value
    const iCidade = document.querySelector('#iCidade').value
    const iEstado = document.querySelector('#iEstado').value
    const iValorPedido = document.querySelector('#iValorPedido').value
    const iCiclo = document.querySelector('input[name="ciclo"]:checked').value


    
    
    if (iRazaoSocial && iCNPJCPF && iCEP && iLogradouro && iNumero && iBairro && iCidade && iEstado && iValorPedido && iCiclo) {
        let novoCliente = {
            razaoSocial: iRazaoSocial,
            codigoCliente: iCNPJCPF,
            cep: iCEP,
            logradouro: iLogradouro,
            numero: iNumero,
            complemento: iComplemento,
            bairro: iBairro,
            cidade: iCidade,
            estado: iEstado,
            valorPedido: iValorPedido,
            ciclo: iCiclo,
            dataCadastro: Date.now()
        }
    
    
        clientesCadastrados.push(novoCliente)
        updateLocalStorage()
        
        limpaInput()

    } else {
        document.querySelector('#errorMessage').style.display = 'block'
        document.querySelector('.messageTypeError').innerHTML = '<p class="textErrorMessage"><strong>ERRO!</strong> Dados incompletos!</p>'
    }
    
    
})

function limpaInput() {
    document.querySelector('#iRazaoSocial').value = ''
    document.querySelector('#iCNPJCPF').value = ''
    document.querySelector('#iCEP').value = ''
    document.querySelector('#iLogradouro').value = ''
    document.querySelector('#iNumero').value = ''
    document.querySelector('#iComplemento').value = ''
    document.querySelector('#iBairro').value = ''
    document.querySelector('#iCidade').value = ''
    document.querySelector('#iEstado').value = ''
    document.querySelector('#iValorPedido').value = ''
}

function updateLocalStorage() {
    const clientes = JSON.stringify(clientesCadastrados)
    localStorage.setItem('clientes', clientes)
}

function getLocalStorage() {
    let clientesLocalSorage = localStorage.getItem('clientes')
    if(clientesLocalSorage) {
        console.log('Peguei os clientes cadastrados')
    } else {
        console.log('Não tem clientes cadastrados!')
    }
}

function verificaClienteExistente(iCNPJCPF) {
    this.iCNPJCPF = iCNPJCPF
    let clientesDataBase = JSON.parse(localStorage.getItem('clientes'))
    
    if(clientesDataBase) {
        for(i = 0; i < clientesDataBase.length; i++) {
            let testeCliente = clientesDataBase[i].codigoCliente
            if(testeCliente === this.iCNPJCPF) {
                document.querySelector('#errorMessage').style.display = 'block'
                document.querySelector('.messageTypeError').innerHTML = '<p class="textErrorMessage"><strong>ERRO</strong> CPF/CNPJ já cadastrado</p>'
            }
        }
    }

    
    return this.iCNPJCPF
       
    
}


//========= Tela Home

