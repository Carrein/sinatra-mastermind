var counter = 0;
var tries = 12;

var colors = {
    0: "#2980b9",
    1: "#27ae60",
    2: "#8e44ad",
    3: "#2c3e50",
    4: "#bdc3c7",
    5: "#e67e22",
};

$(document).ready(function(){
    $(".circle").click(function(){
        $(this).css({
            "background-color": colors[(counter++)%6]
        });
    });

    $(".text-button").click(function(){
        if(tries != 0){
            tries--
        }
        $(".tries").text("Tries left: " + tries)
        $(".circle").css("background-color","white");
        $(".hint").append();
    });

    
});

