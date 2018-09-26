import { toMap } from '../src/utils';

it('should turn an array into an object where the keys and values correspond to array entries', () => {
  const result = toMap(['one', 'two', 'three']);
  expect(result).toEqual({
    one: 'one',
    two: 'two',
    three: 'three'
  });
});