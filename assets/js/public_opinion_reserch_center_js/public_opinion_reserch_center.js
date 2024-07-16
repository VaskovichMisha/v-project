var task_help = {
  1: {
    title: "Тестирование креативов от 4 часов",
    description:
      "Не бывает универсальных креативов, которые работают постоянно на высоком уровне. Интересы пользователей регулярно меняются, а значит, и рекламная подача должна успевать за изменениями. Наши исследования помогут выбрать новые дизайны, названия, а также проверить эффективность ваших креативов для рекламы. Протестируйте рекламу заранее, чтобы запустить успешную кампанию и не слить бюджет.",
  },
  2: {
    title: "Анализ аудитории",
    description:
      'Чтобы понять, чего хотят ваши клиенты, необходимо распознать их "боли". Мы поможем проанализировать вашу текущую ситуацию и выявить настоящую потребность целевой аудитории (ЦА). Это поможет улучшить ваш продукт и клиентский сервис.',
  },
  3: {
    title: "Мониторинг маркетинговой активности и информированности ЦА",
    description:
      "Для эффективного ведения бизнеса важно регулярно отслеживать все маркетинговые активности. Это позволяет понять, насколько эффективна выбранная стратегия и достигает ли рекламная кампания намеченных целей. Мы проведем для вас повторяющееся исследование для оценки маркетинговых активностей. В ходе процесса мониторинга вы сможете вносить необходимые корректировки.",
  },
  4: {
    title: "Анализ эффективности идеи",
    description:
      "Для развития компаниям нужны новые идеи. Но чтобы не оказалось так, что ваш новый продукт никому не нужен, перед запуском важен тест. Мы поможем проверить ваш инсайт и продуктовую идею. Подобная проверка необходима как начинающим предпринимателям, так и опытным компаниям. В ходе тестирования можно определить целевую аудиторию, просчитать риски и увидеть сильные и слабые стороны продукта. Благодаря тесту вы сможете не только сэкономить прибыль, но и понять, как реализовать идею так, чтобы она в результате принесла успех.",
  },
  5: {
    title: "Оптимизация клиентского опыта",
    description:
      "Клиентский опыт основывается на отношениях между бизнесом и клиентами. Все взаимодействия клиента с брендом, будь то прямая реклама или косвенное пересечение, не ведущее к покупке, формируют клиентский опыт. А это значит, что необходимо поддерживать положительные эмоции клиента при любом касании с брендом. Мы поможем вам узнать о пользователях ваших продуктов больше. Это позволит повысить лояльность текущих клиентов и улучшить ваше взаимодействие с ними.",
  },
  6: {
    title: "Анализ конкурентов",
    description:
      "Анализ конкурентов является одним из первых этапов в разработке маркетинга нового продукта. Вы узнаете, насколько сфера конкурентная и стоит ли выходить на рынок с новым продуктом. Если конкурентов нет — это повод задуматься о возможных рисках входа в данную нишу. Если же ваш продукт не новый, благодаря нашим решениям вы узнаете больше о текущих конкурентах и своей позиции на рынке.",
  },
};

var validateEmail = (email = "") => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

