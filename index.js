const palabrasPorCategoriaNivel = {
    'Frutas': {
        'Facil': ["Mango", "Uva", "Piña", "Papaya", "Lulo", "Guayaba", "Fresa", "Banano", "Naranja", "Limón", "Mandarina", "Sandía"],
        'Medio': ["Mamoncillo", "Maracuyá", "Zapote", "Carambolo", "Chirimoya", "Feijoa", "Granadilla", "Curuba", "Guanábana", "Tomate de árbol", "Pitahaya", "Tamarindo"],
        'Dificil': ["Borojó", "Uchuva", "Copoazú", "Arrayán", "Achiotillo", "Anón", "Yacón", "Jocote", "Zapote", "blanco", "Chontaduro", "Níspero", "Asaí"]
    },
    'Colores': {
        'Facil': ["Rojo", "Azul", "Verde", "Amarillo", "Blanco", "Negro", "Gris", "Rosa", "Morado", "Naranja", "Dorado", "Plateado"],
        'Medio': ["Turquesa", "Esmeralda", "Índigo", "Caoba", "Canela", "Zafiro", "Aguamarina", "Ámbar", "Púrpura", "Lavanda", "Azabache", "Celeste"],
        'Dificil': ["Rubí", "Azafrán", "Ópalo", "Carmesí", "Bistre", "Carminio", "Añil", "Almendra", "Cian", "Lila", "Tornasol", "Gualdo"]
    },
    'Animales': {
        'Facil': ["Perro", "Gato", "Pato", "Gallina", "Vaca", "Mono", "Oso", "Pavo", "Burro", "Zorro", "Pato", "Loro"],
        'Medio': ["Nutria", "Iguana", "Zarigüeya", "Guacamaya", "Armadillo", "Tapir", "Tejón", "Danta", "Coatí", "Agutí", "Zaino", "Caimán"],
        'Dificil': ["Tití", "Ocelote", "Tucán", "Condor", "Pingüino","Leopardo", "Erizo", "Suricata","Murciélago", "Huron", "Camaleon","Perdiz"]//
    }
};
const imagenesFalloFacil = [
    "muñeco/otro8.png",
    "muñeco/otro.png",
    "muñeco/otro2.png",
    "muñeco/otro3.png",
    "muñeco/otro7.png",
    "muñeco/otro6.png",
    "muñeco/otro5.png",
    "muñeco/otro4.png"

];

const imagenesFalloMedio = [
    "muñeco/otro.png",
    "muñeco/otro2.png",
    "muñeco/otro3.png",
    "muñeco/otro6.png",
    "muñeco/otro5.png",
    "muñeco/otro4.png"

];

const imagenesFalloDificil = [
    "muñeco/otro.png",
    "muñeco/otro2.png",
    "muñeco/otro3.png",
    "muñeco/otro6.png",
    "muñeco/otro4.png"

];

const oportunidadesPorNivel = {
    facil: 8,
    medio: 6,
    dificil: 5
};

let palabra = "";
let PalOculta = [];
const contador = document.getElementById("contador");

function generaPalabra(categoria, nivel) {
    botonClick()

    const palabras = palabrasPorCategoriaNivel[categoria][nivel];
    console.log(categoria)
    categoriaNivel()
    //   obtenerOportunidades()
    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    console.log(palabra);
    PalOculta = Array(palabra.length).fill("_");
    pintarGuiones();
    habilitarBotones();
}
function generaPalabra(categoria, nivel) {
    botonClick();
    const palabras = palabrasPorCategoriaNivel[categoria][nivel];
    console.log(categoria);
    categoriaNivel();
    if (nivel === "Facil") {
        contador.textContent = oportunidadesPorNivel.facil;
    } else if (nivel === "Medio") {
        contador.textContent = oportunidadesPorNivel.medio;
    } else if (nivel === "Dificil") {
        contador.textContent = oportunidadesPorNivel.dificil;
    }
    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    console.log(palabra);
    PalOculta = Array(palabra.length).fill("_");
    pintarGuiones();
    habilitarBotones();
}


function pintarGuiones() {
    let guiones = "";
    for (let i = 0; i < PalOculta.length; i++) {
        guiones += PalOculta[i] + " ";
    }
    document.getElementById("palabra").textContent = guiones;
}

function habilitarBotones() {
    const letras = document.querySelectorAll(".tecla");
    letras.forEach(letra => {
        letra.disabled = false;
    });
}

function generaABC() {
    const letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const tecladoDiv = document.getElementById("abcdario");

    letras.forEach(letra => {
        const boton = document.createElement("button");
        boton.textContent = letra;
        boton.classList.add("tecla");
        tecladoDiv.appendChild(boton);
        boton.addEventListener("click", () => {
            intento(letra);
            if (nivel !== "Dificil") {
                boton.disabled = true;
            }
        });
    });

}



