import { getSeatId, findMissing } from './solution';

describe.each([
  ['BFFFBBFRRR', 567],
  ['FFFBBBFRRR', 119],
  ['BBFFBBFRLL', 820],
])('day05', (boardingPass, seatId) => {
  it(`should get seat id for ${boardingPass}`, () => {
    expect(getSeatId(boardingPass)).toEqual(seatId);
  });
});


describe.each([
  [[1,2,3,5,6], 4],
  [[1,2,3,5], 4],
  [[1,2,3,4,5,6,7,8,9,10,12], 11]
])('findMissing', (input, expected) => {
  it(`should find missing for ${input}`, () => {
    expect(findMissing(input)).toEqual(expected);
  });
});
