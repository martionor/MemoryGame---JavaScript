document.addEventListener('DOMContentLoaded', () => {

  const cardArray = [
    {
      name:'fries',
      img: './img/fries.png'
    },
    {
      name:'cheese',
      img: './img/cheeseburger.png'
    },
    {
      name:'ice-cream',
      img: './img/ice-cream.png'
    },
    {
      name:'hotdog',
      img: './img/hotdog.png'
    },
    {
      name:'milkshake',
      img: './img/milkshake.png'
    },
    {
      name:'pizza',
      img: './img/pizza.png'
    }
  ];

  //console.log(cardArray);
  cardArray.push(...cardArray);//copy all cards
  //console.log(cardArray);

  //Sekoitetaan kortit
  // cardArray.sort(function(a,b){return 0.5 - Math.random()});
  cardArray.sort(()=> 0.5 - Math.random());

  const grid = document.querySelector(".grid");

  const result= document.querySelector("#result");

  let cardsChosen=[];
  let cardsChosenId=[];
  let cardsWon =[];
  

  //Luodaan pelipöytä
  function createBoard(){
    for(let i = 0; i<cardArray.length; i++){
      const card= document.createElement("img");
      card.setAttribute("src", "./img/blank.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
  }

  function  flipCard(){
    let cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length ===2){
      setTimeout(checkForMatch, 500);
    }  
  };

  //Tarkistetaan ovatko kortit samoja
  function checkForMatch(){
    const cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId === optionTwoId){
      alert("valitsit saman");
      cards[optionOneId].setAttribute("src", "./img/blank.png");
    } else if (cardsChosen[0] === cardsChosen[1]){
      alert("löysit pari");
      cards[optionOneId].setAttribute("src" , "./img/white.png");
      cards[optionTwoId].setAttribute("src" , "./img/white.png");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
    }else{
      cards[optionOneId].setAttribute("src", "img/blank.png");
      cards[optionTwoId].setAttribute("src", "img/blank.png");
      alert("Yritä uudestaan!");
    }

    cardsChosen= [];
    cardsChosenId=[];
    result.innerHTML=cardsWon.length;
    if (cardsWon === cardArray.length/2){
      result.innerHTML = "Onnea löysit kaikki parit.";
    };
  }

  createBoard();


});