import Splitting from 'splitting';
import anime from 'animejs/lib/anime.es.js';

export default function loadTl() {
  Splitting({ target: '.title', by: 'chars' });

  anime
    .timeline({ easing: 'easeOutQuart' })
    .add({
      targets: '.transition_title .char',
      translateY: [100, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1200,
      delay: (el, i) => 300 + 30 * i,
    })
    .add({
      targets: '.transition_title .char',
      translateY: [0, -100],
      opacity: [1, 0],
      easing: 'easeInExpo',
      duration: 1000,
      delay: (el, i) => 100 + 30 * i,
    })
    .add({
      targets: '.transition',
      translateX: [0, '-100%'],
      duration: 1000,
    })
    .add(
      {
        targets: '.sub-title .char',
        translateX: [40, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: (el, i) => 500 + 30 * i,
      },
      '-=800'
    )
    .add(
      {
        targets: '.intro_title .char',
        translateY: ['110%', 0],
        translateX: ['55%', 0],
        rotateZ: [180, 0],
        duration: 750,
        easing: 'easeOutExpo',
        delay: (el, i) => 50 * i,
      },
      '-=1200'
    )
    .add(
      {
        targets: '.title.intro_title img',
        clipPath: ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'],
        duration: 1200,
      },
      '-=600'
    )
    .add(
      {
        targets: '.intro_btn',
        opacity: [0, 1],
        duration: 2000,
      },
      '-=1200'
    )
    .add(
      {
        targets: '.intro_img',
        scale: [0.3, 1],
        opacity: {
          value: [0, 1],
          easing: 'easeOutQuint',
        },
        duration: 800,
        easing: 'easeOutBack',
      },
      '-=3300'
    );
}

export function burgerTl() {
  anime
    .timeline({
      easing: 'easeOutCubic',
      begin: (anim) => {
        document.querySelector('.header').classList.add('on-scroll');
      },
    })
    .add({
      targets: '.sidebar_wrapper',
      translateX: ['100%', 0],
      easing: 'linear',
      duration: 4,
    })
    .add({
      targets: '.sidebar_wrapper',
      opacity: [0, 1],
      easing: 'linear',
      duration: 600,
    })
    .add({
      targets: '.sidebar',
      translateX: ['100%', 0],
      duration: 500,
    })
    .add(
      {
        targets: '.nav_link',
        translateY: ['50%', 0],
        opacity: [0, 1],
        duration: 500,
        delay: anime.stagger(200),
      },
      '-=400'
    )
    .add(
      {
        targets: '.sidebar_btn',
        scale: [0, 1],
        opacity: 1,
        easing: 'easeOutBack',
        duration: 500,
      },
      '-=200'
    );
}

export function burgerReverseTl() {
  anime
    .timeline({
      easing: 'easeOutCubic',
      complete: (anim) => {
        const header = document.querySelector('.header');

        if (header.getAttribute('data-scrolled') == 0) {
          header.classList.remove('on-scroll');
        }
      },
    })
    .add({
      targets: '.nav_link',
      translateY: [0, '-50%'],
      opacity: [1, 0],
      duration: 500,
      delay: anime.stagger(200),
    })
    .add(
      {
        targets: '.sidebar_btn',
        opacity: 0,
        duration: 500,
      },
      '-=300'
    )
    .add(
      {
        targets: '.sidebar',
        translateX: [0, '100%'],
        duration: 500,
      },
      '-=200'
    )
    .add(
      {
        targets: '.sidebar_wrapper',
        opacity: [1, 0],
        easing: 'linear',
        duration: 600,
      },
      '-=200'
    )
    .add({
      targets: '.sidebar_wrapper',
      translateX: [0, '100%'],
      opacity: [1, 0],
      easing: 'linear',
      duration: 4,
    });
}

export function cardTl(item) {
  Splitting({ target: item.querySelector('.card_text'), by: 'chars' });

  anime
    .timeline({
      easing: 'easeOutBack',
    })
    .add({
      targets: item,
      scale: [0, 1],
      duration: 800,
    })
    .add(
      {
        targets: item.querySelector('img'),
        opacity: [0, 1],
        duration: 800,
        easing: 'linear',
      },
      '-=400'
    )
    .add(
      {
        targets: item.querySelector('.card_title'),
        scale: [0, 1],
        duration: 800,
      },
      '-=800'
    )
    .add(
      {
        targets: item.querySelectorAll('.card_text .char'),
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 300,
        delay: (el, i) => 25 * (i + 1),
      },
      '-=800'
    );
}

export function aboutImg() {
  anime({
    targets: '.about_img img',
    scale: [0, 1],
    duration: 800,
    easing: 'easeOutBack',
  });
}

export function aboutDescr() {
  anime({
    targets: '.about_descr p',
    opacity: [0, 1],
    duration: 500,
    easing: 'linear',
  });
}

export function pageTl(container) {
  const textWrapper = document.querySelector('.transition_title');
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='char'>$&</span>"
  );

  anime
    .timeline({ easing: 'easeOutQuart' })
    .add({
      targets: '.transition',
      translateX: ['100%', 0],
      duration: 1000,
    })
    .add({
      targets: '.transition_title .char',
      translateY: [100, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1200,
      delay: (el, i) => 300 + 30 * i,
    })
    .add({
      targets: '.transition_title .char',
      translateY: [0, -100],
      opacity: [1, 0],
      easing: 'easeInExpo',
      duration: 1000,
      delay: (el, i) => 100 + 30 * i,
    })
    .add({
      targets: '.transition',
      translateX: [0, '-100%'],
      duration: 1000,
    })
    .add(
      {
        targets: container.querySelector('.title.intro_title img'),
        clipPath: ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'],
        duration: 1200,
      },
      '-=600'
    );
}

export function workTl(item) {
  anime.timeline({ easing: 'easeOutBack' }).add({
    targets: item,
    width: [0, '100%'],
    duration: 800,
  });
}
