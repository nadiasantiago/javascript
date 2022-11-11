let listaProductos = [];
const contenedorProductos = document.querySelector(".contenedor");

const obtenerProductos = ()=>{
    fetch("./script/productos.json")
        .then(response => response.json())
        .then(result => {
            listaProductos = result;
            listaProductos.forEach(producto =>{
                contenedorProductos.innerHTML +=`
                    <div class="contenedor-productos" id="${producto.id}">
                        <img src="${producto.img}" class="product-img" alt="${producto.nombre}">
                        <div class="contenedor-productos-descripcion">
                            <h2>${producto.nombre}</h2>
                            <span class="product-price">$${producto.precio}</span>
                        </div>
                        <button class="add-to-cart" >Comprar</button>
                    </div>`
            })
            const botonesComprar = document.querySelectorAll(".add-to-cart");
            botonesComprar.forEach(boton => {
                boton.addEventListener("click", agregarCarrito);
            });
        })
}
obtenerProductos();
let carrito = [];

document.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'));
        popularCarrito();
    }
})

listaProductos.forEach(producto =>{
    contenedorProductos.innerHTML +=`
        <div class="contenedor-productos" id="${producto.id}">
            <img src="${producto.img}" class="product-img" alt="${producto.nombre}">
            <div class="contenedor-productos-descripcion">
                <h2>${producto.nombre}</h2>
                <span class="product-price">$${producto.precio}</span>
            </div>
            <button class="add-to-cart">Comprar</button>
        </div>
    `
})

const btnCarrito = document.querySelector("#cart");
const ventanaCarrito = document.querySelector(".cart-modal-overlay");
const cerrarCarrito = document.querySelector("#close-btn");
const contenedorCarrito = document.querySelector(".product-rows");
const totalCarrito = document.querySelector(".total-price");
const totalProducto = document.querySelector(".cart-quantity");
const btnVaciarCarrito = document.querySelector(".vaciar-carrito");

btnCarrito.addEventListener("click",()=>{
    ventanaCarrito.classList.add("open");
})



cerrarCarrito.addEventListener("click",()=>{
    ventanaCarrito.classList.remove("open");
});

btnVaciarCarrito.addEventListener("click",vaciarCarrito);

function agregarCarrito(e){
    boton = e.target;
    let contenedorPadre = boton.parentElement;
    let prodID = contenedorPadre.getAttribute("id");
    const prodEncontrado = listaProductos.find(elemento => elemento.id == prodID);
    const repeat = carrito.some(elemento=>elemento.id == prodEncontrado.id)
    if (repeat){
        const prodCarrito = carrito.find(elemento=>elemento.id == prodEncontrado.id);
        prodCarrito.cantidad ++;
        prodEncontrado.stock --;
    }else{
        carrito.push(prodEncontrado);
        prodEncontrado.stock --;
    }
    popularCarrito();
}

