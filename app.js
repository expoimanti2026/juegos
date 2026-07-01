let indiceActual = 0;
let enModoTrailer = false;

// ======================================
// ORDEN ACTUAL DE LOS PROYECTOS
// ======================================

let orden = [];

// ======================================
// ELEMENTOS
// ======================================

const scratchPlayer = document.getElementById("scratchPlayer");
const instrucciones = document.getElementById("instrucciones");

const nombreAlumno = document.getElementById("nombreAlumno");
const nombreProyecto = document.getElementById("nombreProyecto");

const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

const btnProyecto = document.getElementById("btnProyecto");
const btnRandom = document.getElementById("btnRandom");
const btnOrden = document.getElementById("btnOrden");

const menuProyecto = document.getElementById("menuProyecto");
const listaProyectos = document.getElementById("listaProyectos");
const buscarAlumno = document.getElementById("buscarAlumno");

const btnTrailer = document.getElementById("btnTrailer");

const proyectoActual = document.getElementById("proyectoActual");
const totalProyectos = document.getElementById("totalProyectos");

const cargando = document.getElementById("cargando");

// ======================================
// INICIO
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    totalProyectos.textContent = projects.length;

    orden = projects.map((_, i) => i);

    renderLista();
    renderProyecto();

});

// ======================================
// RENDER PRINCIPAL
// ======================================

function renderProyecto() {

    const p = projects[orden[indiceActual]];

    enModoTrailer = false;

    btnTrailer.textContent = "🎬 Ver tráiler";
    btnTrailer.onclick = verTrailer;

    cargando.style.display = "flex";
    scratchPlayer.style.display = "none";

    setTimeout(() => {

        scratchPlayer.src = p.scratch;

        instrucciones.innerHTML =
            (p.instrucciones || "").replace(/\n/g, "<br>");

        nombreAlumno.textContent = p.alumno;
        nombreProyecto.textContent = p.proyecto;

        proyectoActual.textContent = indiceActual + 1;

        if (p.trailer && p.trailer.trim() !== "") {

            btnTrailer.style.display = "block";

        } else {

            btnTrailer.style.display = "none";

        }

        cargando.style.display = "none";
        scratchPlayer.style.display = "block";

    }, 400);

}

// ======================================
// TRÁILER
// ======================================

function verTrailer() {

    const p = projects[orden[indiceActual]];

    if (!p.trailer || p.trailer.trim() === "") return;

    enModoTrailer = true;

    scratchPlayer.src = p.trailer;

    btnTrailer.textContent = "▶ Volver al juego";
    btnTrailer.onclick = volverAlJuego;

}

function volverAlJuego() {

    const p = projects[orden[indiceActual]];

    enModoTrailer = false;

    scratchPlayer.src = p.scratch;

    btnTrailer.textContent = "🎬 Ver tráiler";
    btnTrailer.onclick = verTrailer;

}

// ======================================
// NAVEGACIÓN
// ======================================

btnSiguiente.addEventListener("click", () => {

    indiceActual = (indiceActual + 1) % orden.length;
    renderProyecto();

});

btnAnterior.addEventListener("click", () => {

    indiceActual--;

    if (indiceActual < 0)
        indiceActual = orden.length - 1;

    renderProyecto();

});

// ======================================
// BOTÓN ALEATORIO
// ======================================

btnRandom.addEventListener("click", () => {

    if (orden.length <= 1) return;

    let nuevo;

    do {

        nuevo = Math.floor(Math.random() * orden.length);

    } while (nuevo === indiceActual);

    indiceActual = nuevo;

    renderProyecto();

});

// ======================================
// MENÚ
// ======================================

btnProyecto.addEventListener("click", () => {

    menuProyecto.classList.toggle("oculto");

    if (!menuProyecto.classList.contains("oculto")) {

        buscarAlumno.focus();
        buscarAlumno.select();

    }

});

document.addEventListener("click", (e) => {

    if (
        !btnProyecto.contains(e.target) &&
        !menuProyecto.contains(e.target)
    ) {

        menuProyecto.classList.add("oculto");

        buscarAlumno.value = "";
        renderLista();

    }

});

// ======================================
// ORDENAR
// ======================================


function renderLista(filtro = "") {

    listaProyectos.innerHTML = "";

    const texto = filtro.toLowerCase();

    orden.forEach((index, pos) => {

        const p = projects[index];

        if (!p.alumno.toLowerCase().includes(texto)) return;

        const item = document.createElement("div");
        item.className = "proyecto";

        item.innerHTML = `
            <h3>${p.alumno}</h3>
            <p>${p.proyecto}</p>
        `;

        item.addEventListener("click", () => {

            indiceActual = pos;

            renderProyecto();

            menuProyecto.classList.add("oculto");

            buscarAlumno.value = "";

        });

        listaProyectos.appendChild(item);

    });

}

// ======================================
// BÚSQUEDA
// ======================================

buscarAlumno.addEventListener("input", (e) => {

    renderLista(e.target.value);

});