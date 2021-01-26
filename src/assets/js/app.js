// Packages
import barba from '@barba/core';
import LocomotiveScroll from 'locomotive-scroll';

// Components
import burgerToggle, { burgerClose } from './components/burger';
import loadTl, {
  cardTl,
  aboutImg,
  aboutDescr,
  workTl,
} from './components/anim';
import { pageTl } from './components/anim';

// Global vars
let active = false;
let scrollEvent = false;
let locoScroll;

// Functions
function delay(n = 2000) {
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function removeDefaul(selector) {
  document.querySelectorAll(selector).forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });
}

async function onPageLeave(container, text) {
  document.querySelector('.transition_title').innerHTML = text;

  pageTl(container);
  await delay(1000);

  if (document.querySelector('body').classList.contains('show-nav')) {
    burgerClose();
  }

  container.querySelector('.intro_title').classList.add('title-line-up');
}

function initBarba() {
  removeDefaul('a');

  barba.init({
    preventRunning: true,
    transitions: [
      {
        name: 'load-transition',
        async once() {
          loadTl();
        },
      },
      {
        name: 'work-page-transition',
        from: {
          namespace: ['home'],
        },
        to: {
          namespace: ['work'],
        },
        async leave({ next: { container } }) {
          const done = this.async();

          await onPageLeave(container, 'Our Work');

          done();
        },
      },
      {
        name: 'home-page-transition',
        from: {
          namespace: ['work'],
        },
        to: {
          namespace: ['home'],
        },
        async leave({ next: { container } }) {
          const done = this.async();

          await onPageLeave(container, 'Sweet Home');

          done();
        },
      },
    ],
  });
}

function fixHeader() {
  active = true;
  const header = document.querySelector('.header');
  header.classList.add('on-scroll');
  header.setAttribute('data-scrolled', '1');
}

function unFixHeader(delay = 0) {
  active = false;
  setTimeout(() => {
    const header = document.querySelector('.header');

    if (!document.querySelector('body').classList.contains('show-nav')) {
      header.classList.remove('on-scroll');
    }

    header.setAttribute('data-scrolled', '0');
  }, delay);
}

function initOnScroll() {
  locoScroll.on('scroll', ({ delta }) => {
    if (delta) {
      if (delta.y && !active) {
        fixHeader();
      }

      if (delta.y === 0 && active) {
        unFixHeader(300);
      }
    }

    if (!scrollEvent && !delta) {
      scrollEvent = true;

      onScroll();
    }
  });
}

function onScroll() {
  window.addEventListener('scroll', function () {
    if (window.pageYOffset && !active) {
      fixHeader();
    }

    if (window.pageYOffset === 0 && active) {
      unFixHeader(4);
    }
  });
}

function initOnCall() {
  locoScroll.on('call', (name, action, obj) => {
    switch (name) {
      case 'cardTl':
        cardTl(document.querySelector(`.card[data-scroll-id="${obj.id}"]`));
        break;
      case 'aboutImg':
        aboutImg();
        break;
      case 'aboutDescr':
        aboutDescr();
        break;
      case 'workTl':
        workTl(
          document.querySelector(`.works_img[data-scroll-id="${obj.id}"]`)
        );
        break;
      default:
        console.log(`Not found data-scroll-call="${name}"`);
        break;
    }
  });
}

// Base config
locoScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  reloadOnContextChange: true,
  touchMultiplier: 3,
  tablet: {
    smooth: true,
  },
  smartphone: {
    smooth: false,
  },
});

barba.hooks.after(() => {
  locoScroll.init();
  locoScroll.update();

  initOnScroll();
  initOnCall();
});

barba.hooks.before(() => {
  locoScroll.destroy();
});

initBarba();

// Base functional
initOnScroll();
initOnCall();
burgerToggle();
