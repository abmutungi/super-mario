let progress = 0;
let newPosition = 0;
let position = 99.9;
let finalPosition = 300;
let time = {
    start: null,
    total: 500,
};
let done = false;
let right = 0;
let jump = 0;
let bottom = 0;
let gravity = 0.9;
let mario = document.getElementById("mario");
let goomba;
let game = document.getElementById("game");
let background = document.querySelector(".sliding-background");
let starttime;
let isJumping = false;
let jumpCount = 0;
let bowserCounter = 0;
let goombaCounter = 0;
let platformCounter = 0;
let prizeCounter = 0;
let goombaLeft = 0;
let fireBall;
let fireLeft = 0;
let marioFireBall;
let marioFireBallLeft = 0;
let marioFireCounter = 10;
let bowser;
let platform;
let princess;
let platformLeft = 0;
let coin;
let redMushroom;
let greenMushroom;
let fireFlower;
let timer;
let currTime = 0;
let score;
let currScore = 0;
let marioY = 0;
let lives;
let currLives = 3;
let marioOpacity = 1;
let gameTime = 0;
let pipe;
let menu;
let leftFacing = false;
let rightFacing = false;
let paused = false;
let surfaces = [];
let randomPrizePicker = 0;

let coinSound = new Audio("sounds/Mario Coin Sound.mp3");
let marioDies = new Audio("sounds/Mario Death - Sound Effect.mp3");
let fireSound = new Audio("sounds/smb_bowserfire.wav");
let goombaBump = new Audio("sounds/smb_bump.wav");
let jumpSound = new Audio("sounds/smb_jump-small.wav");
let pauseSound = new Audio("sounds/smb_pause.wav");
let themeTune = new Audio("sounds/marioT2.mp3");
let prizeAppears = new Audio("sounds/smb_powerup_appears.wav");
let mushroomSound = new Audio("sounds/smb_powerup.wav");
let marioRomano = new Audio("sounds/Mario (Here We Go!).mp3");
let bowserMusic = new Audio(
    "sounds/marioT.mp3"
);

themeTune.volume = 0.5;
fireSound.volume = 0.2;
bowserMusic.volume = 0.2;
const animateScript = () => {
    mario.style.backgroundPosition = `-${position}px 0px`;
    if (
        gameObject.onPlatform &&
        mario.getBoundingClientRect().right - 50 >
            platform.getBoundingClientRect().right
    ) {
        gameObject.onPlatform = false;
        mario.style.bottom = 95 + "px";
        //mario.style.transform = `translateY(-95px)`
    }
};

// const createFloor = () => {
//     floor = document.createElement("div");
//     floor.setAttribute("id", "floor");
//     game.appendChild(floor);
// };

const marioGrow = (newScale) => {
    mario.style.transform = mario.style.transform.replace(
        /scale\([0-9|\.]*\)/,
        "scale(" + newScale + ")"
    );
    console.log("mario grow");
};

const changeScale = (newScale) => {
    let curTrans = mario.style.transform;
    let newScaleString = "scale(" + newScale + ")";
    let regex = /scale\([0-9|\.]*\)/;
    let newTrans = curTrans.replace(regex, newScaleString);
    mario.style.transform = newTrans;
    console.log("change scale");
};

const showTimer = () => {
    timer = document.createElement("div");
    timer.id = "timer";
    timer.textContent = `TIME:${currTime}`;
    timer.innerHTML = gameTime;
    game.appendChild(timer);
};

const showScore = () => {
    score = document.createElement("div");
    score.id = "score";
    score.textContent = `SCORE: ${currScore}`;
    game.appendChild(score);
};

const showLives = () => {
    lives = document.createElement("div");
    lives.id = "lives";
    lives.textContent = `LIVES: ${currLives}`;
    game.appendChild(lives);
};

showTimer();
showScore();
showLives();
//createFloor();

