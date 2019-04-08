$(document).ready(function() {


  /* ======= links ======== */
  $("a").not($(".internal-link")).attr("target", "_blank");

  /* ======= Scrollspy ======= */
  $('body').scrollspy({
    target: '#page-nav-wrapper',
    offset: 100
  });

  /* ======= ScrollTo ======= */
  $('.scrollto').on('click', function(e) {

    //store hash
    var target = this.hash;

    e.preventDefault();

    $('body').scrollTo(target, 800, {
      offset: -60,
      'axis': 'y'
    });

  });

  /* ======= Config Panel ======= */
  var top = $('.config-panel').offset().top - parseFloat($('.config-panel').css('marginTop').replace(/auto/, 0));
  var last = top;
  $(window).scroll(function(event) {
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
      var y = $(this).scrollTop();
      var difference = y + top;
      var t = Math.sqrt(Math.abs(difference - last)) + 500;
      if (y >= top) {
        $('.config-panel').animate({
          top: difference
        }, t, "easeOutBounce"); //easeOutElastic
      } else {
        $('.config-panel').animate({
          top: difference
        }, t, "easeOutBounce");
      }
      last = difference;
    }, 200))
  });

  /* ======= Fixed page nav when scrolled ======= */
  $(window).on('scroll resize load', function() {

    $('#page-nav-wrapper').removeClass('fixed');

    var scrollTop = $(this).scrollTop();
    var topDistance = $('#page-nav-wrapper').offset().top;

    if ((topDistance) > scrollTop) {
      $('#page-nav-wrapper').removeClass('fixed');
      $('body').removeClass('sticky-page-nav');
    } else {
      $('#page-nav-wrapper').addClass('fixed');
      $('body').addClass('sticky-page-nav');
    }

  });

  /* ======= Chart ========= */

  $('.chart').easyPieChart({
    barColor: '#FF9800', //Pie chart colour
    trackColor: '#e8e8e8',
    scaleColor: false,
    lineWidth: 5,
    animate: 2000,
    onStep: function(from, to, percent) {
      $(this.el).find('span').text(Math.round(percent));
    }
  });


  /*----------------------------------------------------*/
  /*  Simple LightBox js
  /*----------------------------------------------------*/
  $('.items-wrapper .link-mask').simpleLightbox({
    nav: false
  });


  /* ======= Isotope plugin ======= */
  /* Ref: http://isotope.metafizzy.co/ */
  // init Isotope    
  var $container = $('.isotope');

  $container.imagesLoaded(function() {
    $('.isotope').isotope({
      itemSelector: '.item'
    });
  });

  // filter items on click
  $('#filters').on('click', '.type', function() {
    var filterValue = $(this).attr('data-filter');
    $container.isotope({
      filter: filterValue
    });
  });

  // change is-checked class on buttons
  $('.filters').each(function(i, typeGroup) {
    var $typeGroup = $(typeGroup);
    $typeGroup.on('click', '.type', function() {
      $typeGroup.find('.active').removeClass('active');
      $(this).addClass('active');
    });
  });


});