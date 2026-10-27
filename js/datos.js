/* ============================================================
   ARTIKA STUDIO · DATOS EDITABLES
   Este es el ÚNICO archivo que necesitas tocar para mantener la página.
   - Cambiar de temporada (Halloween → Navidad): cambia TEMPORADA_ACTUAL y agrega las fotos en TEMPORADAS.
   - Cambiar las fotos del carrusel del inicio: edita CARRUSELES (fotos en img/inicio/).
   - Cambiar teléfono o redes: edita el bloque NEGOCIO.
   Las fotos se guardan en img/ dentro de la carpeta de su sección (logos, inicio, kits, tematicas, materas, ceramicas, temporada) y aquí se escribe carpeta/nombre, por ejemplo "materas/matera-flor.jpg".
   ============================================================ */

const NEGOCIO = {
  nombre: "Artika Studio",
  lema: "¡Donde el arte cobra vida!",
  whatsapp: "573142702549",          // solo números, con el 57 adelante
  whatsappVisible: "+57 314 270 2549",
  instagram: "artika.studio_col",
  tiktok: "artika.studio_col"
};

/* ------------------------------------------------------------
   TEMPORADAS
   - TEMPORADA_ACTUAL es la que se muestra en el menú, en el inicio y primero en la página
     "Temporada". Para cambiar de temporada solo cambia esa palabra por el "id" de otra
     (halloween, navidad, amor, madres o ninos). Los colores cambian solos.
   - Las demás temporadas aparecen abajo, en "Otras temporadas", para que el visitante entre a verlas.
   - Para agregar fotos a una temporada: copia las fotos a img/temporada/ y añade una línea
         { img: "foto.jpg", nombre: "Árbol", medida: "7 cm x 5 cm" }
     dentro de su lista "items" (con una coma después de la línea anterior).
     Mientras "items" esté vacío, la página dice que las figuras llegarán pronto.
   - "tema" es el estilo de colores: halloween, navidad, amor, madres o ninos.
   ------------------------------------------------------------ */
/* "auto" = la página cambia sola de temporada según la fecha (ver "desde" y "hasta" de cada una).
   Si prefieres fijar una, escribe su id: "halloween", "navidad", "amor", "madres" o "ninos".
   Para ver cómo se vería en otra fecha, agrega ?fecha=2026-12-01 al final de la dirección. */
const TEMPORADA_ACTUAL = "auto";

/* Fecha de hoy (o la de ?fecha=AAAA-MM-DD, solo para probar) */
const HOY = (function () {
  var p = /[?&]fecha=(\d{4})-(\d{2})-(\d{2})/.exec(location.search);
  var h = p ? new Date(+p[1], +p[2] - 1, +p[3]) : new Date();
  return new Date(h.getFullYear(), h.getMonth(), h.getDate());
})();

/* Ayudas para fiestas que cambian de día cada año (no hace falta tocarlas) */
function tercerSabado(a, mes) { var d = new Date(a, mes, 1); d.setDate(1 + ((6 - d.getDay() + 7) % 7) + 14); return d; }
function segundoDomingo(a, mes) { var d = new Date(a, mes, 1); d.setDate(1 + ((7 - d.getDay()) % 7) + 7); return d; }
function ultimoSabado(a, mes) { var d = new Date(a, mes + 1, 0); d.setDate(d.getDate() - ((d.getDay() + 1) % 7)); return d; }


