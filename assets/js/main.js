(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

})()
//
// function validateForm() {
//   let name = document.forms["contact"]["name"].value;
//   let email = document.forms["contact"]["email"].value;
//   let sub = document.forms["contact"]["subject"].value;
//   let mes = document.forms["contact"]["message"].value;
//   if(name == "" || email == "" || sub == "" || mes == "")
//   {
//     alert("No fields should be left empty");
//     return false;
//   }
// }

let name = document.getElementById("name");
    let email = document.getElementById("email");
    let subject = document.getElementById("subject");
    let message = document.getElementById("message");

function validateForm()
{
    // name validation
    if(name.value == "")
    {
       alert("Name field shouldn't be empty");
       return false;
    }
    else if(!isNaN(name.value))
    {
        alert("Name shouldn't be a number");
        return false;
    }
    else if(name.value.length <= 2)
    {
        alert("Name is too short");
        return false;
    }

    // email validation
    if(email.value == "")
    {
       alert("Email field shouldn't be empty");
       return false;
    }
    else if(email.value.indexOf('@') <= 0)
    {
        alert("Invalid email format");
        return false;
    }
    else if((email.value.charAt(email.value.length-4)!='.') && (email.value.charAt(email.value.length-3)!='.'))
    {
        alert("Invalid email format");
        return false;
    }

    // Subject validation
    if(subject.value == "")
    {
      alert("Subject field can't be blank.");
       return false;
    }

    // message validation
    if(message.value == "")
    {
       alert("Message field can't be blank");
       return false;
    }
    else if(message.value.length <= 10)
    {
        alert("Message is short than 10 characters");
        return false;
    }
    return true;
}

// submission

$("#submit-form").submit((e)=>{
    e.preventDefault();
    let validation = validate();

    if(validation)
    {
    $.ajax({
        url:"https://script.google.com/macros/s/AKfycbzQQfTqYMKcqbU87yw2MbBiKbGVvS3fFOIwsaVQaZyq6rLoceBrQc7g_ajTEOhdzISltw/exec",
        data:$("#submit-form").serialize(),
        method:"post",
        success:function (response){
            // alert("Form submitted successfully")
            show.style.display = "block";
            setTimeout(() => {
                window.location.reload()
            },3000);

            //window.location.href="https://google.com"
        },
        error:function (err){
            alert("Something Error")

        }
        })}
})
