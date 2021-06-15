$(function () {

  /*setTimeout(function(){
    $.magnificPopup.open({
      items: {
        src: '#choice-popup' //ID OF INLINE ELEMENT
      },
        type:'inline'
      });
  }, 20000);*/

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

});
