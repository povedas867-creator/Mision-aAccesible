/* =====================================================
   MISIÓN ACCESIBLE
   Juego educativo sobre inclusión y accesibilidad
===================================================== */


/* ================= VARIABLES ================= */

let puntos = 0;
let vidas = 3;

let misionActual = 1;

let personajeX = 30;
let personajeY = 125;

const velocidad = 20;

let pruebaActual = 0;

let misionesCompletadas = [false, false, false, false];


/* =====================================================
   CAMBIO DE PANTALLAS
===================================================== */

function mostrarPantalla(id) {

    const pantallas = document.querySelectorAll(".pantalla");

    pantallas.forEach(function(pantalla) {
        pantalla.classList.add("oculto");
    });

    document.getElementById(id).classList.remove("oculto");
}


/* ================= MENÚ ================= */

function comenzarJuego() {

    mostrarPantalla("misiones");

    actualizarMisiones();
}


function mostrarComoJugar() {

    mostrarPantalla("comoJugar");
}


function volverMenu() {

    mostrarPantalla("menu");
}


function volverMisiones() {

    mostrarPantalla("misiones");

    actualizarMisiones();
}


/* =====================================================
   SISTEMA DE MISIONES
===================================================== */

function actualizarMisiones() {

    const estado = document.getElementById("estadoMisiones");

    let cantidad = 0;

    for(let i = 0; i < misionesCompletadas.length; i++) {

        if(misionesCompletadas[i]) {
            cantidad++;
        }
    }

    estado.textContent =
        "Misiones completadas: " + cantidad + " / 4";


    /*
       La misión 1 siempre está disponible.
       Las siguientes se desbloquean al completar
       la anterior.
    */

    for(let i = 1; i <= 4; i++) {

        const boton =
            document.getElementById("btnMision" + i);

        if(i === 1 || misionesCompletadas[i - 2]) {

            boton.disabled = false;

        } else {

            boton.disabled = true;
        }
    }
}


/* =====================================================
   INICIAR MISIÓN
===================================================== */

function iniciarMision(numero) {

    misionActual = numero;

    puntos = 0;
    vidas = 3;

    pruebaActual = 0;

    personajeX = 30;
    personajeY = 125;


    document.getElementById("puntos").textContent = puntos;
    document.getElementById("vidas").textContent = vidas;


    mostrarPantalla("juego");


    /*
       Ocultamos todo primero
    */

    document.getElementById("juegoMision1")
        .classList.add("oculto");

    document.getElementById("prueba")
        .classList.add("oculto");


    /* ================= MISIÓN 1 ================= */

    if(numero === 1) {

        document.getElementById("tituloMision").textContent =
            "♿ Misión 1: Movilidad";

        document.getElementById("subtituloMision").textContent =
            "Dificultad: 🟢 Fácil";

        document.getElementById("textoMision").textContent =
            "Lleva al personaje hasta la meta utilizando la ruta accesible. Evita los obstáculos.";

        document.getElementById("juegoMision1")
            .classList.remove("oculto");

        actualizarPersonaje();
    }


    /* ================= MISIÓN 2 ================= */

    if(numero === 2) {

        document.getElementById("tituloMision").textContent =
            "🤟 Misión 2: Comunicación";

        document.getElementById("subtituloMision").textContent =
            "Dificultad: 🟡 Media";

        document.getElementById("prueba")
            .classList.remove("oculto");

        cargarMision2();
    }


    /* ================= MISIÓN 3 ================= */

    if(numero === 3) {

        document.getElementById("tituloMision").textContent =
            "👁️ Misión 3: Accesibilidad visual";

        document.getElementById("subtituloMision").textContent =
            "Dificultad: 🟠 Difícil";

        document.getElementById("prueba")
            .classList.remove("oculto");

        cargarMision3();
    }


    /* ================= MISIÓN 4 ================= */

    if(numero === 4) {

        document.getElementById("tituloMision").textContent =
            "🤝 Misión 4: Inclusión";

        document.getElementById("subtituloMision").textContent =
            "Dificultad: 🔴 Experto";

        document.getElementById("prueba")
            .classList.remove("oculto");

        cargarMision4();
    }
}


/* =====================================================
   MISIÓN 1 - MOVIMIENTO
===================================================== */

