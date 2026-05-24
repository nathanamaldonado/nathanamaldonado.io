const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let current = 0;

function updateCarousel() {

  cards.forEach((card, index) => {
    card.classList.remove('active');

    if(index === current){
      card.classList.add('active');
    }
  });

  dots.forEach((dot, index) => {
    dot.classList.remove('active');

    if(index === current){
      dot.classList.add('active');
    }
  });

  const offset = current * -(cards[0].offsetWidth + 32);

  document.querySelector('.carousel-track').style.transform =
    `translateX(${offset}px)`;

}

nextBtn.addEventListener('click', () => {

  current++;

  if(current >= cards.length){
    current = 0;
  }

  updateCarousel();

});

prevBtn.addEventListener('click', () => {

  current--;

  if(current < 0){
    current = cards.length - 1;
  }

  updateCarousel();

});

updateCarousel();