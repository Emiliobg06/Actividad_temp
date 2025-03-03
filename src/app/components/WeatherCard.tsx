import { Droplets, Wind, X } from "lucide-react";

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
  };
}

interface WeatherCardProps {
  data: WeatherData;
  onRemove: () => void; // Callback function to handle removal
}

const WeatherCard = ({ data, onRemove }: WeatherCardProps) => {
  return (
    <div className="weather-card glass rounded-xl p-4 w-80 relative shadow-lg hover:shadow-xl transition-shadow">
      <span>
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <X className="w-5 h-5 text-gray-500" />
      </button>
      </span>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">{data.location.name}</h2>
          <p className="text-gray-500 text-sm">{data.location.country}</p>
        </div>
        <img
          src={data.current.condition.icon}
          alt={data.current.condition.text}
          className="w-12 h-12"
        />
      </div>
      <div className="text-3xl font-bold mb-4">{data.current.temp_c}°C</div>
      <div className="text-md mb-4">{data.current.condition.text}</div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <Droplets className="text-blue-500" />
          <span className="text-gray-600 text-sm">
            Humidity: {data.current.humidity}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="text-gray-500" />
          <span className="text-gray-600 text-sm">
            Wind: {data.current.wind_kph} km/h
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;