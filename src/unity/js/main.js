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

  // Parallax effect for inner intro section
  //var top_position = $('#price-study').offset().top;
  //var top_position_1 = $('#what-learn-row').offset().top;
  //var top_position_2 = $('.how-study').offset().top;

  $(window).on('scroll' , function() {

    // Change position of image intro
    $('.hero-person').css('top' , - $(window).scrollTop()*0.3);
    //$('.hero-bg').css('top' , - $(window).scrollTop()*0.2);

    /*if ($(window).width() <= 480) {
      if ($(window).scrollTop() >= 0 && $(window).scrollTop() < top_position_1) {
        $('.wrap-fixed-button').hide();
      } else if ($(window).scrollTop() > top_position_1 - 200 && $(window).scrollTop() < top_position_1 - 200 + $('#what-learn-row').height()) {
        $('.wrap-fixed-button').show();
      } else if ($(window).scrollTop() > top_position_2 + 200 && $(window).scrollTop() < top_position_2 + $('.how-study').height()) {
        $('.wrap-fixed-button').hide();
      } else if ($(window).scrollTop() > top_position - 800 && $(window).scrollTop() < top_position - 800 + $('#price-study').height()) {
        $('.wrap-fixed-button').hide();
      } else {
        $('.wrap-fixed-button').show();
      }
    }*/

  });

  var movementStrength = 25;
  var height = movementStrength / $(window).height();
  var width = movementStrength / $(window).width();
  $(".intro").mousemove(function(e){
            var pageX = e.pageX - ($(window).width() / 2);
            var pageY = e.pageY - ($(window).height() / 2);
            var newvalueX = width * pageX * -1;
            var newvalueY = height * pageY * -1;
            $('.hero-person').css("top", newvalueX+"px");
            $('.hero-person').css("left", newvalueY+"px");

            //$('.hero-bg').css("bottom", newvalueX*0.2+"px");
            $('.hero-bg').css("right", newvalueY*1.2+"px");

            $('.hero-figure').css("top", newvalueX*1.7+"px");
            $('.hero-figure').css("right", newvalueY*1.7+"px");
  });

  // Example of works slider
  $('.example-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true
        }
      }
    ]
  });

  // FAQ
  $('.faq-item').on('click' , function() {
    $(this).toggleClass('open');
    $(this).find('p').slideToggle();
  });

  // Scroll to section
  $('.scroll-down').on('click' , function(e){
    e.preventDefault();
    var hash = $(this).attr('href');

    $('html, body').animate({scrollTop: $(hash).offset().top}, 1000);
  })

  // Popup with video
  $('.popup-youtube').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: true
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
  var $getReport_popup = $('form[name="getReport-popup"]');
  var $getProfession = $('form[name="getProfession"]');
  var $getCourse_free = $('form[name="getCourse-free"]');

  if ($getCourse_free.length) {
    $getCourse_free.each(function () {
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
          $getCourse_free.trigger('reset');
          $getCourse_free.find('button[type="submit"]').removeAttr('disabled');
          $getCourse_free.hide();
          $getCourse_free.next('p').hide();
          // TODO по событию success вывести сообщение об успешной отправки формы
        }).fail(function() {
          console.log('fail');
          // TODO по событию fail вывести сообщение об ошибке
        });
      });
    })
  }

  if ($getProfession.length) {
    $getProfession.each(function () {
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
          $getProfession.trigger('reset');
          $getProfession.find('button[type="submit"]').removeAttr('disabled');
          $getProfession.hide();
          $getProfession.next('p').hide();
          // TODO по событию success вывести сообщение об успешной отправки формы
        }).fail(function() {
          console.log('fail');
          // TODO по событию fail вывести сообщение об ошибке
        });
      });
    })
  }

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

  if ($getReport_popup.length) {
    $getReport_popup.each(function () {
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
          $getReport_popup.trigger('reset');
          $getReport_popup.find('button[type="submit"]').removeAttr('disabled');
          $getReport_popup.find('input').removeClass('active');
          $getReport_popup.hide();
          $getReport_popup.next('p').hide();
          // TODO по событию success вывести сообщение об успешной отправки формы
        }).fail(function() {
          console.log('fail');
          // TODO по событию fail вывести сообщение об ошибке
        });
      });
    })
  }

});
