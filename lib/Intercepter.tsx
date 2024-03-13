import axios from 'axios';
import { getSession } from 'next-auth/react';

const GreenStoneApiClient = axios.create({
  baseURL: 'https://green-stone-api-dev.feelanetcloud.com',
});

GreenStoneApiClient.interceptors.request.use(
  async config => {
    const session = await getSession();

    // 요청 전 공통적으로 처리할 작업을 여기에 추가합니다.
    // 예를 들어, 토큰을 헤더에 추가하는 작업 등을 할 수 있습니다.
    config.headers['Content-Type'] = "application/json;charset=utf-8'";
    config.headers['Accept'] = 'application/json';
    // config.headers["Access-Control-Allow-Origin"] = "*";

    config.headers['Authorization'] = `Bearer ${session?.access_token}`;
    return config;
  },
  error => {
    // 요청 전 에러 처리를 여기에 추가합니다.
    return Promise.reject(error);
  },
);

GreenStoneApiClient.interceptors.response.use(
  response => {
    // 응답 후 공통적으로 처리할 작업을 여기에 추가합니다.
    return response;
  },
  error => {
    // 응답 후 에러 처리를 여기에 추가합니다.
    console.error(error);
    return Promise.reject(error);
  },
);
export default GreenStoneApiClient;