function mover(direccion) {

    if(misionActual !== 1) {
        return;
    }


    if(direccion === "derecha") {
        personajeX += velocidad;
    }

    if(direccion === "izquierda") {
        personajeX -= velocidad;
    }

    if(direccion === "arriba") {
        personajeY += velocidad;
    }

    if(direccion === "abajo") {
        personajeY -= velocidad;
    }


    /* Límites */

    if(personajeX < 0) {
        personajeX = 0;
    }

    if(personajeX > 820) {
        personajeX = 820;
    }

    if(personajeY < 0) {
        personajeY = 0;
    }

    if(personajeY > 330) {
        personajeY = 330;
    }


    actualizarPersonaje();

    comprobarObstaculos();

    comprobarMeta();
}


/* ================= ACTUALIZAR PERSONAJE ================= */

function actualizarPersonaje() {

    const personaje =
        document.getElementById("personaje");

    personaje.style.left =
        personajeX + "px";

    personaje.style.bottom =
        personajeY + "px";
}


/* ================= OBSTÁCULOS ================= */

function comprobarObstaculos() {

    /*
       Si el personaje se acerca demasiado
       a determinados puntos, pierde una vida.
    */

    const obstaculos = [
        {x: 300, y: 125},
        {x: 520, y: 125}
    ];


    for(let i = 0; i < obstaculos.length; i++) {

        let distanciaX =
            Math.abs(personajeX - obstaculos[i].x);

        let distanciaY =
            Math.abs(personajeY - obstaculos[i].y);


        if(distanciaX < 45 && distanciaY < 45) {

            perderVida();

            /*
               Lo devolvemos al inicio
               para que no pierda vidas
               constantemente.
            */

            personajeX = 30;
            personajeY = 125;

            actualizarPersonaje();

            break;
        }
    }
}


/* ================= META ================= */

function comprobarMeta() {

    /*
       Para llegar a la bandera hay que avanzar
       hacia la zona derecha y subir.
    */

    if(personajeX >= 700 && personajeY >= 280) {

        puntos += 100;

        completarMision();

    }
}


/* =====================================================
   SISTEMA DE VIDAS
===================================================== */

function perderVida() {

    vidas--;

    document.getElementById("vidas").textContent =
        vidas;


    if(vidas <= 0) {

        mostrarPantalla("derrota");
    }
}


/* =====================================================
   DATOS DE LAS MISIONES
===================================================== */


/* ================= MISIÓN 2 ================= */

const mision2 = [

    {
        icono: "🚨",

        titulo: "Situación 1",

        pregunta:
        "Una persona sorda necesita conocer una indicación durante una emergencia. ¿Qué opción facilita mejor la comunicación?",

        opciones: [

            "Gritarle más fuerte",

            "Dar la información también por escrito y mediante señalización visual",

            "Ignorar la situación"

        ],

        correcta: 1
    },


    {
        icono: "💬",

        titulo: "Situación 2",

        pregunta:
        "Una persona utiliza lengua de señas para comunicarse contigo. ¿Cuál es una forma adecuada de interactuar?",

        opciones: [

            "Mantener la atención visual y utilizar el medio de comunicación que la persona prefiera",

            "Hablar con otra persona en lugar de ella",

            "Alejarse para evitar la conversación"

        ],

        correcta: 0
    },


    {
        icono: "📢",

        titulo: "Situación 3",

        pregunta:
        "Debes comunicar una instrucción importante a un grupo diverso. ¿Cuál mensaje es más accesible?",

        opciones: [

            "¡Rápido, hagan lo que puedan!",

            "Solo explicar la información verbalmente",

            "Dar una explicación clara y acompañarla con texto o señales visuales"

        ],

        correcta: 2
    }

];


/* ================= MISIÓN 3 ================= */

