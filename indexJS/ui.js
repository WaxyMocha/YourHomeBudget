/*jshint esversion: 6 */

const menuButton = document.getElementById('menuButton');
const mainMenu = document.getElementById('mainMenu');

menuButton.addEventListener('click', (e) => {
  if (mainMenu.style.left == '0px') {
    mainMenu.style.left = '-100vw';
  } else {
    mainMenu.style.left = '0px';
  }
});