let canvas = document.getElementById("mainCanvas"); //Importa el ID de un html y se lo asigna a una variable
let ctx = canvas.getContext("2d"); // DOMString que contiene el identificador del contexto que define el contexto de dibujo asociado a el lienzo

let x = canvas.width/2; //Se define el eje x como la mitad del ancho del lienzo
let y = canvas.height -30; //Se define el eje y xon la altura del lienzo mas 30
let dx= 2; //Definicion de las variaciones del eje x
let dy= -2; //Definicion de las variaciones del eje y
let radioPelota = 10; //Definde el radio de la pelota
let anchoPaleta = 20; //Define el ancho de la paleta
let largoPaleta = 75; //Define el largo de la paleta
let posicionXPaleta = (canvas.width - largoPaleta)/2; //Define la posicion inicial de la paleta coo el largo del lienzo menos el largo de la paleta dividido 2
let derechaPresionada = false;
let izquierdaPresionada = false;

function dibujarPelota() {

    ctx.beginPath();
    ctx.arc(x, y, radioPelota, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    
}

function dibujarPaleta() {
    ctx.beginPath();
    ctx.rect(posicionXPaleta, canvas.height-anchoPaleta, largoPaleta, anchoPaleta);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function dibujar(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Se borrara cuanquier cosa dibujada antes en toda el area seleccionada de los primeros dos valores (x,y)
    dibujarPelota(); //Se llama a la funcion dibujar pelota
    dibujarPaleta();

    //Agregando sistema de colision simple

    //Cuando la posicion en x + el diferencial de x sea mayor o igual que el ancho del lienzo menos el radio de la pelota 
    //o cuando x + dx sea menor o igual que el radio de la pelota, cambio la direccion de dx haciendola negativa.
    
    if(x + dx >= canvas.width - radioPelota || x + dx <= radioPelota){
        dx = -dx;
    }
    //Cuando la posicion en y + el diferencial de y sea mayor o igual que el alto del lienzo menos el radio de la pelota
    //o cuando y + dy sea menor o igual que el radio de la pelota, cambio la direccion de dy haciendola negativa.

    if(y + dy <= radioPelota){
        dy = -dy
    }
    else if (y + dy >= canvas.height - radioPelota){
        alert('GAME OVER')
        document.location.reload();
    }

    if(derechaPresionada && posicionXPaleta < canvas.width - largoPaleta) {
        posicionXPaleta += 7;
    }
    else if(izquierdaPresionada && posicionXPaleta > 0) {
        posicionXPaleta -= 7;
    }

    x += dx; //Suma al valor de x la variacion definida, en este caso x = x + dx
    y += dy; 
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        derechaPresionada = true;
    }
    else if(e.keyCode == 37) {
        izquierdaPresionada = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        derechaPresionada = false;
    }
    else if(e.keyCode == 37) {
        izquierdaPresionada = false;
    }
}

setInterval(dibujar,10) //