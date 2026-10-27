/* ============================================================
   ARTIKA STUDIO · extras de la experiencia
   - Visor de fotos (clic en cualquier foto: flechas, deslizar, pedir por WhatsApp)
   - Botón "Pedir" en cada figura, con el mensaje ya escrito
   - Vista previa de fotos en cada categoría y tarjetas del inicio que rotan
   - Calculadora de pedido
   No necesitas editar este archivo. El contenido se cambia en js/datos.js
   ============================================================ */
(function () {
  "use strict";

  var reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, clase, texto) {
    var e = document.createElement(tag);
    if (clase) e.className = clase;
    if (texto) e.textContent = texto;
    return e;
  }
  function wa(mensaje) {
    return "https://wa.me/" + NEGOCIO.whatsapp + "?text=" + encodeURIComponent(mensaje);
  }
  function dinero(n) {
    return "$" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  /* ---------- Datos de una figura leídos de la tarjeta ---------- */
  function datosFigura(fig) {
    var cap = fig.querySelector("figcaption");
    var nombre = cap && cap.querySelector("strong") ? cap.querySelector("strong").textContent : (cap ? cap.textContent : "");
    var medida = "", precio = "";
    if (cap) {
      cap.querySelectorAll("span").forEach(function (s) {
        if (s.classList.contains("figura__precio")) { if (!s.classList.contains("figura__precio--consulta")) precio = s.textContent; }
        else if (!medida) medida = s.textContent;
      });
    }
    var ctx = [];
    var titCer = fig.closest("#ceramicasPanel") && document.querySelector(".cer-titulo");
    if (titCer) ctx.push(titCer.textContent.toLowerCase());
    var det = fig.closest("details.tamano");
    if (det && det.querySelector(".tamano__titulo strong")) ctx.push(det.querySelector(".tamano__titulo strong").textContent);
    var cx = fig.closest("[data-ctx]");
    if (cx) ctx.push("temática " + cx.getAttribute("data-ctx"));
    var tt = fig.closest("#tempGaleria") && document.getElementById("tempTitulo");
    if (tt) ctx.push(tt.textContent);
    var msg = "Hola Artika Studio, me interesa: " + nombre +
      (medida ? " (" + medida + ")" : "") + (precio ? ", precio " + precio : "") +
      (ctx.length ? " — " + ctx.join(" · ") : "") + ". ¿Me confirman disponibilidad?";
    return { nombre: nombre, medida: medida, precio: precio, msg: msg };
  }

  /* ---------- Visor de fotos ---------- */
  var visor = document.createElement("dialog");
  visor.className = "visor";
  visor.setAttribute("aria-label", "Visor de fotos");
  visor.innerHTML =
    '<button type="button" class="visor__cerrar" aria-label="Cerrar visor">×</button>' +
    '<button type="button" class="visor__flecha visor__flecha--ant" aria-label="Foto anterior">‹</button>' +
    '<figure class="visor__fig"><img class="visor__img" alt=""><figcaption class="visor__cap"></figcaption></figure>' +
    '<button type="button" class="visor__flecha visor__flecha--sig" aria-label="Foto siguiente">›</button>' +
    '<div class="visor__pie"><span class="visor__cuenta" aria-live="polite"></span>' +
    '<a class="boton boton--verde visor__pedir" target="_blank" rel="noopener">Pedir esta figura</a></div>';
  document.body.appendChild(visor);

  var vImg = visor.querySelector(".visor__img");
  var vCap = visor.querySelector(".visor__cap");
  var vCuenta = visor.querySelector(".visor__cuenta");
  var vPedir = visor.querySelector(".visor__pedir");
  var grupo = [], pos = 0;

  function mostrar(i) {
    if (!grupo.length) return;
    pos = (i + grupo.length) % grupo.length;
    var g = grupo[pos];
    vImg.src = g.src;
    vImg.alt = g.alt;
    vCap.textContent = "";
    vCap.appendChild(el("strong", "", g.nombre));
    if (g.detalle) vCap.appendChild(el("span", "", g.detalle));
    vCuenta.textContent = (pos + 1) + " / " + grupo.length;
    vPedir.href = wa(g.msg);
    var multiple = grupo.length > 1;
    visor.querySelectorAll(".visor__flecha").forEach(function (b) { b.hidden = !multiple; });
    // Precarga la siguiente foto para que el cambio sea inmediato
    if (multiple) { var pre = new Image(); pre.src = grupo[(pos + 1) % grupo.length].src; }
  }

  function abrir(img) {
    var items = [], idx = 0;
    var fig = img.closest("figure");
    var kit = img.closest(".kit");
    if (fig && fig.parentElement) {
      var figs = Array.prototype.filter.call(fig.parentElement.children, function (c) { return c.tagName === "FIGURE" && c.querySelector("img"); });
      figs.forEach(function (f, i) {
        if (f === fig) idx = i;
        var im = f.querySelector("img"), d = datosFigura(f);
        items.push({ src: im.currentSrc || im.src, alt: im.alt, nombre: d.nombre, detalle: [d.medida, d.precio].filter(Boolean).join(" · "), msg: d.msg });
      });
    } else if (kit) {
      var kits = kit.parentElement.querySelectorAll(".kit");
      kits.forEach(function (k, i) {
        if (k === kit) idx = i;
        var im = k.querySelector("img"), nom = k.querySelector("h4") ? k.querySelector("h4").textContent : "Kit";
        items.push({ src: im.currentSrc || im.src, alt: im.alt, nombre: nom, detalle: "", msg: "Hola Artika Studio, me interesa el " + nom + ". ¿Me cuentan más?" });
      });
    } else { return; }
    grupo = items;
    mostrar(idx);
    if (!visor.open) visor.showModal();
    document.documentElement.classList.add("visor-abierto");
  }

  visor.querySelector(".visor__cerrar").addEventListener("click", function () { visor.close(); });
  visor.querySelector(".visor__flecha--ant").addEventListener("click", function () { mostrar(pos - 1); });
  visor.querySelector(".visor__flecha--sig").addEventListener("click", function () { mostrar(pos + 1); });
  visor.addEventListener("close", function () { document.documentElement.classList.remove("visor-abierto"); });
  visor.addEventListener("click", function (e) { if (e.target === visor) visor.close(); }); // clic fuera de la foto
  visor.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); mostrar(pos + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); mostrar(pos - 1); }
  });
  // Deslizar con el dedo
  var x0 = null;
  visor.addEventListener("touchstart", function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
  visor.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) mostrar(pos + (dx < 0 ? 1 : -1));
  }, { passive: true });

  // Las fotos que se pueden ampliar
  var AMPLIABLE = "figure img, .kit img";
  document.addEventListener("click", function (e) {
    var img = e.target.closest && e.target.closest(AMPLIABLE);
    if (img && !img.closest("dialog") && !img.closest("a")) abrir(img);
  });
  document.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches(AMPLIABLE) && !e.target.closest("dialog")) {
      e.preventDefault(); abrir(e.target);
    }
  });

  /* ---------- Decoración de lo que la página dibuja después ---------- */
  function decorar() {
    // Fotos accesibles con teclado
    document.querySelectorAll(AMPLIABLE).forEach(function (img) {
      if (img.closest("dialog") || img.dataset.amp) return;
      img.dataset.amp = "1";
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", "Ampliar foto: " + (img.alt || "figura"));
    });
    // Botón "Pedir" en cada figura con nombre
    document.querySelectorAll(".figura, #tempGaleria .foto").forEach(function (fig) {
      if (fig.querySelector(".figura__pedir") || !fig.querySelector("figcaption")) return;
      var a = el("a", "figura__pedir", "Pedir");
      a.href = wa(datosFigura(fig).msg);
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", "Pedir " + datosFigura(fig).nombre + " por WhatsApp");
      fig.appendChild(a);
    });
    // Vista previa de fotos en cada categoría (se ve aunque esté cerrada)
    document.querySelectorAll("details.tamano").forEach(function (det) {
      var sum = det.querySelector("summary");
      if (!sum || sum.querySelector(".tamano__vista")) return;
      var imgs = det.querySelectorAll(".figuras img");
      if (!imgs.length) return;
      var vista = el("span", "tamano__vista");
      vista.setAttribute("aria-hidden", "true");
      Array.prototype.slice.call(imgs, 0, 4).forEach(function (im) {
        var m = document.createElement("img");
        m.src = im.getAttribute("src");
        m.alt = "";
        m.width = 40;
        m.height = 40;
        m.loading = "lazy";
        vista.appendChild(m);
      });
      var precio = sum.querySelector(".tamano__precio");
      sum.insertBefore(vista, precio || null);
    });
  }
  decorar();
  new MutationObserver(decorar).observe(document.body, { childList: true, subtree: true });

  /* ---------- Tarjetas del inicio: varias fotos que van rotando ---------- */
  var tarjetas = document.querySelectorAll(".acceso");
  if (tarjetas.length) {
    var rotadores = [];
    tarjetas.forEach(function (card, n) {
      var base = card.querySelector("img");
      if (!base) return;
      var lista = (card.getAttribute("data-fotos") || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
      if (base.id === "accTempImg" && typeof TEMPORADA !== "undefined") {
        lista = TEMPORADA.items.slice(0, 3).map(function (i) { return i.img; });
        if (lista.length) base.src = "img/" + lista[0];
      }
      if (lista.length < 2) return;
      var caja = el("span", "acceso__fotos");
      base.parentNode.insertBefore(caja, base);
      base.classList.add("activa");
      caja.appendChild(base);
      lista.slice(1).forEach(function (f) {
        var im = document.createElement("img");
        im.src = "img/" + f; im.alt = ""; im.loading = "lazy";
        im.width = base.width; im.height = base.height;
        caja.appendChild(im);
      });
      var imgs = caja.querySelectorAll("img"), actual = 0;
      rotadores.push({ imgs: imgs, paso: function () {
        imgs[actual].classList.remove("activa");
        actual = (actual + 1) % imgs.length;
        imgs[actual].classList.add("activa");
      }, retraso: n * 600 });
    });
    if (!reducir && rotadores.length) {
      rotadores.forEach(function (r) {
        setTimeout(function () {
          setInterval(function () { if (!document.hidden) r.paso(); }, 3200);
        }, r.retraso);
      });
    }
  }

  /* ---------- Calculadora de pedido ---------- */
  var calc = document.getElementById("calc");
  if (calc && typeof PRECIOS_PEDIDO !== "undefined") {
    var selProd = document.getElementById("calcProducto");
    var inpCant = document.getElementById("calcCantidad");
    var res = document.getElementById("calcRes");
    var btn = document.getElementById("calcPedir");
    PRECIOS_PEDIDO.forEach(function (p) {
      var o = el("option", "", p.nombre); o.value = p.id; selProd.appendChild(o);
    });

    function calcular() {
      var p = PRECIOS_PEDIDO.filter(function (x) { return x.id === selProd.value; })[0];
      var n = parseInt(inpCant.value, 10);
      res.textContent = "";
      if (!p || !(n > 0)) { res.appendChild(el("p", "calc__aviso", "Escribe cuántas unidades quieres.")); btn.hidden = true; return; }
      if (p.maximo && n >= p.maximo) {
        res.appendChild(el("p", "calc__aviso", "Para " + p.maximo + " unidades o más cotizamos por WhatsApp para darte el mejor precio."));
        btn.href = wa("Hola Artika Studio, quiero cotizar " + n + " " + p.nombre.toLowerCase() + ".");
        btn.hidden = false; return;
      }
      var tramo = p.tramos.filter(function (t) { return n <= t.hasta; })[0] || p.tramos[p.tramos.length - 1];
      var total = tramo.precio * n;
      var fila = function (a, b, grande) {
        var d = el("div", "calc__fila" + (grande ? " calc__fila--total" : ""));
        d.appendChild(el("span", "", a)); d.appendChild(el("strong", "", b)); res.appendChild(d);
      };
      fila("Precio por unidad", dinero(tramo.precio));
      fila("Total de " + n + (n === 1 ? " unidad" : " unidades"), dinero(total), true);
      fila("Anticipo para confirmar (40%)", dinero(total * 0.4));
      res.appendChild(el("p", "calc__nota", "Precio sin pinceles, sin tarjeta personalizada y sin paleta mezcladora. El valor final lo confirmamos por WhatsApp."));
      btn.href = wa("Hola Artika Studio, quiero pedir " + n + " " + p.nombre.toLowerCase() + " (" + dinero(total) + " en total). ¿Me ayudan a confirmarlo?");
      btn.hidden = false;
    }
    selProd.addEventListener("change", calcular);
    inpCant.addEventListener("input", calcular);
    calc.addEventListener("submit", function (e) { e.preventDefault(); });
    calcular();
  }
})();
