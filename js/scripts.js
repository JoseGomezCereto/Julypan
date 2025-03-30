// Ocultar mini-header al hacer scroll
window.addEventListener('scroll', () => {
    const miniHeader = document.querySelector('.mini-header');
    if (window.scrollY > 50) {
      miniHeader.style.display = 'none';
    } else {
      miniHeader.style.display = 'flex';
    }
  });
  
  // Carrusel automático
  let currentIndex = 0;
  const items = document.querySelectorAll('.carousel-item');
  const indicators = document.querySelectorAll('.indicator');
  
  function showSlide(index) {
    items.forEach((item, i) => {
      item.style.transform = `translateX(-${index * 100}%)`;
      indicators[i].classList.toggle('active', i === index);
    });
  }
  
  setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
  }, 3000);
  
  // Desplegables de "Nosotros" y FAQ
  document.querySelectorAll('.chevron').forEach(chevron => {
    chevron.addEventListener('click', () => {
      const parent = chevron.parentElement.parentElement;
      parent.classList.toggle('active');
    });
  });
  
  // Contadores animados en el medidor
  const counters = document.querySelectorAll('.number');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 100;
  
            if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(updateCount, 20);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(document.querySelector('#coverage'));