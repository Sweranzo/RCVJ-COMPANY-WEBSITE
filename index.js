//text-animation//
const setTextTransition = document.getElementById('changing-text');
const messages = ['Start your career now with us', 'Fast reliable process', 'Good environment to choose from'];

let index=0;

setInterval( () => {
  index = (index + 1) % messages.length;
  setTextTransition.textContent = messages[index];


},3000);