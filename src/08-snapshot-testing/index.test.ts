// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const inputValues = [1, 2, 3];
    const expectedLinkedList = generateLinkedList(inputValues);
    expect(expectedLinkedList).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    });
  });

  test('should generate linked list from values 2', () => {
    const inputValues = [1, 2, 3];
    const generatedLinkedList = generateLinkedList(inputValues);
    expect(generatedLinkedList).toMatchSnapshot();
  });
});
