import { useEffect, useState } from "react";

function ItemSelector({ tipo, onSelect }) {
  const [item, setItem] = useState("");
  const [data, setData] = useState(null);

  const itemsPorTipo = {
    arma: ["T4_BOW", "T4_AXE", "T4_FIRESTAFF"],
    armadura: ["T4_ARMOR_CLOTH_SET1", "T4_ARMOR_LEATHER_SET2", "T4_ARMOR_PLATE_SET3"],
    comida: ["T4_MEAL_SOUP", "T4_MEAL_STEW", "T4_MEAL_PIE"],
    pocion: ["T4_POTION_HEAL", "T4_POTION_COOLDOWN", "T4_POTION_ENERGY"]
  };

  useEffect(() => {
    if (!item) return;
    fetch(`https://www.albion-online-data.com/api/v2/stats/prices/${item}?locations=Lymhurst`)
      .then(res => res.json())
      .then(info => setData(info[0]))
      .catch(err => console.error(err));        
  }, [item]);

  return (
    <div style={{ border: "1px solid gray", borderRadius: "8px", padding: "1rem", width: "220px" }}>
      <h3>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h3>
      <select
        value={item}
        onChange={e => {
          setItem(e.target.value);
          onSelect(tipo, e.target.value);
        }}
      >
        <option value="">Selecciona {tipo}</option>
        {itemsPorTipo[tipo].map(it => (
          <option key={it} value={it}>{it}</option>
        ))}
      </select>

      {item && (
        <div style={{ marginTop: "1rem" }}>
          <img src={`https://render.albiononline.com/v1/item/${item}.png`} alt={item} width="100" />
          <p>💰 {data ? data.sell_price_min : "Cargando..."} plata</p>
        </div>
      )}
    </div>
  );
}

export default ItemSelector;
