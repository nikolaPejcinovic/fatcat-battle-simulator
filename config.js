// Player object generator
const createPlayer = ({ name, health }) => ({
  name,
  health,
  rechargeTime: (1000 * health) / 100,
  damage: health / 100,
  criticalChance: 10 - health / 10
});

// Critical multiplier integer obtained from config via node process
const criticalMultiplier = parseInt(process.argv[2]);

// Coka and Maxa are names of my two cats. Lama is an imaginary character :)
const names = ["Maxa", "Coka", "Lama"];

// Initial players array
const initPlayers = names.map(n => createPlayer({ name: n, health: 100 }));

module.exports = { createPlayer, criticalMultiplier, initPlayers };
