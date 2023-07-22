
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

    /** 
   * AccessKey
   **/
    const accessKey = "qnRw_7hB-7TuCdE6l9BoG2m8o_n37XkVrTgX_opsNx0"

    const formE1 = document.querySelector("form")
    const inputE1 = document.getElementById("search-input")
    const searchResults = document.querySelector(".search-results")
    const showMore = document.getElementById("show-more-button")
  
    let inputData = ""
    let page = 1;
  
    async function searchImages() {
      inputData = inputE1.value;
      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
  
      const response = await fetch(url)
      const data = await response.json()
  
      const results = data.results
  
      if (page === 1) {
        searchResults.innerHTML = ""
      }
      results.map((result) => {
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add("search-result")
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description
  
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
      })
  
      page++
      if (page > 1) {
        showMore.style.display = "block"
      }
    }
  
    formE1.addEventListener("submit", (event) => {
      event.preventDefault(); // Fix typo 'preventDeafult' to 'preventDefault'
      page = 1;
      searchImages();
    })
  
    showMore.addEventListener("click", (event) => {
      searchImages();
    })
     
  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 1000);
      setTimeout(() => {
        preloader.remove();
      }, 2000);
    });
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

 

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});