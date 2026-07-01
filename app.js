let indiceActual = 0;
let enModoTrailer = false;

// =========================
// ELEMENTOS
// =========================

const scratchPlayer = document.getElementById("scratchPlayer");
const instrucciones = document.getElementById("instrucciones");

const nombreAlumno = document.getElementById("nombreAlumno");
const nombreProyecto = document.getElementById("nombreProyecto");

const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

const btnProyecto = document.getElementById("btnProyecto");
const menuProyecto = document.getElementById("menuProyecto");
const listaProyectos = document.getElementById("listaProyectos");
const buscarAlumno = document.getElementById("buscarAlumno");

const btnTrailer = document.getElementById("btnTrailer");

const proyectoActual = document.getElementById("proyectoActual");
const totalProyectos = document.getElementById("totalProyectos");

const cargando = document.getElementById("cargando");

// =========================
// INICIO
// =========================

document.addEventListener("DOMContentLoaded", () => {
    totalProyectos.textContent = projects.length;

    renderLista();
    renderProyecto();
});

// =========================
// RENDER PRINCIPAL
// =========================

function renderProyecto() {
    const p = projects[indiceActual];

    enModoTrailer = false;

    // Reiniciar botón
    btnTrailer.textContent = "🎬 Ver tráiler";
    btnTrailer.onclick = verTrailer;

    cargando.style.display = "flex";
    scratchPlayer.style.display = "none";

    setTimeout(() => {

        // Cargar juego Scratch por defecto
        scratchPlayer.src = p.scratch;

        instrucciones.innerHTML = (p.instrucciones || "").replace(/\n/g, "<br>");
        nombreAlumno.textContent = p.alumno;
        nombreProyecto.textContent = p.proyecto;

        proyectoActual.textContent = indiceActual + 1;

        // Mostrar u ocultar botón
        if (p.trailer && p.trailer.trim() !== "") {
            btnTrailer.style.display = "block";
        } else {
            btnTrailer.style.display = "none";
            
        }

        cargando.style.display = "none";
        scratchPlayer.style.display = "block";

    }, 400);
}

// =========================
// VER TRAILER
// =========================

function verTrailer() {
    const p = projects[indiceActual];

    if (!p.trailer || p.trailer.trim() === "") return;

    enModoTrailer = true;

    scratchPlayer.src = p.trailer;

    btnTrailer.textContent = "▶ Volver al juego";
    btnTrailer.onclick = volverAlJuego;
}

// =========================
// VOLVER A SCRATCH
// =========================

function volverAlJuego() {
    const p = projects[indiceActual];

    enModoTrailer = false;

    scratchPlayer.src = p.scratch;

    btnTrailer.textContent = "🎬 Ver tráiler";
    btnTrailer.onclick = verTrailer;
}

// =========================
// NAVEGACIÓN
// =========================

btnSiguiente.addEventListener("click", () => {
    indiceActual = (indiceActual + 1) % projects.length;
    renderProyecto();
});

btnAnterior.addEventListener("click", () => {
    indiceActual = (indiceActual - 1 + projects.length) % projects.length;
    renderProyecto();
});

// =========================
// LISTA PROYECTOS
// =========================

btnProyecto.addEventListener("click", () => {
    menuProyecto.classList.toggle("oculto");
});

document.addEventListener("click", (e) => {
    if (!btnProyecto.contains(e.target) && !menuProyecto.contains(e.target)) {
        menuProyecto.classList.add("oculto");
    }
});

function renderLista(filtro = "") {
    listaProyectos.innerHTML = "";

    projects.forEach((p, index) => {

        if (!p.alumno.toLowerCase().includes(filtro.toLowerCase())) return;

        const item = document.createElement("div");
        item.className = "itemProyecto";

        item.textContent = `${p.alumno} — ${p.proyecto}`;

        item.addEventListener("click", () => {
            indiceActual = index;
            renderProyecto();
            menuProyecto.classList.add("oculto");
        });

        listaProyectos.appendChild(item);
    });
}

buscarAlumno.addEventListener("input", (e) => {
    renderLista(e.target.value);
});