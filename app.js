document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("trendingImages");
  const searchInput = document.getElementById("searchInput");
  const themeBtn = document.querySelector(".circle-btn");

  const commentModal = document.getElementById("commentModal");
  const selectedImage = document.getElementById("selectedImage");
  const closeCommentModal = document.getElementById("closeModal");
  const deleteImageBtn = document.getElementById("deleteImageBtn");

  const commentsList = document.getElementById("commentsList");
  const commentInput = document.getElementById("commentInput");
  const submitComment = document.getElementById("submitComment");

  let currentImageSrc = "";
  let comments = {};

  function saveUploadedImages(imagesArray) {
    localStorage.setItem("uploadedImages", JSON.stringify(imagesArray));
  }

  function getUploadedImages() {
    return JSON.parse(localStorage.getItem("uploadedImages")) || [];
  }

  const trendingImages = [
    { src: "Imag/Art1.jpg", alt: "Artwork 1" },
    { src: "Imag/Art2.jpg", alt: "Artwork 2" },
    { src: "Imag/Art3.jpg", alt: "Artwork 3" },
    { src: "Imag/Art4.jpg", alt: "Artwork 4" },
    { src: "Imag/Art5.jpg", alt: "Artwork 5" },
    { src: "Imag/Art6.jpg", alt: "Artwork 6" },
    { src: "Imag/Art15.jpg", alt: "Artwork 15" }
  ];

  const popularImages = [
    { src: "Imag/Art13.jpg", alt: "Artwork 13" },
    { src: "Imag/Art7.jpg", alt: "Artwork 7" },
    { src: "Imag/Art8.jpg", alt: "Artwork 8" },
    { src: "Imag/Art9.jpg", alt: "Artwork 9" },
    { src: "Imag/Art10.jpg", alt: "Artwork 10" },
    { src: "Imag/Art11.jpg", alt: "Artwork 11" },
    { src: "Imag/Art12.jpg", alt: "Artwork 12" }
  ];

  const latestImages = [
    { src: "Imag/Art14.jpg", alt: "Artwork 14" },
    { src: "Imag/Art16.jpg", alt: "Artwork 16" },
    { src: "Imag/Art17.jpg", alt: "Artwork 17" },
    { src: "Imag/Art18.jpg", alt: "Artwork 18" },
    { src: "Imag/Art19.jpg", alt: "Artwork 19" }
  ];

const creatorsImagesData = [ { src: "Imag/OIP.webp", alt: "Vincent van Gogh", title: "Vincent van Gogh",
   description: "Pictor post-impresionist olandez, cunoscut pentru culorile intense și emoția profundă." },
  { src: "Imag/Frida-Kahlo.jpg", alt: "Frida Kahlo", title: "Frida Kahlo", description: "Pictoriță mexicană celebră pentru autoportretele sale simbolice." },
  { src: "Imag/Freud-Lucian.jpg", alt: "Lucian Freud", title: "Lucian Freud", description: "Pictor britanic cunoscut pentru portrete realiste și intense." },
  { src: "Imag/Paula-Modersohn.webp", alt: "Paula Modersohn-Becker", title: "Paula Modersohn-Becker", description: "Pictoriță germană, pionieră a artei moderne." } ];
   const creatorsContainer = document.getElementById("creatorsImages");
   if (creatorsContainer) { creatorsImagesData.forEach(data => { const img = document.createElement("img"); img.src = data.src;
   img.alt = data.alt; creatorsContainer.appendChild(img);
   img.addEventListener("click", () => { if (!infoPanel) return; infoImage.src = data.src; artTitle.textContent = data.title;
   artDescription.textContent = data.description; infoPanel.style.display = "block"; window.scrollTo({ top: 0, behavior: "smooth" });
   });
   }); }

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
      container.appendChild(img);
    });

    const savedUploads = getUploadedImages();

    savedUploads.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Lucrare nouă";
      img.className = "uploaded-img";
      container.prepend(img);
    });
  }

  if (container) {
    container.addEventListener("click", (e) => {
      if (e.target.tagName === "IMG") {
        currentImageSrc = e.target.src;
        selectedImage.src = currentImageSrc;
        commentModal.style.display = "flex";
        loadComments();

        if (e.target.classList.contains("uploaded-img")) {
          deleteImageBtn.style.display = "block";
        } else {
          deleteImageBtn.style.display = "none";
        }
      }
    });
  }

  if (closeCommentModal) {
    closeCommentModal.onclick = () => {
      commentModal.style.display = "none";
    };
  }

  if (deleteImageBtn) {
    deleteImageBtn.onclick = () => {

      const confirmDelete = confirm("Sigur vrei să ștergi această imagine?");
      if (!confirmDelete) return;

      const images = container.querySelectorAll("img");
      images.forEach(img => {
        if (img.src === currentImageSrc) {
          img.remove();
        }
      });

      let saved = getUploadedImages();
      saved = saved.filter(src => src !== currentImageSrc);
      saveUploadedImages(saved);

      commentModal.style.display = "none";
    };
  }

  if (submitComment) {
    submitComment.onclick = () => {
      const text = commentInput.value.trim();
      if (!text) return;

      if (!comments[currentImageSrc]) {
        comments[currentImageSrc] = [];
      }

      comments[currentImageSrc].push(text);
      commentInput.value = "";
      loadComments();
    };
  }

  function loadComments() {
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

  const openUpload = document.getElementById("openUpload");
  const uploadModal = document.getElementById("uploadModal");
  const closeUpload = document.getElementById("closeUpload");
  const cancelUpload = document.getElementById("cancelUpload");
  const fileInput = document.getElementById("fileInput");
  const preview = document.getElementById("preview");
  const uploadBtn = document.getElementById("uploadBtn");

  let uploadedImageSrc = "";

  function closeUploadModal() {
    uploadModal.style.display = "none";
    fileInput.value = "";
    preview.src = "";
    uploadedImageSrc = "";
  }

  if (openUpload) openUpload.onclick = () => uploadModal.style.display = "flex";
  if (closeUpload) closeUpload.onclick = closeUploadModal;
  if (cancelUpload) cancelUpload.onclick = closeUploadModal;

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
    uploadBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (!uploadedImageSrc) {
        alert("Selectează o imagine înainte de a încărca!");
        return;
      }

      const newImg = document.createElement("img");
      newImg.src = uploadedImageSrc;
      newImg.alt = "Lucrare nouă";
      newImg.className = "uploaded-img";

      container.prepend(newImg);

      const existingImages = getUploadedImages();
      existingImages.unshift(uploadedImageSrc);
      saveUploadedImages(existingImages);

      closeUploadModal();
    });
  }

  if (themeBtn) {
    themeBtn.onclick = () => {
      const currentTheme = document.body.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    };
  }

  const savedTheme = localStorage.getItem("theme");
  document.body.setAttribute("data-theme", savedTheme || "light");

});