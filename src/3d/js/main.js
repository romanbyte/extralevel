$(function () {

  // Responsive nav
  $('.toggle-nav').on('click' , function() {
    $(this).toggleClass('open');
  });

  $('.side-btn').on('click' , function(e) {
    e.stopPropagation();
    $('.side-nav').addClass('open');
  });

  $('.side-nav').on('click' , function(e) {
    e.stopPropagation();
    //$('.side-nav').removeClass('open');
  });

  $('body, html , .side-nav .close-nav').click(function(e){
    $('.side-nav').removeClass('open');
  });

  // Example of works slider
  $('.example-slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true
  });

  // Fixed header at top
  var top_position = $('.intro').outerHeight();
  var top_position_2 = $('.how-study').offset().top - $('.how-study').height()*3-300;

  var top_position_3 = $('.find-way').offset().top;
  var top_position_4 = $('.how-study').offset().top;
  var top_position_5 = $('#price-study').offset().top - 2000;

  $(window).on('scroll' , function() {

      /*if ($(window).scrollTop() >= top_position) {
        $('header').addClass('fixed');
      } else {
        $('header').removeClass('fixed');
      }*/

      if ( $(window).scrollTop() >=  top_position_2) {
        $('.how-study').addClass('transition');
      }

      /*if ($(window).width() <= 480) {
        if ($(window).scrollTop() >= 0 && $(window).scrollTop() < top_position_3) {
          $('.wrap-fixed-button').hide();
        } else if ($(window).scrollTop() > top_position_3 && $(window).scrollTop() < top_position_3 + $('.find-way').height()) {
          $('.wrap-fixed-button').show();
        } else if ($(window).scrollTop() > top_position_4 && $(window).scrollTop() < top_position_4 + $('.how-study').height()) {
          $('.wrap-fixed-button').hide();
        } else if ($(window).scrollTop() > top_position_5 && $(window).scrollTop() < top_position_5 + 500 + $('#price-study').height()) {
          $('.wrap-fixed-button').hide();
        } else {
          $('.wrap-fixed-button').show();
        }

      }*/

  });

  // Program list
  $('.program-list .program-list-item').slice(7).hide();
  $('.program-list .primary-btn').on('click' , function(e){
    e.preventDefault();

    if ($(this).hasClass('open')) {
      $('.program-list .program-list-item').slice(7).slideUp(500);
      $(this).text('смотреть всю программу');
      $(this).removeClass('open');
    } else {
      $(this).addClass('open');
      $('.program-list .program-list-item').slice(7).slideDown(500);
      $(this).text('скрыть программу');
    }
  });

  // FAQ
  $('.faq-item').on('click' , function() {
    $(this).toggleClass('open');
    $(this).find('p , ul').slideToggle();
  });

  // Scroll to section
  $('.scroll-down').on('click' , function(e){
    e.preventDefault();
    var hash = $(this).attr('href');

    $('html, body').animate({scrollTop: $(hash).offset().top - 100}, 1000);
  })

  // Popup with video
  $('.popup-youtube').magnificPopup({
    type: 'iframe',
    markup: '<div class="mfp-iframe-scaler">' +
      '<div class="mfp-close"></div>' +
      '<iframe class="mfp-iframe" frameborder="0" allow="autoplay"></iframe>' +
      '</div>',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: true,
    iframe: {
      patterns: {
        youtube: {
          index: 'youtube.com',
          id: 'v=',
          src: 'https://www.youtube.com/embed/%id%?rel=0&autoplay=1'
        }
      }
    },
  });

  $('.popup-modal').magnificPopup({
    type: 'inline',
    preloader: false,
    modal: false
  });

  // Popup form text field effect
  $('.popup-form input').on('blur' , function(){
    if ($(this).val().length != 0) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });

  /**
   *
   * Работа с формами отправки данных пользователя в АМО
   * Парсим адресную строку на наличие UTM меток
   * Если метки utm_source в адресной строке нет, используем Referer
   * Создаем JSON из данных в скрытых полях формы и utm меток
   * Отправляем форму в АМО
   */


  function getParameterByName(paramName) {
    var name = paramName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }


  var utm_source = getParameterByName('utm_source') || document.referrer;
  var utm_content = getParameterByName('utm_content');
  var utm_medium = getParameterByName('utm_medium');
  var utm_campaign = getParameterByName('utm_campaign');
  var utm_term = getParameterByName('utm_term');

  var getFormFieldVal = function ($form, filed) {
    var el = $form.find( $('[name='+filed+' ]'));
     return el.val();
  }

  var createAMOJSON = function  (form) {
    var data = {
      "name": getFormFieldVal(form, "name"),
      "phone": getFormFieldVal(form, "phone"),
      "email": getFormFieldVal(form, "email"),
      "customFields": {
        "lead": [
          {
            "field_id": 1052883,
            "values": [
              {
                "value": utm_source
              }
            ]
          },
          {
            "field_id": 1052889,
            "values": [
              {
                "value": utm_content
              }
            ]
          },
          {
            "field_id": 1052891,
            "values": [
              {
                "value": utm_campaign
              }
            ]
          },
          {
            "field_id": 1052893,
            "values": [
              {
                "value": utm_medium
              }
            ]
          },
          {
            "field_id": 1052895,
            "values": [
              {
                "value": utm_term
              }
            ]
          },
          {
            "field_id": 1052887,
            "values": [
              {
                "value": getFormFieldVal(form, "page")
              }
            ]
          },
          {
            "field_id": 1046103,
            "values": [
              {
                "enum_id": parseInt(getFormFieldVal(form, "source"))
              }
            ]
          },
          /*{
            "field_id": 307293,
            "values": [
              {
                "enum_id": parseInt(getFormFieldVal(form, "profession"))
              }
            ]
          },*/
          {
            "field_id": 307395,
            "values": [
              {
                "enum_id": parseInt(getFormFieldVal(form, "course"))
              }
            ]
          }
        ]
      }
    }

    return JSON.stringify(data)
  }

  $('form input[name="phone"]').keypress(function (e) {
    keys = ['0','1','2','3','4','5','6','7','8','9','+']
    return keys.indexOf(event.key) > -1
  });

  var $getCorseForm = $('form[name="getCourse"]');
  var $getCorseFormPopup = $('form[name="getCourse-popup"]');
  var $getCorseFormFree = $('form[name="getCourse-free"]');

  if ($getCorseForm.length) {
    $getCorseForm.each(function () {
      var $this = $(this);

      $this.submit(function(e) {

        $this.find('button[type="submit"]').attr('disabled' , 'disabled');

        e.preventDefault();

        $.ajax({
          contentType: "application/json",
          type: $this.attr('method'),
          url: $this.attr('action'),
          data: createAMOJSON($this)
        }).done(function() {
          console.log('success');
          $('.sign-to-course').find('.success').show();
          $getCorseForm.trigger('reset');
          $getCorseForm.find('button[type="submit"]').removeAttr('disabled');
          $getCorseForm.hide();
          $getCorseForm.next('p').hide();
          // TODO по событию success вывести сообщение об успешной отправки формы
        }).fail(function() {
          console.log('fail');
          // TODO по событию fail вывести сообщение об ошибке
        });
      });
    })
  }

  if ($getCorseFormPopup.length) {
    $getCorseFormPopup.each(function () {
      var $this = $(this);

      $this.submit(function(e) {

        $this.find('button[type="submit"]').attr('disabled' , 'disabled');

        e.preventDefault();

        $.ajax({
          contentType: "application/json",
          type: $this.attr('method'),
          url: $this.attr('action'),
          data: createAMOJSON($this)
        }).done(function() {
          console.log('success');
          $('.white-popup-block').find('.success').show();
          $getCorseFormPopup.trigger('reset');
          $getCorseFormPopup.find('button[type="submit"]').removeAttr('disabled');
          $getCorseFormPopup.find('input').removeClass('active');
          $getCorseFormPopup.hide();
          $getCorseFormPopup.next('p').hide();
          // TODO по событию success вывести сообщение об успешной отправки формы
        }).fail(function() {
          console.log('fail');
          // TODO по событию fail вывести сообщение об ошибке
        });
      });
    })
  }

  if ($getCorseFormFree.length) {
    $getCorseFormFree.each(function () {
      var $this = $(this);

      $this.submit(function(e) {

        $this.find('button[type="submit"]').attr('disabled' , 'disabled');

        e.preventDefault();

        $.ajax({
          contentType: "application/json",
          type: $this.attr('method'),
          url: $this.attr('action'),
          data: createAMOJSON($this)
        }).done(function() {
          console.log('success');
          $('.white-popup-block').find('.success').show();
          $getCorseFormFree.trigger('reset');
          $getCorseFormFree.find('button[type="submit"]').removeAttr('disabled');
          $getCorseFormFree.find('input').removeClass('active');
          $getCorseFormFree.hide();
          $getCorseFormFree.next('p').hide();
          // TODO по событию success вывести сообщение об успешной отправки формы
        }).fail(function() {
          console.log('fail');
          // TODO по событию fail вывести сообщение об ошибке
        });
      });
    })
  }

});
