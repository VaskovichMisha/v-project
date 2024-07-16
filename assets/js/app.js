$(document).ready(function () {

  $('.votes-widget__question input').on('change', function (e){
    if ($(this).prop('checked')) {
      $(this).parent().addClass('selected');
    } else {
      $(this).parent().removeClass('selected');
    }
  });

  $('.js-mnu-btn').on("click", function () {
    $(this).toggleClass('active');
    $('.js-mobile-mnu').toggleClass('active');
  });

  $(".js-sortable").sortable();

  $('.js-select').select2({
    containerCssClass: 'select_custom',
    dropdownCssClass: 'select_custom',
    minimumResultsForSearch: Infinity,
  });

  $(".js-slider").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    animateIn: "fade",
  });

  $('.js-hamb').on('click', function () {
    $('.js-hamb-hidden').fadeToggle(200)
  });

  $(window).on('click', function (e) {
      if(e.target.closest('.js-hamb'))
          return false
      $('.js-hamb-hidden').fadeOut(200)

  })

  $('.js-popup-ava-link').on('click', function (){
    $('.js-popup-bg, .js-popup--ava').addClass('active');
  });

  $('.js-popup-add-ava-link').on('click', function (){
    $('.js-popup-bg, .js-popup--add-ava').addClass('active');
  });

  $('.js-popup-close').on('click', function (){
    $('.js-popup-bg, .js-popup').removeClass('active');
  });

  $('.js-delete-ava').on('click', function () {
    var ava = $('.js-ava');
    if (!ava.data("is-default")) {
      $.ajax({
        url: $('.js-crop-save').data("ajax-target"),
        data: {
          action: "avatar",
          csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
          "_avatar-clear": "on"
        },
        type: 'POST',
      });
      ava.attr('src', ava.data("default-image"));
      ava.data("is-default", 1);
    }
    $('.js-popup-bg, .js-popup').removeClass('active');
  })

