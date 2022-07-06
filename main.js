let position = 99.9;
let right = 100;
let jump = -50;
let hero = document.getElementById("mario");
function animateLateral() {
    hero.style.backgroundPosition = `-${position}px 0px`;

    hero.style.transform = `translateX(${right}px)`;
    //hero.style.transform = `translateY(${jump}px)`;


    //requestAnimationFrame(animateLateral);
}

function animateMedial(){
    hero.style.backgroundPosition = `-${position}px 0px`;
    //hero.style.top = jump
     hero.style.transform = `translateY(${jump}px)`;
    requestAnimationFrame(animateMedial);

}

console.log(hero.id);

document.addEventListener("keydown", (e) => {
    if (position < 500) {
        position = position + 99.9;
    } else {
        position = 99.9;
    }
        if (e.key === "ArrowRight") {
            window.requestAnimationFrame(animateLateral);
            
            right += 50;
            console.log("move");
            
        }
        if (e.key === "ArrowLeft"){
            window.requestAnimationFrame(animateLateral);
            //position = position + 99.9;
            right -= 50;
        }
        if (e.key === " "){
            hero.style.left = right
            window.requestAnimationFrame(animateMedial);
            jump -= 50;


        }
        
    
});

//
