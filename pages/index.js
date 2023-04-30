import Spinner from "@/components/Spinner";
import Weather from "@/components/Weather";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setWeather(res.data);
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
    setCity("");
  };
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <div className="">
          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-[1]" />
          {/* Background image */}
          <Image
            alt="z"
            src="https://images.unsplash.com/photo-1569511735406-407c5884625c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80"
            layout="fill"
            className="w-full h-full object-cover"
          />
          {/* Search */}
          <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
            <form
              onSubmit={fetchWeather}
              className="flex items-center justify-between w-full m-auto p-3 bg-transparent border border-gray-300 text-white"
            >
              <div>
                <input
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-transparent border-none text-white focus:outline-none text-2xl "
                  type="text"
                  placeholder="Хот хайх"
                />
              </div>
              <button onClick={fetchWeather}>
                <BsSearch size={22} />
              </button>
            </form>
          </div>
          {error && (
            <p className="text-white font-bold mt-5 relative mx-auto w-full text-center z-10">
              Тийм нэртэй хот олдсонгүй!
            </p>
          )}
          {/* Weather */}
          {weather.main && <Weather data={weather} />}
        </div>
      </>
    );
  }
}