const mision3 = [

    {
        icono: "🚪",

        titulo: "Prueba visual 1",

        pregunta:
        "Estás diseñando una salida de emergencia. ¿Qué elemento ayuda a que la información sea más fácil de identificar?",

        opciones: [

            "Una señal pequeña y poco visible",

            "Una señal clara, visible y ubicada en un lugar fácil de encontrar",

            "No colocar ninguna señal"

        ],

        correcta: 1
    },


    {
        icono: "🔎",

        titulo: "Prueba visual 2",

        pregunta:
        "Una página web tiene información importante. ¿Cuál diseño favorece la accesibilidad visual?",

        opciones: [

            "Texto pequeño y difícil de distinguir",

            "Información sin ningún orden",

            "Texto legible, buen contraste y estructura clara"

        ],

        correcta: 2
    },


    {
        icono: "🚌",

        titulo: "Prueba visual 3",

        pregunta:
        "En una parada de bus hay varias rutas. ¿Qué ayuda a identificar correctamente cada una?",

        opciones: [

            "Información organizada con texto claro y símbolos reconocibles",

            "Colocar todos los datos mezclados",

            "Utilizar únicamente colores sin ninguna otra indicación"

        ],

        correcta: 0
    },

    {
        icono: "🧩",

        titulo: "Reto final",

        pregunta:
        "Una señal utiliza únicamente un color para transmitir información importante. ¿Qué sería recomendable añadir?",

        opciones: [

            "Nada",

            "Un símbolo o texto que también comunique la información",

            "Hacer el color más oscuro solamente"

        ],

        correcta: 1
    }

];


/* ================= MISIÓN 4 ================= */

const mision4 = [

    {
        icono: "🏫",

        titulo: "Situación 1",

        pregunta:
        "En una actividad escolar, una persona tiene una discapacidad y necesita una adaptación para participar. ¿Qué se debe hacer?",

        opciones: [

            "Excluirla de la actividad",

            "Preguntarle qué apoyo necesita y buscar una adaptación adecuada",

            "Decidir por ella sin preguntarle"

        ],

        correcta: 1
    },


    {
        icono: "🚌",

        titulo: "Situación 2",

        pregunta:
        "Un transporte público tiene una entrada accesible. ¿Cuál es el objetivo principal de esta adaptación?",

        opciones: [

            "Permitir que diferentes personas puedan utilizar el transporte con mayor autonomía",

            "Hacer que el transporte sea más lento",

            "Reservarlo para una sola persona"

        ],

        correcta: 0
    },


    {
        icono: "🏢",

        titulo: "Situación 3",

        pregunta:
        "Una institución quiere mejorar la inclusión. ¿Cuál sería una medida adecuada?",

        opciones: [

            "Escuchar las necesidades de las personas y eliminar barreras de acceso y participación",

            "Crear reglas sin consultar a nadie",

            "Permitir la participación únicamente de algunas personas"

        ],

        correcta: 0
    },


    {
        icono: "🤝",

        titulo: "Situación 4",

        pregunta:
        "Un compañero necesita apoyo para participar en un proyecto. ¿Cuál es la mejor forma de actuar?",

        opciones: [

            "Hacer todo el trabajo por él",

            "No permitirle participar",

            "Preguntarle qué necesita y colaborar para que pueda participar"

        ],

        correcta: 2
    },


    {
        icono: "🏆",

        titulo: "RETO FINAL",

        pregunta:
        "Tu escuela quiere crear un evento para todas las personas. ¿Cuál propuesta representa mejor la inclusión?",

        opciones: [

            "Diseñar el evento considerando diferentes necesidades desde el comienzo",

            "Hacer el evento y adaptar algo solamente si aparece un problema",

            "Permitir solamente la participación de quienes no necesitan adaptaciones"

        ],

        correcta: 0
    }

];


/* =====================================================
   CARGAR MISIONES
===================================================== */

function cargarMision2() {

    pruebaActual = 0;

    mostrarPrueba(mision2);
}


function cargarMision3() {

    pruebaActual = 0;

    mostrarPrueba(mision3);
}


function cargarMision4() {

    pruebaActual = 0;

    mostrarPrueba(mision4);
}


/* =====================================================
   MOSTRAR PRUEBA
===================================================== */

