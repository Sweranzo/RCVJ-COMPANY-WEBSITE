
//loading page// 
window.addEventListener("load", function() {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  loader.style.opacity = "100";   // fade out
  setTimeout(() => {
    loader.style.display = "none";
    content.style.display = "block";
  }, 2800); // matches transition time
});




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
  
  lottie.loadAnimation({
    container: document.getElementById('location'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'JSON/Globe.json'
  });

    lottie.loadAnimation({
    container: document.getElementById('confused'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'JSON/confused.json'
  });
});

