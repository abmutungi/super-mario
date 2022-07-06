let position = 99.9;
let right = 100;
let jump = 0;
let bottom = 0;
let gravity = 0.9;
let hero = document.getElementById("mario");

let isJumping = false;
let jumpCount = 0;
const animateScript = () => {
    hero.style.backgroundPosition = `-${position}px 0px`;
};

const moveRight = () => {
    right += 25;
    hero.style.transform = `translateX(${right}px)`;
    window.requestAnimationFrame(animateScript);
    console.log("right");
    console.log(hero.offsetTop);
};

const moveLeft = () => {
    right -= 25;
    hero.style.transform = `translateX(${right}px)`;
    window.requestAnimationFrame(animateScript);
    console.log("left");
    console.log(hero.offsetTop);
};

const moveJump = () => {
    if (jumpCount < 3){

        jump -= 100;
        //if (isJumping) return;
        //hero.style.transform = `translateX(${right}px)`;
        hero.style.transform = `translate(${right}px,${jump}px)`;
        isJumping = true;
        jump = jump * gravity;
        window.requestAnimationFrame(animateScript);
        console.log("jump");
        //console.log(hero.offsetTop);
    }else{
        jump = 0;
        jumpCount = 0;
        hero.style.transform = `translate(${right}px, ${jump}px)`
    }
};

const control = (e) => {
    if (position < 250) {
        position = position + 99.9;
    } else {
        position = 99.9;
    }
    if (e.key === " ") {
        jumpCount++;
        moveJump();
    } else if (e.key === "ArrowLeft") {
        moveLeft();
    } else if (e.key === "ArrowRight") {
        moveRight();
    }
};
document.addEventListener("keydown", control);
//