const moveRight = (timestamp) => {
    if (
        mario.getBoundingClientRect().right <
        game.getBoundingClientRect().right - 35
    ) {
        right += 25;
        mario.style.transform = `translateX(${right}px)`;
        console.log(mario.classList);

        //console.log("right");
        // console.log("mario left, ", mario.getBoundingClientRect());
        gameObject.right = false;
    } else if (
        mario.getBoundingClientRect().right >=
        game.getBoundingClientRect().right - 35
    ) {
        mario.style.left -= 50 + "px";
    }
    if (
        gameObject.onPlatform &&
        mario.getBoundingClientRect().right - 50 >
            platform.getBoundingClientRect().right
    ) {
        gameObject.onPlatform = false;
        mario.style.bottom = 95 + "px";
        //mario.style.transform = `translateY(-95px)`
    }
    if (
        gameObject.onPrize &&
        mario.getBoundingClientRect().right - 50 >
            prizePlatform.getBoundingClientRect().right &&
        !platformInlineCheck()
    ) {
        gameObject.onPrize = false;
        mario.style.bottom = 95 + "px";
        //mario.style.transform = `translateY(-95px)`
    } else if (
        gameObject.onPrize &&
        mario.getBoundingClientRect().right - 50 >
            prizePlatform.getBoundingClientRect().right &&
        platformInlineCheck()
    ) {
        gameObject.onPrize = false;
        gameObject.onPlatform = true;
        mario.style.bottom = platform.getBoundingClientRect().bottom - 70 + "px";
    }
};

const moveLeft = () => {
    if (
        mario.getBoundingClientRect().left >
        game.getBoundingClientRect().left + 35
    ) {
        right -= 25;
        mario.style.transform = `translateX(${right}px) scaleX(-1)`;

        //console.log("left");
        //console.log(mario.getBoundingClientRect().left);
        gameObject.left = false;
    } else if (
        mario.getBoundingClientRect().left <
        game.getBoundingClientRect().left + 35
    ) {
        mario.style.left += 50 + "px";
    }

    if (
        gameObject.onPlatform &&
        mario.getBoundingClientRect().left + 50 <
            platform.getBoundingClientRect().left
    ) {
        gameObject.onPlatform = false;
        mario.style.bottom = 95 + "px";
    }

    if (
        gameObject.onPrize &&
        mario.getBoundingClientRect().left + 50 <
            prizePlatform.getBoundingClientRect().left &&
        !platformInlineCheck()
    ) {
        gameObject.onPrize = false;
        mario.style.bottom = 95 + "px";
        //mario.style.transform = `translateY(-95px)`
    } else if (
        gameObject.onPrize &&
        mario.getBoundingClientRect().left + 50 <
            prizePlatform.getBoundingClientRect().left &&
        platformInlineCheck()
    ) {
        gameObject.onPrize = false;
        gameObject.onPlatform = true;
        mario.style.bottom = platform.getBoundingClientRect().bottom - 70 + "px";
    }
};

let gameObject = {
    jump: false,
    right: false,
    left: false,
    animate: true,
    goombaExists: false,
    platformExists: false,
    pause: false,
    restart: false,
    onPlatform: false,
    onPrize: false,
    coinExists: false,
    redMushroomExists: false,
    greenMushroomExists: false,
    fireFlowerExists: false,
    marioCanShoot: false,
    marioShooting: false,
    bowserExists: false,
};

const moveup = (now) => {
    // if (marioUnderPlatform()) 
    if (gameObject.jump && !gameObject.onPlatform && !gameObject.onPrize) {
        //isJumping = true

        if (!time.start) time.start = now;
        time.elapsed = now - time.start;
        progress = time.elapsed / time.total;
        newPosition = progress * finalPosition;
        mario.style.bottom = newPosition + 95 + "px";
        if (progress < 1 && !marioUnderPlatform()) {
            if (!done) {
                jumpSound.play();
                requestAnimationFrame(moveup);
                done = false;
            }
        } else {
            time.start = null;
            gameObject.jump = false;
            requestAnimationFrame(movedown);
            done = true;
        }
    } else if (gameObject.onPlatform) {
        marioY = platform.getBoundingClientRect().top + 100;

        console.log("----------------------------newPosition => ", newPosition);
        if (!time.start) time.start = now;
        console.log("time.start=> ", time.start);
        time.elapsed = now - time.start;
        console.log("time.elapsed => ", time.elapsed);
        progress = time.elapsed / time.total;
        console.log("progress => ", progress);
        newPosition = progress * finalPosition;
        console.log("marioY => ", marioY);
        console.log("mario bottom => ", mario.style.bottom);
        mario.style.bottom = marioY + newPosition + "px";
        if (progress < 0.4) {
            if (!done) {
                jumpSound.play();
                requestAnimationFrame(moveup);
                done = false;
            }
        } else {
            gameObject.onPlatform = false;
            time.start = null;
            requestAnimationFrame(movedown);
            gameObject.jump = false;
            done = true;
        }
    }
};

