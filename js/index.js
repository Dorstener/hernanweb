// Mostrar navbar al hacer scroll
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return; // por si en alguna página no existe

  if (window.scrollY > 100) {
    navbar.classList.add('visible');
  } else {
    navbar.classList.remove('visible');
  }
});

/* ================================
   ORIGINAL – CAROUSEL
   (solo corre si existe el carrusel)
   ================================ */
document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.carousel-item');
  const btnLeft = document.querySelector('.carousel-btn.left');
  const btnRight = document.querySelector('.carousel-btn.right');

  // Si no estamos en una página con carrusel, no hacemos nada
  if (!track || items.length === 0 || !btnLeft || !btnRight) return;

  let currentIndex = 0;
  const visibleItems = 3;

  // Detectar el ancho real de un item al cargar
  let itemWidth = items[0].getBoundingClientRect().width + 16; // +16px gap

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }

  btnRight.addEventListener('click', () => {
    if (currentIndex < items.length - visibleItems) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  });

  btnLeft.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = items.length - visibleItems;
    }
    updateCarousel();
  });

  window.addEventListener('resize', () => {
    itemWidth = items[0].getBoundingClientRect().width + 16;
    updateCarousel();
  });
});

/* ================================
  SETLISTS – FILTRO DE CANCIONES
  (solo corre si existe .songs-grid)
   ================================ */
document.addEventListener('DOMContentLoaded', function () {
  const songsGrid = document.querySelector('.songs-grid');
  if (!songsGrid) return;

  // OJO: usamos SOLO los botones de filtro
  const setlistButtons = document.querySelectorAll('.setlist-filter-btn');
  const songCards = document.querySelectorAll('.song-card');

  function filterSongs(selectedSetlist) {
    songCards.forEach(card => {
      const cardSetlist = card.getAttribute('data-setlist');
      card.style.display = (cardSetlist === selectedSetlist) ? 'flex' : 'none';
    });
  }

  setlistButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedSetlist = button.getAttribute('data-filter');
      filterSongs(selectedSetlist);

      setlistButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

  // Default
  const defaultSetlist = setlistButtons[0]?.getAttribute('data-filter') || 'setlist1';
  filterSongs(defaultSetlist);

  setlistButtons.forEach(button => {
    if (button.getAttribute('data-filter') === defaultSetlist) {
      button.classList.add('active');
    }
  });
});

// FILTROS SETLISTS //

// FILTRO DE ARTISTA Y CANCIÓN
document.addEventListener('DOMContentLoaded', function () {
    const artistInput = document.getElementById('filter-artist');
    const titleInput = document.getElementById('filter-title');
    const songCards = document.querySelectorAll('.song-card');

    // Manejo visual de botones activos
    const setlistButtons = document.querySelectorAll('.btn-setlist');
    setlistButtons.forEach(button => {
        button.addEventListener('click', () => {
            setlistButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
        });
    });




    function filterSongs() {
        const selectedSetlist = document.querySelector('.btn-setlist.active')?.dataset.setlist;
        const artistValue = artistInput.value.toLowerCase();
        const titleValue = titleInput.value.toLowerCase();

        songCards.forEach(card => {
            const cardSetlist = card.dataset.setlist;
            const artist = card.querySelector('.song-artist').textContent.toLowerCase();
            const title = card.querySelector('.song-title').textContent.toLowerCase();

            const matchesSetlist = cardSetlist === selectedSetlist;
            const matchesArtist = artist.includes(artistValue);
            const matchesTitle = title.includes(titleValue);

            if (matchesSetlist && matchesArtist && matchesTitle) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    artistInput.addEventListener('input', filterSongs);
    titleInput.addEventListener('input', filterSongs);

});
