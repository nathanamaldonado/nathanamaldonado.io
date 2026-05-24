const wrapper = document.querySelector('.carousel-wrapper');
const cards = document.querySelectorAll('.story-card');

const currentEl = document.getElementById('current');
const totalEl = document.getElementById('total');


const nextBtn = document.querySelector('.floating-nav.right');
const prevBtn = document.querySelector('.floating-nav.left');

let currentIndex = 0;

totalEl.textContent = cards.length;


function updateActiveCard() {

  const scrollLeft = wrapper.scrollLeft;

  /* HANDLE FIRST CARD */

  if (scrollLeft <= 40) {

    cards.forEach(card =>
      card.classList.remove('active')
    );

    cards[0].classList.add('active');

    currentIndex = 0;
    currentEl.textContent = 1;

    return;
  }

  /* HANDLE LAST CARD */

  const maxScroll =
    wrapper.scrollWidth - wrapper.clientWidth;

  if (scrollLeft >= maxScroll - 40) {

    cards.forEach(card =>
      card.classList.remove('active')
    );

    cards[cards.length - 1]
      .classList.add('active');

    currentIndex = cards.length - 1;
    currentEl.textContent = cards.length;

    return;
  }

  /* NORMAL CENTER DETECTION */

  const wrapperCenter =
    scrollLeft + wrapper.offsetWidth / 2;

  let closestCard = null;
  let closestDistance = Infinity;

  cards.forEach((card, index) => {

    const cardCenter =
      card.offsetLeft + card.offsetWidth / 2;

    const distance =
      Math.abs(wrapperCenter - cardCenter);

    if (distance < closestDistance) {

      closestDistance = distance;
      closestCard = card;
      currentIndex = index;

    }

  });

  cards.forEach(card =>
    card.classList.remove('active')
  );

  closestCard.classList.add('active');

  currentEl.textContent = currentIndex + 1;

}
/* SCROLL BUTTON */

nextBtn.addEventListener('click', () => {

  const nextIndex =
    (currentIndex + 1) % cards.length;

  cards[nextIndex].scrollIntoView({
    behavior:'smooth',
    inline:'center',
    block:'nearest'
  });

});

prevBtn.addEventListener('click', () => {

  const prevIndex =
    (currentIndex - 1 + cards.length) % cards.length;

  cards[prevIndex].scrollIntoView({
    behavior:'smooth',
    inline:'center',
    block:'nearest'
  });

});

/* USER SCROLL */

wrapper.addEventListener('scroll', () => {
  window.requestAnimationFrame(updateActiveCard);
});

/* CLICK CARD */

cards.forEach((card, index) => {

  card.addEventListener('click', () => {

    currentIndex = index;

    card.scrollIntoView({
      behavior:'smooth',
      inline:'center',
      block:'nearest'
    });

  });

});


updateActiveCard();