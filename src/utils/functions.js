// Добавляет рандомные команды
export const addRandomTeams = (count) => {
  let teams = [];

  for (let team = 0; team < count; team++) {
    teams.push(`Команда-${team + 1}`);
  }

  return teams;
};

// Перемешивает массив
export const shuffle = (array) => {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

// Возвращает рандомное число от 0 до max
export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
