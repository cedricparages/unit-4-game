$(document).ready(function () {

    // Character variables and health count
    var characters = {
        "rey": {
            name: "Rey",
            hp: 130,
            damage: 8
        },
        "yoda": {
            name: "Yoda",
            hp: 160,
            damage: 20
        },
        "kylo": {
            name: "Kylo Ren",
            hp: 110,
            damage: 5,
        },
        "vader": {
            name: "Darth Vader",
            hp: 180,
            damage: 25,
        }
    }
    var characterChosen = false;
    var enemyChosen = false;
    var user;
    var enemy;
    var turnCounter = 1;
    var killCount = 0;
    var userObj;
    var enemyObj;

    // functions

    // attack enemy, deduct hp from enemy and user
    // as you keep clicking your attack damage increments 
    var attack = function () {
        enemyObj.hp = enemyObj.hp - (userObj.damage * turnCounter);
        userObj.hp = userObj.hp - enemyObj.damage;
        $("footer").html("<div>" + userObj.name + " attacked " + enemyObj.name + " for <span style='color:red;'>" + userObj.damage * turnCounter + "</span> damage!</div>");
        $("footer").append(enemyObj.name + " attacked " + userObj.name + " back for <span style='color:red;'>" + enemyObj.damage + "</span> damage!</div>");
        $(".box-1 .hp").text(userObj.hp);
        $(".box-2 .hp").text(enemyObj.hp);
        turnCounter++;
    }

    // when your hp is negative, you lose
    var youLose = function () {
        if (userObj.hp < 1 && enemyObj.hp > 0) {
            $("footer").html("You lose. " + enemyObj.name + " has defeated you.");
            $(".box-3").html("<img id='restart' src='assets/images/loserestart.png'>");
        } else if (enemyObj.hp < 1 && userObj.hp < 1) {
            $("footer").html("You both died.");
            $(".box-3").html("<img id='restart' src='assets/images/loserestart.png'>");
        }
    }

    // "You won! GAME OVER!"
    var youWon = function () {
        if (enemyObj.hp < 1 && userObj.hp > 0) {
            if (killCount < 2) {
                $("footer").html("You defeated " + enemyObj.name + "!<br> Choose your next battle.<br> May the force be with you.");
                killCount++;
                enemyChosen = false;
                $("#attack").remove();
                $("<div class='choose-battle'>Choose your next battle</div>").appendTo($(".box-3"));
                //$(".box-3").off("click").css("pointer-events", "none");
            } else {
                $("footer").html("You won!<br>The force is strong in you.");
                $(".box-3").html("<img id='restart' src='assets/images/winrestart.png'>");
            }
        } else if (enemyObj.hp < 1 && userObj.hp < 1) {
            $("footer").html("You both died.");
            $(".box-3").html("<img id='restart' src='assets/images/loserestart.png'>");
        }
    }

    // on click functions

    $(".character").on("click", function () {

        // pick 1 character
        if (characterChosen == false && enemyChosen == false) {
            $(".choose-character").replaceWith($(this));
            $(this).children().last().css("background-color", "green");

            // move all divs to the right
            if ($(this).attr("id") == "yoda") {
                $("#rey").appendTo($(".box-3"));
            } else if ($(this).attr("id") == "kylo") {
                $("#yoda").appendTo($(".box-4"));
                $("#rey").appendTo($(".box-3"));
            } else if ($(this).attr("id") == "vader") {
                $("#kylo").appendTo($(".box-5"));
                $("#yoda").appendTo($(".box-4"));
                $("#rey").appendTo($(".box-3"));
            }

            // div box for "choose your battle" in box-2
            $("<div class='choose-battle'>Choose your battle</div>").appendTo($(".box-2"));
            $(".box-1").css("pointer-events", "none");
            characterChosen = true;
            return;
        }

        // pick villain first round
        if (characterChosen == true && enemyChosen == false && killCount == 0) {
            $(".choose-battle").replaceWith($(this));
            $(this).children().last().css("background", "red");

            if ($(".box-5").children().length == 0) {
                $(".box-4").children().appendTo($(".box-5"));
                $(".box-3").children().appendTo($(".box-4"));
            } else if ($(".box-4").children().length == 0) {
                $(".box-3").children().appendTo($(".box-4"));
            }

            enemyChosen = true;
            $(".box-3").append("<img id='attack' src='assets/images/attack.png'>");
        }

        // pick villain second round
        if (characterChosen == true && enemyChosen == false && killCount == 1) {
            $(".box-2").html($(this));
            $(this).children().last().css("background", "red");
            enemyChosen = true;
            $("footer").empty();
            $(".box-3").html("<img id='attack' src='assets/images/attack.png'>");
        }

        // pick villain third round
        if (characterChosen == true && enemyChosen == false && killCount == 2) {
            $(".box-2").html($(this));
            $(this).children().last().css("background", "red");
            enemyChosen = true;
            $("footer").empty();
            $(".box-3").html("<img id='attack' src='assets/images/attack.png'>");
        }
    })

    // fight by clicking on attack button
    // click attack, your attack damage remembers from last enemy and continues to increase by increments
    $(".box-3").on("click", "#attack", function () {
        user = $(".box-1").children("div").eq(0).attr("id");
        enemy = $(".box-2").children("div").eq(0).attr("id");
        // access objects of obj array with [int]
        userObj = characters[user];
        enemyObj = characters[enemy];

        // first round
        if (killCount == 0) {
            attack();
            youLose();
            youWon();
            // second round
        } else if (killCount == 1) {
            attack();
            youLose();
            youWon();
            // third round
        } else if (killCount == 2) {
            attack();
            youLose();
            youWon();
        }
    })

    // restart button after you lose
    $(".box-3").on("click", "#restart", function () {
        location.reload();
    })
})