const movedown = (now) => {
    if (!gameObject.onPlatform && !gameObject.onPrize) {
        gameObject.jump = false;
        //console.log("bool for collision", collisionCheck());

        // console.log("mario when jumping", mario.getBoundingClientRect());

        if (!time.start) time.start = now;
        time.elapsed = now - time.start;
        progress = time.elapsed / time.total;
        newPosition = finalPosition * (1 - progress);
        mario.style.bottom = newPosition + 95 + "px";

        if (progress < 1 && !onplatformCheck() && !onprizeCheck()) {
            requestAnimationFrame(movedown);
        } else {
            if (gameObject.onPlatform) {
                mario.style.bottom =
                    platform.getBoundingClientRect().bottom - 70 + "px";
                // } else if (gameObject.onPrize) {
                //     mario.style.bottom =
                //         prizePlatform.getBoundingClientRect().bottom - 70 + "px";
            }
            time.start = null;
        }
        done = false;
    } else if (gameObject.onPlatform) {
        mario.style.bottom = platform.getBoundingClientRect().bottom - 70 + "px";
        console.log(mario.getBoundingClientRect().bottom);
    } else if (gameObject.onPrize) {
        mario.style.bottom =
            prizePlatform.getBoundingClientRect().top + 120 + "px";
    }
};

const newJump = () => {
    requestAnimationFrame(moveup);
};

const createGoomba = () => {
    goomba = document.createElement("div");
    goomba.setAttribute("id", "goomba");
    goomba.style.left = 1200 + "px";
    goombaCounter = 0;
    console.log("============== CREATING goomba =============");
    game.appendChild(goomba);
    gameObject.goombaExists = true;
};

const createBowser = () => {
    bowser = document.createElement("div");
    bowser.setAttribute("id", "bowser");
    bowser.style.left = 700 + "px";
    bowserCounter = 0;
    console.log("============== CREATING BOWSER =============");
    game.appendChild(bowser);
    gameObject.bowserExists = true;
};

const createFire = () => {
    fireBall = document.createElement("div");
    fireBall.setAttribute("id", "fire");
    fireBall.style.left = 700 + "px";
    console.log("============== BOWSER SHOOTS FIRE =============");
    game.appendChild(fireBall);
};

const createMarioFire = () => {
   
    marioFireBall = document.createElement("div");
    marioFireBall.id = "marioFire";
    marioFireBall.style.left = mario.style.left + 10 + "px" ;
    marioFireBall.style.bottom = 0 + "px" 
    gameObject.marioCanShoot = true;   
    mario.appendChild(marioFireBall);


}

const breatheFire = () => {
    fireLeft -= 20;

    fireBall.style.transform = `translateX(${fireLeft}px) scaleX(-1)`;
    fireSound.play();

    if (fireCollisionCheck() === true) {
        fireLeft = 0;
        gameObject.goombaExists = false;
        marioOpacity -= 0.25;

        mario.style.opacity = marioOpacity;
        currLives -= 1;
        currScore -= 10;
        lives.textContent = `LIVES: ${currLives}`;
        score.textContent = `SCORE:${currScore}`;
    } else if (bowserCounter === 2) {
        fireLeft = 0;
        fireBall.remove();
        bowser.remove();
        gameObject.bowserExists = false;
        currScore += 50;
        score.textContent = `SCORE:${currScore}`;
    } else if (
        fireBall.getBoundingClientRect().left <
            game.getBoundingClientRect().left &&
        gameObject.bowserExists
    ) {
        fireLeft = 0;
        fireBall.remove();
        gameObject.bowserExists = false;
    }
};

