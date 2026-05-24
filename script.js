const wrapper = document.querySelector('.carousel-wrapper');
const cards = document.querySelectorAll('.story-card');

const currentEl = document.getElementById('current');
const totalEl = document.getElementById('total');

const nextBtn = document.querySelector('.floating-nav');

let currentIndex = 0;

totalEl.textContent = cards.length;


function updateActiveCard(){

  const wrapperCenter =
    wrapper.scrollLeft + wrapper.offsetWidth / 2;

  let closestCard = null;
  let closestDistance = Infinity;

  cards.forEach((card, index) => {

    const cardCenter =
      card.offsetLeft + card.offsetWidth / 2;

    const distance = Math.abs(wrapperCenter - cardCenter);

    if(distance < closestDistance){
      closestDistance = distance;
      closestCard = card;
      currentIndex = index;
    }

  });

  cards.forEach(card => card.classList.remove('active'));

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