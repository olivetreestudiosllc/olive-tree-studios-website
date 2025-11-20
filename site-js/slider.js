jQuery(function($){
jQuery('.slider').slick({
    dots: false,      
    infinite: true,
    arrows: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 5000,      
    cssEase: 'linear',
    adaptiveHeight: true,

    responsive: [
    {
      breakpoint: 1440,
      settings: {
      variableWidth: true,
      }
    },
  ]
  });   
  });