const marioBreatheFire = () => {
   
    if (gameObject.marioShooting){

        marioFireBallLeft += 20;
    
        marioFireBall.style.transform = `translateX(${marioFireBallLeft}px) scaleX(-1)`;
        fireSound.play();

        if (goombaFireCollisionCheck()){
            marioFireBallLeft = 0;
            marioFireBall.remove();
            goombaLeft = 0;
        goomba.remove();
        gameObject.goombaExists = false;
        
            gameObject.marioShooting = false;
            if (marioFireCounter > 0) {
                createMarioFire();
            }else{
                gameObject.marioCanShoot = false;
            }
        
        }else if (marioFireBall.getBoundingClientRect().left >
        game.getBoundingClientRect().right || marioFireBall.getBoundingClientRect().left < game.getBoundingClientRect().left){
            marioFireBallLeft = 0;
            marioFireBall.remove()
            gameObject.marioShooting = false;
            
               if (marioFireCounter > 0){

                   createMarioFire();
               }else{
                gameObject.marioCanShoot = false;
               }
           
            
            
        }
        
    }
     
}

const createPrincess = () => {
    princess = document.createElement("div");
    princess.setAttribute("id", "princess");
    princess.style.left = 850 + "px";
    game.appendChild(princess);
};

const createPlatform = () => {
    platform = document.createElement("div");
    platform.setAttribute("id", "brick");
    platform.style.left = 1400 + "px";
    platformCounter = 0;
    game.appendChild(platform);
    gameObject.platformExists = true;
    // surfaces.push({
    //   left: platform.getBoundingClientRect().left,
    //   right: platform.getBoundingClientRect().right,
    //   top: platform.getBoundingClientRect().top,
    // })
};

const movePlatform = () => {
    platformLeft -= 2;

    platform.style.transform = `translateX(${platformLeft}px) scaleX(-1)`;

    if (
        platform.getBoundingClientRect().right <
            game.getBoundingClientRect().left &&
        gameObject.platformExists
    ) {
        platformLeft = 0;
        platform.remove();
        gameObject.platformExists = false;
    }

    // if (gameObject.onPlatform && !collisionCheck()){
    //   mario.style.bottom = 95 + 'px';
    // }
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
    prizeCounter = 0;
    prizePlatform.appendChild(coin);
    gameObject.coinExists = true;
};

const createRedMushroom = () => {
    redMushroom = document.createElement("div");
    redMushroom.id = "redMushroom";
    prizeCounter = 0;
    prizePlatform.appendChild(redMushroom);
    gameObject.redMushroomExists = true;
};

const createGreenMushroom = () => {
    greenMushroom = document.createElement("div");
    greenMushroom.id = "greenMushroom";
    prizeCounter = 0;
    prizePlatform.appendChild(greenMushroom);
    gameObject.greenMushroomExists = true;
};

const createFireFlower = () => {
    fireFlower = document.createElement("div");
    fireFlower.id = "fireFlower";
    prizeCounter = 0;
    prizePlatform.appendChild(fireFlower);
    gameObject.fireFlowerExists = true;
}

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

const moveGoomba = () => {
    goombaLeft -= 6;

    goomba.style.transform = `translateX(${goombaLeft}px) scaleX(-1)`;
    if (goombaCollisionCheck() === true) {
        goombaLeft = 0;
        goomba.remove();
        gameObject.goombaExists = false;
        marioOpacity -= 0.25;
        if (mario.classList.length === 2){
            mario.classList.toggle("normal")
        }
      
        mario.style.opacity = marioOpacity;
        currLives -= 1;
        currScore -= 5;
        lives.textContent = `LIVES: ${currLives}`;
        score.textContent = `SCORE:${currScore}`;
    } else if (goombaKill()) {
        goombaLeft = 0;
        goomba.remove();
        gameObject.goombaExists = false;
        currScore += 10;
        score.textContent = `SCORE:${currScore}`;
    } else if (
        goomba.getBoundingClientRect().left <
            game.getBoundingClientRect().left &&
        gameObject.goombaExists
    ) {
        goombaLeft = 0;
        goomba.remove();
        gameObject.goombaExists = false;
    }
};