$().ready(function () {
  /* CAROUSEL LOGIC */

  /* TASK LOGIC */

  $(".first-page-section__two-item-checkbox-container").click((el) => {
    const id = el.currentTarget.getAttribute("data-task-item-id");
    const { title, description } = task_help[id];

    $(".first-page-section__content-item-title-blok").text(`${id}. ${title}`);
    $(".first-page-section__content-item-blok-txt").text(description);

    $(
      ".first-page-section__two-item-checkbox-container > .first-page-section__round-item-check.first-page-section__round-item-check_active"
    ).removeClass("first-page-section__round-item-check_active");

    $(
      ".first-page-section__two-item-checkbox-container > .first-page-section__item-txt-content.first-page-section__item-txt-content_active"
    ).removeClass("first-page-section__item-txt-content_active");

    $(
      `.first-page-section__two-item-checkbox-container[data-task-item-id=${id}]`
    )
      .children(".first-page-section__round-item-check")
      .addClass("first-page-section__round-item-check_active");

    $(
      `.first-page-section__two-item-checkbox-container[data-task-item-id=${id}]`
    )
      .children(".first-page-section__item-txt-content")
      .addClass("first-page-section__item-txt-content_active");
  });

  /* FORM LOGIC */

  $(".first-page-section__solution-your-business-problem-button").click(() => {
    $("#first-page-opinion-reserch-center-popup-form").css("display", "block");
    $("body").addClass("first-page-opinion-reserch-center-popup--no-scroll");
  });

  $("#first-page-opinion-reserch-center-popup-form--close").click(() => {
    $("#first-page-opinion-reserch-center-popup-form").css("display", "none");
    $("body").removeClass("first-page-opinion-reserch-center-popup--no-scroll");
  });

  $("#first-page-opinion-reserch-center-popup-notification--close").click(
    () => {
      $("#first-page-opinion-reserch-center-popup-notification").css(
        "display",
        "none"
      );

      $(".first-page-opinion-reserch-center-popup__box").removeClass(
        "first-page-opinion-reserch-center-popup__box--black"
      );

      $("body").removeClass(
        "first-page-opinion-reserch-center-popup--no-scroll"
      );
    }
  );

  $.validator.addMethod(
    "checkRussianPhoneNumber",
    function (value) {
      const phoneNumber = value.replace(/\D/g, "");
      return phoneNumber.length === 11;
    },
    ""
  );

  $.validator.addMethod("checkEmail", validateEmail, "Введите валидный email");

  $("#first-page-opinion-reserch-center-form--phone").inputmask({
    mask: "+7 (999) 999-9999",
    showMaskOnHover: false,
  });

  $("#first-page-opinion-reserch-center-form--popup--phone").inputmask({
    mask: "+7 (999) 999-9999",
    showMaskOnHover: false,
  });

  $("#first-page-opinion-form--popup").validate({
    rules: {
      name: "required",
      phone: {
        required: true,
        checkRussianPhoneNumber: true,
      },
      text: {
        required: true,
      },
      email: {
        required: true,
        checkEmail: true,
        email: true,
      },
      agree: "required",
    },
    messages: {
      name: "Обязательное поле",
      phone: {
        required: "Обязательное поле",
        checkRussianPhoneNumber: "Введите валидный номер телефона",
      },
      text: "Обязательное поле",
      email: {
        required: "Обязательное поле",
        checkEmail: "Введите валидный email",
        email: "Введите валидный email",
      },
      agree: "Обязательное поле",
    },
    submitHandler: function () {
      $("#first-page-opinion-form--popup").trigger("reset");
      $("#first-page-opinion-reserch-center-popup-form").css("display", "none");

      $("#first-page-opinion-reserch-center-popup-notification").css(
        "display",
        "block"
      );

      $("#first-page-opinion-reserch-center-popup-notification").css(
        "display",
        "block"
      );

      $("body").addClass("first-page-opinion-reserch-center-popup--no-scroll");
    },
  });

  $("#first-page-opinion-form").validate({
    rules: {
      name: "required",
      phone: {
        required: true,
        checkRussianPhoneNumber: true,
      },
      text: {
        required: true,
      },
      email: {
        required: true,
        checkEmail: true,
        email: true,
      },
      agree: "required",
    },
    messages: {
      name: "Обязательное поле",
      phone: {
        required: "Обязательное поле",
        checkRussianPhoneNumber: "Введите валидный номер телефона",
      },
      text: "Обязательное поле",
      email: {
        required: "Обязательное поле",
        checkEmail: "Введите валидный email",
        email: "Введите валидный email",
      },
      agree: "Обязательное поле",
    },
    submitHandler: function (el) {
      $("#first-page-opinion-form").trigger("reset");

      $("#first-page-opinion-reserch-center-popup-notification").css(
        "display",
        "block"
      );

      $(".first-page-opinion-reserch-center-popup__box").addClass(
        "first-page-opinion-reserch-center-popup__box--black"
      );

      $("body").addClass("first-page-opinion-reserch-center-popup--no-scroll");
    },
  });

  $(
    ".first-page-opinion-reserch-center-form__radio:not(#first-page-opinion-reserch-center-form__radio--age-no-matter) input[type=checkbox]"
  ).change(function (el) {
    const checked = el.target.checked;

    if (checked) {
      $(
        "#first-page-opinion-reserch-center-form__radio--age-no-matter input[type=checkbox]"
      ).prop("checked", false);
    }
  });

  $(
    "#first-page-opinion-reserch-center-form__radio--age-no-matter input[type=checkbox]"
  ).change(function (el) {
    const checked = el.target.checked;

    if (checked) {
      $(
        ".first-page-opinion-reserch-center-form__radio:not(#first-page-opinion-reserch-center-form__radio--age-no-matter) input[type=checkbox]"
      ).each(function () {
        this.checked = false;
      });
    }
  });
});
