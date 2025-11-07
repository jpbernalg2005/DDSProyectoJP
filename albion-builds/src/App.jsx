import { useState } from "react";
import ItemSelector from "./components/ItemSelector";
import BuildPreview from "./components/BuildPreview";
import SavedBuilds from "./components/SavedBuilds";

function App() {
  const [build, setBuild] = useState({
    arma: "",
    armadura: "",
    comida: "",
    pocion: ""
  });

  const handleSelect = (type, value) => {
    setBuild(prev => ({ ...prev, [type]: value }));
  };

  const handleSave = () => {
    const builds = JSON.parse(localStorage.getItem("builds")) || [];
    builds.push(build);
    localStorage.setItem("builds", JSON.stringify(builds));
    alert("✅ Build guardada");
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Albion Build Tracker</h1>
      <p>Selecciona tus ítems y guarda tu build</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
        <ItemSelector tipo="arma" onSelect={handleSelect} />
        <ItemSelector tipo="armadura" onSelect={handleSelect} />
        <ItemSelector tipo="comida" onSelect={handleSelect} />
        <ItemSelector tipo="pocion" onSelect={handleSelect} />
      </div>

      <button onClick={handleSave} style={{ marginTop: "2rem" }}>
        Guardar Build
      </button>

      <BuildPreview build={build} />

      <SavedBuilds />
    </div>
  );
}

export default App;
