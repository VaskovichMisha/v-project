const resizeCarouselBlock = () => {
  const carouselCardInnerWidth = $(
    ".first-page-opinion-reserch-center-card--carousel"
  ).width();

  const carouselNextButtonWidth = $(".js-next").width();

  $("#js-carousel-6").width(carouselCardInnerWidth - carouselNextButtonWidth);
};

$().ready(function () {
  /* CAROUSEL LOGIC */

  resizeCarouselBlock();

  const owl = $(".owl-carousel").owlCarousel({
    loop: true,
    dots: false,
    responsiveRefreshRate: 0,
    responsive: {
      0: {
        items: 1,
        margin: 30,
      },
      768: {
        items: 2,
        margin: 23,
      },
      1023: {
        items: 2,
        margin: 23,
      },
    },
  });

  // При клике по кнопке Вправо
  $(".js-next").on("click", function () {
    // Перематываем карусель вперед
    owl.trigger("next.owl.carousel");
  });

  $(window).on("resize", resizeCarouselBlock);
});
