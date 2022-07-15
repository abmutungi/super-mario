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
let coin;
let timer;
let gameTime = 0;
let pipe;
let menu;
let leftC = false;
let rightC = false;
let paused = false;
const animateScript = () => {
    hero.style.backgroundPosition = `-${position}px 0px`;
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
    if (
        hero.getBoundingClientRect().right <
        game.getBoundingClientRect().right - 35
        
        
    ) {
        right += 25;
        hero.style.transform = `translateX(${right}px)`;

        console.log("right");
        console.log("hero left, ",hero.getBoundingClientRect());
        gameObject.right = false;
    } else if (hero.getBoundingClientRect().right >=
    game.getBoundingClientRect().right - 35){
        hero.style.left -= 50 + "px";
    }
    if (gameObject.onPlatform && hero.getBoundingClientRect().right - 50 > platform.getBoundingClientRect().right){
        gameObject.onPlatform = false;
        hero.style.bottom = 95 + 'px'
        //hero.style.transform = `translate(${right},95px)`
    }

    // if (
    //     hero.getBoundingClientRect().x <
    //         platform.getBoundingClientRect().x +
    //             platform.getBoundingClientRect().width &&
    //     hero.getBoundingClientRect().x + hero.getBoundingClientRect().width >
    //         platform.getBoundingClientRect().x &&
    //     hero.getBoundingClientRect().y <
    //         platform.getBoundingClientRect().y +
    //             platform.getBoundingClientRect().height &&
    //     hero.getBoundingClientRect().y + hero.getBoundingClientRect().height >
    //         platform.getBoundingClientRect().y
    // ) {
    //     console.log("r collision");
    //     rightC = true;
    //     gameObject.onPlatform = true;
    // }else{
    //     gameObject.onPlatform = false;
    //     movedown();
    // }
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
    } else if (hero.getBoundingClientRect().left <
    game.getBoundingClientRect().left + 35) {
        hero.style.left += 50 + "px";
    }

    if (gameObject.onPlatform && hero.getBoundingClientRect().left + 50 < platform.getBoundingClientRect().left){
        gameObject.onPlatform = false;
        hero.style.bottom = 95 + 'px'
       //hero.style.transform = `translateY(95px)`
        // hero.style.translate = `translateY(95px)`
    }

    // if (
    //     hero.getBoundingClientRect().x <
    //         platform.getBoundingClientRect().x +
    //             platform.getBoundingClientRect().width &&
    //     hero.getBoundingClientRect().x + hero.getBoundingClientRect().width >
    //         platform.getBoundingClientRect().x &&
    //     hero.getBoundingClientRect().y <
    //         platform.getBoundingClientRect().y +
    //             platform.getBoundingClientRect().height &&
    //     hero.getBoundingClientRect().y + hero.getBoundingClientRect().height >
    //         platform.getBoundingClientRect().y
    // ) {
    //     console.log("l collision");
    //     leftC = true;
    //     gameObject.onPlatform = true;
    // }else{
    //     gameObject.onPlatform = false;
    //     movedown();
    // }
};

let gameObject = {
    jump: false,
    right: false,
    left: false,
    animate: true,
    enemyExists: false,
    pause: false,
    restart: true,
    onPlatform: false,
};

const moveup = (now) => {
    if (gameObject.jump && !gameObject.onPlatform) {
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
    }else if (gameObject.onPlatform){
        
        if (progress < 1) {
            if (!done) {
                gameObject.onPlatform = false;
                requestAnimationFrame(moveup);
                done = false;
            }
        } else {
            gameObject.onPlatform = false;
            time.start = 0;
            requestAnimationFrame(movedown);
            gameObject.jump = false;
            done = true;
        }
    }

    // if (
    //     hero.getBoundingClientRect().x <
    //         platform.getBoundingClientRect().x +
    //             platform.getBoundingClientRect().width &&
    //     hero.getBoundingClientRect().x + hero.getBoundingClientRect().width >
    //         platform.getBoundingClientRect().x &&
    //     hero.getBoundingClientRect().y <
    //         platform.getBoundingClientRect().y +
    //             platform.getBoundingClientRect().height &&
    //     hero.getBoundingClientRect().y + hero.getBoundingClientRect().height >
    //         platform.getBoundingClientRect().y
    // ) {
    //     console.log("u collision");
    //     if (leftC & rightC) gameObject.onPlatform = true;
    // }
};

const movedown = (now) => {
    if (!gameObject.onPlatform){
    gameObject.jump = false;
    console.log("bool for collision",collisionCheck());
    

   // console.log("mario when jumping", hero.getBoundingClientRect());

    if (!time.start) time.start = now;
    time.elapsed = now - time.start;
    progress = time.elapsed / time.total;
    newPosition = finalPosition * (1 - progress);
    hero.style.bottom = newPosition + 95 + "px";

    if (gameObject.onPlatform) {
        hero.style.bottom = platform.getBoundingClientRect().bottom - 70 + "px";
        console.log(hero.getBoundingClientRect().bottom);
    }
    if (progress < 1 && !collisionCheck()) {
        requestAnimationFrame(movedown);
    } else {
        if (gameObject.onPlatform){
            
            hero.style.bottom = platform.getBoundingClientRect().bottom -70 +'px'
            
        }
        time.start = 0;
    }
    done = false;
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
};
const createPrizePlatform = () => {
    prizePlatform = document.createElement("div");
    prizePlatform.id = "prizeBrick";
    prizePlatform.style.left = Math.random() * 1200 + "px";
    game.appendChild(prizePlatform);
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
    menu.textContent = `PRESS C TO CONTINUE \r\n\r\n\r\nPRESS R TO RESTART`;
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
createPlatform();
createPrizePlatform();
createCoin();
pauseMenu();
console.log("platform",platform.getBoundingClientRect());
const collisionCheck = () =>{

    if (hero.getBoundingClientRect().left >= platform.getBoundingClientRect().left
    && hero.getBoundingClientRect().right <= platform.getBoundingClientRect().right
    && hero.getBoundingClientRect().bottom < platform.getBoundingClientRect().top
    ){
        gameObject.onPlatform = true;
        
        console.log("HE'S ON THE PLATFORM");
        return true
    }
return false
}

const downOffPlatform = () => {
    if (gameObject.onPlatform && !collisionCheck()){
        movedown();
    }
}



const gameLoop = (timestamp) => {
    if (!gameObject.pause) {
        gameTime++;
        timer.textContent = Math.trunc(120 - (gameTime / 10 / 10));
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
