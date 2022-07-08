let position = 99.9;
let right = 100;
let jump = 0;
let bottom = 0;
let gravity = 0.9;
let hero = document.getElementById("mario");

let game = document.getElementById("game");
console.log(hero.getBoundingClientRect());
let starttime;

let isJumping = false;
let jumpCount = 0;
const animateScript = () => {
    hero.style.backgroundPosition = `-${position}px 0px`;
    requestAnimationFrame(animateScript)
};

const moveRight = () => {
    
  if (hero.getBoundingClientRect().right < game.getBoundingClientRect().right-35){

      right += 25;
      hero.style.transform = `translateX(${right}px)`;
   
      console.log("right");
      console.log(hero.offsetTop);
  }else{
    hero.style.left -= 50+ 'px'
  }

    
};

const moveLeft = () => {

    if (hero.getBoundingClientRect().left > game.getBoundingClientRect().left+35){

        right -= 25;
        hero.style.transform = `translateX(${right}px) scaleX(-1)`;
       
        console.log("left");
        console.log(hero.offsetTop);
    }else{
        hero.style.left += 50 + 'px'
    }
};

const moveJump = () => {
if (hero.getBoundingClientRect().bottom < 649 && jumpCount < 3){

    // if (jumpCount < 3){

        jump -= 100;
        
        hero.style.transform = `translate(${right}px,${jump}px)`;
        isJumping = true;
        console.log(hero.getBoundingClientRect());
        isJumping = true
        console.log("jump");
        
        console.log(hero.offsetTop);
    }else{

        jump = 0;
        jumpCount = 0;
       // isJumping = false
        hero.style.transform = `translate(${right}px, ${jump}px)`;
    }


setTimeout(function(){

    if (isJumping){
       while (hero.getBoundingClientRect().bottom <648 ){
        isJumping = false
        jump *= gravity
        hero.style.transform = `translate(${right}px,${jump}px)`;
    
       }
    }
}, 580)
};

const control = (e) => {
    if (position < 250) {
        position = position + 99.9;
    } else {
        position = 99.9;
    }
    if (e.key === " " ) {
        jumpCount++;      
        moveJump();    
    } else if (e.key === "ArrowLeft") {
        moveLeft();
    } else if (e.key === "ArrowRight") {       
        moveRight();
    }
};
requestAnimationFrame(animateScript)
document.addEventListener("keydown", function(e){
    control(e)
});

//
