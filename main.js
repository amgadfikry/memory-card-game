//copyright date year
//variable of copyright section
const copyright = document.querySelector(".copyright");
//variable to get year
const year = new Date().getFullYear();
//add year and text to copyright section
copyright.textContent = `Copyright © ${year} Amgad Fikry Mohamed`;
//******************************************************************************//

//variables of soundeffects and music of intro

//menu music
const menuSound = document.querySelector(".menu-audio");
//sound of open, close, start game
const openSound = new Audio("./sound/cinderblockmove-91891.mp3");
//sound of countdown start of game
const countSound = new Audio("./sound/mixkit-melodic-race-countdown-1955.wav");
//sound of flip cards
const cardSound = new Audio("./sound/flib-card.mp3")
//sound of success of matching cards
const correctMatch = new Audio("./sound/correct.mp3")
//sound if failure of matching cards
const wrongMatch = new Audio("./sound/failure.mp3")
//sound of mission complete
const missionComplete = new Audio("./sound/mission-complete.mp3")

//********************************************************************************//

//variables for all contents of game

//variable for section of start and exit game
const exitGate = document.querySelector(".exit-gate");
//variable for exit button in menu
const exitBtn = document.querySelector(".btn-exit");
//variable of left gate of exit section
const leftGate = document.querySelector(".left-gate");
//variable of right gate of exit section
const rightGate = document.querySelector(".right-gate");
//variable of paragraph of goodbye and click to start  of exit section
const paragraph = document.querySelector(".exit-gate p");
//variable of sound on and off in setting in menu
const muteBtn = document.querySelector(".sound");
//variable of start button in menu
const startBtn = document.querySelector(".btn-start");
//variable of start list
const startMenu = document.querySelector(".level");
//variable of setting button
const settingBtn =document.querySelector(".btn-setting");
//variable of setting list
const settingMenu = document.querySelector(".setting-list");
//bariable of all levels in start list (continue,easy,medium,hard)
const levelsBtn = document.querySelectorAll(".level-li");
//variable of continue button in start list menu
const continueBtn = document.querySelector(".continue");
//variable of container of gate to open to start level
const containerMenu = document.querySelector(".start-menu");
//variable of the whole menu content (start,setting,exit)
const wholeMenu = document.querySelector(".menu");
//variable of upper gate part of start menu
const upperPart = document.querySelector(".upper-part");
//variable of lower gate part of start menu
const lowerPart = document.querySelector(".lower-part");
//variable of back to menu buttons in game screen and  pause screen
const backToMenuBtn = document.querySelectorAll(".btn-back");
//variable of pause button in screen of game
const pauseBtn = document.querySelector(".btn-pause");
//variable of pause screen
const pauseScreen = document.querySelector(".pause-screen");
//variable of resume button in pause screen
const resumeBtn = document.querySelector(".btn-resume");
//variable of countdown section
const countDisplay = document.querySelector(".counter");
//variable of button in start list menu to start new level (easy,medium,hard)
const levelStartBtn = document.querySelectorAll(".level-btn");
//variable of level name you select in top of game screen
const showLevel = document.querySelector(".show-level");
//variables of display number of try in game
const tryNumbers =  document.querySelector(".tries span");
//variable of display time start when level begun
const timerDisplay = document.querySelector(".time span");
//variable of seconds counter
let sec = 0;
//variable of minutes counter
let min = 0;
//variable for timer interval
let timerStart;
//variable of section contain cards of game
const cardContainer = document.querySelector(".main-cards");
//variable of cards created according to select level of game
let cardList =[];
//variable for all try you make in game either correct or not
let allTry = 0;
//variable for correct tries you make
let correctTry = 0;
//variables of object to add click card to it
let result = {};

//************************************************************************************************/

//open gate in fist of game

//click event to click mouse to show start menu game and open gate
window.addEventListener("click",open);

//function to show start menu game when click on mouse and open gate
function open(){
    //hide section of this section hold all content of gate
    exitGate.classList.add("index-gate");
    //left gate part open
    leftGate.classList.add("left-gate-close");
    //right gate part open
    rightGate.classList.add("right-gate-close");
    //remove paragraph of "click mouse to start"
    paragraph.classList.add("para-active");
    //start open gate sound after paragraph disappear
    setTimeout(()=>{
        openSound.play();
    },1000);
    //start menu music after gates opens and remove animation from paragraph
    setTimeout(()=>{
        paragraph.classList.remove("para-animation");
        menuSound.play();
    },2300);
    //remove windows click event after gate open
    setTimeout(()=>{
        window.removeEventListener("click",open);
    },2000);
}

//***************************************************************************************************//

//exit button

//click on exit btn and close gate and game event
exitBtn.addEventListener("click",closenow)

