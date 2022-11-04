const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const email = document.querySelector("#email");
const tel = document.querySelector("#tel");
const direccion = document.querySelector("#direccion");
const observaciones = document.querySelector("#floatingTextarea")
const btnComprar = document.querySelector("#btn-comprar")
let datosEnvio = []
let validar = 0


document.addEventListener('DOMContentLoaded', ()=>{
    
    if(localStorage.getItem('datosEnvio')){
        datosEnvio = JSON.parse(localStorage.getItem('datosEnvio'));
        enviarDatos();
    }
})
btnComprar.addEventListener("click", enviarDatos);

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
    console.log(validar)
    return validar;
}
function enviarDatos(e){
    checkInputs();
    if(validar==5){
        datosEnvio.push(nombre.value, apellido.value, email.value, tel.value, direccion.value)
        console.log(datosEnvio)
        localStorage.setItem('datosEnvio', JSON.stringify(datosEnvio));
    }
    validar=0
    e.preventDefault();
    console.log(datosEnvio)
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
    validar ++;
}






// const nombre = document.querySelector("#nombre");
// const apellido = document.querySelector("#apellido");
// const email = document.querySelector("#email");
// const tel = document.querySelector("#tel");
// const direccion = document.querySelector("#direccion");
// const observaciones = document.querySelector("#floatingTextarea")
// const btnComprar = document.querySelector("#btn-comprar")
// const form = document.querySelector('#form');
// const datosContainer = document.querySelector('.datos-container')
// const datosEnvio = []

// btnComprar.addEventListener("click", checkInputs);

// function checkInputs(e) {
//     e.preventDefault()
//     const nombreValue = nombre.value.trim();
//     const apellidoValue = apellido.value.trim();
//     const emailValue = email.value.trim();
//     const telValue = tel.value.trim();
//     const direccionValue = direccion.value.trim();
//     const observacionesValue = observaciones.value.trim();

//     if (nombreValue === "") {
//         errorFor(nombre, "Debe completar el nombre");
//     } else {
//         successFor(nombre);
//     }

//     if (apellidoValue === "") {
//         errorFor(apellido, "Debe completar el apellido");
//     } else {
//         successFor(apellido);
//     }

//     if (emailValue === "") {
//         errorFor(email, "Debe completar el correo");
//     } else {
//         successFor(email);
//     }

//     if (telValue === "") {
//         errorFor(tel, "Debe completar el télefono");
//     } else {
//         successFor(tel);
//     }
//     if (direccionValue === "") {
//         errorFor(direccion, "Debe completar la dirección");
//     } else {
//         successFor(direccion);
//     }
//     datosEnvio.push({nombreValue, apellidoValue, emailValue, telValue, direccionValue })
//     console.log(datosEnvio)
    // datosContainer.innerHTML =
    // `<p>Nombre: ${nombreValue}</p>
    // <p>Apellido: ${apellidoValue}</p>
    // <p>Email: ${emailValue}</p>
    // <p>Telefono: ${telValue}</p>
    // <p>Direccion ${direccionValue}</p>
    // <p>Observaciones: ${observacionesValue}</p>`
    // formReset();
// }
