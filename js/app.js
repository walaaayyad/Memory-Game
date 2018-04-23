/*
 *-----------------------------------------
        **** VARIABLES ****
 *-----------------------------------------
 */

let deckCards = document.getElementsByClassName('card'),
    cards = [...deckCards]; // hold All cards.
 
    openedCards = [],
    matched=[],
    deck = document.querySelector('.deck'),
    restart = document.querySelector('.restart'),
    moves = document.querySelector('.moves'),
    scorePanel = document.querySelector('.score-panel'),
    time = document.querySelector('#timer'),
    seconds = document.querySelector('.seconds'),
    minutes = document.querySelector('.minutes'),
    card = $('.deck li'),
    oneStar = $('.one'),
    twoStars = $('.two');

/*
*---------------------------------------
*        Function To Start The Game
*---------------------------------------
*/

function startGame(){
  let shuffledCards = shuffle(cards); // Shuffle Cards
  for(let x = 0; x < 16; x++){
[].forEach.call(shuffledCards,function(i){ 
  deck.appendChild(i); // Append Shuffled Cards To The Deck 
});
  }
}

window.onload = startGame();
/*  
*--------------------------------------------------------------
*  Time from: https://albert-gonzalez.github.io/easytimer.js/
*--------------------------------------------------------------
*/
var timer = new Timer();
 card.click(function () {  // Start Timer When You Start Open Cards
    timer.start();
});

timer.addEventListener('secondsUpdated', function (e) {
    $('#timer .minutes').html(timer.getTimeValues().minutes);
    $('#timer .seconds').html(timer.getTimeValues().seconds);
    if(matched.length === 16){
      timer.stop(); // Stop Timer When All Cards Matched
    }
    
});


/*
*----------------------------------------------------
       ***** DISPLAY THE CARDS  *****
*----------------------------------------------------
*/
  card.on('click',function(){
    this.classList.add('open','show','disable');
  openedCards.push(this); // Push Open Cards To Separate
  console.log(openedCards);
  if(openedCards.length === 2){
     card.css("pointer-events", "none"); // Disable Clicking on Cards Until Check Them
    check(openedCards);
     card.css("pointer-events", "auto"); // Now You Can Click On Cards again

}
});

/*
*
  -----------------------------------------------------------------------
    *** Check function to compare if two cards matched or unmatched. ***
  -----------------------------------------------------------------------
*
*/

function check(card){
    if(openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className){ 
      setTimeout(function() {
    openedCards[0].classList.add('match');
    openedCards[1].classList.add('match');
    matched.push(openedCards[0]);
    matched.push(openedCards[1]);
  console.log(matched);
if(matched.length === 16){endMsg();};

    openedCards = [];

  }, 500);
 }else{
     setTimeout(function() {
   openedCards[0].classList.remove('open','show','disable');
   openedCards[1].classList.remove('open','show','disable');
     openedCards = [];
          }, 1000);
 }
  moves.innerHTML++;

  // Stars Will Disappear when your moves increase.

  if(moves.innerHTML >= 1 && moves.innerHTML <= 10){
    console.log('three stars');
  }else if(moves.innerHTML > 10 && moves.innerHTML <= 16){
  oneStar.css('visibility', 'hidden');
    }else{
  twoStars.css('visibility', 'hidden'); 
  
    }
}
/*
*
  ----------------------------
     *** Rating Function ***
  ----------------------------
*
*/
function rating(num){
  let starsNo= 3;
  if(num >= 16){
    starsNo= 1;
}else if(num >= 10){
  starsNo= 2;
  }else{
    starsNo= 3;
  }
  return('You Get '+starsNo+' star');
}
/*
*
  -------------------------------------------------------------------------------------------
    *** Popup Message at the end  from https://sweetalert.js.org/guides/#getting-started  ***
  -------------------------------------------------------------------------------------------
* This Alert appear for seconds..It includes yor moves,stars,and your Time 
*/

function endMsg(){
let msg= rating(moves.innerHTML);

   swal({
   title: "Good job !  "+msg,
  text: "  ("+ moves.innerText+") moves   in "+minutes.innerText+" Minutes and "+seconds.innerText+"  Seconds",
   icon: "success",
  button:false,
  timer: 4000,

  });
}
  
/*
*
  ------------------------------------------------------------------
    *** Shuffle function from http://stackoverflow.com/a/2450976 ***
  ------------------------------------------------------------------
*
*/

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
 


/*
*  ----------------------------------------------
      ***  start function to reset the cards.  ***
   ----------------------------------------------
* 
*/
function resetGame(){
  timer.stop();
//Empty the matched array & opencards array to play again
  matched= [];
  openedCards=[];
   clearInterval(timer);

// Remove all classes
let c = deck.querySelectorAll('.card');
for(let i=0;i<16;i++){
  c[i].classList.remove('open','show','match','disable')
};
cards = shuffle(cards);
 for(let x = 0; x < 16; x++){
[].forEach.call(cards,function(i){ 
  deck.appendChild(i);
});
  }
 document.querySelector('.moves').innerHTML= 0;
 minutes.innerText= 0;
 seconds.innerText= 0;
 card.click(function () {
    timer.start();
});
// Stars appear again
oneStar.css('visibility', ' visible');
twoStars.css('visibility', ' visible'); 


startGame();
};
// When you click on restart the event listener run resetGame function 
  restart.addEventListener('click', resetGame);
