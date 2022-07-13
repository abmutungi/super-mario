let progress = 0;
let newPosition = 0;
let position = 99.9;
let finalPosition = 100;
let time = {
    start: null,
    total: 500,
};
let done = false;
let right = 100;
let jump = 0;
let bottom = 0;
let gravity = 0.9;
let hero = document.getElementById("mario");
let enemy;
let game = document.getElementById("game");
let starttime;
let isJumping = false;
let jumpCount = 0;
let enemyCounter = 0;
let enemyLeft = 0;

const animateScript = () => {
    hero.style.backgroundPosition = `-${position}px 0px`;
};

const moveRight = () => {
    if (
        hero.getBoundingClientRect().right <
        game.getBoundingClientRect().right - 35
    ) {
        right += 25;
        hero.style.transform = `translateX(${right}px)`;

        console.log("right");
        console.log(hero.getBoundingClientRect().right);
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
        console.log(hero.getBoundingClientRect().left);
        gameObject.left = false;
    } else {
        hero.style.left += 50 + "px";
    }
};

let gameObject = {
    jump: false,
    right: false,
    left: false,
    animate: true,
    enemyExists: false,
};

const moveup = (now) => {
    if (gameObject.jump) {
        //isJumping = true

        if (!time.start) time.start = now;
        time.elapsed = now - time.start;
        progress = time.elapsed / time.total;
        newPosition = progress * finalPosition;
        hero.style.bottom = newPosition + 95 + "px";
        if (progress < 1) {
            if (!done) {
                requestAnimationFrame(moveup);
                done = false;
            }
        } else {
            time.start = 0;
            gameObject.jump = false;
            requestAnimationFrame(movedown);
            done = true;
        }
    }
};

const movedown = (now) => {
    gameObject.jump = false;

    if (!time.start) time.start = now;
    time.elapsed = now - time.start;
    progress = time.elapsed / time.total;
    newPosition = finalPosition * (1 - progress);
    hero.style.bottom = newPosition + 95 + "px";
    if (progress < 1) {
        requestAnimationFrame(movedown);
    } else {
        time.start = 0;
    }
    done = false;
};

const newJump = () => {
    requestAnimationFrame(moveup);
};

const createEnemy = () => {
    enemy = document.createElement("div");
    enemy.setAttribute("id", "goomba");
    enemy.style.left = 1200 + "px";
    enemyCounter = 0;
    console.log("============== CREATING ENEMY =============");
    game.appendChild(enemy);
    gameObject.enemyExists = true;
};

const moveEnemy = () => {
    enemyLeft -= 10;

    enemy.style.transform = `translateX(${enemyLeft}px) scaleX(-1)`;

    if (
        enemy.getBoundingClientRect().left <
            game.getBoundingClientRect().left &&
        gameObject.enemyExists
    ) {
        enemyLeft = 0;
        enemy.remove();
        gameObject.enemyExists = false;
    }
};

const control = (e) => {
    if (position < 250) {
        position = position + 99.9;
    } else {
        position = 99.9;
    }
    if (e.key === " " || e.key === "ArrowUp") {
        gameObject.jump = true;
    } else if (e.key === "ArrowLeft") {
        gameObject.left = true;
    } else if (e.key === "ArrowRight") {
        gameObject.right = true;
    }
};

document.addEventListener("keydown", function (e) {
    control(e);
});
const gameLoop = () => {
    enemyCounter++;
    if (enemyCounter === 500) {
        createEnemy();
    }
    hero.style.backgroundPosition = `-${position}px 0px`;

    if (gameObject.jump) {
        newJump();
        // gameObject.jump = false;
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

    if (gameObject.enemyExists) {
        moveEnemy();
        //gameObject.enemyExists = false;
    }
    requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