//function to close game when click exit button
function closenow(){
    //stop music of menu
    menuSound.pause();
    //start close gate sound
    openSound.play();
    //appearing of section hold all content of gate
    exitGate.classList.remove("index-gate");
    //close left part of gate
    leftGate.classList.remove("left-gate-close");
    //close right part of gate
    rightGate.classList.remove("right-gate-close");
    //appear of paragraph in exit gate
    paragraph.classList.remove("para-active");
    //change paragraph content to "good bye"
    paragraph.textContent = "Good Bye";
    //close the game after 4 seconds
    setTimeout(()=>{
        window.close();
    },4000);
}

//**************************************************************************************//

//expand start list and setting list when click start and setting button

//click on start button and expand list of start
startBtn.addEventListener("click",()=>{
    startMenu.classList.toggle("btn-start-active");
})

//click on setting button and expand list of setting
settingBtn.addEventListener("click",()=>{
    settingMenu.classList.toggle("btn-setting-active");
})

//*****************************************************************************************//

//mute music in start menu or open it

//click on sound on/off button
muteBtn.addEventListener("click",soundOnOff)

//music on or off function
function soundOnOff(){
    //if sound is muted
    if(menuSound.muted){
        //strat music and unmute it
        menuSound.muted=false;
        //change text from off to on
        muteBtn.children[0].textContent = "ON";
    }
    else{
        //stop music and mute it
        menuSound.muted=true;
        //change text from on to off
        muteBtn.children[0].textContent = "OFF";
    }
}

//********************************************************************************************//

//click on any key on start button list (continue,easy,medium,hard)

//add click to each button in list
levelsBtn.forEach(el=>{
    el.addEventListener("click",()=>{
        //add start game and enter game screen function
        startgame()
        //start countdown function to begin game after gate open
        setTimeout(()=>{
            startCount()
        },2000)
    })
})

//function to start game and enter game screen
function startgame(){
    //collapse start list of start button
    startMenu.classList.remove("btn-start-active");
    //collapse setting list of seeting button
    settingMenu.classList.remove("btn-setting-active");
    //hide th whole menu
    wholeMenu.classList.add("new-menu");
    //open upper part of gate
    upperPart.classList.add("upper-part-active");
    //open lower part of game
    lowerPart.classList.add("lower-part-active");
    //hide container section of gate and menu
    containerMenu.classList.add("hide-menu");
    //stop menu music
    menuSound.pause();
    //return menu music to start
    menuSound.currentTime= 0;
    //add continue button to start list buttons of start button and play sound of gate
    setTimeout(()=>{
        continueBtn.classList.add("continue-active");
        openSound.play()
    },1000);
}

//countdown function in start of game
function startCount(){
    //start count number
    let count = 3;
    //play countdown sound
    countSound.play();
    //function to countdown
    function countFunction (){
        //if countdown finish
        if(count == -1){
            //empty content in screnn
            countDisplay.textContent="";
            //remove section from screen
            countDisplay.classList.remove("start-count");
            countDisplay.parentNode.classList.remove("end-count");
            //enable pause and back to menu button in screen game only
            pauseBtn.classList.remove("disabled");
            pauseBtn.removeAttribute("disabled");
            backToMenuBtn[0].classList.remove("disabled");
            backToMenuBtn[0].removeAttribute("disabled");
            //stop countdown function
            clearInterval(countEverySecond)
            //begin timer function of game every second
            timerStart = setInterval(timer,1000)
        }
        //if count reach to 0 add "go" text
        else if(count==0){
            countDisplay.textContent = "Go";
            count--
        }
        //if count greater then zero
        else if(count>0){
            //start countdown
            countDisplay.classList.add("start-count")
            //display secoint of countdown
            countDisplay.parentNode.classList.add("end-count")
            //add count number to appear on screen
            countDisplay.textContent = count;
            count--
        }
    }
    //start countdown function every second
    countFunction();
    let countEverySecond = setInterval(countFunction,999);
}

//function to add timer to screen game when countdown end
function timer(){
    //add one second
    sec++
    //if reach 60 second add one minute and make second sto zero
    if(sec==60){
        sec=0
        min++
    }
    //add format of seconds and minutes to secreen of game
    else{
        if(sec <10){
            timerDisplay.textContent=`${min}:0${sec}`
        }
        else{
            timerDisplay.textContent=`${min}:${sec}`
        }
    }
}

//*********************************************************************************************************/

//back to menu buttons

//add event click for each back to menu button
backToMenuBtn.forEach(el=>{
    el.addEventListener("click",backToMenuFunction)
})

