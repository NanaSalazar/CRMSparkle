
//======= Tela de Cadastro

/*

1 - Iniciar o array que será um banco de dados local. Ao digitar o CPF ou CNPJ fazer as verificações:
- Se possui no minimo 11 digitos e no maximo 15; FEITO
     Se possuir menos ou mais mensagem especifica de erro FEITO
- Informar que não é aceito caracteres, apenas numeros
- Se ja esta cadastrado
    Se estiver subir mensagem de erro

*/



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
                document.querySelector('.messageTypeError').innerHTML = 'CEP inexistente'
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
        $iCNPJCPF.addEventListener('blur', function() {
            const iCNPJCPF = document.querySelector('#iCNPJCPF').value
            if (iCNPJCPF.length == 11 || iCNPJCPF.length == 15) {
                //Executar função para verificar se já existe o número cadastrado             
            } else {
                document.querySelector('#errorMessage').style.display = 'block'
                document.querySelector('.messageTypeError').innerHTML = '<strong>ERRO</strong> Número inválido'
    
            }
        })


const btnCadastro = document.querySelector('#btnCadastrar')



btnCadastro.addEventListener('click', function () { 
    const iRazaoSocial = document.querySelector('#iRazaoSocial').value
    
    //====== Validação de tamanho de caracteres
        
        
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