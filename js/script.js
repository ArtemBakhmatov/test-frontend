'use strict';

///////////// Taймер /////////////

const deadline = '2023-09-26'; // конечный срок

const getTimerRemaining = (endtime) => { // оставшееся время
    let hours;        // часы 
    let minutes;     // минуты 
    let seconds;     // секунды

    const t = Date.parse(endtime) - Date.parse(new Date()); // разница в миллисикундах

    if (t <= 0) {
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else {
        hours = Math.floor((t / (1000 * 60 * 60))),                 // количество часов
        minutes = Math.floor((t / 1000 / 60) % 60 ),            // количество минут
        seconds = Math.floor((t / 1000) % 60);                  // количество секунд
    }

    return {   // возвращаем объект
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

const getZero = (num) => {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
};

const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector);
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
        const t = getTimerRemaining(endtime);

        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }

    updateClock();
};

setClock('.banner__timer-flex', deadline);

////////////////// Клик на звездочки /////////////////
const ratingWrapper = document.querySelector('.slider__rating'); // родитель главный
const number = document.querySelector('.slider__rating-number');
const star1 = document.querySelector('.star-1');
const star2 = document.querySelector('.star-2');
const star3 = document.querySelector('.star-3');
const star4 = document.querySelector('.star-4');
const star5 = document.querySelector('.star-5');

ratingWrapper.addEventListener('click', event => {
    if (event.target && event.target.classList.contains('star-1')) {
        if (!star1.classList.contains('slider__star-active')) {
            star1.classList.add('slider__star-active');
            number.textContent = '(2)';
           
        } else {
            star1.classList.remove('slider__star-active');
            star2.classList.remove('slider__star-active');
            star3.classList.remove('slider__star-active');
            star4.classList.remove('slider__star-active');
            star5.classList.remove('slider__star-active');
            number.textContent = '(0)';
        }
    }

    if (event.target && event.target.classList.contains('star-2')) {
        if (!star2.classList.contains('slider__star-active')) {
            star1.classList.add('slider__star-active');
            star2.classList.add('slider__star-active'); 
            number.textContent = '(4)';
        } else {
            star2.classList.remove('slider__star-active');
            star3.classList.remove('slider__star-active');
            star4.classList.remove('slider__star-active');
            star5.classList.remove('slider__star-active');
            number.textContent = '(2)';
        }
    }

    if (event.target && event.target.classList.contains('star-3')) {
        if (!star3.classList.contains('slider__star-active')) {
            star1.classList.add('slider__star-active');
            star2.classList.add('slider__star-active'); 
            star3.classList.add('slider__star-active');
            number.textContent = '(6)';
        } else {
            star3.classList.remove('slider__star-active');
            star4.classList.remove('slider__star-active');
            star5.classList.remove('slider__star-active');
            number.textContent = '(4)';
        }
    }

    if (event.target && event.target.classList.contains('star-4')) {
        if (!star4.classList.contains('slider__star-active')) {
            star1.classList.add('slider__star-active');
            star2.classList.add('slider__star-active'); 
            star3.classList.add('slider__star-active');
            star4.classList.add('slider__star-active');
            number.textContent = '(8)';
        } else {
            star4.classList.remove('slider__star-active');
            star5.classList.remove('slider__star-active');
            number.textContent = '(6)';
        }
    }

    if (event.target && event.target.classList.contains('star-5')) {
        if (!star5.classList.contains('slider__star-active')) {
            star1.classList.add('slider__star-active');
            star2.classList.add('slider__star-active'); 
            star3.classList.add('slider__star-active');
            star4.classList.add('slider__star-active');
            star5.classList.add('slider__star-active');
            number.textContent = '(10)';
        } else {
            star5.classList.remove('slider__star-active');
            number.textContent = '(8)';
        }
    }
})

////////////////// слайдер /////////////////
const slides = document.querySelectorAll('.slider__slide'); // все слайды
const slidesWrapper = document.querySelector('.slider__wrapper'); // родитель всех слайдов
const slidesFields = document.querySelector('.slider__inner');  // поле слайдов в ширину
const widthWrapper = window.getComputedStyle(slidesWrapper).width;    // ширина родителя
let slideIndex = 1;
let offset = 0;

slidesFields.style.width = 100 * slides.length + '%';
slides.forEach(slide => slide.style.width = widthWrapper);

