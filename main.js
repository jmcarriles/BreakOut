let canvas = document.getElementById("mainCanvas"); //Importa el ID de un html y se lo asigna a una variable
let ctx = canvas.getContext("2d"); // DOMString que contiene el identificador del contexto que define el contexto de dibujo asociado a el lienzo

let x = canvas.width / 2; //Se define el eje x como la mitad del ancho del lienzo
let y = canvas.height - 30; //Se define el eje y xon la altura del lienzo mas 30
let dx = 1; //Definicion de las variaciones del eje x
let dy = -1; //Definicion de las variaciones del eje y
let radioPelota = 10; //Definde el radio de la pelota
let anchoPaleta = 15; //Define el ancho de la paleta
let largoPaleta = 75; //Define el largo de la paleta
let posicionXPaleta = (canvas.width - largoPaleta) / 2; //Define la posicion inicial de la paleta coo el largo del lienzo menos el largo de la paleta dividido 2
let derechaPresionada = false; //Definicion de variables de teclas presionadas seteadas en false
let izquierdaPresionada = false;
let colorPelota = 'blue'; //Color por defecto de la pelota;
let cantidadLadrillosFila = 3; //Define la cantidad de ladrillos por fila
let cantidadLadrillosColumna = 5;  //Define la cantidad de ladrillos por columna
let largoLadrillo = 75; //Define el largo de los ladrillos
let altoLadrillo = 20; //Define el alto de los ladrillos
let paddingLadrillo = 10; //Define la separacion entre ladrillos
let margenSuperiorLadrillo = 30; //Margenes para que los ladrillos no se dibujen en el borde del lienzo
let margenIzquierdoLadrillo = 30; //Margenes para que los ladrillos no se dibujen en el borde del lienzo

//Guarda los ladrillos en una matriz bidimensional que contendrá las columnas (c) de los ladrillos. 
//Cada columna contendrá, a su vez, toda la fila (f) de ladrillos. Cada ladrillo se va a representar con un objeto con las posiciones "x" e "y" en las que se dibujará
let ladrillos = [];
for (c = 0; c < cantidadLadrillosColumna; c++) {
    ladrillos[c] = [];
    for (f = 0; f < cantidadLadrillosFila; f++) {
        ladrillos[c][f] = { x: 0, y: 0, status: 1 };
    }
}

//Deteccion de colisiones de la pelota con los ladrillos
//Conmpara la posicion de cada ladrillo con la pelota y cambia la direccion de la pelota
function deteccionColisiones() {
    for (c = 0; c < cantidadLadrillosColumna; c++) {
        for (f = 0; f < cantidadLadrillosFila; f++) {
            let b = ladrillos[c][f]; //Guardo en b la posicion de los ladrillos en la matriz ej b = (x, y) donde x e y son la posicion en sus respectivos ejes
            if (b.status == 1) { //Si el estado del ladrillo es 1 (dibujado)
                if (x > b.x && x < b.x + largoLadrillo && y > b.y && y < b.y + altoLadrillo) {  //Analizo 
                    dy = -dy; //Cambio la direccion de la pelota
                    b.status = 0; //Cambio el estado del ladrillo a 0 (no dibujado)
                    generarNuevoColor();
                }
            }
        }
    }
}
//Generador de colores aleatorios en hexadecimal
function generarNuevoColor() {
    let simbolos, color;
    simbolos = "0123456789ABCDEF";
    color = "#";

    for (let i = 0; i < 6; i++) {
        color = color + simbolos[Math.floor(Math.random() * 16)];
    }
    colorPelota = color; //Cambia el color de la pelota por uno aleatorio
}

