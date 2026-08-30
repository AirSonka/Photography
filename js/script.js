(function () {
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.querySelector(".lightbox-close");

  function frameNumber(index) {
    return String(index + 1).padStart(2, "0");
  }

  function openLightbox(photo, index) {
    lightboxImg.src = photo.url;
    lightboxImg.alt = photo.title;
    lightboxCaption.textContent = "Frame " + frameNumber(index) + " — " + photo.title;
    lightbox.hidden = false;
    lightboxClose.focus();
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  PHOTOS.forEach(function (photo, index) {
    const frame = document.createElement("div");
    frame.className = "frame";
    frame.setAttribute("role", "listitem");
    frame.setAttribute("tabindex", "0");

    const img = document.createElement("img");
    img.src = photo.url;
    img.alt = photo.title;
    img.loading = "lazy";

    const label = document.createElement("div");
    label.className = "frame-label";
    label.innerHTML =
      '<span class="frame-number">' + frameNumber(index) + '</span>' +
      '<span class="frame-title">' + photo.title + '</span>';

    frame.appendChild(img);
    frame.appendChild(label);
    gallery.appendChild(frame);

    frame.addEventListener("click", function () {
      openLightbox(photo, index);
    });
    frame.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(photo, index);
      }
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
})();
