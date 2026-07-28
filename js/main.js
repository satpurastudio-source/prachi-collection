/* ═══════════════════════════════════════════════════════════
   Prachi Bridal Hub — interactions
   No dependencies, no build step. Everything degrades gracefully:
   with JS disabled the page is still complete and readable.
   ═══════════════════════════════════════════════════════════ */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  // ?shot=1 — screenshot/debug mode: skip the loader and entrance animations
  // and settle everything into its final state immediately.
  const SHOT = new URLSearchParams(location.search).has("shot");
  const calm = SHOT || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (SHOT) {
    document.documentElement.classList.add("is-shot");
    document.addEventListener("DOMContentLoaded", () =>
      $$("img[loading='lazy']").forEach((img) => img.setAttribute("loading", "eager"))
    );
  }

  /* ───────────────────────────────────────────────────────
     Lookbook contents.
     Edit this list to change the gallery — add an object, drop the
     matching image in assets/images/, and the grid + filters + lightbox
     all pick it up automatically.
     ─────────────────────────────────────────────────────── */
  const LOOKS = [
    { img: "bridal-01", cat: "bridal", name: "Bridal Lehenga", tag: "Bridal" },
    { img: "men-01", cat: "men", name: "Sherwani", tag: "Men's" },
    { img: "party-01", cat: "party", name: "Evening Gown", tag: "Party" },
    { img: "bridal-02", cat: "bridal", name: "Rajasthani Lehenga", tag: "Bridal" },
    { img: "jewellery-01", cat: "jewellery", name: "Bridal Jewellery Set", tag: "Jewellery" },
    { img: "siders-01", cat: "siders", name: "Siders' Coordinates", tag: "Siders" },
    { img: "men-02", cat: "men", name: "Open Jodhpuri", tag: "Men's" },
    { img: "bridal-03", cat: "bridal", name: "Gujarati Lehenga", tag: "Bridal" },
    { img: "party-02", cat: "party", name: "Indo-Western", tag: "Party" },
    { img: "bridal-04", cat: "bridal", name: "Reception Lehenga", tag: "Bridal" },
    { img: "men-03", cat: "men", name: "Safa & Crown", tag: "Men's" },
    { img: "jewellery-02", cat: "jewellery", name: "Kundan Set", tag: "Jewellery" },
    { img: "siders-02", cat: "siders", name: "Family Sets", tag: "Siders" },
    { img: "party-03", cat: "party", name: "Sangeet Wear", tag: "Party" },
    { img: "bridal-05", cat: "bridal", name: "Non-Bridal Lehenga", tag: "Bridal" },
    { img: "men-04", cat: "men", name: "Suit & Blazer", tag: "Men's" },
    { img: "jewellery-03", cat: "jewellery", name: "Groom Accessories", tag: "Jewellery" },
    { img: "party-04", cat: "party", name: "Cocktail Wear", tag: "Party" },
    { img: "siders-03", cat: "siders", name: "Coordinated Siders", tag: "Siders" },
    { img: "bridal-06", cat: "bridal", name: "Heavy Bridal Work", tag: "Bridal" },
  ];

  /* ── Loader ─────────────────────────────────────────── */
  const loader = $("#loader");
  const dismissLoader = () => loader && loader.classList.add("is-done");
  if (calm) dismissLoader();
  else {
    window.addEventListener("load", () => setTimeout(dismissLoader, 550));
    // Never let a slow font or image trap someone behind the curtain.
    setTimeout(dismissLoader, 3200);
  }

  /* ── Nav: stick, auto-hide, mobile menu ─────────────── */
  const nav = $("#nav");
  const toggle = $("#navToggle");
  const menu = $("#menu");
  let lastY = window.scrollY;
  let menuOpen = false;

  function onNavScroll() {
    const y = window.scrollY;
    nav.classList.toggle("is-stuck", y > 40);
    nav.classList.toggle("is-hidden", !menuOpen && y > 380 && y > lastY);
    lastY = y;
  }

  function setMenu(open) {
    menuOpen = open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add("is-open"));
      nav.classList.remove("is-hidden");
    } else {
      menu.classList.remove("is-open");
      setTimeout(() => { if (!menuOpen) menu.hidden = true; }, 450);
    }
  }

  toggle.addEventListener("click", () => setMenu(!menuOpen));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOpen) setMenu(false);
  });

  /* ── Reveal on scroll ───────────────────────────────── */
  const revealables = $$(".reveal");
  revealables.forEach((el) => el.style.setProperty("--d", el.dataset.delay || 0));

  if (calm || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );
    revealables.forEach((el) => io.observe(el));
  }

  /* ── Hero heading: word-by-word rise ────────────────── */
  const title = $("[data-split]");
  if (title && !calm) {
    // Wrap words (not characters) so the heading still wraps naturally
    // on narrow screens.
    const wrapWords = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) return wrapWords(child);
        if (child.nodeType !== Node.TEXT_NODE || !child.textContent.trim()) return;
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (!part.trim()) return frag.appendChild(document.createTextNode(part));
          const span = document.createElement("span");
          span.className = "ch";
          span.textContent = part;
          frag.appendChild(span);
        });
        child.replaceWith(frag);
      });
    };
    wrapWords(title);

    $$(".ch", title).forEach((ch, i) => {
      ch.style.transform = "translateY(105%)";
      ch.style.opacity = "0";
      requestAnimationFrame(() => {
        ch.style.transition = `transform .95s cubic-bezier(.22,1,.36,1) ${180 + i * 70}ms,
                               opacity .7s ease ${180 + i * 70}ms`;
        ch.style.transform = "translateY(0)";
        ch.style.opacity = "1";
      });
    });
  }

  /* ── Parallax ───────────────────────────────────────── */
  const parallaxers = $$("[data-parallax]");
  if (parallaxers.length && !calm) {
    let ticking = false;
    const apply = () => {
      const mid = window.innerHeight / 2;
      parallaxers.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
        const offset = (rect.top + rect.height / 2 - mid) * parseFloat(el.dataset.parallax);
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    const request = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    apply();
  }

  /* ── Custom cursor ──────────────────────────────────── */
  const cursor = $("#cursor");
  if (cursor && window.matchMedia("(pointer: fine)").matches && !calm) {
    const dot = $(".cursor__dot", cursor);
    const ring = $(".cursor__ring", cursor);
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    }, { passive: true });

    (function trail() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx.toFixed(1)}px, ${ry.toFixed(1)}px) translate(-50%, -50%)`;
      requestAnimationFrame(trail);
    })();

    document.addEventListener("mouseover", (e) => {
      const hot = e.target.closest("a, button, .tile, .crow");
      cursor.classList.toggle("is-hot", Boolean(hot));
    });
  }

  /* ── Collections: image preview that follows the cursor ── */
  const hoverCard = $("#hoverCard");
  const hoverImg = hoverCard && $("img", hoverCard);
  if (hoverCard && window.matchMedia("(pointer: fine)").matches && !calm) {
    let hx = 0, hy = 0, cx = 0, cy = 0, live = false;

    $$(".crow").forEach((row) => {
      row.addEventListener("mouseenter", () => {
        hoverImg.src = row.dataset.img;
        hoverImg.alt = "";
        hoverCard.classList.add("is-on");
        live = true;
      });
      row.addEventListener("mouseleave", () => {
        hoverCard.classList.remove("is-on");
        live = false;
      });
    });

    window.addEventListener("mousemove", (e) => { hx = e.clientX; hy = e.clientY; }, { passive: true });

    (function follow() {
      if (live) {
        cx += (hx - cx) * 0.12;
        cy += (hy - cy) * 0.12;
        hoverCard.style.left = `${cx.toFixed(1)}px`;
        hoverCard.style.top = `${cy.toFixed(1)}px`;
      } else {
        cx = hx; cy = hy;
      }
      requestAnimationFrame(follow);
    })();
  }

  /* ── Lookbook grid ──────────────────────────────────── */
  const grid = $("#lookGrid");
  if (grid) {
    grid.innerHTML = LOOKS.map(
      (look, i) => `
      <figure class="tile reveal" data-cat="${look.cat}" data-index="${i}" tabindex="0" role="button"
              aria-label="View ${look.name}">
        <img src="assets/images/${look.img}.svg" alt="${look.name} — Prachi Bridal Hub"
             width="600" height="800" loading="lazy" decoding="async" />
        <figcaption><em>${look.name}</em><span>${look.tag}</span></figcaption>
      </figure>`
    ).join("");

    // Newly-created tiles need to join the reveal observer.
    $$(".tile", grid).forEach((tile, i) => {
      tile.style.setProperty("--d", i % 4);
      if (calm || !("IntersectionObserver" in window)) tile.classList.add("is-in");
    });
    if (!calm && "IntersectionObserver" in window) {
      const io2 = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io2.unobserve(e.target);
        }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
      );
      $$(".tile", grid).forEach((t) => io2.observe(t));
    }
  }

  /* ── Filtering ──────────────────────────────────────── */
  let activeFilter = "all";

  function applyFilter(cat) {
    activeFilter = cat;
    $$(".filters__btn").forEach((btn) => {
      const on = btn.dataset.filter === cat;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", String(on));
    });
    $$(".tile", grid).forEach((tile) => {
      tile.classList.toggle("is-hidden", cat !== "all" && tile.dataset.cat !== cat);
    });
  }

  $$(".filters__btn").forEach((btn) =>
    btn.addEventListener("click", () => applyFilter(btn.dataset.filter))
  );

  // Clicking a collection row filters the lookbook before jumping to it.
  $$(".crow a[data-filter]").forEach((a) =>
    a.addEventListener("click", () => applyFilter(a.dataset.filter))
  );

  /* ── Lightbox ───────────────────────────────────────── */
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCap = $("#lbCap");
  let lbIndex = 0;
  let lastFocus = null;

  const visibleTiles = () => $$(".tile", grid).filter((t) => !t.classList.contains("is-hidden"));

  function showAt(index) {
    const tiles = visibleTiles();
    if (!tiles.length) return;
    lbIndex = (index + tiles.length) % tiles.length;
    const look = LOOKS[Number(tiles[lbIndex].dataset.index)];
    lbImg.src = `assets/images/${look.img}.svg`;
    lbImg.alt = `${look.name} — Prachi Bridal Hub`;
    lbCap.textContent = `${look.name} · ${look.tag}`;
  }

  function openLightbox(tile) {
    lastFocus = document.activeElement;
    const tiles = visibleTiles();
    showAt(tiles.indexOf(tile));
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => lb.classList.add("is-on"));
    $("#lbClose").focus();
  }

  function closeLightbox() {
    lb.classList.remove("is-on");
    document.body.style.overflow = "";
    setTimeout(() => { lb.hidden = true; }, 350);
    if (lastFocus) lastFocus.focus();
  }

  if (grid && lb) {
    grid.addEventListener("click", (e) => {
      const tile = e.target.closest(".tile");
      if (tile) openLightbox(tile);
    });
    grid.addEventListener("keydown", (e) => {
      const tile = e.target.closest(".tile");
      if (tile && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        openLightbox(tile);
      }
    });

    $("#lbClose").addEventListener("click", closeLightbox);
    $("#lbPrev").addEventListener("click", () => showAt(lbIndex - 1));
    $("#lbNext").addEventListener("click", () => showAt(lbIndex + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });

    document.addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showAt(lbIndex - 1);
      if (e.key === "ArrowRight") showAt(lbIndex + 1);
    });
  }

  /* ── Opening hours, in India Standard Time ──────────── */
  // Sunday = 0. Times are minutes past midnight.
  const HOURS = {
    0: [13 * 60, 19 * 60 + 30],
    1: [13 * 60, 20 * 60 + 30],
    2: [13 * 60, 20 * 60 + 30],
    3: [13 * 60, 20 * 60 + 30],
    4: [13 * 60, 20 * 60 + 30],
    5: [13 * 60, 20 * 60 + 30],
    6: [13 * 60, 18 * 60 + 30],
  };
  const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function nowInIST() {
    // Read the wall clock in Kolkata regardless of where the visitor is.
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
    const short = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return {
      day: short.indexOf(get("weekday")),
      minutes: Number(get("hour")) * 60 + Number(get("minute")),
    };
  }

  function to12h(mins) {
    const h = Math.floor(mins / 60);
    const m = String(mins % 60).padStart(2, "0");
    const suffix = h >= 12 ? "PM" : "AM";
    const hh = h % 12 === 0 ? 12 : h % 12;
    return `${hh}:${m} ${suffix}`;
  }

  function storeStatus() {
    const { day, minutes } = nowInIST();
    if (day < 0) return { open: false, text: "Open daily from 1 PM" };

    const [open, close] = HOURS[day];
    if (minutes >= open && minutes < close) {
      return { open: true, text: `Open now · until ${to12h(close)}` };
    }
    if (minutes < open) {
      return { open: false, text: `Closed · opens today at ${to12h(open)}` };
    }
    const next = (day + 1) % 7;
    return { open: false, text: `Closed · opens ${DAY_NAMES[next]} at ${to12h(HOURS[next][0])}` };
  }

  function paintStatus() {
    const { open, text } = storeStatus();
    [$("#storeStatus"), $("#storeStatus2")].forEach((el) => {
      if (!el) return;
      el.classList.toggle("is-open", open);
      el.classList.toggle("is-shut", !open);
      $("span", el).textContent = text;
    });

    const today = nowInIST().day;
    $$("#hoursTable tr").forEach((tr) => {
      const days = (tr.dataset.days || "").split(",").map(Number);
      tr.classList.toggle("is-today", days.includes(today));
    });
  }
  paintStatus();
  setInterval(paintStatus, 60_000);

  /* ── Count-up stats ─────────────────────────────────── */
  const counters = $$("[data-count]");
  if (counters.length) {
    const run = (el) => {
      const target = Number(el.dataset.count);
      if (calm) { el.textContent = String(target).padStart(2, "0"); return; }
      let frame = 0;
      const total = 34;
      const tick = () => {
        frame += 1;
        const eased = 1 - Math.pow(1 - frame / total, 3);
        el.textContent = String(Math.round(target * eased)).padStart(2, "0");
        if (frame < total) requestAnimationFrame(tick);
      };
      tick();
    };

    if (!("IntersectionObserver" in window)) counters.forEach(run);
    else {
      const io3 = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (!e.isIntersecting) return;
          run(e.target);
          io3.unobserve(e.target);
        }),
        { threshold: 0.6 }
      );
      counters.forEach((c) => io3.observe(c));
    }
  }

  /* ── WhatsApp button reveals past the hero ──────────── */
  const wa = $(".wa");
  function onScroll() {
    onNavScroll();
    if (wa) wa.classList.toggle("is-in", window.scrollY > window.innerHeight * 0.6);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Footer year ────────────────────────────────────── */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
