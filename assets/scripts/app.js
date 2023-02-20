const attackPlayerValue = 10;
const attackMonsterValue = 14;
const strongAttackValue = 17;
const healValue = 20;
const attack = 'ATTACK';
const strongAttack = 'STRONG ATTACK';
const logPlayerAttack = 'Player Attack';
const logPlayerStrongAttack = 'Player Strong Attack';
const logMonsterAttack = 'Monster Attack';
const logPlayerHeal = 'Player Heal';
const logGameOver = 'Game Over';
let choosenMaxLife = 100;
let monsterHealth = choosenMaxLife;
let playerHealth = choosenMaxLife;
let hasBonus = true;
let battleLog = [];
let islogged;

function getMaxLifeValue() {
  const enterredLife = prompt('Choose MaxLife for you and the Monster', '100');
  let parsedNumber = parseInt(enterredLife);

  if (isNaN(parsedNumber) || parsedNumber <= 0) {
    throw { message: 'Unvalid userInput' };
  }
  return parsedNumber;
}

try {
  choosenMaxLife = getMaxLifeValue();
} catch (error) {
  console.log(error);
  choosenMaxLife = 100;
  alert('You should enter a number');
  // throw error
}
// finally{ }  => it execute code inside whenever excution enter try or enter catch it will enter finally anyway and finally 'll be useful in case we found an error in try or catch
// and if we use throw error before finally it will stop the app and only execute the code inside finally

adjustHealthBars(choosenMaxLife);

function writeToLog(event, value, currentMonsterHealth, currentPlayerHealth) {
  let logEntries = {
    eve: event,
    val: value,
    finalMonsterHealth: currentMonsterHealth,
    finalPlayerHealth: currentPlayerHealth,
  };
  // switch statement uses when we have the equality of same condition every if stat.
  // uses by passing parameter which if equal to every case then writing implementing code below

  switch (event) {
    case logPlayerAttack:
    case logPlayerStrongAttack:
      logEntries.target = 'Monster';
      break;
    case logMonsterAttack:
    case logPlayerHeal:
      logEntries.target = 'Player';
      break;

    default:
      logEntries = {};
  }

  // if (event === logPlayerAttack) {
  //   logEntries.target = 'Monster';
  // } else if (event === logPlayerStrongAttack) {
  //   logEntries.target = 'Monster';
  // } else if (event === logMonsterAttack) {
  //   logEntries.target = 'Player';
  // } else if (event === logPlayerHeal) {
  //   logEntries.target = 'Player';
  // }
  battleLog.push(logEntries);
}

function reset() {
  monsterHealth = choosenMaxLife;
  playerHealth = choosenMaxLife;
  resetGame(choosenMaxLife);
}

function endRound() {
  let initialPlayerHealth = playerHealth;
  const playerDamage = dealPlayerDamage(attackMonsterValue);
  playerHealth -= playerDamage;
  writeToLog(logMonsterAttack, playerDamage, monsterHealth, playerHealth);

  if (playerHealth <= 0 && hasBonus) {
    hasBonus = false;
    playerHealth = initialPlayerHealth;
    removeBonusLife();
    setPlayerHealth(initialPlayerHealth);
    alert('You have used the Bonus life!');
  }

  if (monsterHealth <= 0 && playerHealth > 0) {
    alert('You win');
    writeToLog(logGameOver, 'Player won', monsterHealth, playerHealth);
    // reset()
  } else if (monsterHealth > 0 && playerHealth <= 0) {
    alert('You Lost!');
    writeToLog(logGameOver, 'Monster won', monsterHealth, playerHealth);
    // reset()
  } else if (monsterHealth <= 0 && playerHealth <= 0) {
    alert("it's a Draw");
    writeToLog(logGameOver, "it's a Draw", monsterHealth, playerHealth);
    // reset()
  }
  // in the if statement below we try to combine the three condition above with a little code as we want to implement if mhealth || phealth <=0 no mather if you win or lost or it's a draw
  if (playerHealth <= 0 || monsterHealth <= 0) {
    reset();
  }
}
function attackMonster(mode) {
  let maxDamage = mode === attack ? attackPlayerValue : strongAttackValue;
  let playerAttack = mode === attack ? logPlayerAttack : logPlayerStrongAttack;

  // if (mode === attack) {
  //   maxDamage = attackPlayerValue;
  //   playerAttack = logPlayerAttack;
  // } else {
  //   maxDamage = strongAttackValue;
  //   playerAttack = logPlayerStrongAttack;
  // }

  const monsterDamage = dealMonsterDamage(maxDamage);
  monsterHealth -= monsterDamage;
  writeToLog(playerAttack, monsterDamage, monsterHealth, playerHealth);
  endRound();
}
function attackHandler() {
  attackMonster(attack);
}

function strongAttackHandler() {
  attackMonster(strongAttack);
}

function healHandler() {
  let healval;

  if (playerHealth >= choosenMaxLife - healValue) {
    console.log('hello');
    alert("You can't heal more!");
    healval = choosenMaxLife - playerHealth;
  } else {
    console.log('hello2');
    healval = healValue;
  }
  increasePlayerHealth(healval);
  playerHealth += healValue;
  writeToLog(logPlayerHeal, 'Player Heal', monsterHealth, playerHealth);

  endRound();
}

function printLog() {
  // for (let i = 0; i < 3; i++) {
  //   console.log(i);
  // }

  // while is same as old for loop but with the condition only and initializing variable outside and incrementing inside
  let j = 0;
  // while (j < 3) {
  //   console.log(j);
  //   j++;
  // }

  // syntax of do while is the same as while but it execute the body first then check the condition
  outerWhile: do {
    // labeled statement used to control another loop that you currently not in with (break to stop or continue to skip)
    console.log('outer', j);
    for (let k = 0; k < 5; k++) {
      if (k === 3) {
        break outerWhile;
      }
      console.log('inner', k);
    }
    j++;
  } while (j < 3);
  for (let i = 0; i < battleLog.length; i++) {
    // i print index of array but battleLog[i] print element of array & battleLog print array
    console.log(i, battleLog[i]);
    console.log(battleLog);
  }

  // (for of) uses with array and strings only as word has array of characters
  // advantage of the loop above is that has access to index but we can overcome here by initializing variable outside and increment it inside
  let i = 0;
  for (const element of battleLog) {
    if ((!islogged && islogged !== 0) || islogged < i) {
      // console.log(i);
      // // log the full array and it's elements
      // console.log(battleLog);
      // // log the element inside array
      // console.log(element);

      for (const key in element) {
        console.log(key, element[key]);
      }
      islogged = i;
      break;
    }
    i++;
  }
  for (let i = 0; i < 5; i++) {
    console.log(i);
    if (i === 3) {
      // break keyword will stop the iteration if the condition is met but continue will skip the meted condition and continue after it
      break;
    }
  }
  // while loop is perfect here when you have condition inside loop and don't know when it ends
  const randomNumber = [];
  let finished = false;

  // in case of boolean value only run while loop if condition is true and if not will not run
  while (!finished) {
    let rndmNumber = Math.random();
    randomNumber.push(rndmNumber);

    if (rndmNumber > 0.5) {
      finished = true;
      console.log(randomNumber);
    }
  }
}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);
logBtn.addEventListener('click', printLog);