const goombaCollisionCheck = () => {
    if (gameObject.goombaExists) {
        if (
            goomba.getBoundingClientRect().left <
                mario.getBoundingClientRect().right &&
            goomba.getBoundingClientRect().left >
                mario.getBoundingClientRect().left &&
            mario.getBoundingClientRect().bottom >= 614
        ) {
            console.log("HIT");
            return true;
        }
    }
    return false;
};

const goombaKill = () => {
    if (gameObject.goombaExists) {
        if (
            (mario.getBoundingClientRect().left <=
                goomba.getBoundingClientRect().left &&
                mario.getBoundingClientRect().right >=
                    goomba.getBoundingClientRect().left &&
                mario.getBoundingClientRect().bottom >=
                    goomba.getBoundingClientRect().top - 5) ||
            (mario.getBoundingClientRect().left <=
                goomba.getBoundingClientRect().right &&
                mario.getBoundingClientRect().right >=
                    goomba.getBoundingClientRect().right &&
                mario.getBoundingClientRect().bottom >=
                    goomba.getBoundingClientRect().top - 5)
        ) {
            goombaBump.play();
            console.log("GOOMBA KILL");
            return true;
        }
        return false;
    }
};

const fireCollisionCheck = () => {
    if (gameObject.bowserExists) {
        if (
            fireBall.getBoundingClientRect().left <
                mario.getBoundingClientRect().right &&
            fireBall.getBoundingClientRect().left >
                mario.getBoundingClientRect().left &&
            mario.getBoundingClientRect().bottom >= 614
        ) {
            console.log("mario flamesed");
            return true;
        }
    }
    return false;
};

const goombaFireCollisionCheck = () => {
    if (gameObject.marioShooting){
        if (
            marioFireBall.getBoundingClientRect().left <
                goomba.getBoundingClientRect().left &&
            marioFireBall.getBoundingClientRect().right >
                goomba.getBoundingClientRect().left &&
                marioFireBall.getBoundingClientRect().bottom > goomba.getBoundingClientRect().top
        ) {
            console.log("mario flamesed");
            return true;
        }
        return false; 
    }
    }


const bowserHit = () => {
    if (gameObject.bowserExists) {
        if (
            (mario.getBoundingClientRect().left <=
                bowser.getBoundingClientRect().left &&
                mario.getBoundingClientRect().right >=
                    bowser.getBoundingClientRect().left &&
                mario.getBoundingClientRect().bottom >=
                    bowser.getBoundingClientRect().top - 5) ||
            (mario.getBoundingClientRect().left <=
                bowser.getBoundingClientRect().right &&
                mario.getBoundingClientRect().right >=
                    bowser.getBoundingClientRect().right &&
                mario.getBoundingClientRect().bottom >=
                    bowser.getBoundingClientRect().top - 5)
        ) {
            bowserCounter += 1;
            console.log("Bowser Hit", bowserCounter);
        }
        return false;
    }
};

const coinCollect = () => {
    if (gameObject.coinExists) {
        if (
            (mario.getBoundingClientRect().left <=
                coin.getBoundingClientRect().left &&
                mario.getBoundingClientRect().right >=
                    coin.getBoundingClientRect().left &&
                gameObject.onPrize) ||
            (mario.getBoundingClientRect().left <=
                coin.getBoundingClientRect().right &&
                mario.getBoundingClientRect().right >=
                    coin.getBoundingClientRect().right &&
                gameObject.onPrize)
        ) {
            coin.remove();
            coinSound.play();
            prizeCounter = 0;
            currScore += 10;
            score.textContent = `SCORE:${currScore}`;
            gameObject.coinExists = false;
        }
    }
};

