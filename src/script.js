// script.js
function initializeSwiper() {
    const swiper = new Swiper('.swiper', {
      direction: 'vertical',
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
    });
  }
  
  // Attach the function to the global window object
  window.initializeSwiper = initializeSwiper;
  
  // Ensure that the script is executed only after the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', initializeSwiper);
  