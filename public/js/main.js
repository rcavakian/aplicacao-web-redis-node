function myScope () {
    const form = document.querySelector('#form');
    const response = document.querySelector('#response');

    // Verificar captura das informações. e = event
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const user = e.target.querySelector('#input-user').value;
        const name = e.target.querySelector('#input-name').value;
        const email = e.target.querySelector('#input-email').value;

        // Falta colocar validação das informações capturadas
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setResponse('E-mail inválido', false);
            return;
        } else {
            setResponse(user, false)
        }
    });
    // Função para criar o elemento p de paragrafo
    function createParagragh () {
        const p = document.createElement('p');
        return p;
    }
    // Função para receber a resposta do servidor Redis e colocar na tela
    function setResponse (msg, isValid) {
        const response = document.querySelector('#response');
        response.innerHTML = '';
        const p = createParagragh();
        // Implementar condicional para a cor da response em caso de True/False
        if (isValid) {
            p.classList.add('paragraph-response');
        } else {
            p.classList.add('paragraph-bad-response');
        }
        p.innerHTML = msg;
        response.appendChild(p);
    }
}

myScope();