// === Elemente principale ===
const images = document.querySelectorAll('.trending-images img');
const modal = document.getElementById('commentModal');
const selectedImage = document.getElementById('selectedImage');
const closeModal = document.getElementById('closeModal');
const commentsList = document.getElementById('commentsList');
const commentInput = document.getElementById('commentInput');
const submitComment = document.getElementById('submitComment');

// === Salvăm comentariile pentru fiecare imagine ===
let comments = {}; // ex: { 'Art7.jpg': ['frumos!', 'super'] }
let currentImageSrc = "";

// === Deschidere fereastră când dai click pe imagine ===
images.forEach(img => {
  img.addEventListener('click', () => {
    currentImageSrc = img.src;
    selectedImage.src = currentImageSrc;
    modal.style.display = 'flex';
    loadComments();
  });
});

// === Închidere fereastră ===
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// === Închidere și dacă dai click în afara ferestrei ===
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

// === Afișare comentarii ===
function loadComments() {
  commentsList.innerHTML = "";
  const imgComments = comments[currentImageSrc] || [];
  if (imgComments.length === 0) {
    commentsList.innerHTML = "<p style='opacity:0.6'>Niciun comentariu încă...</p>";
  } else {
    imgComments.forEach(c => {
      const p = document.createElement('p');
      p.textContent = c;
      commentsList.appendChild(p);
    });
  }
}

// === Adăugare comentariu ===
submitComment.addEventListener('click', () => {
  const text = commentInput.value.trim();
  if (text === "") return;
  
  if (!comments[currentImageSrc]) comments[currentImageSrc] = [];
  comments[currentImageSrc].push(text);
  commentInput.value = "";
  loadComments();
});
