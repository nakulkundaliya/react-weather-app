import { Component } from 'react';
import moment from 'moment';
import { WeatherCard } from 'components';
import './styles.css';
import { getHourInterval } from 'utils/getHourInterval';
import { getWeather } from 'services/api';

const cities = [
  { label: 'Ottawa', value: 'ottawa' },
  { label: 'Moscow', value: 'moscow' },
  { label: 'Tokyo', value: 'tokyo' },
];

export default class Home extends Component {
  state = {
    selectedCity: 'ottawa',
    weatherData: null,
  };
  componentDidMount(): void {
    this.getWeatherData();
  }

  handleCity(city: string) {
    this.setState({ selectedCity: city }, () => this.getWeatherData());
  }
  async getWeatherData() {
    const { selectedCity } = this.state
    try {
      const res = await getWeather(selectedCity);
      const getCurrentTimeIn24Hrs = moment().format('HH');
      const getInterval = getHourInterval(parseInt(getCurrentTimeIn24Hrs)); 
      const intervalToString = `${getInterval}:00`;
      const otherDaysList =
        // @ts-ignore
        res.data?.list?.filter((item: any) =>
          item?.dt_txt?.includes(intervalToString)
        ) || [];
      this.setState({ weatherData: otherDaysList });
    } catch (err) {
      console.log('Error', err);
    }
  }

  const CityToggleView = () => {
    const { selectedCity } = this.state
    return (
      <div className='city-toggle-container'>
        {cities.map(({ label, value }) => (
          <div key={value}>
            <p
              className={
                selectedCity === value
                  ? 'selected-city'
                  : 'unselected-city'
              }
              onClick={() => this.handleCity(value)}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { weatherData } = this.state
    return (
      <div className='container'>
        <CityToggleView />
        {weatherData && (
          <div>
            <WeatherCard data={weatherData} />
          </div>
        )}
      </div>
    );
  }
}
