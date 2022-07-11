let position = 99.9;
let right = 100;
let jump = 0;
let bottom = 0;
let gravity = 0.9;
let hero = document.getElementById("mario");
let game = document.getElementById("game");
let gameDimensions = game.getBoundingClientRect();

console.log(hero.getBoundingClientRect());
let starttime;

let isJumping = false;
let jumpCount = 0;
const animateScript = (timestamp) => {
    hero.style.backgroundPosition = `-${position}px 0px`;
    // requestAnimationFrame(animateScript)
};

const moveRight = () => {
    if (
        hero.getBoundingClientRect().right <
        game.getBoundingClientRect().right - 35
    ) {
        right += 25;
        hero.style.transform = `translateX(${right}px)`;

        console.log("right");
        console.log(hero.offsetTop);
        gameObject.right = false;
    } else {
        hero.style.left -= 50 + "px";
    }
};

const moveLeft = () => {
    if (
        hero.getBoundingClientRect().left >
        game.getBoundingClientRect().left + 35
    ) {
        right -= 25;
        hero.style.transform = `translateX(${right}px) scaleX(-1)`;

        console.log("left");
        console.log(hero.offsetTop);
        gameObject.left = false;
    } else {
        hero.style.left += 50 + "px";
    }
};

const moveJump = (timestamp) => {
    console.log(timestamp);
    if (hero.getBoundingClientRect().bottom < 649 && jumpCount < 3) {
        // if (jumpCount < 3){

        jump -= 100;

        hero.style.transform = `translate(${right}px,${jump}px)`;
        isJumping = true;
        console.log(hero.getBoundingClientRect());
        isJumping = true;
        console.log("jump");

        console.log(hero.offsetTop);
        gameObject.jump = false;
    } else {
        jump = 0;
        jumpCount = 0;
        // isJumping = false
        hero.style.transform = `translate(${right}px, ${jump}px)`;
        gameObject.jump = false;
    }

    //setTimeout(function(){

    // if (isJumping){
    //    while (hero.getBoundingClientRect().bottom <648 ){
    //     isJumping = false
    //     jump *= gravity
    //     hero.style.transform = `translate(${right}px,${jump}px)`;

    //    }
    // }
    //}, 780)
};

let gameObject = {
    jump: false,
    right: false,
    left: false,
    animate: true,
};

const control = (e) => {
    if (position < 250) {
        position = position + 99.9;
    } else {
        position = 99.9;
    }
    if (e.key === " ") {
        jumpCount++;
        //moveJump()
        gameObject.jump = true;
        console.log(gameObject.true);
    } else if (e.key === "ArrowLeft") {
        //moveLeft();
        gameObject.left = true;
    } else if (e.key === "ArrowRight") {
        //moveRight();
        gameObject.right = true;
    }
};
// requestAnimationFrame(function(){
//     console.log('checking fps .now', performance.now());
//     console.log(timestamp);
//     animateScript()
// })
document.addEventListener("keydown", function (e) {
    control(e);
});
const gameLoop = () => {
    hero.style.backgroundPosition = `-${position}px 0px`;

    if (gameObject.jump) {
        moveJump();
    }

    if (gameObject.right) {
        moveRight();
    }

    if (gameObject.left) {
        moveLeft();
    }

    if (gameObject.animate) {
        animateScript();
    }
    requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);

//
