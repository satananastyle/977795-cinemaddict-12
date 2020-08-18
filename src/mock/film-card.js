
const FIRST_FILM = 1895;
const TASK_COUNT = 5;
const MAX_RUNTIME_MIN = 59;
const MAX_RUNTIME_HOURS = 3;
const MAX_AGE = 18;

const titles = [
  `Made for each other`,
  `Popeye meets Sinbad`,
  `Sagebrush trail`,
  `Santa-Claus conquers the martians`,
  `The dance of life`,
  `The great flamarion`,
  `The man with the golden arm`,
];

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const genres = [
  `Drama`,
  `Musical`,
  `Western`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
  `Film-Noir`,
];

const countries = [
  `USA`,
  `Great Britain`,
  `France`,
  `Germany`,
  `India`,
  `Italy`,
  `Spain`,
];

const directors = [
  `Anthony Mann`,
  `Steven Spielberg`,
  `David Fincher`,
  `James Cameron`,
  `Martin Scorsese`,
  `Christopher Nolan`,
  `Robert Zemeckis`,
  `Ridley Scott`,
  `Quentin Tarantino`,
  `Peter Jackson`,
];

const writers = [
  `Billy Wilder`,
  `Quentin Tarantino`,
  `Francis Ford Coppola`,
  `Charlie Kaufman`,
  `Woody Allen`,
  `George Lucas`,
  `Stanley Kubrick`,
  `Frank Darabont`,
  `Aaron Sorkin`,
  `Luc Besson`,
];

const actors = [
  `Alan Rickman`,
  `Benedict Cumberbatch`,
  `James McAvoy`,
  `Jake Gyllenhaal`,
  `Christian Bale`,
  `Anne Hathaway`,
  `Emma Stone`,
  `Emily Blunt`,
  `Amy Adams`,
  `Tilda Swinton`,
];


const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandom = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  const random = lower + Math.random() * (upper - lower);
  return random.toFixed(1);
};

const generateRandomInfo = (info) => {

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return info[randomIndex];
};

const generateRandomList = (list) => {
  const randomIndex = getRandomInteger(1, genres.length - 1);

  const randomList = [];

  for (let i = 0; i <= randomIndex; i++) {
    randomList.push(list[getRandomInteger(0, list.length - 1)]);
  }

  return randomList;
};

const generateDescription = () => {
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis.
  Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`;

  const descriptionItems = text.split(`.`);

  const description = generateRandomList(descriptionItems);

  return description.join(`. `);
};

const generateDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const generateFilmCard = () => {
  return {
    title: generateRandomInfo(titles),
    poster: generateRandomInfo(posters),
    description: generateDescription(),
    comments: getRandomInteger(0, TASK_COUNT),
    rating: getRandom(0, 10),
    release: generateDate(new Date(FIRST_FILM, 0, 1), new Date()),
    genres: generateRandomList(genres),
    runtime: {
      hours: getRandomInteger(0, MAX_RUNTIME_HOURS),
      min: getRandomInteger(0, MAX_RUNTIME_MIN)
    },
    director: generateRandomInfo(directors),
    writers: generateRandomList(writers),
    actors: generateRandomList(actors),
    country: generateRandomInfo(countries),
    age: getRandomInteger(0, MAX_AGE),
  };
};