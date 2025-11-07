import { useState, useEffect } from "react";

function SavedBuilds() {
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("builds")) || [];
    setBuilds(data);
  }, []);

  return (
    <div style={{ marginTop: "3rem" }}>
      <h2>Builds Guardadas</h2>
      {builds.length === 0 ? (
        <p>No hay builds guardadas aún</p>
      ) : (
        builds.map((b, index) => (
          <div key={index} style={{ borderTop: "1px solid #ccc", padding: "1rem" }}>
            <p><strong>Build #{index + 1}</strong></p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              {[b.arma, b.armadura, b.comida, b.pocion].map((item, i) =>
                item ? (
                  <img key={i} src={`https://render.albiononline.com/v1/item/${item}.png`} alt={item} width="80" />
                ) : null
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default SavedBuilds;
