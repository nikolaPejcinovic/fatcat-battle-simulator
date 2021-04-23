// Constants
const {
  CONSOLE_COLOR_YELLOW,
  CONSOLE_COLOR_RED,
  CONSOLE_COLOR_GREEN,
  CRITICAL_MULTIPLIER_INVALID,
  CRITICAL_MULTIPLIER_UNDEFINED,
  getAttackString,
  getEnemyHealthString,
  getPlayerDeathString,
  getBattleWinnerString
} = require("./constants");

// Config
const { createPlayer, criticalMultiplier, initPlayers } = require("./config");

// Players array copy used for battle stats updates
let players = [...initPlayers];

// Battle
if (isNaN(criticalMultiplier)) {
  console.log(CONSOLE_COLOR_RED, CRITICAL_MULTIPLIER_UNDEFINED);
} else if (criticalMultiplier > 5 || criticalMultiplier < 1) {
  console.log(CONSOLE_COLOR_RED, CRITICAL_MULTIPLIER_INVALID);
} else {
  initPlayers.forEach(({ name: initPlayerName, rechargeTime }) => {
    const setTimeoutEnhanced = () => {
      const playerIndex = players.findIndex(
        ({ name }) => name === initPlayerName
      );
      const player = players[playerIndex];

      if (player?.health > 0) {
        const criticalDamage =
          player.criticalChance >= Math.random()
            ? player.damage * criticalMultiplier
            : 0;

        const restPlayers = [
          ...players.slice(0, playerIndex),
          ...players.slice(playerIndex + 1)
        ];

        const randomIndex = Math.floor(Math.random() * restPlayers.length);

        const enemy = restPlayers[randomIndex];

        const enemyUpdate = createPlayer({
          name: enemy.name,
          health: enemy.health - (player.damage + criticalDamage)
        });

        const attackString = getAttackString(
          player,
          enemy,
          enemyUpdate,
          criticalDamage
        );

        console.log(CONSOLE_COLOR_YELLOW, attackString);

        const enemyHealthString = getEnemyHealthString(enemy, enemyUpdate);

        console.log(enemyHealthString);

        if (enemyUpdate?.health < 0) {
          players = players.filter(({ name }) => name !== enemyUpdate.name);

          const playerDeathString = getPlayerDeathString(enemyUpdate);

          console.log(CONSOLE_COLOR_RED, playerDeathString);
        } else {
          const enemyIndex = players.findIndex(
            ({ name }) => name === enemyUpdate.name
          );

          players = [
            ...players.slice(0, enemyIndex),
            enemyUpdate,
            ...players.slice(enemyIndex + 1)
          ];
        }

        if (players.length === 1) {
          const battleWinnerString = getBattleWinnerString(players[0]);

          console.log(CONSOLE_COLOR_GREEN, battleWinnerString);
        }

        if (players.length > 1) {
          setTimeout(setTimeoutEnhanced, player.rechargeTime);
        }
      }
    };

    setTimeout(setTimeoutEnhanced, rechargeTime);
  });
}
