import React, { useState } from "react";
import HeroesTab from "./HeroesTab";
import HeroDataTab from "./HeroDataTab";

const App = () => {
  const [activeTab, setActiveTab] = useState("heroes");

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab("heroes")} className="button">
          Heroes
        </button>
        <button onClick={() => setActiveTab("heroData")} className="button1">
          Hero Data
        </button>
      </div>

      {activeTab === "heroes" && <HeroesTab />}
      {activeTab === "heroData" && <HeroDataTab />}
    </div>
  );
};

export default App;
