// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout - 50);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalled();
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), timeout);
    setTimeoutSpy.mockRestore();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and interval', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, interval);
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const intervalTime = 1000;

    doStuffByInterval(callback, intervalTime);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(intervalTime);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(intervalTime * 2);
    expect(callback).toHaveBeenCalledTimes(3);

    jest.advanceTimersByTime(intervalTime * 3);
    expect(callback).toHaveBeenCalledTimes(6);

    setIntervalSpy.mockRestore();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    const mockPath = 'test.txt';

    await readFileAsynchronously(mockPath);

    expect(joinSpy).toHaveBeenCalledWith(__dirname, mockPath);
    joinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const mockPath = 'test.txt';
    const result = await readFileAsynchronously(mockPath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue('text text');

    const mockPath = 'test.txt';
    const result = await readFileAsynchronously(mockPath);

    expect(result).toBe('text text');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
