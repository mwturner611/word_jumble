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

// random nbr on a die
const randomRoll = () => {
    return(Math.floor((Math.random() * 6) + 1));
};

// create the final array
const createArray = () => {
    let finalArray = [];

    let diceOrder = randomDiceOrder();

    const formArray = (item) => {
        let dice = randomRoll();

        finalArray.push(diceArray[item][dice]);
    };

    diceOrder.forEach(formArray);
   
    window.localStorage.setItem("scramble",JSON.stringify(finalArray));
};

// put the letters on the screen
const letter2Grid = () => {

    let array = JSON.parse(window.localStorage.getItem("scramble"));

    const addAltr = (item,index) => {
        let nbr = index + 1;
        let id = 'd' + nbr;
        document.getElementById(id).innerHTML= item;
    }

    if (array){
        array.map(addAltr);
    }; 
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
                time.innerHTML = "Time Remaining: STOP!!! Time's up!";
            }
            else{
                seconds = 59;
                minute--;
                time.innerHTML = "Time Remaining: "+ minute.toString() + ":" + seconds.toString();
                setTimeout(removeOne, 1000);
            }
        };
    };
    removeOne();
};

// make the ajax call to our server side route
const findWord = (word) => {
    $.ajax('/api/search/'+word, {
        type: 'GET'
    })
    .then(function(res){

        let display = word + ': ' + res.definition; 

        document.getElementById('def').innerHTML= display;

        return;
    });
};

// click event for definition search
$('#search').click(function(event){
    event.preventDefault();

    let search = $('#searchWord');
    
    let word = search.val().trim();

    findWord(word);

});

// click event triggering the grid related functions
$('#restart').click(function(){
    createArray();
    letter2Grid();
    timer();
});

});