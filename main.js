//copyright date
const copyright = document.querySelector(".copyright");
const year = new Date().getFullYear();
copyright.textContent = `Copyright © ${year} Amgad Fikry Mohamed`;
//******************************************************************************
//create sounds
const menuSound = document.querySelector(".menu-audio");
const openSound = new Audio("./sound/cinderblockmove-91891.mp3");
const countSound = new Audio("./sound/mixkit-melodic-race-countdown-1955.wav");
const cardSound = new Audio("./sound/page-turn-100277.mp3")
//******************************************************************************
//variables for open gate for game and close gate for game
const exitGate = document.querySelector(".exit-gate");
const exitBtn = document.querySelector(".btn-exit");
const leftGate = document.querySelector(".left-gate");
const rightGate = document.querySelector(".right-gate");
const paragraph = document.querySelector(".exit-gate p");

//click any buttons to start and open game
function open(){
    exitGate.classList.add("index-gate");
    leftGate.classList.add("left-gate-close");
    rightGate.classList.add("right-gate-close");
    paragraph.classList.add("para-active");
    setTimeout(()=>{
        openSound.play();
    },1000);
    setTimeout(()=>{
        paragraph.classList.remove("para-animation");
        menuSound.play();
    },2300);
}
const handler = ["click","keypress"];
handler.forEach(el=>{
    window.addEventListener(el,open);
    setTimeout(()=>{
        window.removeEventListener(el,open);
    },2000);
});

//click on exit btn and close gate and game
exitBtn.addEventListener("click",()=>{
    menuSound.pause();
    openSound.play();
    exitGate.classList.remove("index-gate");
    leftGate.classList.remove("left-gate-close");
    rightGate.classList.remove("right-gate-close");
    paragraph.classList.remove("para-active");
    paragraph.textContent = "Good Bye";
    setTimeout(()=>{
        window.close();
    },4000);
})
//********************************************************************
//setting btn to mute sound and music
const muteBtn = document.querySelector(".sound")

muteBtn.addEventListener("click",()=>{
    if(menuSound.muted){
        menuSound.muted=false;
        muteBtn.children[0].textContent = "ON";
    }
    else{
        menuSound.muted=true;
        muteBtn.children[0].textContent = "OFF";
    }
})
//*************************************************************************
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
//****************************************************************************
/*select level and start game with countdown*/
const containerMenu = document.querySelector(".start-menu")
const levelsBtn = document.querySelectorAll(".level-li")
const wholeMenu = document.querySelector(".menu")
const upperPart = document.querySelector(".upper-part")
const lowerPart = document.querySelector(".lower-part")
const countDisplay = document.querySelector(".counter")
//function to count down
function startCount(){
    let count = 3;
    countSound.play();
    function countFunction (){
        if(count == -1){
            countDisplay.textContent=""
            countDisplay.classList.remove("start-count")
            countDisplay.parentNode.classList.remove("end-count")
            pauseBtn.classList.remove("disabled");
            pauseBtn.removeAttribute("disabled");
            backToMenuBtn[0].classList.remove("disabled");
            backToMenuBtn[0].removeAttribute("disabled")
            clearInterval(countEverySecond)
        }
        else if(count==0){
            countDisplay.textContent = "Go";
            count--
        }
        else if(count>0){
            countDisplay.classList.add("start-count")
            countDisplay.parentNode.classList.add("end-count")
            countDisplay.textContent = count;
            count--
        }
    }
    countFunction();
    let countEverySecond = setInterval(countFunction,999);
}
//add events to all level btns to start game, pause sound, start countdown
levelsBtn.forEach(el=>{
    el.addEventListener("click",()=>{
        startMenu.classList.remove("btn-start-active");
        settingMenu.classList.remove("btn-setting-active");
        wholeMenu.classList.add("new-menu");
        upperPart.classList.add("upper-part-active");
        lowerPart.classList.add("lower-part-active");
        containerMenu.classList.add("hide-menu");
        menuSound.pause();
        menuSound.currentTime= 0;
        setTimeout(()=>{
            openSound.play()
        },1000);
        setTimeout(()=>{
            startCount()
        },2000)
    })
})
//**********************************************************************
//back to menu btn, close gate, add continue option to game
const backToMenuBtn = document.querySelectorAll(".btn-back");
const continueBtn = document.querySelector(".continue")
const pauseBtn = document.querySelector(".btn-pause");
const pauseScreen = document.querySelector(".pause-screen");
const resumeBtn = document.querySelector(".btn-resume");

