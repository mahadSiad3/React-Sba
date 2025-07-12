import { useEffect } from 'react'
import '../App.css'
import { useState } from 'react'


export default function Recommend() {
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [recommendationCount, setRecommendationCount] = useState(1);

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function getAnimeSeason() {
      const genreUrl = "https://api.jikan.moe/v4/genres/anime";
      const response = await fetch(genreUrl);
      const data = await response.json();
      setGenres(data.data);

      const seasonsUrl = "https://api.jikan.moe/v4/seasons";
      const response2 = await fetch(seasonsUrl);
      const seasonData = await response2.json();

      const yearsArray = [];
      for (let i = 0; i < seasonData.data.length; i++) {
        yearsArray.push(seasonData.data[i].year);
      }
      setYears(yearsArray);

      if (seasonData.data[1]) {
        setSeasons(seasonData.data[1].seasons);
      }
    }

    getAnimeSeason();
  }, []);

  async function fetchRecommendations() {
    const url = `https://api.jikan.moe/v4/seasons/${selectedYear}/${selectedSeason}?limit=25`;
    const response = await fetch(url);
    const data = await response.json();

    const filtered = [];
    for (let i = 0; i < data.data.length; i++) {
      const anime = data.data[i];
      for (let j = 0; j < anime.genres.length; j++) {
        if (anime.genres[j].mal_id == selectedGenre) {
          filtered.push(anime);
          break;
        }
      }
    }

    if (filtered.length === 0) {
      alert("0 anime with that genre. Try another genre or season/year.");
      return;
    }

    if (filtered.length < recommendationCount) {
      alert("Only " + filtered.length + " anime found. Please select fewer recommendations.");
      return;
    }

    const selectedAnime = [];
    const usedIndexes = [];

    while (selectedAnime.length < recommendationCount) {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      if (!usedIndexes.includes(randomIndex)) {
        usedIndexes.push(randomIndex);
        selectedAnime.push(filtered[randomIndex]);
      }
    }

    setRecommendations(selectedAnime);
  }

  return (
    <div>
      <h1>Anime Recommendation Generator</h1>

      <div>
        <select id="genreSelection" onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">Select Genre</option>
          {genres.map(function (genre) {
            return <option key={genre.mal_id} value={genre.mal_id}>{genre.name}</option>;
          })}
        </select>

        <select id="yearSelection" onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">Select Year</option>
          {years.map(function (year, index) {
            return <option key={index} value={year}>{year}</option>;
          })}
        </select>

        <select id="seasonSelection" onChange={(e) => setSelectedSeason(e.target.value)}>
          <option value="">Select Season</option>
          {seasons.map(function (season, index) {
            return <option key={index} value={season}>{season}</option>;
          })}
        </select>

        <select id="numberOfRecommendations" onChange={(e) => setRecommendationCount(parseInt(e.target.value))}>
          {[1,2,3,4,5,6,7,8,9,10].map(function (number) {
            return <option key={number} value={number}>{number}</option>;
          })}
        </select>

        <button className="searchButton" onClick={fetchRecommendations}>Get Recommendations</button>
      </div>

      <div className="user-container">
        {recommendations.map(function (anime, index) {
          return (
            <div  className="anime-card">
              <img className="recommendedImage" src={anime.images.jpg.image_url} alt={anime.title} />
              <p>Name: {anime.title_english || anime.title}</p>
              <p>Status ON TV: {anime.status}, RUN: {anime.episodes} of {anime.duration}</p>
              <p style={{ color: anime.score < 6.5 ? "red" : "green" }}>
                My Anime List score: {anime.score}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}





