import { burgerTl, burgerReverseTl } from '../components/anim';

const circle = document.querySelector('.progress-ring_circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

export function setProgress(percent = 0) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

export default function burgerToggle() {
  setProgress();

  document.querySelector('.header_burger').addEventListener('click', (e) => {
    e.preventDefault();

    const res = document.querySelector('body').classList.toggle('show-nav');

    if (res) {
      setProgress(100);
      burgerTl();
    } else {
      setProgress(0);
      burgerReverseTl();
    }
  });
}

export function burgerClose() {
  document.querySelector('body').classList.remove('show-nav');

  setProgress(0);
  burgerReverseTl();
}
