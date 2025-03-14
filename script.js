// this is for the faq section
function toggleAnswer(question) {
  const answer = question.querySelector('.question-answer');
  const isActive = question.classList.contains('active');

  // when opened a question, close all others
  document.querySelectorAll('.question').forEach(q => {
    q.classList.remove('active');
    q.querySelector('.question-answer').style.display = 'none';
  });

  // If the question is not open, this opens it (by adding the "active" class and showing the answer). If the question was already open, it stays as is and nothing changes.

  if (!isActive) {
    question.classList.add('active');
    answer.style.display = 'block';
  }
}

// sticker interaction
const stickers = document.querySelectorAll('.sticker');
let isDragging = false;
let currentSticker = null;
let offsetX = 0;
let offsetY = 0;

// Thiswwaits for user to click on a sticker. 
// 
// It marks when user is dragging, sets which sticker is being dragged, puts that sticker on top (zIndex 999),
// 
// Lastkyl lets user move it around smoothly.

stickers.forEach(sticker => {
  sticker.addEventListener('mousedown', e => {
    isDragging = true;
    currentSticker = e.target;
    currentSticker.style.zIndex = 999; // puts the sticker anove all
    offsetX = e.clientX - currentSticker.offsetLeft;
    offsetY = e.clientY - currentSticker.offsetTop;
  });
});

// while dragging, follow the mouse
document.addEventListener('mousemove', e => {
  if (!isDragging) return;
  currentSticker.style.left = (e.clientX - offsetX) + 'px';
  currentSticker.style.top = (e.clientY - offsetY) + 'px';
});

// when the user releases the mouse, stop dragging
document.addEventListener('mouseup', () => {
  isDragging = false;
  if (currentSticker) {
    currentSticker.style.zIndex = 1;
    currentSticker = null;
  }
});

// LETEER BY LETTER TYPING EFFECT
(function initTypingEffect() {
  const words = ["Future.", "Story.", "Path.", "Career.", "Growth.", "Potential."];
  let index = 0;
  let charIndex = 0;
  let isDeleting = false;
  const textSpan = document.querySelector(".pre-footer-title span");

  function typeEffect() {
    let currentWord = words[index];

    // type one letter or erase one letter
    if (!isDeleting) {
      textSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    } else {
      textSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    }

    // when the word is fully typed, wait one second and erase
    if (charIndex === currentWord.length && !isDeleting) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
    }
    // when the word is fully erased, go to the next word
    else if (charIndex === 0 && isDeleting) {
      isDeleting = false;
      index = (index + 1) % words.length;
      setTimeout(typeEffect, 300);
    }
    // keep typing or erasing (decides)
    else {
      let speed = isDeleting ? 75 : 125;
      setTimeout(typeEffect, speed);
    }
  }
  typeEffect();
})();

// simple campus carousel
(function initCampusCarousel() {
  const campusImg = document.querySelector('.campus-img');
  if (!campusImg) return; // do nothing if no campus image

  const campusImages = [
    './img/campus_building.png',
    './img/campus_building_2.png',
    './img/campus_building_3.png',
    './img/campus_building_4.png',
    './img/campus_building_5.png'
  ];
  let campusIndex = 0;

  setInterval(() => {
    campusIndex = (campusIndex + 1) % campusImages.length;
    campusImg.src = campusImages[campusIndex];
  }, 4000);
})();

// events image carousel
document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "./img/events-img1.png",
    "./img/events-img2.png",
    "./img/events-img3.png",
    "./img/events-img4.png"
  ];
  let index = 0;
  const imgEl = document.querySelector(".events-img");
  if (!imgEl) return; // do nothing if no events image

  setInterval(() => {
    imgEl.style.opacity = 0;
    setTimeout(() => {
      index = (index + 1) % images.length;
      imgEl.src = images[index];
      imgEl.style.opacity = 1;
    }, 1000);
  }, 5000);
});

// corner peel effect
document.addEventListener("DOMContentLoaded", () => {
  const cornerPeel = document.querySelector(".corner-peel");
  if (!cornerPeel) return; // do nothing if no corner peel

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cornerPeel.classList.add("in-view");
        observer.unobserve(cornerPeel);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(cornerPeel);
});

// program folders
document.addEventListener('DOMContentLoaded', () => {
  const folders = document.querySelectorAll('.program-folder');

  folders.forEach(folder => {
    const header = folder.querySelector('.folder-header');
    if (!header) return;

    header.addEventListener('click', event => {
      event.preventDefault();

      // if this folder was closed, open it and close the others
      if (!folder.classList.contains('active')) {
        folders.forEach(f => {
          f.classList.remove('active');
          const content = f.querySelector('.folder-content');
          if (content) content.style.display = 'none';
        });
        folder.classList.add('active');
        const activeContent = folder.querySelector('.folder-content');
        if (activeContent) activeContent.style.display = 'flex';
      } else {
        // if it's already open, close it
        folder.classList.remove('active');
        const content = folder.querySelector('.folder-content');
        if (content) content.style.display = 'none';
      }
    });
  });
});

// mobile menu
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  if (!hamburger || !mobileMenu) return;

  // show or hide the menu when hamburger is clicked
  hamburger.addEventListener("click", e => {
    e.stopPropagation();
    mobileMenu.classList.toggle("active");
  });

  // Close menu if you click outside
  document.addEventListener("click", e => {
    if (window.innerWidth <= 500 && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove("active");
    }
  });

  // if you resize above 500px, close the menu also
  window.addEventListener("resize", () => {
    if (window.innerWidth > 500) {
      mobileMenu.classList.remove("active");
    }
  });
});
