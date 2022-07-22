const options = { size: 12, walls: true, hearts: true, enemies: true, loot: true, ice: true, }

createGrid(options);
setHearts(3);

document.querySelector('#go-up').onclick = goUp;
document.querySelector('#go-down').onclick = goDown;
document.querySelector('#go-right').onclick = goRight;
document.querySelector('#go-left').onclick = goLeft;

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == "38") {
        goUp();
    } else if (e.keyCode == "40") { 
        goDown();
    } else if (e.keyCode == "37") {
        goLeft();
    } else if (e.keyCode == "39") {
        goRight();
    } else if (e.keyCode == "90") {
        goUpBis();
    } else if (e.keyCode == "83") {
        goDownBis();
    } else if (e.keyCode == "81") {
        goLeftBis();
    } else if (e.keyCode == "68") {
        goRightBis();
    } else if (e.keyCode == "80") {
        goAudioP();
    }
}

function goUp() {
    const v = getHeroPosition();
    const wall = getWalls(v.x, v.y);
    if (!wall.north) {
        setHeroPosition(v.x, v.y - 1);
        addHeartsWhenStepOnIt();
        enemiesAttack();
        checkTresor();
        if (isFrozen(v.x, v.y - 1)) {
            goUp();
        }
    }
}

function goDown() {
    const v = getHeroPosition();
    const wall = getWalls(v.x, v.y);
    if (!wall.south) {
        setHeroPosition(v.x, v.y + 1);
        addHeartsWhenStepOnIt();
        enemiesAttack();
        checkTresor();
        if (isFrozen(v.x, v.y + 1)) {
            goDown();
        }
    }
}

function goRight() {
    const v = getHeroPosition();
    const wall = getWalls(v.x, v.y);
    if (!wall.east) {
        setHeroPosition(v.x + 1, v.y);
        addHeartsWhenStepOnIt();
        enemiesAttack();
        checkTresor();
        if (isFrozen(v.x + 1, v.y)) {
            goRight();
        }
    }
}

function goLeft() {
    const v = getHeroPosition();
    const wall = getWalls(v.x, v.y);
    if (!wall.west) {
        setHeroPosition(v.x - 1, v.y);
        addHeartsWhenStepOnIt();
        enemiesAttack();
        checkTresor();
        if (isFrozen(v.x - 1, v.y)) {
            goLeft();
        }
    }
}

function addHeartsWhenStepOnIt() {
    const v = getHeroPosition();
    if (getCellContent(v.x, v.y) === HEART && getHearts() < 5) {
        getHearts();
        setHearts(getHearts() + 1);
    }
}

function enemiesAttack() {
    const v = getHeroPosition();
    const tademorve = getMonsterPower(v.x, v.y);
    if (getCellContent(v.x, v.y) === MONSTER) {
        killMonster(v.x, v.y);
        setHearts(getHearts() - tademorve);
        if (getHearts() <= 0) {
            setTimeout(function () {
                alert("Game Over");
            }, 200);
            setTimeout(function () {
                location.reload();
            }, 205);

        }
    }
}

function checkTresor() {
    const v = getHeroPosition();
    if (getCellContent(v.x, v.y) === LOOT) {
        loot(v.x, v.y);
        getTreasures();
        console.log(heroLoot);
        if (heroLoot == 7) {
            setTimeout(function () {
                alert("Win !!!");
            }, 200);
            setTimeout(function () {
                location.reload();
            }, 205);
        }
    }
}

function goUpBis() {
    const v = getHeroPosition();
    const wall = getWalls(v.x, v.y);
    setHeroPosition(v.x, v.y - 1);
}

function goDownBis() {
    const v = getHeroPosition();
    const wall = getWalls(v.x, v.y);
    setHeroPosition(v.x, v.y + 1);
}

function goRightBis() {
    const v = getHeroPosition();
    const wall = getWalls(v.x, v.y);
    setHeroPosition(v.x + 1, v.y);
}

function goLeftBis() {
    const v = getHeroPosition();
    const wall = getWalls(v.x, v.y);
    setHeroPosition(v.x - 1, v.y);
}



function goLeft() {
    var audio = new Audio('son/bip.mp3');
    audio.play();
}