const TEMPORADAS = [
  {
    id: "halloween",
    tema: "halloween",
    menu: "Halloween",
    emoji: "🎃",
    desde: "10-01", hasta: "11-02",          // se muestra del 1 de octubre al 2 de noviembre
    fecha: function (a) { return new Date(a, 9, 31); },
    para: "Halloween",
    titulo: "Especial de Halloween",
    texto: "Figuras de yeso para pintar con temática de Halloween: momias, calabazas, fantasmas, brujas y mucho más. Perfectas para fiestas, dulceros y talleres. Se pueden pedir en kits o al por mayor.",
    items: [
    { img: "temporada/h-momia.jpg",    nombre: "Momia",        medida: "6 cm x 4.5 cm" },
    { img: "temporada/h-calabaza.jpg", nombre: "Calabaza",     medida: "6 cm x 5.5 cm" },
    { img: "temporada/h-dracula.jpg",  nombre: "Drácula",      medida: "6 cm x 5 cm" },
    { img: "temporada/h-diablito.jpg", nombre: "Diablito",     medida: "6.5 cm x 5.5 cm" },
    { img: "temporada/h-oso.jpg",      nombre: "Oso calabaza", medida: "7 cm x 7 cm" },
    { img: "temporada/h-fantasma.jpg", nombre: "Fantasma",     medida: "5 cm x 5 cm" },
    { img: "temporada/h-olla.jpg",     nombre: "Olla",         medida: "5.5 cm x 5 cm" },
    { img: "temporada/h-bruja.jpg",    nombre: "Bruja",        medida: "7 cm x 5.5 cm" }
    ]
  },
  {
    id: "navidad",
    tema: "navidad",
    menu: "Navidad",
    emoji: "🎄",
    desde: "11-10", hasta: "01-06",          // del 10 de noviembre al 6 de enero
    fecha: function (a) { return new Date(a, 11, 25); },
    para: "Navidad",
    titulo: "Especial de Navidad",
    texto: "Figuras de yeso para pintar con temática navideña, ideales para decorar, regalar y compartir en familia. Se pueden pedir en kits o al por mayor.",
    items: [
      /* { img: "n-arbol.jpg", nombre: "Árbol", medida: "7 cm x 5 cm" }, */
    ]
  },
  {
    id: "amor",
    tema: "amor",
    menu: "Amor y amistad",
    emoji: "💝",
    desde: "08-25", hasta: "09-21",
    fecha: function (a) { return tercerSabado(a, 8); },   // tercer sábado de septiembre
    para: "Amor y amistad",
    titulo: "Amor y amistad",
    texto: "Detalles de yeso para regalar a esa persona especial o a tus mejores amigos. Se pueden pedir en kits o al por mayor.",
    items: []
  },
  {
    id: "madres",
    tema: "madres",
    menu: "Día de la madre",
    emoji: "💐",
    desde: "05-01", hasta: "05-15",
    fecha: function (a) { return segundoDomingo(a, 4); }, // segundo domingo de mayo
    para: "el Día de la madre",
    titulo: "Día de la madre",
    texto: "Figuras, materas y floreros para sorprender a mamá con un detalle hecho con cariño. Se pueden pedir en kits o al por mayor.",
    items: []
  },
  {
    id: "ninos",
    tema: "ninos",
    menu: "Día de los niños",
    emoji: "🎈",
    desde: "04-01", hasta: "04-30",
    fecha: function (a) { return ultimoSabado(a, 3); },   // último sábado de abril
    para: "el Día de los niños",
    titulo: "Día de los niños",
    texto: "Kits de yeso para pintar, ideales para celebrar con los más pequeños en fiestas, colegios y talleres. Se pueden pedir en kits o al por mayor.",
    items: []
  }
];

/* No necesitas tocar lo que sigue: elige la temporada actual */
function temporadaPorFecha(hoy) {
  var y = hoy.getFullYear(), mejor = null, dias = 1e9;
  function f(mmdd, anio) { var p = mmdd.split("-"); return new Date(anio, +p[0] - 1, +p[1]); }
  for (var i = 0; i < TEMPORADAS.length; i++) {
    var t = TEMPORADAS[i];
    if (!t.desde) continue;
    var ini = f(t.desde, y), fin = f(t.hasta, y);
    if (fin < ini) { // cruza el año nuevo (Navidad)
      if (hoy >= ini || hoy <= fin) return t;
    } else if (hoy >= ini && hoy <= fin) return t;
    var prox = ini < hoy ? f(t.desde, y + 1) : ini; // si no hay ninguna en curso, la que empieza primero
    var falta = (prox - hoy) / 864e5;
    if (falta < dias) { dias = falta; mejor = t; }
  }
  return mejor || TEMPORADAS[0];
}
const TEMPORADA = TEMPORADA_ACTUAL === "auto"
  ? temporadaPorFecha(HOY)
  : (TEMPORADAS.filter(function (t) { return t.id === TEMPORADA_ACTUAL; })[0] || TEMPORADAS[0]);

/* ------------------------------------------------------------
   CARRUSEL DEL INICIO
   Las fotos están en la carpeta  img/inicio/ . Para cambiar una foto, ponla en esa carpeta
   y escribe su nombre aquí. Para quitar una, borra su línea.
   ------------------------------------------------------------ */
const CARRUSELES = {
  inicio: [
    { img: "kit-mini.jpg", texto: "Mini kit" },
    { img: "t-espacial-nave.jpg", texto: "Nave espacial" },
    { img: "matera-flor.jpg", texto: "Matera flor" },
    { img: "kit-duo.jpg", texto: "Duo kit" },
    { img: "t-sanrio-hello-kitty-1.jpg", texto: "Hello Kitty" },
    { img: "angel-salud.jpg", texto: "Ángel de la salud" },
    { img: "kit-maxi.jpg", texto: "Maxi kit" },
    { img: "t-osos-panda-curioso.jpg", texto: "Panda curioso" },
    { img: "col-dragon.jpg", texto: "Dragón de cerámica" },
    { img: "floreros-lila.jpg", texto: "Set florero lila" }
  ]
};

/* ------------------------------------------------------------
   CERÁMICAS (página Cerámicas)
   La página tiene dos opciones: "Pintadas" y "Sin pintar". Las dos usan estas mismas categorías.
   Cada figura puede tener:
     nombre, medida
     img         foto de la figura sin pintar
     imgPintado  foto de la figura ya pintada (opcional; si no hay, en "Pintadas" se muestra
                 la foto sin pintar con la etiqueta "Modelo sin pintar")
     crudo       precio sin pintar     (opcional; si falta dice "Cotiza el precio")
     pintado     precio pintada a mano (opcional)
     solo        "pintada" = aparece solo en Pintadas · "sin" = aparece solo en Sin pintar
   CÓMO AGREGAR UNA FIGURA: copia la foto a img/ y añade una línea nueva dentro de la
   categoría que corresponda (con una coma después de la línea anterior).
   CÓMO AGREGAR UNA CATEGORÍA: copia un bloque completo { id: ..., items: [ ... ] }.
   Los precios están en pesos colombianos y se escriben como texto: "25.600".
   ------------------------------------------------------------ */
