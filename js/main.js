const mySwiper = new Swiper('.swiper-container', {
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.slider-button-next',
    prevEl: '.slider-button-prev',
  },
});

// cart

const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
const modalClose = document.querySelector('.modal-close');
const overlay = document.querySelector('.overlay');

// Functions
const openModal = function () {
  console.log(buttonCart);
  modalCart.classList.add('show');
};

const closeModal = function () {
  console.log(buttonCart);
  modalCart.classList.remove('show');
};

// Event handlers
buttonCart.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);

modalCart.addEventListener('click', event => {
  const target = event.target;
  if (target.classList.contains('overlay')) {
    closeModal();
  }
});

// scroll smooth
{
  const scrollLinks = document.querySelectorAll('a.scroll-link');

  for (let i = 0; i < scrollLinks.length; i++) {
    scrollLinks[i].addEventListener('click', function (e) {
      e.preventDefault();
      const id = scrollLinks[i].getAttribute('href');
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
}
