let position = 99.9;
let right = 100;
let jump = 0;
let gravity = 0.9;
let hero = document.getElementById("mario");

const animateScript = () => {
    hero.style.backgroundPosition = `-${position}px 0px`;
};

const moveRight = () => {
    hero.style.transform = `translateX(${right}px)`;
    right += 50;
    window.requestAnimationFrame(animateScript);
    console.log("right");
    console.log(hero.offsetTop);
};

const moveLeft = () => {
    hero.style.transform = `translateX(${right}px)`;
    right -= 50;
    window.requestAnimationFrame(animateScript);
    console.log("left");
    console.log(hero.offsetTop);
};

const moveJump = () => {
    //hero.style.transform = `translateX(${right}px)`;
    hero.style.transform = `translate(${right}px,${jump}px)`;
    jump -= 50;
    jump = jump * gravity;
    window.requestAnimationFrame(animateScript);
    console.log("jump");
    //console.log(hero.offsetTop);
};

const control = (e) => {
    if (position < 500) {
        position = position + 99.9;
    } else {
        position = 99.9;
    }
    if (e.key === " ") {
        moveJump();
    } else if (e.key === "ArrowLeft") {
        moveLeft();
    } else if (e.key === "ArrowRight") {
        moveRight();
    }
};
document.addEventListener("keydown", control);
//