const CERAMICAS = [
  {
    id: "alcancias",
    emoji: "🐷",
    titulo: "Alcancías",
    texto: "Para guardar con estilo: personajes en cerámica con ranura para ahorrar.",
    items: [
        { nombre: "Minion", medida: "15 cm", img: "ceramicas/cer-a-minion.jpg", crudo: "9.400", pintado: "12.600" },
        { nombre: "Darth Vader", medida: "13 cm", img: "ceramicas/cer-a-darth.jpg", crudo: "7.100", pintado: "11.200" },
        { nombre: "Gata Marie", medida: "28 cm", img: "ceramicas/cer-a-gata.jpg", crudo: "14.800", pintado: "16.000" },
        { nombre: "Lotso", medida: "16 cm", img: "ceramicas/cer-a-lotso.jpg", imgPintado: "ceramicas/cerp-a-lotso.jpg", crudo: "11.400", pintado: "18.000" },
        { nombre: "Garfield", medida: "19 cm", img: "ceramicas/cer-a-garfield.jpg", crudo: "11.900", pintado: "15.000" },
        { nombre: "Kuromi", medida: "26 cm", img: "ceramicas/cer-a-kuromi.jpg", crudo: "19.500", pintado: "25.000" },
        { nombre: "Arturito (R2-D2)", medida: "12 cm", img: "ceramicas/cer-a-arturo.jpg", crudo: "7.200", pintado: "15.000" },
        { nombre: "BB-8", medida: "14 cm", img: "ceramicas/cer-a-bb8.jpg", crudo: "7.800", pintado: "15.000" },
        { nombre: "Chewbacca", medida: "14 cm", img: "ceramicas/cer-a-chewbacca.jpg", crudo: "7.800", pintado: "15.000" },
        { nombre: "Soldado imperial", medida: "15 cm", img: "ceramicas/cer-a-soldado.jpg", crudo: "7.800", pintado: "15.000" }
    ]
  },
  {
    id: "heroes",
    emoji: "🦸",
    titulo: "Superhéroes y muñecos",
    texto: "Muñecos de superhéroes en cerámica. Los de 24 cm son alcancías.",
    items: [
        { nombre: "Spiderman", medida: "20 cm", img: "ceramicas/cer-spiderman20.jpg", imgPintado: "ceramicas/cerp-spiderman20.jpg", crudo: "12.900", pintado: "35.000" },
        { nombre: "Spiderman alcancía", medida: "24 cm", img: "ceramicas/cer-a-spiderman.jpg", crudo: "13.800", pintado: "34.600" },
        { nombre: "Superman alcancía", medida: "24 cm", img: "ceramicas/cer-a-superman.jpg", crudo: "13.800", pintado: "34.600" },
        { nombre: "Iron Man alcancía", medida: "24 cm", img: "ceramicas/cer-a-ironman.jpg", crudo: "13.800", pintado: "34.600" },
        { nombre: "Capitán América alcancía", medida: "24 cm", img: "ceramicas/cer-a-capitan.jpg", crudo: "13.800", pintado: "34.600" },
        { nombre: "Batman alcancía", medida: "24 cm", img: "ceramicas/cer-a-batman.jpg", imgPintado: "ceramicas/cerp-a-batman.jpg", crudo: "13.800", pintado: "34.600" },
        { nombre: "Mujer Maravilla alcancía", medida: "24 cm", img: "ceramicas/cer-a-mujer.jpg", crudo: "13.800", pintado: "34.600" },
        { nombre: "Wolverine alcancía", medida: "24 cm", img: "ceramicas/cer-a-wolverine.jpg", crudo: "13.800", pintado: "34.600" },
        { nombre: "Hulk alcancía", medida: "24 cm", img: "ceramicas/cer-a-hulk.jpg", crudo: "13.800", pintado: "34.600" },
        { nombre: "Spiderman negro", medida: "", img: "ceramicas/cerp-spiderman-negro.jpg", imgPintado: "ceramicas/cerp-spiderman-negro.jpg", solo: "pintada" }
    ]
  },
  {
    id: "religiosas",
    emoji: "🕊️",
    titulo: "Religiosas",
    texto: "Ángeles y vírgenes hechos a mano. Cotiza el tuyo por WhatsApp.",
    items: [
        { nombre: "Ángel · Salud", medida: "11 cm x 9 cm", img: "ceramicas/angel-salud.jpg", imgPintado: "ceramicas/angel-salud.jpg", solo: "pintada" },
        { nombre: "Ángel · Dinero", medida: "11 cm x 9 cm", img: "ceramicas/angel-dinero.jpg", imgPintado: "ceramicas/angel-dinero.jpg", solo: "pintada" },
        { nombre: "Ángel · Abundancia", medida: "11 cm x 9 cm", img: "ceramicas/angel-abundancia.jpg", imgPintado: "ceramicas/angel-abundancia.jpg", solo: "pintada" },
        { nombre: "Ángel · Amor", medida: "11 cm x 9 cm", img: "ceramicas/angel-amor.jpg", imgPintado: "ceramicas/angel-amor.jpg", solo: "pintada" },
        { nombre: "Ángel", medida: "11 cm x 9 cm", img: "tematicas/t-angel-virgen-angel.jpg", solo: "sin" },
        { nombre: "Virgen de Guadalupe", medida: "", img: "tematicas/t-angel-virgen-virgen.jpg", imgPintado: "ceramicas/virgen.jpg" },
        { nombre: "Virgen con el niño", medida: "", img: "ceramicas/cerp-virgen-nino.jpg", imgPintado: "ceramicas/cerp-virgen-nino.jpg", solo: "pintada" },
        { nombre: "La última cena", medida: "", img: "ceramicas/cerp-ultima-cena.jpg", imgPintado: "ceramicas/cerp-ultima-cena.jpg", solo: "pintada" }
    ]
  },
  {
    id: "decorativas",
    emoji: "🏺",
    titulo: "Figuras decorativas",
    texto: "Figuras de cerámica de colección para regalar, coleccionar o decorar.",
    items: [
        { nombre: "Cocinero", medida: "37 cm", img: "ceramicas/col-cocinero.jpg", crudo: "25.600", pintado: "51.200" },
        { nombre: "Dragón", medida: "30 cm", img: "ceramicas/col-dragon.jpg", crudo: "28.000", pintado: "60.000" },
        { nombre: "Pennywise", medida: "24 cm", img: "ceramicas/cer-pennywise.jpg", crudo: "15.000", pintado: "20.000" },
        { nombre: "Cadaveras", medida: "25 cm", img: "ceramicas/cer-cadaveras.jpg", crudo: "12.800", pintado: "13.500" },
        { nombre: "Minnie", medida: "19 cm", img: "ceramicas/cer-minnie.jpg", crudo: "12.400", pintado: "18.500" },
        { nombre: "Mickey", medida: "19 cm", img: "ceramicas/cer-mickey.jpg", crudo: "12.400", pintado: "18.500" },
        { nombre: "Mario", medida: "12 cm", img: "ceramicas/cer-mario.jpg", crudo: "6.600", pintado: "13.500" },
        { nombre: "Champiñón", medida: "12 cm", img: "ceramicas/cer-champinon.jpg", crudo: "6.600", pintado: "13.500" },
        { nombre: "Pikachu", medida: "22 cm", img: "ceramicas/cer-pikachu.jpg", crudo: "11.900", pintado: "22.500" },
        { nombre: "Muerte dulcero", medida: "10 cm", img: "ceramicas/cer-muerte.jpg", crudo: "4.500", pintado: "5.800" },
        { nombre: "Fantasma dulcero", medida: "10 cm", img: "ceramicas/col-fantasma.jpg", crudo: "4.500", pintado: "5.800" },
        { nombre: "Momia dulcero", medida: "10 cm", img: "ceramicas/cer-momia.jpg", crudo: "4.500", pintado: "5.800" },
        { nombre: "Cofre fantasma", medida: "4 cm", img: "ceramicas/cer-cofre-fantasma.jpg", crudo: "4.000", pintado: "4.500" },
        { nombre: "Cofre calabaza", medida: "4 cm", img: "ceramicas/cer-cofre-calabaza.jpg", crudo: "4.000", pintado: "4.500" },
        { nombre: "Calabaza y fantasma", medida: "8 cm", img: "ceramicas/cer-calabaza-fantasma.jpg", crudo: "5.000", pintado: "6.000" },
        { nombre: "Fantasma leyendo", medida: "7 cm", img: "ceramicas/cer-fantasma-leyendo.jpg", crudo: "4.800", pintado: "5.500" },
        { nombre: "Pato pirata", medida: "10 cm", img: "ceramicas/col-pato.jpg", crudo: "4.000", pintado: "6.000" },
        { nombre: "Loros de pared", medida: "", img: "ceramicas/loros2.jpg", imgPintado: "ceramicas/loros2.jpg", solo: "pintada" },
        { nombre: "Guacamayas", medida: "", img: "ceramicas/cerp-guacamayas.jpg", imgPintado: "ceramicas/cerp-guacamayas.jpg", solo: "pintada" }
    ]
  },
  {
    id: "materas",
    emoji: "🪴",
    titulo: "Materas multiusos",
    texto: "Materas de cerámica con personajes, para plantas, lápices o lo que quieras guardar.",
    items: [
        { nombre: "Minion", medida: "10 cm", img: "ceramicas/cer-minion.jpg", crudo: "4.800", pintado: "7.500" },
        { nombre: "Hello Kitty vaquita", medida: "10 cm", img: "ceramicas/cer-hk-vaquita.jpg", crudo: "7.500", pintado: "12.500" },
        { nombre: "Hello Kitty Stitch", medida: "12 cm", img: "ceramicas/cer-hk-stitch.jpg", crudo: "6.300", pintado: "9.000" },
        { nombre: "Yoshi", medida: "10 cm", img: "ceramicas/cer-yoshi.jpg", crudo: "5.600", pintado: "9.200" },
        { nombre: "Baby Yoda", medida: "15 cm", img: "ceramicas/cer-baby-yoda.jpg", crudo: "7.500", pintado: "10.000" },
        { nombre: "Hello Kitty jirafa", medida: "12 cm", img: "ceramicas/cer-hk-jirafa.jpg", crudo: "7.500", pintado: "12.500" },
        { nombre: "Grot", medida: "10 cm", img: "ceramicas/cer-grot.jpg", crudo: "8.000", pintado: "10.200" },
        { nombre: "Hello Kitty león", medida: "10 cm", img: "ceramicas/cer-hk-leon.jpg", crudo: "7.500", pintado: "12.500" },
        { nombre: "Garfield", medida: "19 cm", img: "ceramicas/cer-garfield-matera.jpg", crudo: "15.000", pintado: "20.000" }
    ]
  }
];