backToMenuBtn.forEach(el=>{
    el.addEventListener("click",()=>{
        openSound.play();
        wholeMenu.classList.remove("new-menu");
        upperPart.classList.remove("upper-part-active");
        lowerPart.classList.remove("lower-part-active");
        containerMenu.classList.remove("hide-menu");
        continueBtn.classList.add("continue-active");
        setTimeout(()=>{
            menuSound.play();
            pauseScreen.classList.remove("pause-screen-active");
        },2000);
        pauseBtn.classList.add("disabled");
        pauseBtn.setAttribute("disabled", "true")
        backToMenuBtn[0].classList.add("disabled");
        backToMenuBtn[0].setAttribute("disabled", "true")
    })
})

//pause game and resume it
pauseBtn.addEventListener("click",()=>{
    pauseScreen.classList.add("pause-screen-active");
    pauseBtn.classList.add("disabled");
    pauseBtn.setAttribute("disabled", "true")
});
resumeBtn.addEventListener("click",()=>{
    pauseScreen.classList.remove("pause-screen-active");
    pauseBtn.classList.remove("disabled");
    pauseBtn.removeAttribute("disabled");
})
//****************************************************************************
const levelStartBtn = document.querySelectorAll(".level-btn");
const cardContainer = document.querySelector(".main-cards");
let card =[];

//add cards accord to level difficulties

levelStartBtn.forEach(el=>{
    el.addEventListener("click",(e)=>{
        removeChildren()
        gridSystem(el.dataset.level);
        let imgArr = formRandomArray(el.dataset.level);
        makeCards(el.dataset.level);
        addRandomImg(imgArr);

        const cardClass =document.querySelectorAll(".card")
        cardClass.forEach(el=>{
            card.push(el)
        })
        activeCard()
    })
})

//function to add random photo to cards
function addRandomImg (arr){
    let path = "./assets/"
    let extension = ".png"
    for(let i = 0 ; i < arr.length ; i++){
        let fullPath = `${path}${arr[i]}${extension}`
        cardContainer.children[i+2].children[1].children[0].setAttribute("src",fullPath);
        cardContainer.children[i+2].setAttribute(`data-${arr[i]}`, arr[i])
    }
}
//function remove all prevous children
function removeChildren(){
    while (cardContainer.children.length >2) {
        cardContainer.removeChild(cardContainer.lastChild)
    }
}
//function to determine grid system
function gridSystem(num){
    if(num == 20){
        cardContainer.classList.remove("main-cards-six","main-cards-eight")
        cardContainer.classList.add("main-cards-four")
    }
    else if (num == 30){
        cardContainer.classList.remove("main-cards-four","main-cards-eight")
        cardContainer.classList.add("main-cards-six")
    }
    else if(num == 40){
        cardContainer.classList.remove("main-cards-four","main-cards-six")
        cardContainer.classList.add("main-cards-eight")
    }
}
//function to make card elements
function makeCards(num){
    let arr = [];
    for(let i = 0 ; i< num;i++){
        let card = document.createElement("div");
        card.classList.add("card");
        let faceCard = document.createElement("div");
        faceCard.classList.add("face-card");
        let backCard = document.createElement("div");
        backCard.classList.add("back-card");
        let imgFaceCard = document.createElement("img");
        imgFaceCard.setAttribute("src","./assets/question-mark.png");
        let imgBackCard = document.createElement("img");
        faceCard.appendChild(imgFaceCard);
        backCard.appendChild(imgBackCard);
        card.appendChild(faceCard);
        card.appendChild(backCard);
        arr.push(card)
    }
    arr.forEach(el=>{
        cardContainer.appendChild(el)
    })
}
//make array from random number function
function formRandomArray(numberInArray){
    let photosArr = [];
    while (photosArr.length < numberInArray) {
        let randomNum = Math.ceil(Math.random()*39)
        if(!photosArr.includes(randomNum)){
            photosArr.push(randomNum)
            photosArr.push(randomNum)
        }
        else{}
    }
    let arrLenght = photosArr.length;
    let currentindex;
    let finalArr=[]
    while(arrLenght > 0){
        currentindex = Math.floor(Math.random()*arrLenght)
        arrLenght--
        finalArr.push(photosArr[currentindex])
        photosArr.splice(currentindex,1)
    }
    return finalArr
}
//**************************************************************
//add event to cards and sounds + auto flib cards at first


//function add active card and sound of flip
let result = [];
function activeCard(){
    card.forEach(el=>{
        flipCard(el)

    })
}

function flipCard(el){
    el.addEventListener("click",()=>{
        el.classList.add("card-active");
        cardSound.play()
        result.push(el)
        console.log(result)
    })
}