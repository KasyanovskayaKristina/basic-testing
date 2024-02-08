// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => ({
  ...jest.requireActual('./index'),
  mockOne: jest.fn(),
  mockTwo: jest.fn(),
  mockThree: jest.fn(),
}));

describe('partial mocking', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spyConsoleLog = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(spyConsoleLog).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const spyConsoleLog = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(spyConsoleLog).toHaveBeenCalled();
  });
});