/* ------------------------------------------------------------
   TEMÁTICAS Y FIGURAS DE YESO (página Yesos y página "Ver todas")
   Aquí está TODA la lista de figuras, agrupada por temática. Con esta sola lista la página arma:
     - las tarjetas de "Nuestras temáticas"
     - los tamaños (grandes, medianas, pequeñas): se calculan solos con la medida más larga
   CÓMO AGREGAR UNA FIGURA:
     1. Copia la foto a la carpeta img/  (cuadrada o vertical, de unos 600 a 800 px de ancho).
     2. Copia una línea  { img: "...", nombre: "...", medida: "..." }  dentro de la temática
        que corresponda (con una coma después de la línea anterior).
     La medida se escribe como "6 cm x 9 cm" y el tamaño se asigna solo. Si una figura no tiene
     medida (por ejemplo flores o coronas), solo se muestra dentro de su temática. Si quieres forzar el tamaño agrega
     tam: "grandes" (o "medianas", "pequenas") en esa línea.
   CÓMO AGREGAR UNA TEMÁTICA NUEVA: copia un bloque completo { id: ..., figuras: [ ... ] }.
   ------------------------------------------------------------ */
const TEMATICAS = [
  {
    id: "dinosaurios",
    emoji: "🦖",
    titulo: "Dinosaurios",
    figuras: [
      { img: "tematicas/t-dinosaurios-brachio.jpg", nombre: "Brachio", medida: "6.5 cm x 9 cm" },
      { img: "tematicas/t-dinosaurios-t-rex.jpg", nombre: "T-Rex", medida: "7 cm x 9 cm" },
      { img: "tematicas/t-dinosaurios-triceratops.jpg", nombre: "Triceratops", medida: "6 cm x 9.5 cm" }
    ]
  },
  {
    id: "espacial",
    emoji: "🚀",
    titulo: "Mundo espacial",
    figuras: [
      { img: "tematicas/t-espacial-astronauta-1.jpg", nombre: "Astronauta 1", medida: "7 cm x 6 cm" },
      { img: "tematicas/t-espacial-astronauta-2.jpg", nombre: "Astronauta 2", medida: "6.5 cm x 4.5 cm" },
      { img: "tematicas/t-espacial-cohete.jpg", nombre: "Cohete", medida: "7 cm x 5 cm" },
      { img: "tematicas/t-espacial-nave.jpg", nombre: "Nave", medida: "8 cm x 5 cm" },
      { img: "tematicas/t-espacial-planeta.jpg", nombre: "Planeta", medida: "4 cm x 5 cm" },
      { img: "tematicas/t-espacial-tierra.jpg", nombre: "Tierra", medida: "5 cm x 5 cm" }
    ]
  },
  {
    id: "carros",
    emoji: "🚗",
    titulo: "Carros",
    figuras: [
      { img: "tematicas/t-carros-camion.jpg", nombre: "Camión", medida: "5.5 cm x 9 cm" },
      { img: "tematicas/t-carros-bus.jpg", nombre: "Bus", medida: "5.5 cm x 7 cm" },
      { img: "tematicas/t-carros-tractor.jpg", nombre: "Tractor", medida: "6 cm x 8.5 cm" },
      { img: "tematicas/t-carros-helicoptero.jpg", nombre: "Helicóptero", medida: "6 cm x 8 cm" },
      { img: "tematicas/t-carros-moto.jpg", nombre: "Moto", medida: "6 cm x 9 cm" },
      { img: "tematicas/t-carros-carro.jpg", nombre: "Carro", medida: "6 cm x 9 cm" }
    ]
  },
  {
    id: "conejos",
    emoji: "🐰",
    titulo: "Conejos",
    figuras: [
      { img: "tematicas/t-conejos-conejo-amoroso.jpg", nombre: "Conejo amoroso", medida: "4 cm x 8 cm" },
      { img: "tematicas/t-conejos-conejo-feliz.jpg", nombre: "Conejo feliz", medida: "4 cm x 8 cm" }
    ]
  },
  {
    id: "leon",
    emoji: "🦁",
    titulo: "León",
    figuras: [
      { img: "tematicas/t-leon-leon.jpg", nombre: "León", medida: "11 cm de alto" }
    ]
  },
  {
    id: "sanrio",
    emoji: "🎀",
    titulo: "Sanrio",
    figuras: [
      { img: "tematicas/t-sanrio-hello-kitty-1.jpg", nombre: "Hello Kitty 1", medida: "6 cm x 7 cm" },
      { img: "tematicas/t-sanrio-hello-kitty-2.jpg", nombre: "Hello Kitty 2", medida: "6 cm x 7 cm" },
      { img: "tematicas/t-sanrio-hello-kitty-3.jpg", nombre: "Hello Kitty 3", medida: "4 cm x 5.5 cm" },
      { img: "tematicas/t-sanrio-hello-kitty-4.jpg", nombre: "Hello Kitty 4", medida: "2.5 cm x 3.5 cm" },
      { img: "tematicas/t-sanrio-hello-kitty-5.jpg", nombre: "Hello Kitty 5", medida: "4 cm x 3.5 cm" },
      { img: "tematicas/t-sanrio-kuromi.jpg", nombre: "Kuromi", medida: "6 cm x 5.5 cm" },
      { img: "tematicas/t-sanrio-my-melody.jpg", nombre: "My Melody", medida: "6 cm x 7 cm" },
      { img: "tematicas/t-sanrio-cinnamoroll.jpg", nombre: "Cinnamoroll", medida: "5.5 cm x 6.5 cm" }
    ]
  },
  {
    id: "marino",
    emoji: "🐠",
    titulo: "Mundo marino",
    figuras: [
      { img: "tematicas/t-marino-caballito-de-mar.jpg", nombre: "Caballito de mar", medida: "8 cm x 5 cm" },
      { img: "tematicas/t-marino-medusa.jpg", nombre: "Medusa", medida: "7 cm x 5 cm" },
      { img: "tematicas/t-marino-tortuga.jpg", nombre: "Tortuga", medida: "7 cm x 7.5 cm" },
      { img: "tematicas/t-marino-estrella-de-mar.jpg", nombre: "Estrella de mar", medida: "7.5 cm x 7.5 cm" },
      { img: "tematicas/t-marino-conchita.jpg", nombre: "Conchita", medida: "5.5 cm x 6.5 cm" }
    ]
  },
  {
    id: "angel-virgen",
    emoji: "🕊️",
    titulo: "Ángel y Virgen",
    figuras: [
      { img: "tematicas/t-angel-virgen-angel.jpg", nombre: "Ángel", medida: "11 cm x 9 cm" },
      { img: "tematicas/t-angel-virgen-virgen.jpg", nombre: "Virgen", medida: "7.5 cm x 5 cm" }
    ]
  },
  {
    id: "minnie-mickey",
    emoji: "🐭",
    titulo: "Minnie y Mickey",
    figuras: [
      { img: "tematicas/t-minnie-mickey-minnie.jpg", nombre: "Minnie", medida: "6.5 cm x 6 cm" },
      { img: "tematicas/t-minnie-mickey-guante.jpg", nombre: "Guante", medida: "6 cm x 5.5 cm" },
      { img: "tematicas/t-minnie-mickey-mickey.jpg", nombre: "Mickey", medida: "5.5 cm x 5.5 cm" }
    ]
  },
  {
    id: "stitch",
    emoji: "💙",
    titulo: "Stitch",
    figuras: [
      { img: "tematicas/t-stitch-stitch.jpg", nombre: "Stitch", medida: "6 cm x 6.5 cm" },
      { img: "tematicas/t-stitch-huellita-1.jpg", nombre: "Huellita 1", medida: "4 cm x 4 cm" },
      { img: "tematicas/t-stitch-hueso.jpg", nombre: "Hueso", medida: "6 cm x 3 cm" },
      { img: "tematicas/t-stitch-huellita-2.jpg", nombre: "Huellita 2", medida: "5.5 cm x 5.5 cm" }
    ]
  },
  {
    id: "baby",
    emoji: "🍼",
    titulo: "Baby",
    figuras: [
      { img: "tematicas/t-baby-coche.jpg", nombre: "Coche", medida: "6.5 cm x 6 cm" },
      { img: "tematicas/t-baby-tetero.jpg", nombre: "Tetero", medida: "6 cm x 5.5 cm" },
      { img: "tematicas/t-baby-muneco-oso.jpg", nombre: "Muñeco oso", medida: "5.5 cm x 5.5 cm" },
      { img: "tematicas/t-baby-juguete.jpg", nombre: "Juguete", medida: "6.5 cm x 6 cm" },
      { img: "tematicas/t-baby-chupo.jpg", nombre: "Chupo", medida: "6 cm x 5.5 cm" },
      { img: "tematicas/t-baby-pie.jpg", nombre: "Pie", medida: "5.5 cm x 5.5 cm" }
    ]
  },
  {
    id: "princesa-sirena",
    emoji: "👸",
    titulo: "Princesa y sirena",
    figuras: [
      { img: "tematicas/t-princesa-sirena-princesa.jpg", nombre: "Princesa", medida: "6.5 cm x 6.5 cm" },
      { img: "tematicas/t-princesa-sirena-sirena.jpg", nombre: "Sirena", medida: "8 cm x 7 cm" }
    ]
  },
  {
    id: "osos",
    emoji: "🐻",
    titulo: "Osos",
    figuras: [
      { img: "tematicas/t-osos-oso-alegre.jpg", nombre: "Oso alegre", medida: "6 cm x 7 cm" },
      { img: "tematicas/t-osos-winnie-the-pooh.jpg", nombre: "Winnie the Pooh", medida: "6 cm x 6 cm" },
      { img: "tematicas/t-osos-panda-curioso.jpg", nombre: "Panda curioso", medida: "5 cm x 6.5 cm" },
      { img: "tematicas/t-osos-panda-dormilon.jpg", nombre: "Panda dormilón", medida: "4 cm x 5 cm" },
      { img: "tematicas/t-osos-panda-con-bambu.jpg", nombre: "Panda con bambú", medida: "5.5 cm x 5 cm" },
      { img: "tematicas/t-osos-panda-bebe.jpg", nombre: "Panda bebé", medida: "4 cm x 4.5 cm" },
      { img: "tematicas/t-osos-osito.jpg", nombre: "Osito", medida: "" }
    ]
  },
  {
    id: "mariposas",
    emoji: "🦋",
    titulo: "Mariposas",
    figuras: [
      { img: "tematicas/t-mariposas-mariposa-1.jpg", nombre: "Mariposa 1", medida: "6 cm x 7 cm" },
      { img: "tematicas/t-mariposas-mariposa-2.jpg", nombre: "Mariposa 2", medida: "6 cm x 6 cm" },
      { img: "tematicas/t-mariposas-mariposa-3.jpg", nombre: "Mariposa 3", medida: "5.5 cm x 7 cm" }
    ]
  },
  {
    id: "flores-coronas",
    emoji: "🌸",
    titulo: "Flores, coronas y más",
    figuras: [
      { img: "tematicas/t-flores-coronas-flores.jpg", nombre: "Flores", medida: "" },
      { img: "tematicas/t-flores-coronas-coronas.jpg", nombre: "Coronas", medida: "" },
      { img: "tematicas/t-flores-coronas-mar.jpg", nombre: "Mar", medida: "" },
      { img: "tematicas/t-flores-coronas-tortugas.jpg", nombre: "Tortugas", medida: "" }
    ]
  }
];

