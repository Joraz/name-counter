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