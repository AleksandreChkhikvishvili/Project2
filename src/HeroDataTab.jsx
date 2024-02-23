import React, { useState, useEffect } from "react";
let key = process.env.REACT_APP_API_KEY;

const HeroDataTab = ({ setHeroes }) => {
  const [heroData, setHeroData] = useState({});
  const [selectedHeroId, setSelectedHeroId] = useState("");
  const [heroes, setLocalHeroes] = useState([]);
  const url = `https://dota2-heroes.p.rapidapi.com/heroes/english/${selectedHeroId}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${key}`,
      "X-RapidAPI-Host": "dota2-heroes.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setHeroData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHeroData();
  }, [url, options]);

  useEffect(() => {
    const fetchHeroes = async () => {
      const heroesUrl = "https://dota2-heroes.p.rapidapi.com/heroes/english";

      try {
        const response = await fetch(heroesUrl, options);
        const result = await response.json();
        setLocalHeroes(result);
        setHeroes(result); // Passing the updated hero list back to HeroesTab
      } catch (error) {
        console.error(error);
      }
    };

    fetchHeroes();
  }, []);

  return (
    <div>
      <h1>Hero Data</h1>
      <select
        value={selectedHeroId}
        onChange={(e) => setSelectedHeroId(e.target.value)}
      >
        <option value="" disabled>
          Select a hero
        </option>
        {heroes.map((hero) => (
          <option key={hero.id} value={hero.id}>
            {hero.name_loc}
          </option>
        ))}
      </select>
      {Object.keys(heroData).length > 0 ? (
        <div>
          <h2>{heroData.name_loc}</h2>
          <img
            src={heroData.thumb_image}
            alt={heroData.attribute_img}
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
          <h3>Attributes:</h3>
          <p>
            <img
              src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png"
              alt="strength"
            />
            Strength: {heroData.str_base} (+{heroData.str_gain})
          </p>
          <p>
            <img
              src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png"
              alt="agility"
            />
            Agility: {heroData.agi_base} (+{heroData.agi_gain})
          </p>
          <p>
            <img
              src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png"
              alt="intelligence"
            />
            Intelligence: {heroData.int_base} (+{heroData.int_gain})
          </p>
          <p>Primary Attribute: {heroData.primary_attr}</p>
          <p>Attack Capability: {heroData.attack_capability}</p>
          <h3>Stats:</h3>
          <p>Complexity: {heroData.complexity}</p>
          {/* <p>
            Role Levels:{" "}
            {heroData.role_levels
              ? heroData.role_levels.join(", ")
              : "Not available"}
          </p> */}
          <h3>Description:</h3>
          <p>{heroData.bio_loc}</p>
          <p>{heroData.hype_loc}</p>
          <p>{heroData.npe_desc_loc}</p>
        </div>
      ) : (
        <p>No hero selected</p>
      )}
    </div>
  );
};

export default HeroDataTab;