/* Tamaños: "min" y "max" son la medida más larga de la figura en cm. Se pueden cambiar. */
const TAMANOS_YESO = [
  { id: "grandes",  emoji: "🦖", titulo: "Figuras grandes",  regla: "9 cm o más",         min: 9,   max: 999, mostrar: 4 },
  { id: "medianas", emoji: "🚀", titulo: "Figuras medianas", regla: "de 6.5 cm a 8.5 cm", min: 6.5, max: 8.9, mostrar: 4 },
  { id: "pequenas", emoji: "⭐", titulo: "Figuras pequeñas", regla: "hasta 6 cm",         min: 0,   max: 6.4, mostrar: 4 }
];

/* Reparte cada figura en su tamaño (no necesitas tocar esto) */
(function () {
  TAMANOS_YESO.forEach(function (t) { t.figuras = []; });
  TEMATICAS.forEach(function (tm) {
    tm.figuras.forEach(function (f) {
      f.tematica = tm.titulo;
      var nums = (f.medida || "").match(/\d+(?:\.\d+)?/g);
      var largo = nums ? Math.max.apply(null, nums.map(Number)) : -1;
      var destino = f.tam ? TAMANOS_YESO.filter(function (t) { return t.id === f.tam; })[0]
        : TAMANOS_YESO.filter(function (t) { return largo >= t.min && largo <= t.max; })[0];
      /* Las piezas sin medida (flores, coronas...) solo aparecen dentro de su temática */
      if (destino) destino.figuras.push(f);
    });
  });
})();


