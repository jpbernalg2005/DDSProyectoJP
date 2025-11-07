function BuildPreview({ build }) {
  const { arma, armadura, comida, pocion } = build;

  return (
    <div style={{ marginTop: "3rem" }}>
      <h2>Tu Build Actual</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
        {[arma, armadura, comida, pocion].map((item, i) =>
          item ? (
            <img key={i} src={`https://render.albiononline.com/v1/item/${item}.png`} alt={item} width="100" />
          ) : (
            <div
              key={i}
              style={{
                width: "100px",
                height: "100px",
                border: "2px dashed gray",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              ?
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default BuildPreview;
