document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.quizzes__tab')
  const lists = document.querySelectorAll('.quizzes__list')
  const leftArrow = document.querySelector('.quizzes__arrow-btn--left')
  const rightArrow = document.querySelector('.quizzes__arrow-btn--right')
  const comeAndWin = document.querySelector('.come_and_win')
  const interactiveObjects = document.querySelectorAll('.interactive_objects span, .interactive_objects img')
  let currentListIndex = 0
  const blocks = document.querySelectorAll('.registration')
  const steps = document.querySelectorAll('.how-work__step')
  const lines = document.querySelectorAll('.how-work__line')
  const leftButton = document.querySelector('.how-work__arrow-btn--left')
  const rightButton = document.querySelector('.how-work__arrow-btn--right')
  const takeSurveyImage = document.querySelector('.take-survey__image')
  const participationSurveysImage = document.querySelector('.participation-surveys__image')
  let currentIndex = 0

  function updateLists() {
    lists.forEach((list, index) => {
      if (index === currentListIndex) {
        list.classList.add('quizzes__list--active')
      } else {
        list.classList.remove('quizzes__list--active')
      }
    })

    tabs.forEach((tab, index) => {
      if (index === currentListIndex) {
        tab.classList.add('quizzes__tab--active')
      } else {
        tab.classList.remove('quizzes__tab--active')
      }
    })

    leftArrow.classList.toggle('quizzes__arrow-btn--disable', currentListIndex === 0)
    rightArrow.classList.toggle('quizzes__arrow-btn--disable', currentListIndex === lists.length - 1)
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      currentListIndex = index
      updateLists()
    })
  })

  leftArrow.addEventListener('click', () => {
    if (currentListIndex > 0) {
      currentListIndex--
      updateLists()
    }
  })

  rightArrow.addEventListener('click', () => {
    if (currentListIndex < lists.length - 1) {
      currentListIndex++
      updateLists()
    }
  })

  updateLists()

  const animateElements = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        interactiveObjects.forEach((item, index) => {
          setTimeout(() => item.classList.add('animate-fall'), index * 100)
        })
      } else {
        interactiveObjects.forEach(item => item.classList.remove('animate-fall'))
      }
    })
  }

  const observer = new IntersectionObserver(animateElements, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  })

  observer.observe(comeAndWin)

  function updateBlocks() {
    blocks.forEach((block, index) => {
      block.style.display = index === currentIndex ? 'flex' : 'none'
    })

    leftButton.classList.toggle('how-work__arrow-btn--disable', currentIndex === 0)
    rightButton.classList.toggle('how-work__arrow-btn--disable', currentIndex === blocks.length - 1)

    steps.forEach((step, index) => {
      step.classList.toggle('how-work__step--active', index === currentIndex)
    })

    lines.forEach((line, index) => {
      line.classList.toggle('how-work__line--active', index < currentIndex)
    })

    takeSurveyImage.style.display = currentIndex === 1 ? 'block' : 'none'
    participationSurveysImage.style.display = currentIndex === 2 ? 'block' : 'none'
  }

  leftButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--
      updateBlocks()
    }
  })

  rightButton.addEventListener('click', () => {
    if (currentIndex < blocks.length - 1) {
      currentIndex++
      updateBlocks()
    }
  })

  updateBlocks()
})