const dotsWrapper = document.createElement('div');
const dots = [];
dotsWrapper.classList.add('slider__dots');
slidesWrapper.append(dotsWrapper);

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('dot');
    dot.classList.add('slider__dot');
    dot.setAttribute('data-slide-to', i + 1);

    if (i == 0) {
        dot.style.opacity = 1;
    } else {
        dot.style.opacity = .5;
    }

    dotsWrapper.append(dot);
    dots.push(dot);
}

const dotsActive = () => {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = '1';
};

dots.forEach(dot => {
    dot.addEventListener('click', (event) => {
        const slideTo = event.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = +widthWrapper.slice(0, widthWrapper.length - 2) * (slideTo - 1);

        slidesFields.style.transform = `translateX(-${offset}px)`;

        dotsActive();
    });
});

//////////  кнопка для цвета //////////////

const btnColor = document.getElementById('btn__color'); // кнопка для цвета
const arrowColor = document.getElementById('arrow__color'); // стрелка на кнопке
const listDropdownColor = document.getElementById('dropdown__color'); // выпадающий список

const toggleDropdown = () => {
    if (!listDropdownColor.classList.contains('filters__dropdown-active')) {
        listDropdownColor.classList.add('filters__dropdown-active');
        arrowColor.classList.add('filters__downArrow-active');
    } else {
        listDropdownColor.classList.remove('filters__dropdown-active');
        arrowColor.classList.remove('filters__downArrow-active');
    }
}

btnColor.addEventListener('click', toggleDropdown);

arrowColor.addEventListener('click', toggleDropdown);

listDropdownColor.addEventListener('click', event => {
    if(event.target && event.target.classList.contains('item-black')) {
        btnColor.textContent = 'Black';
        listDropdownColor.classList.remove('filters__dropdown-active');
        arrowColor.classList.remove('filters__downArrow-active');
    }
    if(event.target && event.target.classList.contains('item-orange')) {
        btnColor.textContent = 'Orange';
        listDropdownColor.classList.remove('filters__dropdown-active');
        arrowColor.classList.remove('filters__downArrow-active');
    }
    if(event.target && event.target.classList.contains('item-pink')) {
        btnColor.textContent = 'Pink';
        listDropdownColor.classList.remove('filters__dropdown-active');
        arrowColor.classList.remove('filters__downArrow-active');
    }
    if(event.target && event.target.classList.contains('item-yellow')) {
        btnColor.textContent = 'Yellow';
        listDropdownColor.classList.remove('filters__dropdown-active');
        arrowColor.classList.remove('filters__downArrow-active');
    }
});

//////////  кнопка для размера //////////////

const btnSize = document.getElementById('btn__size'); // кнопка для размера
const arrowSize = document.getElementById('arrow__size'); // стрелка на кнопке
const listDropdownSize = document.getElementById('dropdown__size'); // выпадающий список

const toggleDropdownSize = () => {
    if (!listDropdownSize.classList.contains('filters__dropdown-active')) {
        listDropdownSize.classList.add('filters__dropdown-active');
        arrowSize.classList.add('filters__downArrow-active');
    } else {
        listDropdownSize.classList.remove('filters__dropdown-active');
        arrowSize.classList.remove('filters__downArrow-active');
    }
}

btnSize.addEventListener('click', toggleDropdownSize);

arrowSize.addEventListener('click', toggleDropdownSize);

listDropdownSize.addEventListener('click', event => {
    if(event.target && event.target.classList.contains('item-2')) {
        btnSize.textContent = '2';
        listDropdownSize.classList.remove('filters__dropdown-active');
        arrowSize.classList.remove('filters__downArrow-active');
    }
    if(event.target && event.target.classList.contains('item-3')) {
        btnSize.textContent = '3';
        listDropdownSize.classList.remove('filters__dropdown-active');
        arrowSize.classList.remove('filters__downArrow-active');
    }
    if(event.target && event.target.classList.contains('item-4')) {
        btnSize.textContent = '4';
        listDropdownSize.classList.remove('filters__dropdown-active');
        arrowSize.classList.remove('filters__downArrow-active');
    }
    if(event.target && event.target.classList.contains('item-5')) {
        btnSize.textContent = '5';
        listDropdownSize.classList.remove('filters__dropdown-active');
        arrowSize.classList.remove('filters__downArrow-active');
    }
});
// tsc script.ts