interface DayForecast {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      icon: string;
      text: string;
    };
  };
}

interface WeekForecastProps {
  data: {
    forecast?: {
      forecastday: DayForecast[];
    };
  };
}

const WeekForecast = ({ data }: WeekForecastProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 w-full">
      {data.forecast?.forecastday.map((day, index: number) => (
        <div
          key={index}
          className="bg-white/40 p-2 text-center rounded-lg flex flex-col items-center"
        >
          <p>
            {new Date(day.date).toLocaleDateString('en-UK', {
              weekday: 'short',
            })}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={day.day.condition.icon} alt={day.day.condition.text} />
          <div>
            <p>H {day.day.maxtemp_c}&deg;C</p>
            <p>L {day.day.mintemp_c}&deg;C</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekForecast;