//Funcion para dibujar los ladrillos por 
function dibujarLadrillos() {
    for (c = 0; c < cantidadLadrillosColumna; c++) {
        for (f = 0; f < cantidadLadrillosFila; f++) {
            if (ladrillos[c][f].status == 1) { 
                let posicionLadrilloX = (c * (largoLadrillo + paddingLadrillo)) + margenSuperiorLadrillo;
                let posicionLadrilloY = (f * (altoLadrillo + paddingLadrillo)) + margenIzquierdoLadrillo;
                ladrillos[c][f].x = posicionLadrilloX;
                ladrillos[c][f].y = posicionLadrilloY;
                ctx.beginPath();
                ctx.rect(posicionLadrilloX, posicionLadrilloY, largoLadrillo, altoLadrillo);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function dibujarPelota() {

    ctx.beginPath();
    ctx.arc(x, y, radioPelota, 0, Math.PI * 2); //Funcion circulo (posicion eje x, posicion eje y, radio del arco, angulos iniciales y finales (en que angulo va a empezar a dibujar el circulo en radianes) )
    ctx.fillStyle = colorPelota; //Color de la pelota
    ctx.fill();
    ctx.closePath();

}

function dibujarPaleta() {
    ctx.beginPath();
    ctx.rect(posicionXPaleta, canvas.height - anchoPaleta, largoPaleta, anchoPaleta); //Funcion rectangulo (posicion eje x, posicion eje y, largo y ancho)
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}


function dibujar() {

    ctx.clearRect(0, 0, canvas.width, canvas.height); //Se borrara cuanquier cosa dibujada antes en toda el area seleccionada de los primeros dos valores (x,y)
    //Se llama a todas las funciones
    deteccionColisiones()
    dibujarPelota(); 
    dibujarPaleta();
    dibujarLadrillos();

    //Agregando sistema de colision simple

    //Cuando la posicion en x + el diferencial de x sea mayor o igual que el ancho del lienzo menos el radio de la pelota 
    //o cuando x + dx sea menor o igual que el radio de la pelota, cambio la direccion de dx haciendola negativa.

    if (x + dx >= canvas.width - radioPelota || x + dx <= radioPelota) {
        dx = -dx;
        //Llamado de funcion para generar color aleatorio 
        generarNuevoColor();


    }
    //Cuando la posicion en y + el diferencial de y sea mayor o igual que el alto del lienzo menos el radio de la pelota
    //o cuando y + dy sea menor o igual que el radio de la pelota, cambio la direccion de dy haciendola negativa.

    if (y + dy <= radioPelota) {
        dy = -dy
        //Llamado de funcion para generar color aleatorio
        generarNuevoColor();

    }

    //Aplicando final del juego y colision de paleta
    //Cuando la posicion en ele eje y mas dy sea mayor o igual al alto del lienzo - el radio de la pelota sera GAME OVER
    //exepto que la pelota rebote en la paleta

    else if (y + dy >= canvas.height - radioPelota) {

        if (x > posicionXPaleta && x < posicionXPaleta + largoPaleta) {
            dy = -1.25*dy
        }
        else {
            /* alert("GAME OVER"); */
            document.location.reload();
        }
    }

    //Define la cantidad de pixeles que se mueve la paleta y no permite que se mueva mas de los limites del lienzo
    if (derechaPresionada && posicionXPaleta < canvas.width - largoPaleta) {
        posicionXPaleta += 7;
    }
    else if (izquierdaPresionada && posicionXPaleta > 0) {
        posicionXPaleta -= 7;
    }

    x += dx; //Suma al valor de x la variacion definida, en este caso x = x + dx
    y += dy;
}

//Creacion de los liseners que escuchan los eventos de las teclas
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Funcion que se ejecuta cuando la flecha derecha o la izquierda esta presionada
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        derechaPresionada = true;
    }
    else if (e.keyCode == 37) {
        izquierdaPresionada = true;
    }
}

//Funcion funcion que se ejecuta cuando se deja de presionar la flecha derecha o izquierda.
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        derechaPresionada = false;
    }
    else if (e.keyCode == 37) {
        izquierdaPresionada = false;
    }
}

setInterval(dibujar, 10);