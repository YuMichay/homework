const button = document.querySelector('.button');

function getRandomPosition() {
  const maxX = window.innerWidth - button.clientWidth;
  const maxY = window.innerHeight - button.clientHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  return { x: randomX, y: randomY };
}

function moveButton() {
  const newPosition = getRandomPosition();
  button.style.left = newPosition.x + 'px';
  button.style.top = newPosition.y + 'px';
}

button.addEventListener('click', () => {
  moveButton();
});

button.addEventListener('mouseenter', () => {
  if (Math.random() < 0.5) {
    moveButton();
  }
});