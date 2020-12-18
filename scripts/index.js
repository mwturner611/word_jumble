$(document).ready(function(){

let diceArray = {
    1:{
        1:"B",
        2:"O",
        3:"O",
        4:"J",
        5:"A",
        6:"(B)"
    },
    2:{
        1:"T",
        2:"I",
        3:"E",
        4:"S",
        5:"O",
        6:"S"
    },
    3:{
        1:"P",
        2:"C",
        3:"H",
        4:"O",
        5:"S",
        6:"A"
    },
    4:{
        1:"T",
        2:"T",
        3:"A",
        4:"(O)",
        5:"W",
        6:"O"
    },
    5:{
        1:"W",
        2:"H",
        3:"(E)",
        4:"V",
        5:"R",
        6:"T"
    },
    6:{
        1:"R",
        2:"N",
        3:"Z",
        4:"N",
        5:"H",
        6:"L"
    },
    7:{
        1:"P",
        2:"F",
        3:"A",
        4:"K",
        5:"S",
        6:"F"
    },
    8:{
        1:"U",
        2:"M",
        3:"H",
        4:"Qu",
        5:"N",
        6:"I"
    },
    9:{
        1:"Y",
        2:"S",
        3:"D",
        4:"I",
        5:"T",
        6:"T"
    },
    10:{
        1:"U",
        2:"N",
        3:"E",
        4:"I",
        5:"E",
        6:"S"
    },
    11:{
        1:"T",
        2:"C",
        3:"I",
        4:"U",
        5:"M",
        6:"O"
    },
    12:{
        1:"A",
        2:"N",
        3:"A",
        4:"E",
        5:"(G)",
        6:"E"
    },
    13:{
        1:"H",
        2:"(G)",
        3:"E",
        4:"W",
        5:"E",
        6:"N"
    },
    14:{
        1:"E",
        2:"R",
        3:"L",
        4:"V",
        5:"Y",
        6:"D"
    },
    15:{
        1:"T",
        2:"T",
        3:"E",
        4:"R",
        5:"Y",
        6:"L"
    },
    16:{
        1:"I",
        2:"X",
        3:"R",
        4:"D",
        5:"E",
        6:"(L)"
    }
};

// random dice order
const randomDiceOrder = () => {
    let origNbr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

    let newNbr = [];

    for (let i = 0; i < 16; i++){
        let index = Math.floor((Math.random() * origNbr.length) + 0);
        
        newNbr.push(origNbr[index]);
        origNbr.splice(index,1);

    }
    return(newNbr);    
};

// random nbr in dice
const randomRoll = () => {
    return(Math.floor((Math.random() * 6) + 1));
};

// put the letters on the screen
const letter2Grid = () => {

    let array = JSON.parse(window.localStorage.getItem("scramble"));

    if (array){
        for (let i = 1; i < 17; i++){
            let id = 'd'+ i;
            let letter = array[i-1];
            document.getElementById(id).innerHTML=`${letter}`
        };
    }
    else{
        for (let i = 1; i < 17; i++){
            let id = 'd'+ i;
            let letter = 'W';
            document.getElementById(id).innerHTML=`${letter}`
        };
    };  
};

// create the final array
const createArray = () => {
    let finalArray = [];

    let diceOrder = randomDiceOrder();
    
    for (let i = 0; i < diceOrder.length; i++){
        let dice = randomRoll();

        finalArray.push(diceArray[diceOrder[i]][dice]);
    }
    window.localStorage.setItem("scramble",JSON.stringify(finalArray));
};

// timer for countdown
const timer = () => {
    let time = document.getElementById('counter');
    let minute = 2;
    let seconds = 60;
    let zero = "";

    const removeOne = () => {
        if (seconds > 0) {
            if(seconds < 11){
                zero = 0;
            }
            else{
                zero = "";
            }
            seconds--;
            time.innerHTML = "Time Remaining: "+ minute.toString() + ":" + zero + seconds.toString();
            setTimeout(removeOne, 1000);
        }
        else {
            if(minute < 1){
                zero = 0;
                time.innerHTML = "Time Remaining: "+ minute.toString() + ":" + zero + seconds.toString();
            }
            else{
                seconds = 60;
                minute--;
                time.innerHTML = "Time Remaining: "+ minute.toString() + ":" + seconds.toString();
                setTimeout(removeOne, 1000);
            }
        };
    };
    removeOne();
};

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://wordsapiv1.p.rapidapi.com/words/baseball/definitions",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "2e0c8506d8mshe06be0cd2635443p1e20c5jsncb94367dc223",
		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

$('#restart').click(function(){
    createArray();
    letter2Grid();
    timer();
});

});