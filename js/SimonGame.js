class SimonGame{

    constructor(){
        this.started=false;
        this.level=-1;
        this.answerKeys=[]; // stores answer keys' index in order
        this.lost=false;
        this.acceptingAnswer=false;
        this.enterIndex=-1;
        // this.limit=500; // set the max rounds of game can be played.
        // this.win=false;

        this.interval=setInterval(function(){
            if(!this.started){
                $("#gameLevel").fadeToggle("fast").fadeToggle("fast").fadeToggle("fast").fadeToggle("fast");
            }
        }, 3000);
        
    }

    startGame(){
        this.started=true;
        clearInterval(this.interval);
        this.nextLevel();
    }

    lostGame(){
        if(this.lost==false){
            this.lost=true;
            this.acceptingAnswer=false;
            this.answerKeys=[];

            $("#gameLevel").slideUp("fast", function(){
                $("#gameLevel").html("GAME OVER.. <br> ˚‧º·(′̥̥̥ o ‵̥̥̥)‧º·˚");
                $("#gameLevel").css("color", "pink");
                $("#gameLevel").css("font-size", "6em");
                this.interval=setInterval(function(){
                    if(!this.started){
                        $("#gameLevel").fadeToggle("fast").fadeToggle("fast").fadeToggle("fast").fadeToggle("fast");
                    }
                }, 2000);
                $("body").append("<button id='btn-replay' onclick='restart()' style='border-radius: 5px; margin-top: 50px; font-size: 2em;'>Play Again!</button>");
            }).slideDown();
            $("#btns_container").fadeOut("fast");

            $("audio.wrong")[0].play();
            $("body").css("background-color", "rgb(232, 93, 160)");
            setTimeout(function(){
                $("body").css("background-color", "rgb(23, 1, 50)");
            }, 100);
        }
    }

    nextLevel(){
        let thisGame = this;
        this.level++;
        this.answerKeys[this.level]=Math.floor(Math.random()*(keys.length-1));

        if(this.level==0) {
            $("#gameLevel").slideUp("fast",function(){
                $("#gameLevel").html("LEVEL ");
                $("#gameLevel").append("<em>"+(thisGame.level+1)+"</em>");
            }).slideDown(function(){
                $("#gameLevel em").fadeToggle("fast").fadeToggle("fast").fadeToggle("fast").fadeToggle("fast", function(){
                    setTimeout(function(){
                        $("#btn_"+keys[thisGame.answerKeys[thisGame.level]]+" button").append("<div style='position: absolute; left:0; top: 0; width: 100%; height: 100%; background-color: rgba(255,255,255,1); border-radius: 20px;'></div>");
                        
                        $("audio."+keys[thisGame.answerKeys[thisGame.level]])[0].play();
                        
                        $("#btn_"+keys[thisGame.answerKeys[thisGame.level]]+" button div").fadeOut('fast');
                        thisGame.acceptingAnswer=true;
                    }, 300);
                });
            });
        }else{
            $("#gameLevel em").slideUp("fast", function(){
                $("#gameLevel em").html(thisGame.level+1, function(){
                    $("#gameLevel em").slideDown();
                }).fadeToggle("fast").fadeToggle("fast").fadeToggle("fast", function(){
                    setTimeout(function(){
                        $("#btn_"+keys[thisGame.answerKeys[thisGame.level]]+" button").append("<div style='position: absolute; left:0; top: 0; width: 100%; height: 100%; background-color: rgba(255,255,255,1); border-radius: 20px;'></div>");
                        
                        $("audio."+keys[thisGame.answerKeys[thisGame.level]])[0].play();
                        
                        $("#btn_"+keys[thisGame.answerKeys[thisGame.level]]+" button div").fadeOut('fast');
                        thisGame.acceptingAnswer=true;
                    }, 300);
                });
            });
        }
    }

    isEnteredKeyCorrect(key){
        this.enterIndex++;
        if(this.enterIndex<=this.level && key==keys[this.answerKeys[this.enterIndex]]){
            if(this.enterIndex==this.level) {
                this.enterIndex=-1;
                this.acceptingAnswer=false;
                this.nextLevel();
            }
        } else {
            this.lostGame();
        }
    }

    get isStarted(){
        return this.started;
    }

    get isAcceptingAnswer(){
        return this.acceptingAnswer;
    }
}