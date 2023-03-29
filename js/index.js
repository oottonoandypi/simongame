const keys=["green", "red", "yellow", "blue"];

$(window).on("load", function(){
    let game = new SimonGame();

    $(document).on('keypress',function(e) {
        if(!game.isStarted) game.startGame();
    });

    $("#btns_container button").click(function(){
        if(game.isAcceptingAnswer){
            $(this).append("<div style='position: absolute; left:0; top: 0; width: 100%; height: 100%; background-color: rgba(255,255,255,1); border-radius: 20px;'></div>");
            $(this).children("div").fadeOut('fast');
            game.isEnteredKeyCorrect($(this).attr("class").split(' ')[1].split('-')[1]);
        }
    });
});

let restart=function(){
    location.reload();
};


