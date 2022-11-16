import { Component } from 'react';
import './styles.css';
import { BsClouds, BsCloudSnow } from 'react-icons/bs';
import moment from 'moment';

interface Props {
  data: any;
}

interface IconType {
  type: string;
  size?: number;
}
interface TemperaturProps {
  temp: number;
  size?: 'medium' | 'large';
}
export default class WeatherCard extends Component<Props> {
  render() {
    const { data } = this.props;
    const todayData = data?.[0];
    const otherDaysData = data?.slice(1);

    const WeatherIcon = ({ type, size = 60 }: IconType) => {
      const weatherType = type?.toLowerCase() || '';
      switch (weatherType) {
        case 'clouds':
          return <BsClouds size={size} />;
        case 'snow':
          return <BsCloudSnow size={size} />;
        default:
          return <BsClouds size={size} />;
      }
    };

    const Temperature = ({ temp, size }: TemperaturProps) => {
      return (
        <p
          className={
            size === 'large' ? 'temperature-large' : 'temperature-medium'
          }
        >
          {Math.floor(temp || 0)}°
        </p>
      );
    };
    return (
      <div className='weather-card'>
        <div className='weather-card-item-today'>
          <p className='weather-text'>Today</p>
          <div className='today-weather-item'>
            <WeatherIcon type={todayData?.weather?.[0]?.main} size={120} />

            <div className='weather-card-item-sub'>
              <Temperature temp={todayData?.main?.temp} size='large' />
              <p className='weather-text'>{todayData?.weather?.[0]?.main}</p>
            </div>
          </div>
        </div>

        <div className='weather-card-item-other-days'>
          {otherDaysData?.map((item: any) => {
            const day = moment.unix(item.dt).format('ddd');
            return (
              <div className='weather-card-item' key={item.dt}>
                <h3>{day}</h3>
                <WeatherIcon type={item?.weather?.[0]?.main} />
                <Temperature temp={item?.main?.temp} size='medium' />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
