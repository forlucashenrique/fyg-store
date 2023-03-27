const inputName = document.querySelector('#name')
const inputEmail = document.querySelector('#email')
const inputTelNumber = document.querySelector('#tel');

let isValid = true;


const isValidEmail = (email) => {
    const regex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const emailValue = email.value;
    
    if(!regex.test(String(emailValue).toLowerCase())) {
        invalidInput(email);
        isValid = false;
    } else {
        resetInput(email);
        isValid = true;
    }
    
}



const isValidTelNumber = (telNumber) => {
    const regex = /^\(\d{2}\) \d{5}-\d{4}/
    const telNumberValue = telNumber.value

    if (!regex.test(String(telNumberValue).toLowerCase())) {
        invalidInput(telNumber);
        isValid = false;
    } else {
        resetInput(telNumber);
        isValid = true;
    }   

}


const resetInput = (elem) => {
    elem.classList.remove('invalid');
    elem.nextElementSibling.classList.remove('error-message');
    elem.nextElementSibling.classList.add('hidden');
}

const invalidInput = (elem) => {
    elem.classList.add('invalid');
    elem.nextElementSibling.classList.add('error-message');
    elem.nextElementSibling.classList.remove('hidden');
}


const isEmpty = (elem) => {

    if (!elem.value) {
        invalidInput(elem);
        isValid = false;
    } else {
       isValid = true;
    }

}


const validateForm = () => {

    isEmpty(inputName);
    isValidEmail(inputEmail)
    isValidTelNumber(inputTelNumber);

    if (isValid) {
        enviarParaWhatsApp()
    }
    

}


function mascaraTelefone(telefone) {
    const texto = telefone.value;
    const textoApenasNumeros = texto.replace(/\D/g, '').substring(0, 11);

    let telefoneFormatado = textoApenasNumeros.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    if (textoApenasNumeros.length < 11) {
        telefoneFormatado = textoApenasNumeros.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }

    telefone.value = telefoneFormatado;


}

function enviarParaWhatsApp() {
    const nome = inputName.value;
    const email = inputEmail.value;
    const telefone = inputTelNumber.value;

    const mensagem = document.getElementById('msg').value;

    const texto = `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\nMensagem: ${mensagem}`;
    const textoCodificado = encodeURIComponent(texto);
    const numeroWhatsApp = '5581992029667'; // Insira o número de telefone do WhatsApp aqui (apenas números)
    const url = `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`;

    window.open(url, '_blank');
}

inputTelNumber.addEventListener('input', function () {
    mascaraTelefone(this);
    isValidTelNumber(this);
})

inputName.addEventListener('input', function(){ 
    resetInput(this);
})

inputEmail.addEventListener('input', function() {
    isValidEmail(this);
})
