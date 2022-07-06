let position = 91;
function animateScript(){

  document.getElementById('image').style.backgroundPosition = `-${position}px 0px`;
  requestAnimationFrame(animateScript)
}

let hero = document.getElementById('image')



console.log(hero.id)

// hero.addEventListener('onmouseenter', animateScript())
window.requestAnimationFrame(animateScript)