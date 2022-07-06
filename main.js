let position = 99.9;
let right = 100;
let hero = document.getElementById("mario");
function animateScript() {
    hero.style.backgroundPosition = `-${position}px 0px`;

    hero.style.transform = `translateX(${right}px)`;

    requestAnimationFrame(animateScript);
}

console.log(hero.id);

document.addEventListener("keydown", (e) => {
    if (position < 500) {
        if (e.key === "ArrowRight") {
            window.requestAnimationFrame(animateScript);
            position = position + 99.9;
            right += 50;
            console.log("move");
        }
    } else {
        position = 99.9;
    }
});

//