// TODO: check why it blocks ajax on news page?
//  $('.js-popup-bg').on('click', function (e) {
//    if ($(e.target).closest('.js-popup').length)
//      return false
//    $('.js-popup-bg, .js-popup').removeClass('active');
//  })

  function demoUpload() {
    var $uploadCrop;

    function readFile(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {

          $('.js-popup').removeClass('active');
          $('.js-popup--add-ava-crop').addClass('active');

          $('.upload-demo').addClass('ready');
          $uploadCrop.croppie('bind', {
            url: e.target.result
          }).then(function(){
            console.log('jQuery bind complete');
          });

        }

        reader.readAsDataURL(input.files[0]);
      }
      else {
        swal("Sorry - you're browser doesn't support the FileReader API");
      }
    }

    $uploadCrop = $('#upload-demo').croppie({
      viewport: {
        width: 270,
        height: 270,
        type: 'circle',
      },
      enableExif: true
    });

    $('#upload').on('change', function () { readFile(this); });
    $('.js-crop-save').on('click', function (ev) {
      var fd = new FormData(document.forms[0]);
      fd.append("action", "avatar");
      fd.append("csrfmiddlewaretoken", $('input[name=csrfmiddlewaretoken]').val());

      $uploadCrop.croppie('result', {
        type: 'blob',
        size: 'viewport'
      }).then(function (blob) {
        fd.append('_avatar', blob, 'profile-image.png');

        $.ajax({
          url: $('.js-crop-save').data("ajax-target"),
          data: fd,
          type: 'POST',
          contentType: false,
          processData: false,
          success: function () {
            $uploadCrop.croppie('result', {
              type: 'canvas',
              size: 'viewport'
            }).then(function (resp) {
              var ava = $('.js-ava');
              ava.attr('src', resp)
              ava.data("is-default", 0);
              $('.js-popup-bg, .js-popup').removeClass('active');
              $('#upload').val('');
              return false;
            });
          },
          error: function (data) {
            console.warn(data);
          },
        });

        return false;
      });
    });
  }

  $('.bottom-scroll').on('click', function (e){
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $('body').outerHeight()
    }, 500)
  })

  if ($('#upload-demo').length > 0) {
    demoUpload();
  }

  $('.welcome-popup__close, .welcome-popup__btn').on('click', function () {
    $('body').removeClass('open-welcome-popup');
    $('.welcome-popup-bg').fadeOut();
  })

  var bigimage = $(".js-news-slider");
  var thumbs = $(".js-news-thumbs");
  var syncedSecondary = false;

  bigimage
      .owlCarousel({
        items: 1,
        nav: true,
        autoplay: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 300,
        margin: 20,
        navText:[
          "<div class='owl-prev'>" +
          "   <svg class=\"icn icn-arrow_r\">\n" +
          "     <use xlink:href=\"/static/img/sprite.svg#arrow_r\"></use>\n" +
          "   </svg>" +
          "</div>",
          "<div class='owl-next'>" +
          "   <svg class=\"icn icn-arrow_r\">\n" +
          "     <use xlink:href=\"/static/img/sprite.svg#arrow_r\"></use>\n" +
          "   </svg>" +
          "</div>"],
      })
      .on("changed.owl.carousel", syncPosition);

  thumbs
      .on("initialized.owl.carousel", function() {
        thumbs
            .find(".owl-item")
            .eq(0)
            .addClass("current");
      })
      .owlCarousel({
        items: 4,
        margin: 40,
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: 1,
        responsiveRefreshRate: 200,
        responsive:{
          768:{
            items:2,
          },
          1024:{
            items:3,
          },
          1365:{
            items:4,
          }
        }
      })
      .on("changed.owl.carousel", syncPosition2);

  function syncPosition(el) {
    //if loop is set to false, then you have to uncomment the next line
    // var current = el.item.index;

    //to disable loop, comment this block
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }
    //to this
    thumbs
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
    var onscreen = thumbs.find(".owl-item.active").length - 1;
    var start = thumbs
        .find(".owl-item.active")
        .first()
        .index();
    var end = thumbs
        .find(".owl-item.active")
        .last()
        .index();
    if (current > end) {
      thumbs.data("owl.carousel").to(current, 100, true);
    }
    if (current < start) {
      thumbs.data("owl.carousel").to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      bigimage.data("owl.carousel").to(number, 100, true);
    }
  }

  thumbs.on("click", ".owl-item", function(e) {
    e.preventDefault();
    var number = $(this).index();
    bigimage.data("owl.carousel").to(number, 300, true);
  });

  $('.js-feedback').on('click', function (e) {
    e.preventDefault();
    $('#proposal').find("button").attr("disabled", false);
    $('.js-popup-bg').addClass('active');
    $('.js-popup--feedback').addClass('active');
  });

  $('.js-feedback-thanks').on('click', function (e) {
    e.preventDefault();
    $('.js-popup--feedback').removeClass('active');
    $('.js-popup-bg').addClass('active');
    $('.js-popup--thanks').addClass('active');
  });

  if ($('.b-lazy').length) {
    new Blazy();
  }

  $('.js-research').owlCarousel({
    items: 4,
    margin: 40,
    smartSpeed: 200,
    slideSpeed: 500,
    slideBy: 1,
    responsiveRefreshRate: 200,
    loop: false,
    nav: true,
    navText:[
      "<div class='owl-prev'>" +
      "   <svg class=\"icn icn-arrow_r\">\n" +
      "     <use xlink:href=\"/static/img/sprite.svg#arrow_r\"></use>\n" +
      "   </svg>" +
      "</div>",
      "<div class='owl-next'>" +
      "   <svg class=\"icn icn-arrow_r\">\n" +
      "     <use xlink:href=\"/static/img/sprite.svg#arrow_r\"></use>\n" +
      "   </svg>" +
      "</div>"],
    responsive:{
      0:{
        items:1,
      },
      768:{
        items:2,
      },
      1024:{
        items:3,
      },
      1365:{
        items:4,
      }
    }
  })

  $('.js-slider-about').owlCarousel({
    items: 1,
    margin: 40,
    loop: true,
    dots: true,
    nav: true,
    autoHeight: true,
    navText:[
    "   <svg class=\"icn icn-arrow_r\">\n" +
    "     <use xlink:href=\"static/img/sprite.svg#arrow_r\"></use>\n" +
    "   </svg>",
    "   <svg class=\"icn icn-arrow_r\">\n" +
    "     <use xlink:href=\"static/img/sprite.svg#arrow_r\"></use>\n" +
    "   </svg>"],
  })

  $('.js-research-landing').owlCarousel({
    items: 3,
    margin: 0,
    smartSpeed: 200,
    slideSpeed: 500,
    slideBy: 1,
    responsiveRefreshRate: 200,
    loop: false,
    nav: true,
    navText:[
      "<div class='owl-prev'>" +
      "   <svg class=\"icn icn-arrow_r\">\n" +
      "     <use xlink:href=\"static/img/sprite.svg#arrow_r\"></use>\n" +
      "   </svg>" +
      "</div>",
      "<div class='owl-next'>" +
      "   <svg class=\"icn icn-arrow_r\">\n" +
      "     <use xlink:href=\"static/img/sprite.svg#arrow_r\"></use>\n" +
      "   </svg>" +
      "</div>"],
    responsive:{
      0:{
        items:1,
      },
      768:{
        items:2,
      },
      1024:{
        items:3,
      },
      1365:{
        items:3,
      }
    }
  })

  $('.js-project-work').owlCarousel({
    items: 1,
    margin: 40,
    loop: true,
    dots: true,
    nav: true,
    URLhashListener:true,
    animateOut: 'fadeOut',
    navText:[
      "   <svg class=\"icn icn-arrow_r\">\n" +
      "     <use xlink:href=\"static/img/sprite.svg#arrow_r\"></use>\n" +
      "   </svg>",
      "   <svg class=\"icn icn-arrow_r\">\n" +
      "     <use xlink:href=\"static/img/sprite.svg#arrow_r\"></use>\n" +
      "   </svg>"],
  });

  $('.js-slider-gallery').owlCarousel({
    items: 1,
    nav: true,
    dots: false,
    autoHeight: true,
    onInitialized: counter,
    onTranslated: counter,
    navText:[
      "Назад",
      "Вперед" 
    ], 
  });

  $('.js-slider-achievements').owlCarousel({
    items: 5,
    nav: true,
    dots: false,
    
    navText:[
      "   <svg class=\"icn icn-arrow-left\">\n" +
      "     <use xlink:href=\"assets/img/sprite.svg#arrow-left\"></use>\n" +
      "   </svg>",
      "   <svg class=\"icn icn-arrow-right\">\n" +
      "     <use xlink:href=\"assets/img/sprite.svg#arrow-right\"></use>\n" +
      "   </svg>"],
    responsive:{
      0:{
        items: 1,
      },
      400:{
        items: 2,
      },
      500:{
        items: 3,
      },
      600:{
        items: 4,
      },
      700:{
        items: 5,
      },
      768:{
        items: 2,
      },
      830:{
        items: 3,
      },
      1169:{
        items: 4,
      },
      1365:{
        items: 5,
      }
    }
  });

  function counter(event) {
    var element   = event.target;     
    var items     = event.item.count; 
    var item      = event.item.index + 1;
    $('#counter').html(+item+ " / " +items)
  }

  $('.js-anchors a').on('click', function (e) {
    var id = $(this).attr('href');
    if ($(id).length) {
      e.preventDefault()
      $('html, body').animate({
        scrollTop: $(id).offset().top - $('header').outerHeight() - 20
      }, 500)
    }
  });

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 300) {
      $('.js-up').fadeIn(0)
    } else {
      $('.js-up').fadeOut(0)
    }
  })

  $('.js-up').on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 500)
  })

  $('.starability-basic input').on('change', function (){
    $('.js-hint-selected').remove();
    $('.starability-basic label .hint__hidden').removeClass('hint__hidden--visible');
    $(this).next('label').find('.hint__hidden').addClass('hint__hidden--visible');

  });

  // Выделяем строку, если выбрано хоть одно поле
  $('input').on('change', function (){
    const rows = $(this).closest('table').find('tr');
    rows.each(function () {
      if ($(this).find('input:checked').length > 0) {
        $(this).addClass('selected');
      } else {
        $(this).removeClass('selected');
      }
    })
  });

  // Добавляем класс к таблице, если появляется скролл
  function addScroll() {
    if($('.fields-table-wrapper').width() < $('.fields-table').width()) {
      $('.fields-table').addClass('fields-table--scroll');
      $('.fields-table__swipe').css('width', $('.fields-table-wrapper').width() - 25);
    } else {
      $('.fields-table').removeClass('fields-table--scroll');
    }
  } 

  addScroll();

  $(window).resize(function() {
    addScroll();
  });

  // Открываем выпадающее окно
  $('.field-select__select').on('click', function () {
    $(this).closest('.field-select').addClass('field-select--open');
  });

  // Закрываем выпадающее окно
  $('.field-select__save').on('click', function () {
    $(this).closest('.field-select').removeClass('field-select--open');
  });

  $('input').on('change', function () {

    // Записываем выбранные значения в селект
    const select = $(this).closest('.field-select').find('.field-select__select');
    const labels = [];
    labels.push(...$(this).closest('.field-select').find('input:checked').closest('label').find('.check__label, .radio__label'))
    const selectText = labels.map(a => $(a).text());
    
    select.text(selectText);
    if ($(this).closest('.field-select').find('input:checked').length < 1) {
      select.text('Выбрать');
    }
    
    // Добавляем класс к селекту, если выбрано хоть одно поле
    const fieldsSelect = $(this).closest('.field-select');
    fieldsSelect.each(function () {
      if ($(this).find('input:checked').length > 0) {
        $(this).closest('.field-select').removeClass('field-select--error').addClass('field-select--checked');
      } else {
        $(this).closest('.field-select').removeClass('field-select--checked');
      }
    })
  });

  $('button.btn_subm').on('click', function(e) {
    e.preventDefault(0);
    let hasError = false;
    const form = $(this).closest('form');
    const fieldsSelect = form.find('.field-select');
    fieldsSelect.each(function() {
      if (!$(this).hasClass('field-select--checked')) {
        hasError = true;
        $(this).addClass('field-select--error');
      }
    })
    if (!hasError) {
      // Отправляем форму
      form.submit()
    }
  })

  if ($('.fields-table-wrapper').length) {
    let speed = 2; 
    let scroll = document.querySelector('.fields-table-wrapper');
    let left = 0;
    let drag = false;
    let coorX = 0; 
    
    scroll.addEventListener('mousedown', function(e) {
      drag = true;
      coorX = e.pageX - this.offsetLeft;
    });
    document.addEventListener('mouseup', function() {
      drag = false;
      left = scroll.scrollLeft;
    });
    scroll.addEventListener('mousemove', function(e) {
      if (drag) {
        this.scrollLeft = left + (e.pageX - this.offsetLeft - coorX) * -speed;
      }
    });
  }

  $('.share__btn').on('click', function() {
    console.log('1')
    $(this).toggleClass('share__btn--active');
  })

  // Закрепляем заголовки у таблицы
  var table = $('.fields-table');
  var title = $('.fields-table thead');
  var titleClone = title.clone(true, true);
  if (table.length) {
    titleClone.prependTo(table).css({
      position: 'fixed',
      top: 0,
      left: table.offset().left,
      zIndex: 5,
    }).hide();
    title.find('th').each(function(i,el){
      titleClone.find('th:eq(' + i + ')').css({
        'min-width': $(el).outerWidth(true),
        'width': $(el).outerWidth(true),
      })
    });
  
    $(document).scroll(function(){
      if($(this).scrollTop() > title.offset().top){
        titleClone.show();
        title.css('opacity', 0);
      } else {
        titleClone.hide();
        title.css('opacity', 1);
      }
    });
    
    $('.fields-table-wrapper').scroll(function(){
      titleClone.css('left', - $(this).scrollLeft() + (($('body').width() - $('.limit').width()) / 2));
    });
  }
  

  // Скопировать ссылку
  function copy() {
    let copyText = document.querySelector("#input-copy");
    copyText.select();
    document.execCommand("copy");
  }
  if (document.querySelector("#copy")) {
    document.querySelector("#copy").addEventListener("click", copy);
  }
  

  // Всплывающий заголовок достижений
  $('body').on('mouseenter touchend', '.achievement:not(.popup-modal__achievement)', function(e) {
    const data = $(this).data('title');
    const hiddenBlock = $('.achievement__popup-title');
    hiddenBlock.text(data);
    const x = $(this).offset().left;
    const y = $(this).offset().top - $(document).scrollTop();
    const hiddenBlockWidth = hiddenBlock.outerWidth() / 2;
    const width = $(this).outerWidth() / 2;

    hiddenBlock.addClass('active').css({
      'position': 'fixed',
      'display': 'block',
      'top': y - 40 ,
      'left': x + width - hiddenBlockWidth,
      'z-index': 4
    });
  });

  $(document).on('scroll', function() {
    $('.achievement__popup-title').css('display', 'none');
  })

  $('body').on('mouseleave', '.achievement', function(e) {
    $('.achievement__popup-title').css('display', 'none');
  });

  $('.achievement--new').on('click', function(e) {
    $(this).removeClass('achievement--new');
    $('.achievement__label').remove();
  });

  // Попапы акция

  $('.popup-exit, .popup-exit-button').on('click', function () {
    $('.popup-modal').removeClass("active")
    $('.popup-bg').removeClass("active")
    $('body').removeClass('no-scroll');
    $('body').removeClass('scroll');
  });

 $('.popup-modal--action .popup-exit').on('click', function () {
    $('.popup-modal--action').css('display', 'none');
    $('.content-dark').css('display', 'none');
    $('body').removeClass('no-scroll');
    $('body').removeClass('scroll');
  });

  $('.action__rules').on('click', function () {
    $('.popup-modal--action-rules').css('display', 'block');
    $('.content-dark').css('display', 'block');
    $('body').addClass('scroll');
    $('body').removeClass('no-scroll');
  });


  $('.achievement__gift').on('click', function () {
    $('.popup-modal--action-gift').css('display', 'none');
    $('.popup-modal--action-info').css('display', 'block');
  });

  $('.popup-modal--action-info form').on('submit', function (e) {
    e.preventDefault();
    $('.popup-modal--action-info').css('display', 'none');
    $('.popup-modal--action-thanks').css('display', 'block');
  });

   /**
   * Страница подтвердите ваш email
   */

  //Открыть модальное окно с формой подтвердите ваш email
  $('.confirm-your-email__button-problem').on('click', function (e) {
    $('#myModal').css('display', 'flex');
  });

  //Закрытие модального окна с формой подвердите ваш email
  $('.emailmodal__close').on('click', function (e) {
    $('#myModal').css('display', 'none');
  });

  $('.plus-popap-block-top__link-promotion').on('click', function (e) {
    $('.popap-wrap-referal-link').css('display', 'flex');
    $('.popap-wrap-referal-link__rules-referal').css('display', 'block');
  });

  $('.popap-wrap-referal-link__close-popap-rules-referal').on('click', function (e) {
    $('.popap-wrap-referal-link').css('display', 'none');
    $('.popap-wrap-referal-link__rules-referal').css('display', 'none');
  });

  $('.popap-wrap-referal-link__button-out').on('click', function (e) {
    $('.popap-wrap-referal-link').css('display', 'none');
    $('.popap-wrap-referal-link__cash-out').css('display', 'none');
  });

  $('.plus-popap-block-top__score-button').on('click', function (e) {
    $('.popap-wrap-referal-link').css('display', 'flex');
    $('.popap-wrap-referal-link__cash-out').css('display', 'flex');
  });
});
