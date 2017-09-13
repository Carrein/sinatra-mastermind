var counter = 0;
var tries = 12;
var code = [];
var secret = [];
var hint = [];
var winner = false;
var setter = 0;
var holder = [];

var colors = {
    0 : "rgb(41, 128, 185)",
    1 : "rgb(39, 174, 96)",
    2 : "rgb(142, 68, 173)",
    3 : "rgb(44, 62, 80)",
    4 : "rgb(189, 195, 199)",
    5 : "rgb(230, 126, 34)",
    6 : "rgb(255, 255, 255)"
};

$(document).ready(function(){

    generate();

    $(".circle").click(function(){
        $(this).css({
            "background-color": colors[(counter++)%6]
        });
    });

    $(".text-button").click(function(){
        
        
        $(".circle").each(function(){
            code.push(getKeyByValue(colors,$(this).css("background-color")))
            $(this).css("background-color", "white")
        });

        //Check if user has won.
        wincon();

        if(!winner){
            $("<div>", {
                "class": "clue-list"+tries,
                css: {
                    "display": "flex",
                    "flex-direction": "row",
                    "align-items": "center",
                    "justify-items": "center"
                }
            }).appendTo(".content-left");
        
                $("<div>", {
                    "text" : 12-tries + ":",
                    css: {
                        "font-size": "2em",
                    }
                }).appendTo(".clue-list"+tries);
        
            for(var i=0; i !=4; i++){            
                $("<div>", {
                    "class" : ".square" + i,
        
                    css: {
                        "height" : "1.5em",
                        "width" : "1.5em",
                        "background-color" : colors[code[i]],
                        "border": "2px solid black",         
                        "border-radius" : "0px",
                        "margin" : "10px"
                    }
                }).appendTo(".clue-list"+tries);
            } 
            
            logic();        

            for(var i=0; i !=4; i++){
                $("<div>", {
                    "class" : ".clue" + i,
        
                    css: {
                        "height" : "1em",
                        "width" : "1em",
                        "background-color" : hint[i],
                        "border": "1px solid black",
                        "border-radius" : "10px",
                        "margin" : "10px"
                    }
                }).appendTo(".clue-list"+tries); 
            }
        }

            //reset hints and codes
            hint=[]
            code=[]
    });
});

function logic(){
    //white => correct guess, wrong slot
    //black => wrong guess, wrong slot
    //red => correct guess, correct slot
    for(var i=0; i !=4; i++){
        if(code[i]==secret[i]){ //if code and secret is exact matches.
            hint.push("#D64541"); //add a red hint.
            code.splice(i,1); //remove that element from code.
            code.splice(i,0,7); //supplement with a placeholder.
        }else{
            hint.push("#22313F"); //else fill with black hint.
        }
    }

    for(var i=0; i !=4; i++){
        for(var j=0; j !=4; j++){
            if(code[i]==secret[j]){ //if any of the code matches a secret.
                if(hint[i]!="#D64541"){ //and its not already a red hint.
                    hint[i] = "#ECECEC" //fill it with a white hint.              
                }
            }
        }
    }
}


function wincon(){
    if(code.toString() === secret.toString()){
        winner = true
        $(".title").text("Oh snap! You won!");        
        if(confirm("You broke the code! Click confirm to restart the game.")){
            location.reload(true)
        }    
    }else{
        count = 0;
        holder = [];
        if(tries != 0){
            tries--
            $(".tries").text("Tries left: " + tries)
        }else{
            winner = true
            $(".title").text("No more tries!");                    
            if(confirm("Oh no, you ran out of tries! Click confirm to restart the game.")){
                location.reload(true)
            }        
        }
    }
}

function generate(){
    for(var i=0; i != 4; i++){
        secret.push(Math.floor(Math.random() * 6))
    }
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value).toString();
}