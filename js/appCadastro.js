
//======= Tela de Cadastro



let clientesCadastrados = []

let cep = document.querySelector('#iCEP')
cep.addEventListener('blur', function() {
    let cep = document.querySelector('#iCEP').value
    cepPesquisa = cep.replace('-', '')

    let url = `https://viacep.com.br/ws/${cepPesquisa}/json/`


    fetch(url)
    .then(response => response.json())
    .then(dados => {
    document.querySelector('#iCEP').value = dados.cep
    document.querySelector('#iLogradouro').value = dados.logradouro
    document.querySelector('#iBairro').value = dados.bairro
    document.querySelector('#iCidade').value = dados.localidade
    document.querySelector('#iEstado').value = dados.uf
    document.querySelector('#iNumero').focus()


})

})


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
            ciclo: iCiclo
        }
    
    
        clientesCadastrados.push(novoCliente)
        updateLocalStorage()
        
        limpaInput()

    } else {
        alert('[ERRO] Dados incompletos! Digite novamente!')
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

function getStorage() {
    cliente = JSON.parse()
}