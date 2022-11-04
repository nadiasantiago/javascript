/*--------------DECLARACION DE PRODUCTOS---------------*/
class Productos {
    constructor (id, nombre, precio, img, stock, cantidad){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.img=img;
        this.stock=stock;
        this.cantidad=cantidad;
    }
}

/*--------------DECLARACION DE PRODUCTOS---------------*/
const aceite = new Productos ("item-1","Aceite",420,"./img/aceiteCocinero.jpg",100,1);
const yerba = new Productos ("item-2","Yerba",360,"./img/yerbaPlayadito.jpg",50,1);
const arveja = new Productos ("item-3","Arveja",53,"./img/arvejaVigente.jpg",30,1);
const durazno = new Productos ("item-4","Durazno",350,"./img/duraznoVigente.jpg",60,1);
const gaseosa = new Productos ("item-5","Gaseosa",390,"./img/gaseosaCoca.jpg",40,1);
const cerveza = new Productos ("item-6","Cerveza",370,"./img/brahma.jpg",80,1);

const contenedorProductos = document.querySelector(".contenedor");

let listaProductos = [aceite,yerba,arveja,durazno,gaseosa,cerveza];
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

const botonesComprar = document.querySelectorAll(".add-to-cart");
const btnCarrito = document.querySelector("#cart");
const ventanaCarrito = document.querySelector(".cart-modal-overlay");
const cerrarCarrito = document.querySelector("#close-btn");
const contenedorCarrito = document.querySelector(".product-rows");
const totalCarrito = document.querySelector(".total-price");
const totalProducto = document.querySelector(".cart-quantity");
const btnVaciarCarrito = document.querySelector(".vaciar-carrito");

btnCarrito.addEventListener("click",()=>{
    ventanaCarrito.classList.add("open");
});

cerrarCarrito.addEventListener("click",()=>{
    ventanaCarrito.classList.remove("open");
});

botonesComprar.forEach(boton => {
    boton.addEventListener("click", agregarCarrito);
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
    const prodLista = listaProductos.find(elemento => elemento.id == prodID)
    prodCarrito.cantidad = parseFloat(boton.value);
    prodLista.stock --;
    console.log(prodLista.stock)
    popularCarrito();
}