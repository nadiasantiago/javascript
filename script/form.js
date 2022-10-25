const form = document.querySelector("#form");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const email = document.querySelector("#email");
const tel = document.querySelector("#tel");
const direccion = document.querySelector("#direccion");
const observaciones = document.querySelector("#floatingTextarea")
const btnComprar = document.querySelector("#btn-comprar")
const datosEnvio = []
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    checkInputs();
})

function checkInputs(){
    const nombreValue = nombre.value.trim();
    const apellidoValue = apellido.value.trim();
    const emailValue = email.value.trim();
    const telValue = tel.value.trim();
    const direccionValue = direccion.value.trim();

    if(nombreValue === ""){
        errorFor(nombre, "Debe completar el nombre");
    } else{
        successFor(nombre);
    }

    if(apellidoValue === ""){
        errorFor(apellido, "Debe completar el apellido");
    } else{
        successFor(apellido);
    }

    if(emailValue === ""){
        errorFor(email, "Debe completar el correo");
    } else{
        successFor(email);
    }

    if(telValue === ""){
        errorFor(tel, "Debe completar el télefono");
    } else{
        successFor(tel);
    }
    if(direccionValue === ""){
        errorFor(direccion, "Debe completar la dirección");
    } else{
        successFor(direccion);
    }
}

function errorFor(input, mensaje){
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    
    small.innerText = mensaje;
    formControl.className = "contacto_info error"
}

function successFor(input){
    const formControl = input.parentElement;
    formControl.className = "contacto_info success";
}

btnComprar.addEventListener("click", enviarDatos);

function enviarDatos(){
    const nombreValue = nombre.value
    const apellidoValue = apellido.value
    const emailValue = email.value
    const telValue = tel.value
    const direccionValue = direccion.value
    const observacionesValue = observaciones.value
    
    datosEnvio.push(nombreValue,apellidoValue,emailValue,telValue,direccionValue,observacionesValue)
}
