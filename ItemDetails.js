let slideIndex = 1;

function showDetails() {
  var containers = document.querySelectorAll('.Container');
  containers.forEach((container) => {
      var slides = container.querySelectorAll('.slide');
      var prevButton = container.querySelector('.prev');
      var nextButton = container.querySelector('.next');

      prevButton.addEventListener('click', function() {
        slideIndex = (slideIndex - 1) % slides.length;
        showSlides(slides, slideIndex);
      });
      
      nextButton.addEventListener('click', function() {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlides(slides, slideIndex);
      });
      
      // Toggle  for 'block' and 'none'
      container.style.display = container.style.display === 'block' ? 'none' : 'block';
      
      if (container.style.display === 'block') {
          initSlider(slides, slideIndex);
      }
  });
}

function initSlider(slides, n) {
  showSlides(slides, n);
}

function showSlides(slides, n) {
  let i;
  let totalSlides = slides.length;
  for (i = 0; i < totalSlides; i++) {
    slides[i].style.display = "none";
  }
  // slide index
  slideIndex = ((n + totalSlides) % totalSlides) || totalSlides;
  slides[slideIndex - 1].style.display = "block";
}

showDetails();