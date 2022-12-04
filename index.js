let producto_1;
let producto_2;
let producto_3;
let producto_4;
let producto_5;
let producto_6;



class Producto{
    #id;
    #nombre;
    #descripcion;
    #precio;
    #imagen;
    #categoria;
    #cantidad;
    

        constructor(id, nombre,descripcion,precio,imagen,categoria,cantidad){
            this.#id =id;
            this.#nombre = nombre;
            this.#descripcion = descripcion;
            this.#precio = precio;
            this.#imagen = imagen;
            this.#categoria = categoria;
            this.#cantidad =cantidad;
        }

        set setId(id){
            this.#id =id;
        }

        set setNombre(nombre){
            this.#nombre = nombre;
        }

        set setDescripcion(descripcion){
            this.#descripcion = descripcion;
        }

        set setPrecio(precio){
            this.#precio = precio;
        }

        set setImagen(imagen){
            this.#imagen= imagen;
        }

        set setCategoria(categoria){
            this.#categoria = categoria;
        }

        set setCantidad(cantidad){
            this.#cantidad = cantidad;
        }

        get getId(){
            return this.#id;
        }

        get getNombre(){
            return this.#nombre;
        }

        get getDescripcion(){
            return this.#descripcion;
        }

        get getPrecio(){
            return this.#precio;
        }

        get getImagen(){
            return this.#imagen;
        }

        get getCategoria(){
            return this.#categoria;
        }

        get getCantidad(){
            return this.#cantidad;
        }

        crearHTML(){
            // esta funcion por cada producto que tenga en el array me arma un div y me lo devuelve.
           
        }

        toJSON(){

            return {
            "getId" : this.#id,
            "getNombre" : this.#nombre,
            "getDescripcion" : this.#descripcion,
            "getPrecio" : this.#precio,
            "getImagen" : this.#imagen,
            "getCategoria" : this.#categoria,
            "getCantidad" : this.#cantidad

            }
            

        }
}


producto_1= new Producto(1,"Iphone 13","Nuestro sistema de dos cámaras más avanzado y un chip superrápido que deja atrás a la competencia.",529.991,"imagenes/iphone13.png",["Iphone","todas"],1);
producto_2= new Producto(2,"Iphone 13 pro","Un sistema de cámaras mucho más poderoso. Una pantalla con respuesta inmediata en cada interacción. El chip de smartphone más rápido del mundo. Un diseño increíblemente resistente. Y un gran salto en duración de batería.",659.989,"imagenes/iPhone_13_Pro.png",["Iphone","todas"],1);
producto_3= new Producto(3,"AirPods (3ra Generación)","Nuevo diseño con audio espacial para un sonido envolvente y ecualización adaptativa que ajusta la música a tus oídos.",53.999,"imagenes/airpods.jpg",["Audio","todas"],1);
producto_4= new Producto(4,"AirPods Max","Presentamos los AirPods Max. El equilibrio perfecto entre un audio de alta fidelidad increíble y la mágica facilidad de uso de los AirPods. Tus próximos audífonos ya están aquí para brindarte una experiencia de audio inigualable.",184.799,"imagenes/Airpods_Max.jpg",["Audio","todas"],1);
producto_5= new Producto(5,"iPad Air 10.9″ Wi-Fi (5ta Generación)","El iPad es versátil y está listo para todo. Es una forma divertida y poderosa de trabajar, estudiar, jugar y hacer lo que te imagines.",219.999,"imagenes/iPad_Air.jpg",["iPad","todas"],1)
producto_6= new Producto(6,"iPad mini Wi-Fi","Por qué el iPad. Hace de todo. Y un poco más.El iPad es versátil y está listo para todo. Es una forma divertida y poderosa de trabajar, estudiar, jugar y hacer lo que te imagines. Estas son algunas de las miles de cosas que puedes hacer con él.",519.999,"imagenes/iPad_mini.jpg",["iPad","todas"],1);


let productos = [producto_1,producto_2,producto_3,producto_4,producto_5,producto_6];


let carrito = [];

document.addEventListener("DOMContentLoaded",()=>{
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    mostrarCarrito();
});

const carritoContenedor = document.querySelector("#contador_carrito");


const vaciarCarrito = document.querySelector("#vaciar_carrito");

const precioTotal = document.querySelector("#precioTotal");




let principal=document.querySelector("#productos");

let divG = document.createElement("div");
divG.classList.add("card-group");
principal.appendChild(divG);

