import React, { useState, useEffect } from "react";
import "./HeroesTab.css";
let key = process.env.REACT_APP_API_KEY;

const HeroesTab = () => {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      const url = "https://dota2-heroes.p.rapidapi.com/heroes/english";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": `${key}`,
          "X-RapidAPI-Host": "dota2-heroes.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        setHeroes(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHeroes();
  }, []);

  return (
    <div className="heroes-container">
      <div className="tab-container">
        <button className="tab">Heroes</button>
      </div>
      <div className="heroes-list">
        {heroes.map((hero) => (
          <div key={hero.id} className="hero">
            <img src={hero.image} alt={hero.name} />
            <p>{hero.name.replace("npc_dota_hero_", "")}</p>
            <img src={hero.attribute_img} alt={hero.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroesTab;