/* ------------------------------------------------------------
   MATERAS, FLOREROS, JOYEROS Y PORTA VELAS: tamaños y precios (página Materas y floreros)
   El precio depende del tamaño. Para cambiar un precio edita "precio" o "mayorista".
   Para agregar una pieza: copia la foto a img/ y añade una línea
         { img: "foto.jpg", nombre: "Nombre", medida: "alto x ancho" }
   dentro del tamaño que corresponda (con una coma después de la línea anterior).
   ------------------------------------------------------------ */
const MATERAS_TAMANOS = [
  {
    id: "extragrande", emoji: "🌟", titulo: "Extra grande", regla: "11 cm",
    precio: "$6.500", mayorista: "$6.000",
    figuras: [
      { img: "materas/matera-bandeja.jpg", nombre: "Bandeja", medida: "11 cm x 7 cm" },
      { img: "materas/matera-bandeja-perrito.jpg", nombre: "Bandeja perrito", medida: "11 cm x 7 cm" },
      { img: "materas/matera-flor.jpg", nombre: "Flor", medida: "11 cm x 7 cm" },
      { img: "materas/matera-panda.jpg", nombre: "Oso panda", medida: "11 cm x 7 cm" }
    ]
  },
  {
    id: "grande", emoji: "🪴", titulo: "Grande", regla: "9 cm",
    precio: "$5.000", mayorista: "$4.500",
    figuras: [
      { img: "materas/matera-triangulos.jpg", nombre: "Triángulos", medida: "6 cm x 9 cm" },
      { img: "materas/matera-jarron.jpg", nombre: "Jarrón", medida: "8 cm x 9 cm" },
      { img: "materas/matera-gato.jpg", nombre: "Gato", medida: "6 cm x 9 cm" },
      { img: "materas/matera-mamut.jpg", nombre: "Mamut", medida: "9 cm x 7 cm" },
      { img: "materas/matera-perrito.jpg", nombre: "Perrito", medida: "9 cm x 7 cm" },
      { img: "materas/matera-toro.jpg", nombre: "Toro", medida: "8 cm x 9 cm" }
    ]
  },
  {
    id: "mediana", emoji: "🌷", titulo: "Mediana", regla: "7 a 8 cm",
    precio: "$3.500", mayorista: "$3.000",
    figuras: [
      { img: "materas/matera-corazon.jpg", nombre: "Corazón", medida: "7 cm x 8 cm" },
      { img: "materas/matera-zigzag.jpg", nombre: "Zigzag", medida: "3 cm x 8 cm" },
      { img: "materas/matera-acordeon.jpg", nombre: "Acordeón", medida: "4 cm x 8 cm" },
      { img: "materas/vaso-diamante.jpg", nombre: "Vaso diamante", medida: "7 cm x 5 cm" },
      { img: "materas/matera-burbuja.jpg", nombre: "Burbuja", medida: "4 cm x 8 cm" },
      { img: "materas/matera-taza.jpg", nombre: "Taza", medida: "5 cm x 8 cm" }
    ]
  },
  {
    id: "pequena", emoji: "🌱", titulo: "Pequeña", regla: "hasta 6 cm",
    precio: "$2.500", mayorista: "$2.000",
    figuras: [
      { img: "materas/matera-cofre.jpg", nombre: "Cofre", medida: "3.5 cm x 3.5 cm" },
      { img: "materas/matera-canasto.jpg", nombre: "Canasto tejido", medida: "3.5 cm x 5.5 cm" },
      { img: "materas/matera-minimal.jpg", nombre: "Minimal", medida: "5 cm x 6 cm" },
      { img: "materas/matera-prisma.jpg", nombre: "Prisma", medida: "5 cm x 6 cm" },
      { img: "materas/matera-cubo.jpg", nombre: "Cubo", medida: "6 cm x 5.5 cm" },
      { img: "materas/matera-amor-infinito.jpg", nombre: "Amor infinito", medida: "6 cm x 5.5 cm" }
    ]
  }
];

