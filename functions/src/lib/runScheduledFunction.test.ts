import * as functions from "firebase-functions";
import { runScheduledFunction } from "./runScheduledFunction";
import axios from "axios";
import { mocked } from 'ts-jest/utils';

jest.mock('axios');
jest.mock('firebase-functions');

describe('runScheduledFunction Tests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  mocked(functions.config).mockReturnValue({ config: { 
    username: 'burrito', 
    pass: 'taco', 
    testnet_url: 'http://testing.com',
    username_dev: 'burrito_dev', 
    pass_dev: 'taco_dev', 
    mainnet_url: 'http://therealthing.com',
  } })

  it('should return a successful response', async () => {
    const axiosSpy = mocked(axios.post).mockResolvedValue({ data: 'ok' });

    const result = await runScheduledFunction({ path: '/apiPath', env: 'dev' });
    expect(result).toBeNull();
    expect(axiosSpy).toHaveBeenCalledWith("http://testing.com/apiPath", {}, { "headers": { "Authorization": "Basic YnVycml0b19kZXY6dGFjb19kZXY=" } });
  });

  it('should fail and throw error when axios returns an error', async () => {
    mocked(axios.post).mockRejectedValue('there was an error');

    try {
      await runScheduledFunction({ path: '/apiPath', env: 'dev' });
    } catch (error) {
      expect(error).toEqual('there was an error');
    }
  });
});