function intento(letra) {
    let contadorValor = parseInt(contador.textContent);

    if (contadorValor === 1) {
        contador.textContent = 0;
        mostrarImagenFallo(nivel);
        setTimeout(() => {
            finDelJuego(false);
        }, 200);
        return;
    }

    let acierto = false;
    for (let i = 0; i < palabra.length; i++) {
        const letraPalabra = palabra[i].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const letraIntroducida = letra.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (letraPalabra === letraIntroducida) {
            PalOculta[i] = palabra[i];
            acierto = true;
        }
    }

    if (acierto) {
        pintarGuiones();
        if (haGanado()) {
            setTimeout(() => {
                finDelJuego(true);
            }, 1000);
        }
    } else {
        console.log("Letra incorrecta. Inténtalo de nuevo.");
        contador.textContent--;
        mostrarImagenFallo(nivel);
    }
}

function mostrarImagenFallo(nivel) {
    const nivelActual = nivel.toLowerCase();
    const imagenOjo = document.getElementById("ojo");
    const imagenFallo = document.getElementById("imagen");

    imagenOjo.style.display = "none";

    let imagenesFallo;
    if (nivel === "Facil") {
        imagenesFallo = imagenesFalloFacil;
    } else if (nivel === "Medio") {
        imagenesFallo = imagenesFalloMedio;
    } else if (nivel === "Dificil") {
        imagenesFallo = imagenesFalloDificil;
    }

    const contadorValor = parseInt(contador.textContent);
    const indiceImagen = oportunidadesPorNivel[nivelActual] - contadorValor - 1;

    if (indiceImagen >= 0 && indiceImagen < imagenesFallo.length) {
        imagenFallo.src = imagenesFallo[indiceImagen];
        imagenFallo.style.display = "block";
    }
}
function haGanado() {
    return PalOculta.every(letra => letra !== "_");
}

function finDelJuego(ganador) {

    const modal = document.createElement("div");
    modal.id = "modalFinJuego";
    modal.classList.add("modal");

    const contenido = document.createElement("div");
    contenido.classList.add("contenido-modal");

    if (ganador) {

        contenido.innerHTML = `
              <div id="finalx">
                <h1 id="xx">¡Felicidades!</h1>
                <p id="vd">Has adivinado la palabra correctamente.</p>
                <img id="vic" src="https://media.tenor.com/0ENB5HuTH0gAAAAj/trophy-beker.gif" alt="Victoria" />
              </div>
            `;

    } else {

        contenido.innerHTML = `
              <div id="final">
                <h1 id="x">¡Oh no! Has perdido.</h1>
                <p id="vf">La palabra era:<p id="secu">${palabra}<p></p>
                <img id="per" src="https://i.gifer.com/K7Zl.gif" />
              </div>
            `;
    }


    const btnCerrar = document.createElement("button");
    btnCerrar.id = "btnCerrarModal";
    btnCerrar.textContent = "Volver a Jugar";
    btnCerrar.addEventListener("click", () => {
        modal.style.display = "none";
    });

contenido.appendChild(btnCerrar);

modal.appendChild(contenido);

document.body.appendChild(modal);

modal.style.display = "block";
modal.classList.add("aparecer");

    otra();
}

function otra() {
    inicio();
    document.getElementById("imagen").src = ""; // Limpiar la imagen
    const imagenOjo = document.getElementById("ojo");
    if (imagenOjo) {
        imagenOjo.style.display = "block";
    }
}
let categoria;
let nivel;

function inicio() {
    generaPalabra(categoria, nivel);
    pintarGuiones();
}

function botonClick() {
    const botonesCategorias = document.querySelectorAll('.categoria');

    botonesCategorias.forEach(boton => {
        boton.addEventListener('click', () => {
            categoria = boton.getAttribute('data-categoria');
            const nivelesBotones = document.querySelectorAll('.nivel');
            nivelesBotones.forEach(nivelBoton => {
                nivelBoton.addEventListener('click', () => {
                    nivel = nivelBoton.getAttribute('data-nivel');
                    inicio();
                    document.getElementById('categoriasModal').style.display = 'none';
                    document.getElementById('dificultadModal').style.display = 'block';
                });
            });
        });
    });
}

botonClick();

function categoriaNivel() {
    // Crear elementos HTML para mostrar la categoría y el nivel
    const categoriaElement = document.createElement("h1");
    categoriaElement.textContent = "Categoría: " + categoria;
    document.getElementById("categoriaContainer").innerHTML = ''; // Limpiar contenido previo
    document.getElementById("categoriaContainer").appendChild(categoriaElement);

    const nivelElement = document.createElement("h2");
    nivelElement.textContent = "Nivel: " + nivel;
    document.getElementById("nivelContainer").innerHTML = ''; // Limpiar contenido previo
    document.getElementById("nivelContainer").appendChild(nivelElement);
}

document.addEventListener("DOMContentLoaded", () => {
    generaABC();
    inicio();
});

