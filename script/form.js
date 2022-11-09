const form = document.querySelector('#form')
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const email = document.querySelector("#email");
const tel = document.querySelector("#tel");
const direccion = document.querySelector("#direccion");
const observaciones = document.querySelector("#floatingTextarea");
const btnComprar = document.querySelector("#btn-comprar");
const datosContainer = document.querySelector('.datos-container');
const productCarrito = document.querySelector('.productos-carrito');
const totalCompra = document.querySelector('.total-compra')
let datosEnvio = []
let validar = 0

btnComprar.addEventListener("click", (e)=>{
    e.preventDefault();
    checkInputs();
    if(validar==5){
        enviarDatos();
        formReset();
        mostrarDatos();
        mostrarProductos()
    }else{
        validar=0;
    }
});

function errorFor(input, mensaje){
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    small.innerText = mensaje;
    formControl.className = "form-control contacto_info error"
}

function successFor(input){
    const formControl = input.parentElement;
    formControl.className = "contacto_info success";
    validar ++;
}

function checkInputs(){
    const nombreValue = nombre.value.trim();
    const apellidoValue = apellido.value.trim();
    const emailValue = email.value.trim();
    const telValue = tel.value.trim();
    const direccionValue = direccion.value.trim();

    nombreValue === ""? errorFor(nombre, "Debe completar el nombre"):successFor(nombre);
    apellidoValue === ""? errorFor(apellido, "Debe completar el apellido"):successFor(apellido);
    emailValue === ""? errorFor(email, "Debe completar el correo"):successFor(email);
    telValue === ""? errorFor(tel, "Debe completar el télefono"):successFor(tel);
    direccionValue === ""? errorFor(direccion, "Debe completar la dirección"):successFor(direccion);
    return validar;
}

function enviarDatos(){//manda los datos al localstorage
    datosEnvio.push(nombre.value, apellido.value, email.value, tel.value, direccion.value, observaciones.value)
    localStorage.setItem('datosEnvio', JSON.stringify(datosEnvio));
    form.classList.add("desactivado");
}

function mostrarDatos(){//muestra los datos de envío para que el usuario lo confirme
    datosEnviados = JSON.parse(localStorage.getItem('datosEnvio'));
    datosContainer.innerHTML =
    `<p>Nombre: ${datosEnviados[0]}</p>
    <p>Apellido: ${datosEnviados[1]}</p>
    <p>Email: ${datosEnviados[2]}</p>
    <p>Telefono: ${datosEnviados[3]}</p>
    <p>Direccion ${datosEnviados[4]}</p>
    <p>Observaciones: ${datosEnviados[5]}</p>`
}

function mostrarProductos(){//muestra los productos que se confirmaron
    const productos = JSON.parse(localStorage.getItem('carrito'));
    productCarrito.innerHTML += `
            <div class='product-row'>
                <span class='title-producto'>Producto</span>
                <span class='title'>Precio</span>
                <span class="title">Cant.</span>
                <span class='title'>Total</span>
            <div>`
    productos.forEach(producto => {
        productCarrito.innerHTML += `
            <div class='product-row' id='${producto.id}'>
                <img src='.${producto.img}' class='cart-image' />
                <span class='cart-product'>${producto.nombre}</span>
                <span class='cart-price'>$${producto.precio}</span>
                <span class="product-quantity">${producto.cantidad}</span>
                <span class='cart-price'>$${producto.precio * producto.cantidad}</span>
            </div>`
    })
    total();
}
function total(){
    let total = carrito.reduce((acc, producto)=>{ 
        return acc + ((producto.precio)*(producto.cantidad))
    },0)
    totalCompra.innerHTML = `Total $${total}`
}


function formReset() {
    form.reset();
    validar = 0;
}
