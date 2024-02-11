// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((func) => func),
}));

describe('throttledGetDataFromApi', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  const relativePath = '/user';

  const responseData = {
    data: {
      id: 1,
      name: 'test',
    },
  };

  beforeEach(() => {
    axios.create = jest.fn().mockReturnThis();
    axios.get = jest.fn().mockResolvedValue(responseData);
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenLastCalledWith({
      baseURL: baseUrl,
    });
  });

  test('should perform request to correct provided url', async () => {
    expect(axios.get).not.toHaveBeenCalled();

    await throttledGetDataFromApi(relativePath);

    expect(axios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const resultData = await throttledGetDataFromApi(relativePath);

    expect(resultData).toEqual(responseData.data);
  });
});