function popularCarrito(){
    contenedorCarrito.innerHTML = '';
    carrito.forEach(producto => {
        contenedorCarrito.innerHTML += `
            <div class='product-row' id='${producto.id}'>
                <img src='${producto.img}' class='cart-image' />
                <span class='cart-product'>${producto.nombre}</span>
                <span class='cart-price'>$${producto.precio}</span>
                <input type='number' value=${producto.cantidad} class="product-quantity" />
                <span class='cart-price'>$${producto.precio * producto.cantidad}</span>
                <button class="btn-remove bi bi-trash3"></button>
            </div>
        `
    });
    actualizarTotal();
    actualizarCantidadCarrito();
    const removeElement = document.querySelectorAll(".btn-remove");
    removeElement.forEach(boton => {
        boton.addEventListener("click", quitarElemento);
    });
    const cantidadProducto = document.querySelectorAll(".product-quantity");
    cantidadProducto.forEach(boton => {
        boton.addEventListener("change", updateValue);
    });
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarTotal(){
    let total = carrito.reduce((acc, producto)=>{ 
        return acc + ((producto.precio)*(producto.cantidad))
    },0)
    totalCarrito.innerHTML = `$${total}`
}

function actualizarCantidadCarrito (){
    totalProducto.textContent = carrito.length;
}

function quitarElemento(e){
    boton = e.target;
    let contenedorPadre = boton.parentElement;
    let prodID = contenedorPadre.getAttribute("id");
    const prodCarrito = carrito.find(elemento => elemento.id == prodID);
    prodCarrito.cantidad = 0;
    let indice = carrito.indexOf(prodCarrito);
    carrito.splice(indice,1);
    popularCarrito();
}

function vaciarCarrito(){
    carrito.forEach(producto=>producto.cantidad = 0);
    carrito = [];
    popularCarrito();
}

function updateValue(e){
    boton=e.target;
    let contenedorPadre = boton.parentElement;
    let prodID = contenedorPadre.getAttribute("id");
    const prodCarrito = carrito.find(elemento => elemento.id == prodID);
    const prodLista = listaProductos.find(elemento => elemento.id == prodID);
    prodCarrito.cantidad = parseFloat(boton.value);
    prodLista.stock --;
    console.log(prodLista.stock)
    popularCarrito();
}

/*--------------BUSQUEDA DE PRODUCTOS---------------*/
const buscador = document.querySelector('#buscar');
const btnBuscador = document.querySelector('.btn-busqueda');
const respuestaBusqueda = document.querySelector('#busqueda');
const mostrarTodo = document.querySelector('.contenedor-buscados')

const buscar = ()=>{
    respuestaBusqueda.innerHTML = '';
    let productoBuscado = buscador.value.toLowerCase();
    for(producto of listaProductos){
        let nombre = producto.nombre.toLowerCase();
        if(nombre.indexOf(productoBuscado) !== -1){
            respuestaBusqueda.className = "buscando"
            respuestaBusqueda.innerHTML += `
            <div class='product-row' id='${producto.id}'>
                <img src='${producto.img}' class='cart-image' />
                <span class='cart-product'>${producto.nombre}</span>
                <span class='cart-price'>$${producto.precio}</span>
            </div>`
        }
    }
    if(respuestaBusqueda.innerHTML === ''){
        respuestaBusqueda.className='buscando';
        respuestaBusqueda.innerHTML +=`
        <div class='product-row'>
            <span>No hay resultados!!</span>
        </div>`
    }
    if (productoBuscado==""){
        respuestaBusqueda.className='busqueda-oculta';
    }
}

function mostrarProductosBuscados (){
    contenedorProductos.innerHTML =''
    let productoBuscado = buscador.value.toLowerCase();
    console.log(productoBuscado)
    for(producto of listaProductos){
        let nombre = producto.nombre.toLowerCase();
        if(nombre.indexOf(productoBuscado) !== -1){
            respuestaBusqueda.className = "busqueda-oculta"
            contenedorProductos.innerHTML +=`
                <div class="contenedor-productos" id="${producto.id}">
                    <img src="${producto.img}" class="product-img" alt="${producto.nombre}">
                    <div class="contenedor-productos-descripcion">
                        <h2>${producto.nombre}</h2>
                        <span class="product-price">$${producto.precio}</span>
                    </div>
                    <button class="add-to-cart">Comprar</button>
                </div>`
            mostrarTodo.innerHTML = `
            <p>Resultados para: <strong>${productoBuscado}</strong></p>
            <a href="./index.html"><p class='mostrar-todo'>Quitar filtro</p></a>`
        }
    }
}



// buscador.addEventListener('keyup', buscar);
buscador.addEventListener("keyup", function(event) {
    buscar()
    if (event.keyCode === 13 || event==='click') {
        mostrarProductosBuscados()
    }

});

console.log(btnBuscador)
btnBuscador.addEventListener("click", console.log("hola"))