//function of back to menu button
function backToMenuFunction(){
    //stop timer fo game
    clearInterval(timerStart)
    //start sound of gate
    openSound.play();
    //appearing section contain menu and gate
    wholeMenu.classList.remove("new-menu");
    //close upper gate
    upperPart.classList.remove("upper-part-active");
    //close lower gate
    lowerPart.classList.remove("lower-part-active");
    //appearing menu of game
    containerMenu.classList.remove("hide-menu");
    //start music of menu after gate close and menu appear + collapse of pause menu
    setTimeout(()=>{
        menuSound.play();
        pauseScreen.classList.remove("pause-screen-active");
    },2000);
    //disabled pause and back to menu button in game screen
    pauseBtn.classList.add("disabled");
    pauseBtn.setAttribute("disabled", "true")
    backToMenuBtn[0].classList.add("disabled");
    backToMenuBtn[0].setAttribute("disabled", "true")
}

//***********************************************************************************************//

//pause button, screen and reume button

//click to pause button
pauseBtn.addEventListener("click",()=>{
    //appear of pause screen
    pauseScreen.classList.add("pause-screen-active");
    //disable pause button
    pauseBtn.classList.add("disabled");
    pauseBtn.setAttribute("disabled", "true")
    //stop timer of game
    clearInterval(timerStart)
});

//click on resume button
resumeBtn.addEventListener("click",()=>{
    //collapse of pause screen
    pauseScreen.classList.remove("pause-screen-active");
    //enable pause button
    pauseBtn.classList.remove("disabled");
    pauseBtn.removeAttribute("disabled");
    //start game timer
    timerStart = setInterval(timer,1000)

})

//******************************************************************************************************//

//start new game

//add event click for each new game button in start list (easy,medium,hard)
levelStartBtn.forEach(el=>{
    el.addEventListener("click",()=>{
        //reset timer to zero
        sec =0;
        min = 0;
        //empty card list container
        cardList = [];
        //empty correct and all tries variables to zero
        correctTry = 0;
        allTry = 0 ;
        //reset timer and try display to zero
        tryNumbers.textContent = allTry ;
        timerDisplay.textContent =`${min}:0${sec}`
        //start remove all cards from section
        removeChildren()
        //add grid system acoord to level you choose
        gridSystem(el.dataset.level);
        //form random array of numbers of images of cards
        let imgArr = formRandomArray(el.dataset.level);
        //form numbers of cards accord to level you choose
        makeCards(el.dataset.level);
        //add random image for each card
        addRandomImg(imgArr);
        //show level in game screen accord to level you choose
        showLevel.textContent= el.textContent.slice(0,-3)
        //add cards you make to your card list and push them out of function scope
        const cardClass =document.querySelectorAll(".card")
        cardClass.forEach(el=>{
            cardList.push(el)
        })
        //flib all cards at first of game for 3 seconds
        activateAllCardsAtFirst()
        //add function which responsible for click event on each card and if matching or not
        activeCard()
    })
})

//function active all cards for three seconds
function activateAllCardsAtFirst (){
    //flip all card for after countdown end + prevent click event for them + start flip sound
    setTimeout(()=>{
        cardList.forEach(el=>{
            el.classList.add("card-active");
            el.classList.add("prevent-action")
            cardSound.play()
        })
    },6500)
    //flip back all card for after 3 seconds + allow click event for them + start flip sound
    setTimeout(()=>{
        cardList.forEach(el=>{
            el.classList.remove("card-active");
            el.classList.remove("prevent-action")
            cardSound.play()
        })
    },9000)
}

//function remove all cards make from prevoius game
function removeChildren(){
    while (cardContainer.children.length >2) {
        cardContainer.removeChild(cardContainer.lastChild)
    }
}

