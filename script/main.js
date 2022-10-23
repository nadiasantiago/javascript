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
const aceite = new Productos ("item-1","Aceite",420,"./img/aceiteCocinero.jpg",100,0);
const yerba = new Productos ("item-2","Yerba",360,"./img/yerbaPlayadito.jpg",50,0);
const arveja = new Productos ("item-3","Arveja",53,"./img/arvejaVigente.jpg",30,0);
const durazno = new Productos ("item-4","Durazno",350,"./img/duraznoVigente.jpg",60,0);
const gaseosa = new Productos ("item-5","Gaseosa",390,"./img/gaseosaCoca.jpg",40,0);
const cerveza = new Productos ("item-6","Cerveza",370,"./img/brahma.jpg",80,0);

const contenedorProductos = document.querySelector(".contenedor");

let listaProductos = [aceite,yerba,arveja,durazno,gaseosa,cerveza];
let carrito = [];

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

btnCarrito.addEventListener("click",()=>{
    ventanaCarrito.classList.add("open");
});

cerrarCarrito.addEventListener("click",()=>{
    ventanaCarrito.classList.remove("open");
});

botonesComprar.forEach(boton => {
    boton.addEventListener("click", agregarCarrito);
});

function agregarCarrito(e){
    boton = e.target;
    let contenedorPadre = boton.parentElement;
    let prodID = contenedorPadre.getAttribute("id");
    const prodCarrito = listaProductos.find(elemento => elemento.id == prodID);
    carrito.push(prodCarrito);
    popularCarrito();
    actualizarCantidadCarrito();
}

function popularCarrito(){
    contenedorCarrito.innerHTML = '';
    carrito.forEach(producto => {
        contenedorCarrito.innerHTML += `
            <div class='product-row' id='${producto.id}'>
                <img src='${producto.img}' class='cart-image' />
                <span class='cart-product'>${producto.nombre}</span>
                <span class='cart-price'>$${producto.precio}</span>
                <input type='number' value='1' class="product-quantity" />
                <button id="btn-remove"><i class="bi bi-trash3"></i></button>
            </div>
        `
    });
    actualizarTotal();
    const removeElement = document.querySelectorAll("#btn-remove");
    removeElement.forEach(boton => {
        boton.addEventListener("click", quitarElemento);
    });
}

function actualizarTotal(){
    let total = carrito.reduce((acc, producto)=>{ 
        return acc + producto.precio 
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
    let indice = carrito.indexOf(prodID);
    carrito.splice(indice,1);
    popularCarrito();
    actualizarCantidadCarrito();
}
//para borrar un producto usar splice





/*
carrito =[];
let producto = 0;
let totalCarrito =0;
function compraProductos(){
    producto = prompt(`¿qué producto desea comprar? ${aceite.nombre}($${aceite.precio}), ${yerba.nombre}($${yerba.precio}), ${arveja.nombre}($${arveja.precio}), ${durazno.nombre}($${durazno.precio}), ${gaseosa.nombre}($${gaseosa.precio}), ${cerveza.nombre}($${cerveza.precio})`).toLowerCase();
    const isProduct = listaProductos.find(elemento => elemento.nombre == producto);
    if (isProduct){
        let cantidad = (parseInt(prompt("¿que cantidad desea comprar?(ingresar en numero)")));
        while(isNaN(cantidad) == true){
            alert(`El dato ingresado es invalido, debe ingresar un numero (por ejemplo: 1,2,3)`);
            cantidad = (parseInt(prompt("¿que cantidad desea comprar?(ingresar en numero)")));
        }
        while(isProduct.stock < cantidad){
            cantidad = (parseInt(prompt (`No hay suficiente stock! quedan ${isProduct.stock} unidades de ${producto}. ¿Qué cantidad desea comprar?`)))
            while(isNaN(cantidad) == true){
                alert(`El dato ingresado es invalido, debe ingresar un numero (por ejemplo: 1,2,3)`);
                cantidad = (parseInt(prompt("¿que cantidad desea comprar?(ingresar en numero)")));
            }
        }
        if (carrito.find(elemento=>elemento.nombre == producto)){
            isProduct.cantidad += cantidad
            isProduct.stock -= cantidad
        }else{
            isProduct.cantidad += cantidad
            isProduct.stock -= cantidad
            carrito.push(isProduct);
        }
        totalCarrito = listaProductos.reduce ((acumulador, isProduct)=>{
            return acumulador + (isProduct.precio * isProduct.cantidad)
        },0);
        alert(`El subtotal del carrito es ${totalCarrito}`)
        console.log(carrito);
    }else{
        alert(`el producto ${producto} es invalido o no contamos con stock en este momento`)
    }
}

function realizarCompra() {
    let nombreCliente = prompt("Bienvenido a la tienda online de Super Santiago, ¿Cual es su nombre?")
    let compra = prompt(`Hola ${nombreCliente}!¿Desea realizar una compra? (si/no)`).toLowerCase();
    while (compra !== "no" && compra !== "si") {
        alert("Por favor ingrese una opcion valida");
        compra = prompt("¿Desea realizar una compra? (si/no)").toLowerCase();
    }
    if (compra == "si") {
        while (compra == "si") {
            compraProductos();
            compra = prompt("desea comprar otro producto?").toLowerCase();
            while (compra !== "no" && compra !== "si") {
                alert("Por favor ingrese una opcion valida");
                compra = prompt("desea comprar otro producto?").toLowerCase();
            }
            if (compra == "no") {
                alert(`Muchas gracias por su compra! El total de su pedido es $${totalCarrito}`);
            }
        }
    } else {
        alert("Usted se pierde los mejores precios. Puede verlos en la sección productos");
    }
}

realizarCompra();*/
