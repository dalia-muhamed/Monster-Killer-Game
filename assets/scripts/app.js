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
const enterredLife = prompt('Choose MaxLife for you and the Monster', '100');
choosenMaxLife = parseInt(enterredLife);

if (isNaN(choosenMaxLife) || choosenMaxLife <= 0) {
  choosenMaxLife = 100;
}

adjustHealthBars(choosenMaxLife);

function writeToLog(event, value, currentMonsterHealth, currentPlayerHealth) {
  let logEntries = {
    eve: event,
    val: value,
    finalMonsterHealth: currentMonsterHealth,
    finalPlayerHealth: currentPlayerHealth,
  };

  if (event === logPlayerAttack) {
    logEntries.target = 'Monster';
  } else if (event === logPlayerStrongAttack) {
    logEntries.target = 'Monster';
  } else if (event === logMonsterAttack) {
    logEntries.target = 'Player';
  } else if (event === logPlayerHeal) {
    logEntries.target = 'Player';
  }
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
  let maxDamage;
  let playerAttack;
  if (mode === attack) {
    maxDamage = attackPlayerValue;
    playerAttack = logPlayerAttack;
  } else {
    maxDamage = strongAttackValue;
    playerAttack = logPlayerStrongAttack;
  }

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
    alert("You can't heal more!");
    healval = choosenMaxLife - playerHealth;
  } else {
    healval = healValue;
  }
  increasePlayerHealth(healval);
  playerHealth += healValue;
  writeToLog(logPlayerHeal, 'Player Heal', monsterHealth, playerHealth);

  endRound();
}

function printLog() {
  console.log(battleLog);
}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);
logBtn.addEventListener('click', printLog);
