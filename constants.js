// Constants
module.exports = {
  CONSOLE_COLOR_YELLOW: "\x1b[33m%s\x1b[0m",
  CONSOLE_COLOR_RED: "\x1b[31m%s\x1b[0m",
  CONSOLE_COLOR_GREEN: "\x1b[32m%s\x1b[0m",
  CRITICAL_MULTIPLIER_INVALID:
    "Invalid critical multiplier value. Please select a value between 1 and 5.",
  CRITICAL_MULTIPLIER_UNDEFINED:
    "Critical multiplier value not defined. Please enter a value between 1 and 5.",
  // Constants generators
  getAttackString: (player, enemy, enemyUpdate, criticalDamage) => {
    return `${player.name} attacked ${enemy.name}: 
    ${enemy.health} ===> ${enemyUpdate.health}. 
    ${player.damage + criticalDamage} DAMAGE TAKEN. OUCH!`;
  },
  getEnemyHealthString: ({ name }, { health }) =>
    `${name}'s health is now: ${health} HP.`,
  getPlayerDeathString: ({ name }) => {
    return `${name} DIED! RIP, YOU LEGEND, YOUR LEGACY WILL NOT BE FORGOTTEN!`;
  },
  getBattleWinnerString: ({ name }) => `${name} WON! CONGRATS, YOU SILLY CAT!`
};
