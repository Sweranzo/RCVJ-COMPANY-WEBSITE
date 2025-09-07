//text-animation//
const setTextTransition = document.getElementById('changing-text');
const messages = ['Start your career now with us', 'Fast reliable process', 'Good environments'];

let index=0;

setInterval( () => {
  index = (index + 1) % messages.length;
  setTextTransition.textContent = messages[index];


},3000);

//burger menu //

const burger = document.querySelector('.burger');
const navlinks = document.querySelector('.links');

burger.addEventListener('click', () => {
  navlinks.classList.toggle('active');
  
});

document.addEventListener('click', (e) => {
  if (
    navlinks.classList.contains('active') &&
    !navlinks.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    navlinks.classList.remove('active');
  }
});

//json animations//
document.addEventListener("DOMContentLoaded", () => {
  lottie.loadAnimation({
    container: document.getElementById('working-man'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'JSON/Welcome.json'
  });
});