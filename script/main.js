class Productos {
    constructor (nombre, precio, stock,cantidad){
        this.nombre=nombre;
        this.precio=precio;
        this.stock=stock;
        this.cantidad=cantidad;
    }
}
/*--------------DECLARACION DE PRODUCTOS---------------*/
const producto1 = new Productos ("aceite",420,100,0);
const producto2 = new Productos ("yerba",360,50,0);
const producto3 = new Productos ("arveja",53,30,0);
const producto4 = new Productos ("durazno",350,60,0);
const producto5 = new Productos ("gaseosa",390,40,0);
const producto6 = new Productos ("cerveza",370,80,0);

listaProductos = [producto1,producto2,producto3,producto4,producto5,producto6];
carrito =[];
let totalCarrito = 0;

function compraProductos(){
    let producto = prompt(`¿qué producto desea comprar? ${producto1.nombre}($${producto1.precio}), ${producto2.nombre}($${producto2.precio}), ${producto3.nombre}($${producto3.precio}), ${producto4.nombre}($${producto4.precio}), ${producto5.nombre}($${producto5.precio}), ${producto6.nombre}($${producto6.precio})`).toLowerCase();
    const isProduct = listaProductos.find(elemento => elemento.nombre == producto);
    
    if (isProduct){
        let cantidad = (parseInt(prompt("¿que cantidad desea comprar?(ingresar en numero)")));
        while(isNaN(cantidad) == true){
            alert(`El dato ingresado es invalido, debe ingresar un numero (por ejemplo: 1,2,3)`);
            cantidad = (parseInt(prompt("¿que cantidad desea comprar?(ingresar en numero)")));
        }
        if (carrito.find(elemento=>elemento.nombre == producto)){
            isProduct.cantidad += cantidad
        }else{
            isProduct.cantidad += cantidad
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

realizarCompra();
