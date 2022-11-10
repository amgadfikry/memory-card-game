//copyright date
const copyright = document.querySelector(".copyright")
const year = new Date().getFullYear()
copyright.textContent = `Copyright © ${year} Amgad Fikry Mohamed`

//create sounds
const menuSound = new Audio("sound/drum.mp3")

window.addEventListener("load",()=>{
    menuSound.play()
    menuSound.loop = true
})

/*open and close start and setting menu*/
const startBtn = document.querySelector(".btn-start");
const startMenu = document.querySelector(".level");
const settingBtn =document.querySelector(".btn-setting");
const settingMenu = document.querySelector(".setting-list");

startBtn.addEventListener("click",()=>{
    startMenu.classList.toggle("btn-start-active");
})

settingBtn.addEventListener("click",()=>{
    settingMenu.classList.toggle("btn-setting-active");
})

/*open menu when click start levels*/
const containerMenu = document.querySelector(".start-menu")
const levelsBtn = document.querySelectorAll(".level-li")
const wholeMenu = document.querySelector(".menu")
const upperPart = document.querySelector(".upper-part")
const lowerPart = document.querySelector(".lower-part")

levelsBtn.forEach(el=>{
    el.addEventListener("click",()=>{
        menuSound.pause();
        startMenu.classList.remove("btn-start-active");
        settingMenu.classList.remove("btn-setting-active");
        wholeMenu.classList.add("new-menu")
        upperPart.classList.add("upper-part-active")
        lowerPart.classList.add("lower-part-active")
        containerMenu.classList.add("hide-menu")
    })
})

//back to menu btn
const backToMenuBtn = document.querySelector(".btn-back");


backToMenuBtn.addEventListener("click",()=>{
    wholeMenu.classList.remove("new-menu")
    upperPart.classList.remove("upper-part-active")
    lowerPart.classList.remove("lower-part-active")
    containerMenu.classList.remove("hide-menu")
    setTimeout(()=>{
        menuSound.play()
    },2000)
})
//exit btn
const exitBtn = document.querySelector(".btn-exit");
const leftGate = document.querySelector(".left-gate");
const rightGate = document.querySelector(".right-gate");
const paragraph = document.querySelector(".exit-gate p");

exitBtn.addEventListener("click",()=>{
    leftGate.parentNode.classList.add("index-gate")
    leftGate.classList.add("left-gate-close")
    rightGate.classList.add("right-gate-close")
    paragraph.classList.add("para-active")
    setTimeout(()=>{
        window.close()
    },4000)
})
