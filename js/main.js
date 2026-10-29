/* ============================================================
   ARTIKA STUDIO · comportamiento de la página
   No necesitas editar este archivo. El contenido se cambia en js/datos.js
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Utilidades ---------- */
  function el(tag, clase, texto) {
    var e = document.createElement(tag);
    if (clase) e.className = clase;
    if (texto) e.textContent = texto;
    return e;
  }

  function enlaceWhatsapp(mensaje) {
    var url = "https://wa.me/" + NEGOCIO.whatsapp;
    if (mensaje) url += "?text=" + encodeURIComponent(mensaje);
    return url;
  }

  function foto(item, conCaption) {
    var fig = el("figure", "foto");
    var img = document.createElement("img");
    img.src = "img/" + item.img;
    img.alt = item.nombre + (item.medida ? ", " + item.medida : "");
    img.loading = "lazy";
    img.width = 420;
    img.height = 420;
    fig.appendChild(img);
    if (conCaption) {
      var cap = el("figcaption");
      cap.appendChild(el("strong", "", item.nombre));
      if (item.medida) cap.appendChild(el("span", "", item.medida));
      fig.appendChild(cap);
    }
    return fig;
  }

  /* ---------- Contacto y enlaces ---------- */
  var wa = enlaceWhatsapp("Hola Artika Studio, quiero más información.");
  document.getElementById("linkWhatsapp").href = wa;
  document.getElementById("flotanteWhatsapp").href = wa;
  document.getElementById("linkInstagram").href = "https://www.instagram.com/" + NEGOCIO.instagram;
  document.getElementById("linkTiktok").href = "https://www.tiktok.com/@" + NEGOCIO.tiktok;
  Array.prototype.forEach.call(document.querySelectorAll("[data-red]"), function (a) {
    var r = a.getAttribute("data-red");
    a.href = r === "whatsapp" ? wa : r === "instagram" ? "https://www.instagram.com/" + NEGOCIO.instagram : "https://www.tiktok.com/@" + NEGOCIO.tiktok;
  });
  document.getElementById("telVisible").textContent = NEGOCIO.whatsappVisible;
  document.getElementById("igVisible").textContent = "@" + NEGOCIO.instagram;
  document.getElementById("ttVisible").textContent = "@" + NEGOCIO.tiktok;
  document.getElementById("anio").textContent = new Date().getFullYear();

  // Todos los enlaces con data-whatsapp abren el chat con un mensaje listo
  document.querySelectorAll("[data-whatsapp]").forEach(function (a) {
    a.href = enlaceWhatsapp(a.getAttribute("data-whatsapp"));
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* ---------- Menú en celular ---------- */
  var boton = document.getElementById("menuBoton");
  var menu = document.getElementById("menu");

  function cerrarMenu() {
    menu.classList.remove("abierto");
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-label", "Abrir menú");
  }

  boton.addEventListener("click", function () {
    var abierto = menu.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", String(abierto));
    boton.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") cerrarMenu();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") cerrarMenu();
  });

  /* ---------- Temporada ---------- */
  // "Faltan 6 días para Halloween" (solo si la fiesta está a 90 días o menos)
  function textoCuenta(t) {
    if (!t.fecha) return "";
    var dias = Math.round((t.fecha(HOY.getFullYear()) - HOY) / 864e5);
    if (dias < 0 || dias > 90) return "";
    if (dias === 0) return "¡Hoy es " + t.para.replace(/^el /, "el ") + "!";
    return (dias === 1 ? "Falta 1 día para " : "Faltan " + dias + " días para ") + t.para;
  }
  // Estos elementos solo existen en algunas páginas, por eso se revisa antes de usarlos
  function poner(id, texto) { var e = document.getElementById(id); if (e) e.textContent = texto; }

  // En la página "Temporada" se puede ver otra con temporada.html?t=navidad; si no, la actual
  var enPaginaTemporada = !!document.getElementById("tempTitulo");
  var elegida = TEMPORADA;
  if (enPaginaTemporada) {
    var pedida = new URLSearchParams(location.search).get("t");
    elegida = TEMPORADAS.filter(function (t) { return t.id === pedida; })[0] || TEMPORADA;
  }
  var esActual = elegida.id === TEMPORADA.id;
  document.body.setAttribute("data-tema", elegida.tema);

  // Menú e inicio siempre muestran la temporada actual
  poner("menuTemporada", TEMPORADA.emoji + " Temporada");
  poner("accTempTitulo", TEMPORADA.emoji + " Temporada");
  poner("accTempTexto", textoCuenta(TEMPORADA) || "Figuras especiales de la época, en kits o al por mayor.");
  var accImg = document.getElementById("accTempImg");
  if (accImg && TEMPORADA.items.length) accImg.src = "img/" + TEMPORADA.items[0].img;

  // Página Temporada
  if (enPaginaTemporada) {
    document.title = elegida.titulo + " · Artika Studio";
    poner("tempEtiqueta", elegida.emoji + (esActual ? " Temporada actual" : " Temporada"));
    poner("tempTitulo", elegida.titulo);
    poner("tempTexto", elegida.texto);
    var cuenta = document.getElementById("tempCuenta");
    if (cuenta && textoCuenta(elegida)) { cuenta.textContent = "⏳ " + textoCuenta(elegida); cuenta.hidden = false; }
    var galTemp = document.getElementById("tempGaleria");
    if (elegida.items.length) {
      elegida.items.forEach(function (it) { galTemp.appendChild(foto(it, true)); });
    } else {
      galTemp.className = "";
      galTemp.appendChild(el("p", "temp-vacio", "Estamos preparando las fotos de esta temporada. Escríbenos por WhatsApp y te contamos qué figuras tendremos."));
    }
    var pedir = document.getElementById("tempPedir");
    if (pedir) {
      pedir.textContent = "Pedir figuras de " + elegida.menu;
      pedir.href = enlaceWhatsapp("Hola Artika Studio, quiero pedir figuras de " + elegida.menu + ".");
    }

    // Otras temporadas (todas menos la que se está viendo)
    var otras = document.getElementById("otrasTemporadas");
    if (otras) {
      TEMPORADAS.forEach(function (t) {
        if (t.id === elegida.id) return;
        var a = el("a", "otra otra--" + t.tema);
        a.href = t.id === TEMPORADA.id ? "temporada.html" : "temporada.html?t=" + t.id;
        a.appendChild(el("span", "otra__emoji", t.emoji));
        a.appendChild(el("strong", "", t.menu));
        a.appendChild(el("small", "", t.id === TEMPORADA.id ? "Temporada actual" : (t.items.length ? "Ver figuras" : "Muy pronto")));
        otras.appendChild(a);
      });
    }
  }

  /* ---------- Cerámicas: elegir "Pintadas" o "Sin pintar" y ver las categorías ---------- */
  var panelCer = document.getElementById("ceramicasPanel");
  if (panelCer && typeof CERAMICAS !== "undefined") {
    var botonesCer = document.querySelectorAll("[data-modo-cer]");

    function precioTexto(f, modo) {
      /* Las pintadas siempre se cotizan: el precio puede cambiar según el diseño y el momento */
      if (modo === "pintada") return "";
      return f.crudo ? "$" + f.crudo : "";
    }

    function dibujarCeramicas(modo) {
      var pintada = modo === "pintada";
      panelCer.textContent = "";
      var cab = el("div", "cer-cabecera");
      cab.appendChild(el("h2", "cer-titulo", pintada ? "Cerámicas pintadas" : "Cerámicas sin pintar"));
      cab.appendChild(el("p", "seccion__intro seccion__intro--chica", pintada
        ? "Pintadas a mano por nosotros, bajo pedido. Si la foto aparece sin color, es el modelo que pintamos a tu gusto. Toca una categoría para verla."
        : "Listas para que las pintes tú: las recibes en cerámica cruda. Toca una categoría para verla."));
      panelCer.appendChild(cab);
      if (pintada) {
        var cot = el("div", "cer-cotiza");
        cot.appendChild(el("p", "", "💬 Los precios de las cerámicas pintadas pueden cambiar. Cotiza cuánto quedaría la tuya: cuéntanos la figura y los colores que quieres."));
        var lk = el("a", "boton boton--verde", "Cotizar mi cerámica pintada");
        lk.href = enlaceWhatsapp("Hola Artika Studio, quiero cotizar cuánto quedaría una cerámica pintada.");
        lk.target = "_blank"; lk.rel = "noopener";
        cot.appendChild(lk);
        panelCer.appendChild(cot);
      }

      var lista = el("div", "tamanos");
      CERAMICAS.forEach(function (cat) {
        var items = cat.items.filter(function (f) { return !f.solo || f.solo === (pintada ? "pintada" : "sin"); });
        if (!items.length) return;
        var det = el("details", "tamano tamano--cer-" + cat.id);
        det.id = "cer-" + cat.id;
        var sum = el("summary", "tamano__cabeza");
        sum.appendChild(el("span", "tamano__emoji", cat.emoji));
        var tit = el("span", "tamano__titulo");
        tit.appendChild(el("strong", "", cat.titulo));
        tit.appendChild(el("small", "", items.length + (items.length === 1 ? " figura" : " figuras")));
        sum.appendChild(tit);
        det.appendChild(sum);

        var cuerpo = el("div", "tamano__cuerpo");
        cuerpo.appendChild(el("p", "cer-texto", cat.texto));
        var rejilla = el("div", "figuras figuras--cer");
        items.forEach(function (f) {
          var fig = el("figure", "figura");
          var conFotoPintada = pintada && f.imgPintado;
          var img = document.createElement("img");
          img.src = "img/" + (conFotoPintada ? f.imgPintado : f.img);
          img.alt = f.nombre + (pintada ? ", cerámica pintada a mano" : ", cerámica sin pintar") + (f.medida ? ", " + f.medida : "");
          img.loading = "lazy";
          img.width = 200;
          img.height = 250;
          fig.appendChild(img);
          if (pintada && !f.imgPintado) fig.appendChild(el("span", "figura__etiqueta", "Modelo sin pintar"));
          var cap = el("figcaption");
          cap.appendChild(el("strong", "", f.nombre));
          if (f.medida) cap.appendChild(el("span", "", f.medida));
          var precio = precioTexto(f, modo);
          cap.appendChild(el("span", "figura__precio" + (precio ? "" : " figura__precio--consulta"), precio || (pintada ? "Cotiza cuánto queda pintada" : "Cotiza el precio")));
          fig.appendChild(cap);
          rejilla.appendChild(fig);
        });
        cuerpo.appendChild(rejilla);
        det.appendChild(cuerpo);
        lista.appendChild(det);
      });
      panelCer.appendChild(lista);
      panelCer.appendChild(el("p", "cer-pie", pintada
        ? "Las figuras pintadas se hacen bajo pedido y su precio se cotiza por WhatsApp, porque puede cambiar."
        : "Precios en pesos colombianos, de la figura sin pintar (cruda). Pueden cambiar: confirma por WhatsApp."));
    }

    function elegirModo(modo, bajar) {
      botonesCer.forEach(function (b) {
        var activo = b.getAttribute("data-modo-cer") === modo;
        b.setAttribute("aria-pressed", String(activo));
        b.classList.toggle("elige__op--activa", activo);
      });
      dibujarCeramicas(modo);
      if (bajar) panelCer.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    botonesCer.forEach(function (b) {
      b.addEventListener("click", function () { elegirModo(b.getAttribute("data-modo-cer"), true); });
    });
    // Se puede entrar directo con ceramicas.html#sin-pintar o #pintadas
    if (location.hash === "#pintadas") elegirModo("pintada", false);
    if (location.hash === "#sin-pintar") elegirModo("sin", false);
  }

  /* ---------- Temáticas: tarjetas y panel con las figuras de la elegida ---------- */
  var contTem = document.getElementById("tematicas");
  var panelTem = document.getElementById("tematicaPanel");
  if (contTem && panelTem && typeof TEMATICAS !== "undefined") {
    var tarjetasTem = {};
    TEMATICAS.forEach(function (t) {
      var b = el("button", "tema");
      b.type = "button";
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("aria-controls", "tematicaPanel");
      var img = document.createElement("img");
      img.src = "img/" + t.figuras[0].img;
      img.alt = "";
      img.loading = "lazy";
      img.width = 190;
      img.height = 190;
      b.appendChild(img);
      var tx = el("span", "tema__texto");
      tx.appendChild(el("strong", "", t.emoji + " " + t.titulo));
      tx.appendChild(el("small", "", t.figuras.length + (t.figuras.length === 1 ? " figura" : " figuras")));
      b.appendChild(tx);
      b.addEventListener("click", function () { abrirTema(t.id, true); });
      contTem.appendChild(b);
      tarjetasTem[t.id] = b;
    });

    var temaAbierto = null;
    function abrirTema(id, bajar) {
      var t = TEMATICAS.filter(function (x) { return x.id === id; })[0];
      Object.keys(tarjetasTem).forEach(function (k) {
        var activa = k === id && temaAbierto !== id;
        tarjetasTem[k].setAttribute("aria-pressed", String(activa));
        tarjetasTem[k].classList.toggle("tema--activa", activa);
      });
      panelTem.textContent = "";
      if (!t || temaAbierto === id) { temaAbierto = null; panelTem.removeAttribute("data-ctx"); return; } // tocar de nuevo la cierra
      temaAbierto = id;
      panelTem.setAttribute("data-ctx", t.titulo);
      var cab = el("div", "tema-panel__cab");
      var tit = el("div", "tema-panel__tit");
      tit.appendChild(el("h4", "", t.emoji + " " + t.titulo));
      tit.appendChild(el("p", "", t.figuras.length + (t.figuras.length === 1 ? " figura" : " figuras") + " · toca una foto para ampliarla"));
      cab.appendChild(tit);
      var cot = el("a", "boton boton--rosa", "Cotizar esta temática");
      cot.href = enlaceWhatsapp("Hola Artika Studio, quiero cotizar figuras de la temática " + t.titulo + ".");
      cot.target = "_blank";
      cot.rel = "noopener";
      cab.appendChild(cot);
      var cerrar = el("button", "tema-panel__cerrar", "Cerrar ✕");
      cerrar.type = "button";
      cerrar.addEventListener("click", function () { abrirTema(id, false); tarjetasTem[id].focus(); });
      cab.appendChild(cerrar);
      panelTem.appendChild(cab);
      var rej = el("div", "figuras figuras--tema");
      t.figuras.forEach(function (f) {
        var fig = el("figure", "figura");
        var im = document.createElement("img");
        im.src = "img/" + f.img;
        im.alt = f.nombre + (f.medida ? ", " + f.medida : "") + ", figura de yeso de " + t.titulo;
        im.loading = "lazy";
        im.width = 200;
        im.height = 200;
        fig.appendChild(im);
        var cp = el("figcaption");
        cp.appendChild(el("strong", "", f.nombre));
        cp.appendChild(el("span", "", f.medida || "Medida a consultar"));
        fig.appendChild(cp);
        rej.appendChild(fig);
      });
      panelTem.appendChild(rej);
      if (bajar) panelTem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Se puede entrar directo con catalogo.html#dinosaurios
    if (location.hash && tarjetasTem[location.hash.slice(1)]) abrirTema(location.hash.slice(1), false);
  }

  /* ---------- Acordeón por tamaño (figuras de yeso y materas) ---------- */
  function armarAcordeon(cont, tamanos, todo, alt) {
    tamanos.forEach(function (t) {
      var det = el("details", "tamano tamano--" + t.id);
      det.id = t.id;
      if (todo && !t.precio) det.open = true;

      var sum = el("summary", "tamano__cabeza");
      sum.appendChild(el("span", "tamano__emoji", t.emoji));
      var tit = el("span", "tamano__titulo");
      tit.appendChild(el("strong", "", t.titulo));
      tit.appendChild(el("small", "", t.regla + " · " + t.figuras.length + (t.precio ? " piezas" : " figuras")));
      sum.appendChild(tit);
      if (t.precio) {
        var pr = el("span", "tamano__precio");
        pr.appendChild(el("strong", "", t.precio + " c/u"));
        pr.appendChild(el("small", "", "Mayorista " + t.mayorista));
        sum.appendChild(pr);
      }
      det.appendChild(sum);

      var cuerpo = el("div", "tamano__cuerpo");
      var rejilla = el("div", "figuras");
      var lista = todo ? t.figuras : t.figuras.slice(0, t.mostrar || 4);
      lista.forEach(function (f) {
        var fig = el("figure", "figura");
        var img = document.createElement("img");
        img.src = "img/" + f.img;
        img.alt = f.nombre + alt + f.medida;
        img.loading = "lazy";
        img.width = 140;
        img.height = 140;
        fig.appendChild(img);
        var cap = el("figcaption");
        cap.appendChild(el("strong", "", f.nombre));
        cap.appendChild(el("span", "", f.medida));
        fig.appendChild(cap);
        rejilla.appendChild(fig);
      });
      cuerpo.appendChild(rejilla);
      if (t.precio) {
        cuerpo.appendChild(el("p", "tamano__nota", "Precio sin pinceles, sin tarjeta personalizada, sin decoración y sin paleta mezcladora. Mayorista: más de una docena."));
      }
      if (!todo && t.figuras.length > lista.length) {
        var mas = el("a", "tamano__mas", "Ver todas (" + t.figuras.length + ")");
        mas.href = "figuras.html#" + t.id;
        cuerpo.appendChild(mas);
      }
      det.appendChild(cuerpo);
      cont.appendChild(det);
    });
  }

  var contTam = document.getElementById("tamanos");
  if (contTam && typeof TAMANOS_YESO !== "undefined") {
    var todo = contTam.getAttribute("data-modo") === "todo";
    armarAcordeon(contTam, TAMANOS_YESO, todo, " de yeso, ");
    // Si llegas desde "Ver todas", baja hasta ese tamaño
    if (todo && location.hash) {
      var destino = document.getElementById(location.hash.slice(1));
      if (destino) setTimeout(function () { destino.scrollIntoView(); }, 150);
    }
  }

  var contMat = document.getElementById("tamanosMateras");
  if (contMat && typeof MATERAS_TAMANOS !== "undefined") {
    armarAcordeon(contMat, MATERAS_TAMANOS, true, ", ");
  }

  /* ---------- Sets de florero: se pasan de lado con las flechas o con el dedo ---------- */
  var contSets = document.getElementById("sets");
  if (contSets && typeof SETS_FLOREROS !== "undefined") {
    var pistaSets = el("div", "slider__pista");
    pistaSets.tabIndex = 0;
    SETS_FLOREROS.forEach(function (it, i) {
      var fig = el("figure", "slider__item");
      var img = document.createElement("img");
      img.src = "img/" + it.img;
      img.alt = it.nombre + ", pintado a mano";
      img.width = 420;
      img.height = 420;
      if (i > 1) img.loading = "lazy";
      fig.appendChild(img);
      fig.appendChild(el("figcaption", "", it.nombre));
      pistaSets.appendChild(fig);
    });
    contSets.appendChild(pistaSets);
    var botones = el("div", "slider__botones");
    function flecha(texto, etiqueta, dir) {
      var bt = el("button", "carrusel__flecha", texto);
      bt.type = "button";
      bt.setAttribute("aria-label", etiqueta);
      bt.addEventListener("click", function () {
        var it = pistaSets.querySelector(".slider__item");
        pistaSets.scrollBy({ left: dir * (it ? it.getBoundingClientRect().width + 20 : 300), behavior: "smooth" });
      });
      return bt;
    }
    botones.appendChild(flecha("‹", "Foto anterior", -1));
    botones.appendChild(flecha("›", "Foto siguiente", 1));
    contSets.appendChild(botones);
    pistaSets.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); pistaSets.scrollBy({ left: 300, behavior: "smooth" }); }
      if (e.key === "ArrowLeft") { e.preventDefault(); pistaSets.scrollBy({ left: -300, behavior: "smooth" }); }
    });
  }

  /* ---------- Carrusel del inicio: todas las fotos cambian al mismo tiempo ---------- */
  function montarCarrusel(carrusel) {
    var lista = CARRUSELES[carrusel.getAttribute("data-carrusel")];
    if (!lista || !lista.length) { carrusel.hidden = true; return; }
    carrusel.classList.add("carrusel--mosaico");

    var pista = carrusel.querySelector(".carrusel__pista");
    var reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var cols = 0, base = 0, slots = [], pausado = false, temporizador = null;

    function columnas() { return window.innerWidth >= 1000 ? 4 : window.innerWidth >= 640 ? 3 : 2; }
    function foto(k) { return lista[((k % lista.length) + lista.length) % lista.length]; }

    function armar() {
      cols = columnas();
      pista.style.setProperty("--cols", cols);
      pista.textContent = "";
      slots = [];
      for (var s = 0; s < cols; s++) {
        var fig = el("figure", "carrusel__item");
        var marco = el("div", "carrusel__marco");
        var a = document.createElement("img"), b = document.createElement("img");
        [a, b].forEach(function (im) { im.width = 416; im.height = 416; im.alt = ""; marco.appendChild(im); });
        var g = foto(base + s);
        a.src = "img/" + g.img; a.alt = g.texto; a.className = "visible";
        fig.appendChild(marco);
        pista.appendChild(fig);
        slots.push({ a: a, b: b, actual: a });
      }
    }

    function cambiar(dir) {
      base += dir * cols;
      slots.forEach(function (sl, s) {
        var g = foto(base + s);
        var entra = sl.actual === sl.a ? sl.b : sl.a, sale = sl.actual;
        entra.alt = g.texto;
        var mostrar = function () {
          setTimeout(function () {
            entra.classList.add("visible");
            sale.classList.remove("visible");
            sl.actual = entra;
          }, reducir ? 0 : s * 90);
        };
        entra.onload = mostrar;
        entra.src = "img/" + g.img;
        if (entra.complete && entra.naturalWidth) { entra.onload = null; mostrar(); }
      });
    }
    function reiniciar() {
      clearInterval(temporizador);
      if (!reducir) temporizador = setInterval(function () { if (!pausado && !document.hidden) cambiar(1); }, 3800);
    }

    armar();
    carrusel.querySelector("[data-dir='1']").addEventListener("click", function () { cambiar(1); reiniciar(); });
    carrusel.querySelector("[data-dir='-1']").addEventListener("click", function () { cambiar(-1); reiniciar(); });
    pista.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); cambiar(1); reiniciar(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); cambiar(-1); reiniciar(); }
    });
    ["mouseenter", "focusin", "touchstart"].forEach(function (ev) { carrusel.addEventListener(ev, function () { pausado = true; }, { passive: true }); });
    ["mouseleave", "focusout"].forEach(function (ev) { carrusel.addEventListener(ev, function () { pausado = false; }); });
    carrusel.addEventListener("touchend", function () { setTimeout(function () { pausado = false; }, 3000); }, { passive: true });
    var ancho = window.innerWidth;
    window.addEventListener("resize", function () {
      if (columnas() !== cols) armar();
    });
    reiniciar();
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-carrusel]"), montarCarrusel);
})();
