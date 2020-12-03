import { traverse, getNextCoords } from './solution';

describe('day03', () => {
  const sampleInput = [
    '..##.......',
    '#...#...#..',
    '.#....#..#.',
    '..#.#...#.#',
    '.#...##..#.',
    '..#.##.....',
    '.#.#.#....#',
    '.#........#',
    '#.##...#...',
    '#...##....#',
    '.#..#...#.#'
  ];

  describe('getNextCoords', () => {
    const map = [
      '01234',
      '56789'
    ];

    it('should move within', () => {
      const next = getNextCoords(map, [0,0], [1,3]);

      expect(map[next[0]][next[1]]).toEqual('8');
    });

    it('should go beyond edge', () => {
      const next = getNextCoords(map, [0,3], [1,3]);

      expect(map[next[0]][next[1]]).toEqual('6');
    })
  });

  it('tests sample', () => {
    expect(traverse(sampleInput, [0,0], [1,3])).toEqual(7);
  });
});
