let subtotal = 0;
let cantidadProductos1 = 0;
let precioAceite = 420;
let precioYerba = 360;
let precioArveja = 53;
let precioDurazno = 350;
let precioGaseosa = 390;
let precioCerveza = 370;
function compraProductos() {
    let producto = prompt(`¿que producto desea comprar? aceite($${precioAceite}), yerba($${precioYerba}), arveja($${precioArveja}), durazno($${precioDurazno}), gaseosa($${precioGaseosa}), cerveza($${precioCerveza})`).toLowerCase();
    let cantidadProductos = (parseInt(prompt("¿que cantidad desea comprar?(ingresar en numero)")));
    while(isNaN(cantidadProductos) == true){
        alert(`El dato ingresado es invalido, debe ingresar un numero (por ejemplo: 1,2,3)`);
        cantidadProductos = (parseInt(prompt("¿que cantidad desea comprar?(ingresar en numero)")));
    }
    cantidadProductos1 = cantidadProductos1 + cantidadProductos;
    switch (producto) {
        case "aceite":
            subtotal = subtotal + precioAceite * cantidadProductos;
            console.log(`se sumo ${cantidadProductos} ${producto}, el subtotal es $${subtotal} y lleva ${cantidadProductos1} productos`);
            alert("su producto fue agregado al carrito");
            break;

        case "yerba":
            subtotal = subtotal + precioYerba * cantidadProductos;
            console.log(`se sumo ${cantidadProductos} ${producto}, el subtotal es $${subtotal} y lleva ${cantidadProductos1} productos`);
            alert("su producto fue agregado al carrito");
            break;

        case "arveja":
            subtotal = subtotal + precioArveja * cantidadProductos;
            console.log(`se sumo ${cantidadProductos} ${producto}, el subtotal es $${subtotal} y lleva ${cantidadProductos1} productos`);
            alert("su producto fue agregado al carrito");
            break;

        case "durazno":
            subtotal = subtotal + precioDurazno * cantidadProductos;
            console.log(`se sumo ${cantidadProductos} ${producto}, el subtotal es $${subtotal} y lleva ${cantidadProductos1} productos`);
            alert("su producto fue agregado al carrito");
            break;
        case "gaseosa":
            subtotal = subtotal + precioGaseosa * cantidadProductos,
                console.log(`se sumo ${cantidadProductos} ${producto}, el subtotal es $${subtotal} y lleva ${cantidadProductos1} productos`);
            alert("su producto fue agregado al carrito");
            break;
        case "cerveza":
            subtotal = subtotal + precioCerveza * cantidadProductos;
            console.log(`se sumo ${cantidadProductos} ${producto}, el subtotal es $${subtotal} y lleva ${cantidadProductos1} productos`);
            alert("su producto fue agregado al carrito");
            break;
        default:
            alert(`En este momento no contamos con stock de ${producto}`);
            break;
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
                alert(`Muchas gracias por su compra! El total de su pedido es $${subtotal} y lleva ${cantidadProductos1} unidades`);
            }
        }
    } else {
        alert("Usted se pierde los mejores precios. Puede verlos en la sección productos");
    }
}

realizarCompra();
