// allows page to load before any jquery is activated
$(document).ready(function(){

    // this is an object of objects providing the 16, 6 sided dice
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

// dice work object
const diceWork = {

    // setup the original dice order
    origNbr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],

    // an empty array for the new dice order
    newNbr : [],

    // method to randomize the dice order
    randomDiceOrder: function () {

        // assign values of the origNbr array
        let nbr = [...this.origNbr];

        // empty the new array from any prior calls
        this.newNbr = [];

        // loop through the orig array, randomly removing nbr's and sending them to the new array
        for (let i = 0; i < 16; i++){
            let index = Math.floor((Math.random() * nbr.length) + 0);
            
            this.newNbr.push(nbr[index]);
            nbr.splice(index,1);
        }

        return(this.newNbr);
    },

    // provide a random number between 1-6 for the side of the die to be selected
    randomRoll: function () {
        return(Math.floor((Math.random() * 6) + 1));
    }
};

// create the final array
const createArray = () => {
        
    // call function to return randomized 16 digits representing dice order
    let diceOrder = diceWork.randomDiceOrder();

    // function returns a specific letter value from the dice array - single die's single side.
    const formArray = (die) => {
        let roll = diceWork.randomRoll();

       return diceArray[die][roll];
    };

    // use map to call the formArray function on each of the 16 dice specific order places.
    let finalArray = diceOrder.map(formArray);
   
    // stringify the array in local storage
    window.localStorage.setItem("scramble",JSON.stringify(finalArray));
};

// put the letters on the screen
const letter2Grid = () => {

    // get the scramble of letters from local storage
    let array = JSON.parse(window.localStorage.getItem("scramble"));

    // function that gets one item from array and places it in the next id location on the screen
    const addAltr = (item,index) => {
        let nbr = index + 1;
        let id = 'd' + nbr;
        document.getElementById(id).innerHTML= item;
    }

    // if values retrieved from local storage, forEach placing each one on the screen
    if (array){
        array.forEach(addAltr);
    }; 
};

// define timeID globally to be accessed by clear function
var timerID;

// clear time function
const clear = () => {
    clearTimeout(timerID);
}

// timer for countdown
const timer = () => {
    // get counter element, set default start values
    let time = document.getElementById('counter');
    let minute = 2;
    let seconds = 60;
    let zero = "";

    // using recurrsion remove either a second or minute and display until both are zero
    const removeOne = () => {

        // decrement a second and display time with or without extra zero for formatting
        if (seconds > 0) {
            if(seconds < 11){
                zero = 0;
            }
            else{
                zero = "";
            }
            seconds--;
            time.innerHTML = "Time Remaining: "+ minute.toString() + ":" + zero + seconds.toString();
            timerID = setTimeout(removeOne, 1000);
        }

        // second is at zero, stop countdown if minute is also zero, otherwise decrement minutes reset seconds
        else {
            if(minute < 1){
                zero = 0;
                time.innerHTML = "Time Remaining: STOP!!! Time's up!";
            }
            else{
                seconds = 59;
                minute--;
                time.innerHTML = "Time Remaining: "+ minute.toString() + ":" + seconds.toString();
                timerID = setTimeout(removeOne, 1000);
            }
        };
    };
    removeOne();
};

// make the ajax call to our server side route
// make it an async function
const findWord = async (word) => {
    // await the ajax call to complete
    const response = await $.ajax('/api/search/'+word, {
        type: 'GET'
    }) 
    // upon completion, display word and response (error or definition) on the screen.
    let display = word + ': ' + response.definition; 
    document.getElementById('def').innerHTML= display;
};

// click event for definition search
$('#search').click(function(event){
    // keep form from clearing
    event.preventDefault();

    // get input section value
    let search = $('#searchWord');
    
    // trim the input down to entered word 
    let word = search.val().trim();

    // launch ajax call function
    findWord(word);

});

// click event triggering the grid related functions
$('#restart').click(function(){
    // clear any active past timer
    clear();

    // create a new array of letters stored local storage
    createArray();

    // get letters from local storage and display on the screen
    letter2Grid();

    // start the countdown
    timer();
});

});