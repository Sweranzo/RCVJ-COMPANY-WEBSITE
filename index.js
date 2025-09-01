//text-animation//
const setTextTransition = document.getElementById('changing-text');
const messages = ['Start your career now with us', 'Fast reliable process', 'Good environments'];

let index=0;

setInterval( () => {
  index = (index + 1) % messages.length;
  setTextTransition.textContent = messages[index];


},3000);

<script src="//code.tidio.co/vxennfznpr8yqvlhzvuj6mqy65gxj6j4.js" async></script>