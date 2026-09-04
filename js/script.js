(function () {
  const main = document.getElementById("series-container");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.querySelector(".lightbox-close");
  const heroImage = document.getElementById("hero-image");

  // Display order is reversed: the LAST photo in js/photos-data.js shows
  // first on the site (and becomes the hero image). This only affects
  // display order — your actual photos-data.js file is untouched.
  const ORDERED_PHOTOS = PHOTOS.slice().reverse();

  // Use the first photo in display order as the hero background.
  if (heroImage && ORDERED_PHOTOS.length > 0) {
    heroImage.style.backgroundImage = 'url("' + ORDERED_PHOTOS[0].url + '")';
  }

  // Fade-in-on-scroll for photo frames and section headings.
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  function openLightbox(photo) {
    lightboxImg.src = photo.url;
    lightboxImg.alt = photo.title || "";
    lightboxCaption.innerHTML = "";
    const t = document.createElement("span");
    t.className = "lightbox-title";
    t.textContent = photo.title || "";
    lightboxCaption.appendChild(t);
    if (photo.caption) {
      const c = document.createElement("span");
      c.className = "lightbox-subcaption";
      c.textContent = photo.caption;
      lightboxCaption.appendChild(c);
    }
    lightbox.hidden = false;
    lightboxClose.focus();
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lightbox.hidden) closeLightbox(); });

  // Group photos by category, preserving first-appearance order.
  // Any photo with no category (or a category not found in SERIES) falls
  // back to "Uncategorized" so nothing is ever silently dropped.
  const groups = new Map();
  const order = [];

  ORDERED_PHOTOS.forEach((photo) => {
    const key = (photo.category && photo.category.trim()) || "Uncategorized";
    if (!groups.has(key)) {
      groups.set(key, []);
      order.push(key);
    }
    groups.get(key).push(photo);
  });

  const seriesMeta = new Map(
    (typeof SERIES !== "undefined" ? SERIES : []).map((s) => [s.key, s])
  );

  const definedOrder = (typeof SERIES !== "undefined" ? SERIES : []).map((s) => s.key);
  const remaining = order.filter((k) => !definedOrder.includes(k));
  const renderOrder = [...definedOrder, ...remaining].filter((k) => groups.has(k));

  renderOrder.forEach((key) => {
    const photos = groups.get(key);
    const meta = seriesMeta.get(key) || { title: key, blurb: "" };

    const section = document.createElement("section");
    section.className = "series";
    section.id = "series-" + key.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const heading = document.createElement("h2");
    heading.className = "series-heading reveal";
    heading.textContent = meta.title || key;
    section.appendChild(heading);
    revealObserver.observe(heading);

    const metaLine = document.createElement("p");
    metaLine.className = "series-meta";
    metaLine.textContent = meta.blurb || (photos.length + (photos.length === 1 ? " photo" : " photos"));
    section.appendChild(metaLine);

    const grid = document.createElement("div");
    grid.className = "grid";
    grid.setAttribute("role", "list");

    photos.forEach((photo) => {
      const frame = document.createElement("div");
      frame.className = "frame reveal";
      frame.setAttribute("role", "listitem");
      frame.setAttribute("tabindex", "0");

      const photoWrap = document.createElement("div");
      photoWrap.className = "frame-photo";
      const img = document.createElement("img");
      img.src = photo.url;
      img.alt = photo.title || "";
      img.loading = "lazy";
      photoWrap.appendChild(img);

      const caption = document.createElement("div");
      caption.className = "frame-caption";
      const title = document.createElement("p");
      title.className = "frame-title";
      title.textContent = photo.title || "";
      caption.appendChild(title);

      if (photo.caption) {
        const sub = document.createElement("p");
        sub.className = "frame-sub";
        sub.textContent = photo.caption;
        caption.appendChild(sub);
      }

      frame.appendChild(photoWrap);
      frame.appendChild(caption);
      grid.appendChild(frame);
      revealObserver.observe(frame);

      frame.addEventListener("click", () => openLightbox(photo));
      frame.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(photo);
        }
      });
    });

    section.appendChild(grid);
    main.appendChild(section);
  });

  // Build the sticky filter bar: one pill per series, in the same order
  // as rendered, plus an "All" pill that shows everything.
  const filterBar = document.getElementById("filter-bar");
  if (filterBar && renderOrder.length > 1) {
    const sections = renderOrder.map((key) =>
      document.getElementById("series-" + key.toLowerCase().replace(/[^a-z0-9]+/g, "-"))
    );

    function setActivePill(btn) {
      filterBar.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
    }

    function applyFilter(targetKey) {
      renderOrder.forEach((key, i) => {
        const section = sections[i];
        if (!section) return;
        section.hidden = targetKey !== "all" && key !== targetKey;
      });
    }

    const allPill = document.createElement("button");
    allPill.type = "button";
    allPill.className = "filter-pill active";
    allPill.textContent = "All";
    allPill.addEventListener("click", () => {
      setActivePill(allPill);
      applyFilter("all");
    });
    filterBar.appendChild(allPill);

    renderOrder.forEach((key) => {
      const meta = seriesMeta.get(key) || { title: key };
      const pill = document.createElement("button");
      pill.type = "button";
      pill.className = "filter-pill";
      pill.textContent = meta.title || key;
      pill.addEventListener("click", () => {
        setActivePill(pill);
        applyFilter(key);
        document.getElementById("series-" + key.toLowerCase().replace(/[^a-z0-9]+/g, "-"))
          .scrollIntoView({ behavior: "smooth", block: "start" });
      });
      filterBar.appendChild(pill);
    });
  }
})();