function mostrarPrueba(lista) {

    const prueba = lista[pruebaActual];


    document.getElementById("iconoPrueba").textContent =
        prueba.icono;

    document.getElementById("tituloPrueba").textContent =
        prueba.titulo;

    document.getElementById("pregunta").textContent =
        prueba.pregunta;


    document.getElementById("progresoTexto").textContent =
        "Prueba " +
        (pruebaActual + 1) +
        " de " +
        lista.length;


    let porcentaje =
        ((pruebaActual + 1) / lista.length) * 100;

    document.getElementById("progresoBarra").style.width =
        porcentaje + "%";


    const opciones =
        document.getElementById("opciones");

    opciones.innerHTML = "";


    document.getElementById("mensajePrueba").textContent = "";

    document.getElementById("botonContinuar")
        .classList.add("oculto");


    prueba.opciones.forEach(function(opcion, indice) {

        const boton =
            document.createElement("button");

        boton.className = "opcion";

        boton.textContent = opcion;

        boton.onclick = function() {

            responder(indice, lista);
        };


        opciones.appendChild(boton);
    });
}


/* =====================================================
   RESPONDER
===================================================== */

function responder(indice, lista) {

    const prueba = lista[pruebaActual];

    const botones =
        document.querySelectorAll(".opcion");


    /* ================= RESPUESTA CORRECTA ================= */

    if(indice === prueba.correcta) {

        botones.forEach(function(boton) {
            boton.disabled = true;
        });


        botones[indice].classList.add("correcta");


        /*
           Puntuación según dificultad
        */

        let puntosGanados = 100;


        if(misionActual === 2) {
            puntosGanados = 100;
        }

        if(misionActual === 3) {
            puntosGanados = 150;
        }

        if(misionActual === 4) {
            puntosGanados = 200;
        }


        puntos += puntosGanados;


        document.getElementById("puntos").textContent =
            puntos;


        document.getElementById("mensajePrueba").textContent =
            "✅ ¡Correcto! +" +
            puntosGanados +
            " puntos";


        document.getElementById("botonContinuar")
            .classList.remove("oculto");

    }


    /* ================= RESPUESTA INCORRECTA ================= */

    else {

        botones[indice].classList.add("incorrecta");

        botones[indice].disabled = true;


        perderVida();


        if(vidas > 0) {

            document.getElementById("mensajePrueba").textContent =
                "❌ Respuesta incorrecta. Has perdido una vida. Inténtalo nuevamente.";

        }
    }
}


/* =====================================================
   SIGUIENTE PRUEBA
===================================================== */

function siguientePrueba() {

    let lista;


    if(misionActual === 2) {
        lista = mision2;
    }

    if(misionActual === 3) {
        lista = mision3;
    }

    if(misionActual === 4) {
        lista = mision4;
    }


    pruebaActual++;


    if(pruebaActual >= lista.length) {

        completarMision();

        return;
    }


    mostrarPrueba(lista);
}


/* =====================================================
   COMPLETAR MISIÓN
===================================================== */

function completarMision() {

    misionesCompletadas[misionActual - 1] = true;


    document.getElementById("puntosFinales").textContent =
        puntos;


    document.getElementById("nombreVictoria").textContent =
        "¡Has superado la Misión " +
        misionActual +
        "!";


    if(misionActual === 1) {

        document.getElementById("mensajeVictoria").textContent =
            "Has encontrado una ruta accesible y llegaste correctamente a la meta.";

    }

    if(misionActual === 2) {

        document.getElementById("mensajeVictoria").textContent =
            "Has demostrado que una comunicación accesible permite que más personas puedan participar.";

    }

    if(misionActual === 3) {

        document.getElementById("mensajeVictoria").textContent =
            "Has aprendido a identificar elementos que facilitan el acceso a la información.";

    }

    if(misionActual === 4) {

        document.getElementById("mensajeVictoria").textContent =
            "¡Completaste el reto final! Tus decisiones promovieron la participación y la inclusión.";

    }


    mostrarPantalla("victoria");
}


/* =====================================================
   REINTENTAR
===================================================== */

function reintentarMision() {

    iniciarMision(misionActual);
}


/* =====================================================
   TECLADO - MISIÓN 1
===================================================== */

document.addEventListener("keydown", function(event) {

    if(misionActual !== 1) {
        return;
    }


    if(event.key === "ArrowRight") {

        event.preventDefault();

        mover("derecha");
    }


    if(event.key === "ArrowLeft") {

        event.preventDefault();

        mover("izquierda");
    }


    if(event.key === "ArrowUp") {

        event.preventDefault();

        mover("arriba");
    }


    if(event.key === "ArrowDown") {

        event.preventDefault();

        mover("abajo");
    }

});