/* ------------------------------------------------------------
   YA PINTADOS: sets de florero y piezas decoradas (se pasan de lado como un carrusel)
   Para agregar más: copia la foto a img/ y añade una línea { img, nombre }.
   ------------------------------------------------------------ */
const SETS_FLOREROS = [
  { img: "materas/floreros-lila.jpg", nombre: "Set florero lila" },
  { img: "materas/floreros-rosa.jpg", nombre: "Set florero rosa" },
  { img: "materas/toro.jpg",          nombre: "Toro florero pintado" },
  { img: "materas/elefante.jpg",      nombre: "Mamut con flores" },
  { img: "materas/panda-bambu.jpg",   nombre: "Panda con bambú" }
];

/* ------------------------------------------------------------
   CALCULADORA DE PEDIDO (página Yesos)
   "hasta" es la cantidad máxima de cada rango. Para cambiar un precio edita "precio".
   "maximo" = desde esa cantidad se cotiza por WhatsApp.
   ------------------------------------------------------------ */
const PRECIOS_PEDIDO = [
  { id: "mini", nombre: "Mini kit", tramos: [ { hasta: 29, precio: 6000 }, { hasta: 50, precio: 5500 }, { hasta: Infinity, precio: 5000 } ] },
  { id: "duo", nombre: "Duo kit", tramos: [ { hasta: 29, precio: 7000 }, { hasta: 50, precio: 6500 }, { hasta: Infinity, precio: 6000 } ] },
  { id: "maxi", nombre: "Maxi kit", tramos: [ { hasta: 29, precio: 8000 }, { hasta: 50, precio: 7500 }, { hasta: Infinity, precio: 7000 } ] },
  { id: "yeso", nombre: "Figuras de yeso solas (al por mayor)", maximo: 100, tramos: [ { hasta: 29, precio: 2500 }, { hasta: 49, precio: 2200 }, { hasta: 99, precio: 2000 } ] }
];