productos.forEach((producto)=>{

// hasta aca va original
    let div = document.createElement("div");
    div.classList.add("card");
    div.setAttribute("style","width: 18rem;");
    divG.appendChild(div); 

    let imagen = document.createElement("img");
    imagen.classList.add("card-img-top")
    imagen.src= producto.getImagen;
    div.appendChild(imagen);

    let div2= document.createElement("div");
    div2.classList.add("card-body");
    div.appendChild(div2);

    let h5= document.createElement("h5");
    h5.classList.add("card-title");
    h5.innerText = producto.getNombre;
    div2.appendChild(h5);

    let p = document.createElement("p");
    p.classList.add("card-text");
    p.innerText = producto.getDescripcion;
    div2.appendChild(p);

    let ul= document.createElement("ul");
    ul.classList.add("list-group","list-group-flush");
            

    let li= document.createElement("li");
    li.classList.add("list-group-item")
    li.innerText ="Precio: " + producto.getPrecio;
    ul.appendChild(li);

    let li2= document.createElement("li");
    li2.classList.add("list-group-item");

    li2.innerText =producto.getId;
    ul.appendChild(li2);

    let li3= document.createElement("li");
    li3.classList.add("list-group-item")
    li3.innerText ="Categoria: " + producto.getCategoria[0];
    ul.appendChild(li3);

    div.appendChild(ul);



    let btn = document.createElement("button");

    btn.classList.add("btn", "btn-primary");
    btn.innerText = "Agregar al carrito";
    btn.setAttribute("name","boton");



    div.appendChild(btn);

    btn.addEventListener("click",()=>{
        
        agregarProducto(producto.getId)

    });

});


vaciarCarrito.addEventListener("click",()=>{

    carrito.length =[];
    mostrarCarrito();

});

function agregarProducto(id){

    let existe = carrito.some(producto => producto.getId === id);

    if(existe){
        let producto = carrito.map(producto =>{
            if(producto.getId == id){
                producto.getCantidad++
                console.log(producto.getId,producto.getCantidad);
            };
        });
    }else{
        let item = productos.find((producto)=> producto.getId == id);
        carrito.push(item);
    };
    
    
    mostrarCarrito();

};


function mostrarCarrito() {
    const modalBody = document.querySelector(".modal  .modal-body");

    modalBody.innerHTML ="";
    
    carrito.forEach((producto)=>{
        
        //Creo un div contenedor para contener div -> imagen y el div -> contenido

        let div_contenedor = document.createElement("div");
        div_contenedor.classList.add("modal-contenedor");

        //Creo un div que contenga la imgagen y lo appendeo al div contenedor
        let div_img = document.createElement("div");
        div_contenedor.appendChild(div_img)

        let img = document.createElement("img");
        img.classList.add("img-fluid","img-carrito");
        img.src = producto.getImagen;
        div_img.appendChild(img);


        //Creo un div que contenga el contenido y lo appendeo al div contenedor

        let div_contenido = document.createElement("div");
        div_contenedor.appendChild(div_contenido);

        let nombre = document.createElement("P");
        nombre.innerText =`producto: ${producto.getNombre}`;
        div_contenido.appendChild(nombre);

        let precio = document.createElement("p");
        precio.innerText = `precio: ${producto.getPrecio}`;
        div_contenido.appendChild(precio);

        let cantidad = document.createElement("p");
        cantidad.innerText = `cantidad: ${producto.getCantidad}`;
        div_contenido.appendChild(cantidad);

        let btn = document.createElement("button");
        btn.classList.add("btn","btn-danger");
        btn.innerText ="Eliminar producto";
        div_contenido.appendChild(btn);

        btn.addEventListener("click",()=>{

            eliminarProducto(producto.getId);

        });

        modalBody.appendChild(div_contenedor);
    })

    //Con el If  estamos verificando si hay algo o no dentro del carrito

    if(carrito.length == 0){ 
        
        let noHay = document.createElement("p");
        noHay.classList.add("text-center","text-primary","parrafo");
        noHay.innerText = "¡Aun no agregaste nada!";
        modalBody.appendChild(noHay);

    }
    


    carritoContenedor.textContent = carrito.length;

    precioTotal.innerText = carrito.reduce((acc,producto) => acc+producto.getCantidad * producto.getPrecio, 0);

    guardarStorage();
}


function eliminarProducto(id){

   const productoId = id;

   /*Nos traemos todos los productos menos al que sea distinto al juego id */
   carrito = carrito.filter((producto)=> producto.getId != productoId);

  
    /*Como mostrar carrito es que esta pintando dentro del carrito siempre hay que llamarlo para que nos muestre los cambios, en este caso cuando lo llamamos nos elimina el item del carrito */
   mostrarCarrito();

}


function guardarStorage(){
    localStorage.setItem("carrito",JSON.stringify(carrito));
}


/*

https://www.youtube.com/watch?v=wXeVIchxiL0&t=762s

min 27:33

*/