let progress = 0;
let newPosition = 0;
let position = 99.9;
let finalPosition = 300;
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
let platform;
let floor;
let coin;
let timer;
let gameTime = 0;
let pipe;
let menu;
let leftC = false;
let rightC = false;
let paused = false;
let surfaces = [];
const animateScript = () => {
    hero.style.backgroundPosition = `-${position}px 0px`;
    // console.log("animate check")
};

const showTimer = () => {
    timer = document.createElement("div");
    timer.id = "timer";
    timer.textContent = gameTime;
    timer.innerHTML = gameTime;
    game.appendChild(timer);
};

showTimer();

const moveRight = (timestamp) => {
    movedown();

    if (
        hero.getBoundingClientRect().right <
        game.getBoundingClientRect().right - 35
    ) {
        right += 25;
        hero.style.transform = `translateX(${right}px)`;

        console.log("right");
        console.log("hero left, ", hero.getBoundingClientRect());
        gameObject.right = false;
    } else if (
        hero.getBoundingClientRect().right >=
        game.getBoundingClientRect().right - 35
    ) {
        hero.style.left -= 50 + "px";
    }
};

const moveLeft = () => {
    movedown();
    if (
        hero.getBoundingClientRect().left >
        game.getBoundingClientRect().left + 35
    ) {
        right -= 25;
        hero.style.transform = `translateX(${right}px) scaleX(-1)`;

        console.log("left");
        console.log(hero.getBoundingClientRect().left);
        gameObject.left = false;
    } else if (
        hero.getBoundingClientRect().left <
        game.getBoundingClientRect().left + 35
    ) {
        hero.style.left += 50 + "px";
    }
};

let gameObject = {
    jump: false,
    right: false,
    left: false,
    animate: true,
    enemyExists: false,
    pause: false,
    restart: true,
    // onPlatform: false,
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
    if (!collisionCheck()) {
        console.log("down");
        gameObject.jump = false;
        // console.log("bool for collision", collisionCheck());

        // console.log("mario when jumping", hero.getBoundingClientRect());

        if (!time.start) time.start = now;
        time.elapsed = now - time.start;
        progress = time.elapsed / time.total;
        newPosition = finalPosition * (1 - progress);
        hero.style.bottom = newPosition + 95 + "px";

        // if (gameObject.onPlatform) {
        //     hero.style.bottom =
        //         platform.getBoundingClientRect().bottom - 70 + "px";
        //     console.log(hero.getBoundingClientRect().bottom);
        // }
        if (progress < 1) {
            requestAnimationFrame(movedown);
        } else {
            // if (collisionCheck()) {
            //     hero.style.bottom =
            //         //platform.getBoundingClientRect().bottom - 70 + "px";
            //         platform.getBoundingClientRect().top + "px";
            time.start = 0;
            // }
        }
        done = false;
    } else {
        console.log("up");
    }
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

const createPlatform = () => {
    platform = document.createElement("div");
    platform.setAttribute("id", "brick");
    platform.style.left = Math.random() * 1200 + "px";
    game.appendChild(platform);
    surfaces.push({
        left: platform.getBoundingClientRect().x,
        right: platform.getBoundingClientRect().right,
        top: platform.getBoundingClientRect().top,
    });
};

const createFloor = () => {
    floor = document.createElement("div");
    floor.setAttribute("id", "floor");
    game.appendChild(floor);
    surfaces.push({
        left: floor.getBoundingClientRect().x,
        right: floor.getBoundingClientRect().right,
        top: floor.getBoundingClientRect().top,
    });
};
const createPrizePlatform = () => {
    prizePlatform = document.createElement("div");
    prizePlatform.id = "prizeBrick";
    prizePlatform.style.left = Math.random() * 1200 + "px";
    game.appendChild(prizePlatform);
    surfaces.push({
        left: prizePlatform.getBoundingClientRect().x,
        right: prizePlatform.getBoundingClientRect().right,
        top: prizePlatform.getBoundingClientRect().top,
    });
};

const createCoin = () => {
    coin = document.createElement("div");
    coin.setAttribute("id", "coin");
    prizePlatform.appendChild(coin);
};

const createPipe = () => {
    pipe = document.createElement("div");
    pipe.id = "greenPipe";
    game.appendChild(pipe);
};

const restart = (time) => {
    time = 0;
    hero.style.left = 0 + "px";
    hero.style.bottom = 95 + "px";
};

const pauseMenu = () => {
    menu = document.createElement("div");
    menu.id = "pauseMenu";
    menu.textContent = `PRESS C TO CONTINUE \r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nPRESS R TO RESTART`;
    if (gameObject.pause) {
        if (!paused) {
            game.appendChild(menu);
            paused = true;
        }
    }
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
    } else if (e.key === "p" || e.key === "P") {
        gameObject.pause = true;
    } else if (e.key === "c" || e.key === "C") {
        game.lastChild.remove();
        gameObject.pause = false;
        paused = false;
    }
    // else if (e.key === "r" || e.key === "R") {
    //     gameObject.restart = true;
    // }
};

document.addEventListener("keydown", function (e) {
    control(e);
});

//think about putting these elements in html
createFloor();
createPlatform();
createPrizePlatform();
createCoin();
pauseMenu();
console.log("platform", platform.getBoundingClientRect());
console.log("prizePlatform", prizePlatform.getBoundingClientRect());
console.log("mario", hero.getBoundingClientRect());

const collisionCheck = () =>
    surfaces
        .map((each) => {
            hero.getBoundingClientRect().left >= each.left &&
                hero.getBoundingClientRect().right <= each.right &&
                hero.getBoundingClientRect().bottom < each.top;
        })
        .some((e) => e === true);

// const downOffPlatform = () => {
//     if (!collisionCheck()) {
//         movedown();
//     }
// };

const gameLoop = (timestamp) => {
    if (!gameObject.pause) {
        gameTime++;
        timer.textContent = Math.trunc(120 - gameTime / 10 / 10);
        enemyCounter++;
        if (enemyCounter === 500) {
            createEnemy();
        }
        if (timer.textContent < 50) {
            timer.style.color = "red";
        }
        if (timer.textContent === 50.0) createPipe();
        hero.style.backgroundPosition = `-${position}px 0px`;

        if (gameObject.jump) {
            newJump();
        }

        if (gameObject.right) {
            moveRight(timestamp);
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
    } else {
        pauseMenu();
    }

    if (timer.textContent > 0) {
        requestAnimationFrame(gameLoop);
    }
};

requestAnimationFrame(gameLoop);
