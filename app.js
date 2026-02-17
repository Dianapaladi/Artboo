document.addEventListener("DOMContentLoaded", () => {

  /* ========== ELEMENTE PRINCIPALE ========== */
  const container = document.getElementById("trendingImages");

  const modal = document.getElementById('commentModal');
  const selectedImage = document.getElementById('selectedImage');
  const closeModal = document.getElementById('closeModal');
  const commentsList = document.getElementById('commentsList');
  const commentInput = document.getElementById('commentInput');
  const submitComment = document.getElementById('submitComment');
  const searchInput = document.getElementById('searchInput');
  const themeBtn = document.querySelector('.circle-btn');

  /* ====== CREATORS – INFO PANEL ====== */
  const infoPanel = document.getElementById("infoPanel");
  const infoImage = document.getElementById("infoImage");
  const artTitle = document.getElementById("artTitle");
  const artDescription = document.getElementById("artDescription");
  const closeInfo = document.getElementById("closeInfo");

  let currentImageSrc = "";
  let comments = {};

  /* ========== DATE IMAGINI ========== */
  const trendingImages = [
    { src: "Imag/Art1.jpg", alt: "Artwork 1", class: "img1" },
    { src: "Imag/Art2.jpg", alt: "Artwork 2", class: "img2" },
    { src: "Imag/Art3.jpg", alt: "Artwork 3", class: "img3" },
    { src: "Imag/Art4.jpg", alt: "Artwork 4", class: "img4" },
    { src: "Imag/Art5.jpg", alt: "Artwork 5", class: "img5" },
    { src: "Imag/Art6.jpg", alt: "Artwork 6", class: "img6" },
    { src: "Imag/Art15.jpg", alt: "Artwork 15", class: "img15" }
  ];

  const popularImages = [
    { src: "Imag/Art13.jpg", alt: "Artwork 13", class: "img1" },
    { src: "Imag/Art7.jpg", alt: "Artwork 7", class: "img2" },
    { src: "Imag/Art8.jpg", alt: "Artwork 8", class: "img3" },
    { src: "Imag/Art9.jpg", alt: "Artwork 9", class: "img4" },
    { src: "Imag/Art10.jpg", alt: "Artwork 10", class: "img5" },
    { src: "Imag/Art11.jpg", alt: "Artwork 11", class: "img6" },
    { src: "Imag/Art12.jpg", alt: "Artwork 12", class: "img12" }
  ];

  const latestImages = [
    { src: "Imag/Art14.jpg", alt: "Artwork 14", class: "img14" },
    { src: "Imag/Art16.jpg", alt: "Artwork 16", class: "img16" },
    { src: "Imag/Art17.jpg", alt: "Artwork 17", class: "img17" },
    { src: "Imag/Art18.jpg", alt: "Artwork 18", class: "img18" },
    { src: "Imag/Art19.jpg", alt: "Artwork 19", class: "img19" }
  ];

  /* ====== DATE CREATORS (MODIFICAT) ====== */
  const creatorsImagesData = [
    {
      src: "Imag/OIP.webp",
      alt: "Vincent van Gogh",
      title: "Vincent van Gogh",
      description: "Pictor post-impresionist olandez, cunoscut pentru culorile intense și emoția profundă."
    },
    {
      src: "Imag/Frida-Kahlo.jpg",
      alt: "Frida Kahlo",
      title: "Frida Kahlo",
      description: "Pictoriță mexicană celebră pentru autoportretele sale simbolice."
    },
    {
      src: "Imag/Freud-Lucian.jpg",
      alt: "Lucian Freud",
      title: "Lucian Freud",
      description: "Pictor britanic cunoscut pentru portrete realiste și intense."
    },
    {
      src: "Imag/Paula-Modersohn.webp",
      alt: "Paula Modersohn-Becker",
      title: "Paula Modersohn-Becker",
      description: "Pictoriță germană, pionieră a artei moderne."
    }
  ];

  const creatorsContainer = document.getElementById("creatorsImages");

  if (creatorsContainer) {
    creatorsImagesData.forEach(data => {
      const img = document.createElement("img");
      img.src = data.src;
      img.alt = data.alt;
      creatorsContainer.appendChild(img);

      img.addEventListener("click", () => {
        if (!infoPanel) return;

        infoImage.src = data.src;
        artTitle.textContent = data.title;
        artDescription.textContent = data.description;

        infoPanel.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  /* ========== ÎNCĂRCARE IMAGINI ========== */
  if (container) {
    const page = container.dataset.page;
    let imagesToLoad = [];

    if (page === "trending") imagesToLoad = trendingImages;
    if (page === "popular") imagesToLoad = popularImages;
    if (page === "latest") imagesToLoad = latestImages;

    imagesToLoad.forEach(data => {
      const img = document.createElement("img");
      img.src = data.src;
      img.alt = data.alt;
      img.className = data.class;
      container.appendChild(img);
    });
  }

  let images = document.querySelectorAll(".trending-images img");

  /* ========== SEARCH ========== */
  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      const filter = searchInput.value.toLowerCase();
      images.forEach(img => {
        img.style.display =
          img.alt.toLowerCase().includes(filter) ? "block" : "none";
      });
    });
  }

  /* ========== COMENTARII ========== */
  if (modal && selectedImage) {
    images.forEach(img => {
      img.addEventListener("click", () => {
        currentImageSrc = img.src;
        selectedImage.src = currentImageSrc;
        modal.style.display = "flex";
        loadComments();
      });
    });
  }

  if (closeModal) {
    closeModal.onclick = () => modal.style.display = "none";
  }

  if (submitComment) {
    submitComment.onclick = () => {
      const text = commentInput.value.trim();
      if (!text) return;

      if (!comments[currentImageSrc])
        comments[currentImageSrc] = [];

      comments[currentImageSrc].push(text);
      commentInput.value = "";
      loadComments();
    };
  }

  function loadComments() {
    if (!commentsList) return;

    commentsList.innerHTML = "";
    const list = comments[currentImageSrc] || [];

    if (!list.length) {
      commentsList.innerHTML =
        "<p style='opacity:.6'>Niciun comentariu încă...</p>";
      return;
    }

    list.forEach(c => {
      const p = document.createElement("p");
      p.textContent = c;
      commentsList.appendChild(p);
    });
  }

  if (closeInfo) {
    closeInfo.onclick = () => {
      if (infoPanel) infoPanel.style.display = "none";
    };
  }

  /* ========== DARK / LIGHT MODE ========== */
  if (themeBtn) {
    themeBtn.onclick = () => {
      const theme =
        document.body.getAttribute("data-theme") === "light"
          ? "dark"
          : "light";

      document.body.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    };
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme)
    document.body.setAttribute("data-theme", savedTheme);

});
document.addEventListener("DOMContentLoaded", () => {

  /* ================= ELEMENTE GENERALE ================= */
  const container = document.getElementById("trendingImages");
  const searchInput = document.getElementById("searchInput");
  const themeBtn = document.querySelector(".circle-btn");

  /* ================= SISTEM COMENTARII ================= */
  const modal = document.getElementById("commentModal");
  const selectedImage = document.getElementById("selectedImage");
  const closeModal = document.getElementById("closeModal");
  const commentsList = document.getElementById("commentsList");
  const commentInput = document.getElementById("commentInput");
  const submitComment = document.getElementById("submitComment");

  let currentImageSrc = "";
  let comments = {};

  /* ================= CLICK PE IMAGINE ================= */
  if (container) {
    container.addEventListener("click", (e) => {
      if (e.target.tagName === "IMG") {
        currentImageSrc = e.target.src;
        selectedImage.src = currentImageSrc;
        modal.style.display = "flex";
        loadComments();
      }
    });
  }

  if (closeModal) {
    closeModal.onclick = () => modal.style.display = "none";
  }

  if (submitComment) {
    submitComment.onclick = () => {
      const text = commentInput.value.trim();
      if (!text) return;

      if (!comments[currentImageSrc])
        comments[currentImageSrc] = [];

      comments[currentImageSrc].push(text);
      commentInput.value = "";
      loadComments();
    };
  }

  function loadComments() {
    commentsList.innerHTML = "";
    const list = comments[currentImageSrc] || [];

    if (!list.length) {
      commentsList.innerHTML = "<p style='opacity:.6'>Niciun comentariu încă...</p>";
      return;
    }

    list.forEach(c => {
      const p = document.createElement("p");
      p.textContent = c;
      commentsList.appendChild(p);
    });
  }

  /* ================= SEARCH ================= */
  if (searchInput && container) {
    searchInput.addEventListener("keyup", () => {
      const filter = searchInput.value.toLowerCase();
      const images = container.querySelectorAll("img");

      images.forEach(img => {
        img.style.display =
          img.alt.toLowerCase().includes(filter) ? "block" : "none";
      });
    });
  }

  /* ================= UPLOAD IMAGINE ================= */
  const openUpload = document.getElementById("openUpload");
  const uploadModal = document.getElementById("uploadModal");
  const closeUpload = document.getElementById("closeUpload");
  const fileInput = document.getElementById("fileInput");
  const preview = document.getElementById("preview");
  const uploadBtn = document.getElementById("uploadBtn");

  let uploadedImageSrc = "";

  if (openUpload) {
    openUpload.onclick = () => uploadModal.style.display = "flex";
  }

  if (closeUpload) {
    closeUpload.onclick = () => uploadModal.style.display = "none";
  }

  window.addEventListener("click", (event) => {
    if (event.target === uploadModal) {
      uploadModal.style.display = "none";
    }
  });

  if (fileInput) {
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = e => {
        preview.src = e.target.result;
        uploadedImageSrc = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  if (uploadBtn && container) {
    uploadBtn.addEventListener("click", () => {
      if (!uploadedImageSrc) {
        alert("Selectează o imagine înainte de a încărca!");
        return;
      }

      const newImg = document.createElement("img");
      newImg.src = uploadedImageSrc;
      newImg.alt = "Lucrare nouă";
      newImg.className = "uploaded-img";

      container.prepend(newImg);

      uploadModal.style.display = "none";
      fileInput.value = "";
      preview.src = "";
      uploadedImageSrc = "";
    });
  }

  /* ================= DARK / LIGHT MODE ================= */
  if (themeBtn) {
    themeBtn.onclick = () => {
      const theme =
        document.body.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";

      document.body.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    };
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.setAttribute("data-theme", savedTheme);
  } else {
    document.body.setAttribute("data-theme", "light");
  }

});
