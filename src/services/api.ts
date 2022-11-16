import instance from './instance';

const APP_ID = process.env.REACT_APP_OPEN_WEATHER_APPID;

export const getWeather = async (city: string) => {
  try {
    const res = await instance.get(
      `/forecast?q=${city}&APPID=${APP_ID}&units=metric`
    );
    return res;
  } catch (err) {
    return err;
  }
};
