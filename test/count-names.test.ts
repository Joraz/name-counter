import { countNames } from '../src';

it('should count names when given text', () => {
  const text = 'Oliver Twist, was sometimes known as Oliver, but his full name was Mr. Oliver James Twist. For the sake of ease we will just call him Oliver.';
  const titles = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr'];
  const firstNames = ['Aaron', 'Adelaida', 'James', 'Madalyn', 'Margarette', 'Oliver', 'Theresa'];
  const lastNames = ['Abbey', 'Gonazlez', 'Poehlein', 'Tapscott', 'Twist', 'Zwingman'];

  const result = countNames(text, titles, firstNames, lastNames);

  expect(result).toHaveLength(3);
  const [r1, r2, r3] = result;
  expect(r1).toEqual({
    name: 'Oliver',
    timesFound: 2
  });
  expect(r2).toEqual({
    name: 'Oliver Twist',
    timesFound: 1
  });
  expect(r3).toEqual({
    name: 'Mr Oliver James Twist',
    timesFound: 1
  });
});

it('should count last names on their own as names', () => {
  const text = "'There's two on you,' said the man, thrusting the candle farther out, and shielding his eyes with his hand. 'Who's the t'other one?' 'A new pal,' replied Jack Dawkins, pulling Oliver forward. 'Where did he come from?' 'Greenland. Is Fagin upstairs?' 'Yes, he's a sortin' the wipes. Up with you!' The candle was drawn back, and the face disappeared.";
  const titles = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr'];
  const firstNames = ['Aaron', 'Adelaida', 'Jack', 'Madalyn', 'Margarette', 'Oliver', 'Theresa'];
  const lastNames = ['Abbey', 'Fagin', 'Dawkins', 'Gonazlez', 'Poehlein', 'Tapscott', 'Twist', 'Zwingman'];

  const result = countNames(text, titles, firstNames, lastNames);

  expect(result).toHaveLength(3);
  const [r1, r2, r3] = result;
  expect(r1).toEqual({
    name: 'Jack Dawkins',
    timesFound: 1
  });
  expect(r2).toEqual({
    name: 'Oliver',
    timesFound: 1
  });
  expect(r3).toEqual({
    name: 'Fagin',
    timesFound: 1
  });
});