const redMushroomCollect = () => {
    if (gameObject.redMushroomExists) {
        if (
            (mario.getBoundingClientRect().left <=
                redMushroom.getBoundingClientRect().left &&
                mario.getBoundingClientRect().right >=
                    redMushroom.getBoundingClientRect().left &&
                gameObject.onPrize) ||
            (mario.getBoundingClientRect().left <=
                redMushroom.getBoundingClientRect().right &&
                mario.getBoundingClientRect().right >=
                    redMushroom.getBoundingClientRect().right &&
                gameObject.onPrize)
        ) {
            redMushroom.remove();
            mushroomSound.play();
            prizeCounter = 0;
            console.log(mario.classList);
            if (mario.classList.length === 1){

                mario.classList.toggle("normal");
            }
            console.log(mario.classList);
            // marioGrow(10);
            //changeScale(8);
            gameObject.redMushroomExists = false;
        }
    }
};

const greenMushroomCollect = () => {
    if (gameObject.greenMushroomExists) {
        if (
            (mario.getBoundingClientRect().left <=
                greenMushroom.getBoundingClientRect().left &&
                mario.getBoundingClientRect().right >=
                    greenMushroom.getBoundingClientRect().left &&
                gameObject.onPrize) ||
            (mario.getBoundingClientRect().left <=
                greenMushroom.getBoundingClientRect().right &&
                mario.getBoundingClientRect().right >=
                    greenMushroom.getBoundingClientRect().right &&
                gameObject.onPrize)
        ) {
            greenMushroom.remove();
            mushroomSound.play();
            prizeCounter = 0;
            currLives += 1;
            mario.style.opacity = 1;
            lives.textContent = `LIVES: ${currLives}`;
            gameObject.greenMushroomExists = false;
        }
    }
};

const fireFlowerCollect = () => {
    if (gameObject.fireFlowerExists){
        if (
            (mario.getBoundingClientRect().left <=
                fireFlower.getBoundingClientRect().left &&
                mario.getBoundingClientRect().right >=
                    fireFlower.getBoundingClientRect().left &&
                gameObject.onPrize) ||
            (mario.getBoundingClientRect().left <=
                fireFlower.getBoundingClientRect().right &&
                mario.getBoundingClientRect().right >=
                    fireFlower.getBoundingClientRect().right &&
                gameObject.onPrize)
        ) {
            fireFlower.remove();
            mushroomSound.play();
            prizeCounter = 0;
            marioFireCounter = 10;
            createMarioFire();
            gameObject.fireFlowerExists = false;
            
            
        } 
    }
}

const platformInlineCheck = () => {
    if (
        (platform.getBoundingClientRect().left <
            prizePlatform.getBoundingClientRect().left &&
            platform.getBoundingClientRect().right >=
                prizePlatform.getBoundingClientRect().left) ||
        (platform.getBoundingClientRect().left <=
            prizePlatform.getBoundingClientRect().right &&
            platform.getBoundingClientRect().right >
                prizePlatform.getBoundingClientRect().right)
    ) {
        console.log("platforms are in line");
        return true;
    }
    return false;
};

const marioUnderPlatform = () => {
    if (
        (mario.getBoundingClientRect().left <
            platform.getBoundingClientRect().left &&
            mario.getBoundingClientRect().right >=
                platform.getBoundingClientRect().left) ||
        (mario.getBoundingClientRect().left <=
            platform.getBoundingClientRect().right &&
            mario.getBoundingClientRect().right >
                platform.getBoundingClientRect().right)
    ) {
        console.log("mario under platform");
        return true;
    }
    console.log("mario walking");
    return false;
};

const control = (e) => {
    e.preventDefault();
    if (position < 250) {
        position = position + 99.9;
    } else {
        position = 99.9;
    }
    if (e.key === " " || e.key === "ArrowUp") {
        if (!gameObject.onPrize)
        gameObject.jump = true;
    } else if (e.key === "ArrowLeft") {
        leftFacing = true;
        rightFacing = false;
        gameObject.left = true;
    } else if (e.key === "ArrowRight") {
        leftFacing = false;
        rightFacing= true;
        gameObject.right = true;
    } else if (e.key === "p" || e.key === "P") {
        gameObject.pause = true;
        pauseSound.play();
    } else if (e.key === "c" || e.key === "C") {
        if (gameObject.pause) {
            game.lastChild.remove();
            gameObject.pause = false;
            paused = false;
        }
    } else if (e.key === "r" || e.key === "R") {
        if (gameObject.pause) {
           
            location.reload();
        }
    }else if (e.key === "f" || e.key === "F"){
        if (gameObject.marioCanShoot && !gameObject.marioShooting){
            
                
                gameObject.marioShooting = true;
                marioFireCounter --
                console.log("marioFireCounter => ",marioFireCounter);
                
           
            }
        }
    };


