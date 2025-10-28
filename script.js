// Função para extrair parâmetros da URL
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Função principal para exibir o givenName
function displayGivenName() {
    const givenName = getURLParameter('givenName');
    const givenNameElement = document.getElementById('givenName');
    
    if (givenName) {
        givenNameElement.textContent = givenName;
        givenNameElement.classList.remove('empty');
    } else {
        givenNameElement.textContent = 'Nenhum nome encontrado';
        givenNameElement.classList.add('empty');
    }
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', displayGivenName);