//function to determine grid system accord level you choose
function gridSystem(num){
    //add classes of grid system accord level you choose and remove any prevoius classes of game you play
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

//function make cards according to level you choose
function makeCards(num){
    //array to put all cards make in it
    let arr = [];
    for(let i = 0 ; i< num;i++){
        //create div card container
        let card = document.createElement("div");
        //add class to div card container
        card.classList.add("card");
        //create face of card
        let faceCard = document.createElement("div");
        //add class of face of card
        faceCard.classList.add("face-card");
        //create back of card
        let backCard = document.createElement("div");
        //add class of back of card
        backCard.classList.add("back-card");
        //add fixed image for face of card
        let imgFaceCard = document.createElement("img");
        imgFaceCard.setAttribute("src","./assets/question-mark.png");
        //add empty image for back of card
        let imgBackCard = document.createElement("img");
        //append all content of card to each other
        faceCard.appendChild(imgFaceCard);
        backCard.appendChild(imgBackCard);
        card.appendChild(faceCard);
        card.appendChild(backCard);
        //push each card you make to array
        arr.push(card)
    }
    //push all content of array to game screen
    arr.forEach(el=>{
        cardContainer.appendChild(el)
    })
}

//function make array from random number of photo in assets folder
function formRandomArray(numberInArray){
    //array to add number of photo selected
    let photosArr = [];
    //choose number of photo selection randomly
    while (photosArr.length < numberInArray) {
        let randomNum = Math.ceil(Math.random()*39)
        //add it to array twice and make sure random number is not in array before
        if(!photosArr.includes(randomNum)){
            photosArr.push(randomNum)
            photosArr.push(randomNum)
        }
        else{}
    }
    //randomized number of photo add to array previously
    let arrLenght = photosArr.length;
    let currentindex;
    let finalArr=[]
    while(arrLenght > 0){
        currentindex = Math.floor(Math.random()*arrLenght)
        arrLenght--
        finalArr.push(photosArr[currentindex])
        photosArr.splice(currentindex,1)
    }
    //return array of photo selected randomized
    return finalArr
}

//function to add random photo to back of card
function addRandomImg (arr){
    //path variables
    let path = "./assets/"
    let extension = ".png"
    //loop accord number of photo lenght accord to level you choose
    for(let i = 0 ; i < arr.length ; i++){
        //add full path to variables
        let fullPath = `${path}${arr[i]}${extension}`
        //add full path to each back card image element
        cardContainer.children[i+2].children[1].children[0].setAttribute("src",fullPath);
        //add attribute equal to each photo to card
        cardContainer.children[i+2].setAttribute("data-value", arr[i])
    }
}

//**************************************************************************************************//

// add event to every card which add previusly in startNewGame function

//function add event for every card
function activeCard(){
    cardList.forEach((el,index)=>{
        el.addEventListener("click",(e)=>{
            //start function to flip card and check matching
            flipImages(el,index,cardList)
        })
    })
}

//function to flip card and check matching
//accept three parameter el:card you click on it, index:index of card you click on it, list: card array of all cards
function flipImages(el,index,list){
    //if length of object we add the clicked card to it was 1
    if(Object.keys(result).length ==1){
        //flip the second card you click now, play sound of fliping, add it to object by index as key and data-value as value
        el.classList.add("card-active");
        cardSound.play()
        result[index]=el.dataset.value;
        //check matching or not
        //if first and second object items are same
        if(result[Object.keys(result)[0]]==result[Object.keys(result)[1]]){
            //we add ID active to keep it show and now flip again
            list[parseInt(Object.keys(result)[0])].id ="active";
            list[parseInt(Object.keys(result)[1])].id ="active";
            //increase correct and all tries by one and add it to screen
            correctTry++
            allTry++
            tryNumbers.textContent = allTry ;
            //if correct tries*2  equal to numbers of cards
            if(correctTry*2 == list.length){
                //start sound of game end
                missionComplete.play()
                //back to menu function start
                setTimeout(() => {
                    backToMenuFunction()
                },4000);
                //empty card list
                setTimeout(()=>{
                    removeChildren()
                },5000)
                //remove continue button
                continueBtn.classList.remove("continue-active");
                //stop timer function
                clearInterval(timerStart)
                //reset all values of coreect tries, all tries, seconds, minutes, cardlist
                correctTry = 0;
                allTry = 0 ;
                sec =0;
                min = 0 ;
                cardList= [];
            }
            //if correct tries not equal to number of cards
            else{
                //play sound of matching correct
                setTimeout(()=>{
                    correctMatch.play()
                },300)
                //disable click for all cards
                stopClickAll()
                //allow click for all card after sound of correct end
                setTimeout(allowClickAll,700)
            }
        //if first and second object items are not same
        }
        else{
            //increase all tries by one and add it to screen
            allTry++
            tryNumbers.textContent = allTry ;
            //flip back all cards
            setTimeout(()=>{
                list.forEach(el=>{
                    el.classList.remove("card-active")
                })
            },400)
            //start wrong sound
            setTimeout(()=>{
                wrongMatch.play()
            },300)
            //disable click for all cards
            stopClickAll()
            //allow click for all card after sound of wrong end and flip back
            setTimeout(allowClickAll,700)
        }
        //empty object of clickable cards
        result={}
    }
    //if length of object we add the clicked card to it was 0
    else{
        //flip the first card you click now, play sound of fliping, add it to object by index as key and data-value as value
        el.classList.add("card-active");
        cardSound.play()
        result[index]=el.dataset.value;
        //disable click for all cards
        stopClickAll()
        //allow click for all card after flib complete
        setTimeout(allowClickAll,300)
    }

    //function to stop click of all card
    function stopClickAll(){
        list.forEach(el=>{
            el.classList.add("prevent-action")
        })
    }
    //function to allow click of all card
    function allowClickAll(){
        list.forEach(el=>{
            el.classList.remove("prevent-action")
        })
    }
}

//*************************************************************************************************//