document.addEventListener("keydown", function (e) {
    control(e);
});
createPlatform();
createPrizePlatform();

const prizeGenerator = () => {
    randomPrizePicker = Math.random() * 4;   
    if (randomPrizePicker < 1 ) createCoin();
    if (randomPrizePicker >= 1 && randomPrizePicker < 2 ) createGreenMushroom();
    if (randomPrizePicker >= 2 && randomPrizePicker < 3 ) createRedMushroom();
    if (randomPrizePicker >= 3 && !gameObject.marioCanShoot) createFireFlower();
    console.log("---*******-----", randomPrizePicker);
    prizeAppears.play();
};

const onplatformCheck = () => {
    if (
        mario.getBoundingClientRect().left >=
            platform.getBoundingClientRect().left &&
        mario.getBoundingClientRect().right <=
            platform.getBoundingClientRect().right &&
        mario.getBoundingClientRect().bottom <
            platform.getBoundingClientRect().top
    ) {
        gameObject.onPlatform = true;

        console.log("HE'S ON THE PLATFORM");
        return true;
    }
    return false;
};

const onprizeCheck = () => {
    if (
        mario.getBoundingClientRect().left >=
            prizePlatform.getBoundingClientRect().left &&
        mario.getBoundingClientRect().right <=
            prizePlatform.getBoundingClientRect().right &&
        mario.getBoundingClientRect().bottom <
            prizePlatform.getBoundingClientRect().top
    ) {
        gameObject.onPrize = true;

        console.log("HE'S ON THE PRIZE PLATFORM");
        return true;
    }
    return false;
};

const gameLoop = (timestamp) => {
    themeTune.play();
    if (!gameObject.pause) {
        gameTime++;
        currTime = Math.trunc(120 - gameTime / 10 / 10);
        timer.textContent = `TIME: ${currTime}`;
        goombaCounter++;
        platformCounter++;
        prizeCounter++;

        if (
            currScore > 50 &&
            gameTime > 60 &&
            !gameObject.bowserExists &&
            bowserCounter < 3
        ) {
            createFire();
            createBowser();
            createPrincess();
            console.log("change background");
            background.style.animation = "slide 1s linear infinite";

            
        }
        if (gameTime === 116) {
            marioRomano.play();
        }

        if (goombaCounter === 500) {
            createGoomba();
        }
        if (platformCounter === 1000) {
            createPlatform();
        }
        if (
            prizeCounter === 500 &&
            !gameObject.coinExists &&
            !gameObject.redMushroomExists &&
            !gameObject.greenMushroomExists &&
            !gameObject.fireFlowerExists

        ) {
            prizeGenerator();
        }
        if (timer.textContent < 50) {
            timer.style.color = "red";
        }
        if (timer.textContent === 50.0) createPipe();
        mario.style.backgroundPosition = `-${position}px 0px`;

        if (gameObject.jump) {
            onplatformCheck();
            onprizeCheck();
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

        if (gameObject.goombaExists) {
            moveGoomba();
        }

        if (gameObject.bowserExists) {
            themeTune.volume = 0;
            bowserMusic.play();
            breatheFire();
        }

        if (gameObject.platformExists) {
            movePlatform();
        }

        if (gameObject.coinExists) {
            coinCollect();
        }

        if (currLives === 0) {
            marioDies.play();
        }

        if (gameObject.redMushroomExists) {
            redMushroomCollect();
        }

        if (gameObject.greenMushroomExists) {
            greenMushroomCollect();
        }

        if (gameObject.fireFlowerExists){
            fireFlowerCollect();
        }

        if (gameObject.marioShooting){
            marioBreatheFire();
        }
        
    } else {
        pauseMenu();
    }

    if (currTime > 0 && currLives > 0) {
        requestAnimationFrame(gameLoop);
    }
};

requestAnimationFrame(gameLoop);
