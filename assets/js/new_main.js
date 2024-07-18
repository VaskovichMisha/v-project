document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.quizzes__tab')
    const lists = document.querySelectorAll('.quizzes__list')
    const leftArrow = document.querySelector('.quizzes__arrow-btn--left')
    const rightArrow = document.querySelector('.quizzes__arrow-btn--right')
    let currentListIndex = 0

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
})