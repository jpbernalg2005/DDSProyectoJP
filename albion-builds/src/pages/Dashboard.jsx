// src/pages/Dashboard.jsx
import { useState, useEffect, useRef } from "react"; // 👈 Importamos 'useRef'
import "../Dashboard.css"; 

// URL base para obtener la imagen de un ítem
const IMG_BASE_URL = "https://render.albiononline.com/api/v1/item/";

// ... (formatItemName y T8_RAW_IDS se mantienen igual) ...
const formatItemName = (id) => {
    // ... (función se mantiene igual) ...
    let name = id.replace('T8_', 'Tier 8 ');
    name = name.replace('ARMOR', 'Armadura').replace('HEAD', 'Casco').replace('SHOES', 'Botas');
    name = name.replace('PLATE', 'Placa').replace('LEATHER', 'Cuero').replace('CLOTH', 'Tela');
    name = name.replace('SET1', 'Defensor').replace('SET2', 'Cazador').replace('SET3', 'Caballero');
    name = name.replace('ROYAL', 'Real').replace('HELL', 'Infernal').replace('KEEPER', 'Guardían de la Naturaleza')
               .replace('AVALON', 'Avaloniano').replace('FEY', 'Feérico').replace('UNDEAD', 'No Muerto');
    name = name.replace(/_/g, ' ').replace(/\s\s+/g, ' ').toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
             
    return name.trim();
};

const T8_RAW_IDS = [
    // La lista completa T8_ELITE_ITEM_IDS que proporcionaste.
    "T8_ARMOR_PLATE_SET1", "T8_ARMOR_PLATE_SET2", "T8_ARMOR_PLATE_SET3", "T8_ARMOR_PLATE_ROYAL", "T8_ARMOR_PLATE_HELL", "T8_ARMOR_PLATE_KEEPER", "T8_ARMOR_PLATE_AVALON", "T8_ARMOR_PLATE_FEY", "T8_ARMOR_PLATE_UNDEAD",
    "T8_HEAD_PLATE_SET1", "T8_HEAD_PLATE_SET2", "T8_HEAD_PLATE_SET3", "T8_HEAD_PLATE_ROYAL", "T8_HEAD_PLATE_HELL", "T8_HEAD_PLATE_KEEPER", "T8_HEAD_PLATE_AVALON", "T8_HEAD_PLATE_FEY", "T8_HEAD_PLATE_UNDEAD",
    "T8_SHOES_PLATE_SET1", "T8_SHOES_PLATE_SET2", "T8_SHOES_PLATE_SET3", "T8_SHOES_PLATE_ROYAL", "T8_SHOES_PLATE_HELL", "T8_SHOES_PLATE_KEEPER", "T8_SHOES_PLATE_AVALON", "T8_SHOES_PLATE_FEY", "T8_SHOES_PLATE_UNDEAD",
    "T8_ARMOR_LEATHER_SET1", "T8_ARMOR_LEATHER_SET2", "T8_ARMOR_LEATHER_SET3", "T8_ARMOR_LEATHER_ROYAL", "T8_ARMOR_LEATHER_HELL", "T8_ARMOR_LEATHER_KEEPER", "T8_ARMOR_LEATHER_AVALON", "T8_ARMOR_LEATHER_FEY", "T8_ARMOR_LEATHER_UNDEAD",
    "T8_HEAD_LEATHER_SET1", "T8_HEAD_LEATHER_SET2", "T8_HEAD_LEATHER_SET3", "T8_HEAD_LEATHER_ROYAL", "T8_HEAD_LEATHER_HELL", "T8_HEAD_LEATHER_KEEPER", "T8_HEAD_LEATHER_AVALON", "T8_HEAD_LEATHER_FEY", "T8_HEAD_LEATHER_UNDEAD",
    "T8_SHOES_LEATHER_SET1", "T8_SHOES_LEATHER_SET2", "T8_SHOES_LEATHER_SET3", "T8_SHOES_LEATHER_ROYAL", "T8_SHOES_LEATHER_HELL", "T8_SHOES_LEATHER_KEEPER", "T8_SHOES_LEATHER_AVALON", "T8_SHOES_LEATHER_FEY", "T8_SHOES_LEATHER_UNDEAD",
    "T8_ARMOR_CLOTH_SET1", "T8_ARMOR_CLOTH_SET2", "T8_ARMOR_CLOTH_SET3", "T8_ARMOR_CLOTH_ROYAL", "T8_ARMOR_CLOTH_HELL", "T8_ARMOR_CLOTH_KEEPER", "T8_ARMOR_CLOTH_AVALON", "T8_ARMOR_CLOTH_FEY", "T8_ARMOR_CLOTH_UNDEAD",
    "T8_HEAD_CLOTH_SET1", "T8_HEAD_CLOTH_SET2", "T8_HEAD_CLOTH_SET3", "T8_HEAD_CLOTH_ROYAL", "T8_HEAD_CLOTH_HELL", "T8_HEAD_CLOTH_KEEPER", "T8_HEAD_CLOTH_AVALON", "T8_HEAD_CLOTH_FEY", "T8_HEAD_CLOTH_UNDEAD",
    "T8_SHOES_CLOTH_SET1", "T8_SHOES_CLOTH_SET2", "T8_SHOES_CLOTH_SET3", "T8_SHOES_CLOTH_ROYAL", "T8_SHOES_CLOTH_HELL", "T8_SHOES_CLOTH_KEEPER", "T8_SHOES_CLOTH_AVALON", "T8_SHOES_CLOTH_FEY", "T8_SHOES_CLOTH_UNDEAD"
];

// ... (groupItems se mantiene igual) ...
const groupItems = (items) => {
    const groups = {};
    items.forEach(id => {
        // Extrae el prefijo de la categoría (ej: T8_HEAD_PLATE)
        const parts = id.split('_');
        const categoryKey = `${parts[1]}_${parts[2]}`; // HEAD_PLATE, ARMOR_LEATHER, etc.
        const categoryName = formatItemName(categoryKey); // Casco Placa, Armadura Cuero, etc.

        if (!groups[categoryKey]) {
            groups[categoryKey] = {
                name: categoryName,
                key: categoryKey,
                items: [],
                // Establece la imagen de portada como el SET1 base
                coverId: id.replace(/_(SET\d|ROYAL|HELL|KEEPER|AVALON|FEY|UNDEAD)/, '_SET1'),
            };
        }
        groups[categoryKey].items.push(id);
    });
    return Object.values(groups);
};
// --------------------------------------------------------


export default function Dashboard({ setIsLoggedIn }) {
  const [itemCategories, setItemCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 💡 Creamos una ref para mapear cada tarjeta
  const cardRefs = useRef({});

  useEffect(() => {
    // 1. Agrupar la lista completa de T8
    const groupedList = groupItems(T8_RAW_IDS);
    
    // 2. Establecer el estado con las categorías agrupadas
    setItemCategories(groupedList);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  // 💡 Función para resetear el scroll al salir
  const handleMouseLeave = (key) => {
      const card = cardRefs.current[key];
      if (card) {
          card.scrollTop = 0; // Lleva el scroll a la posición inicial (arriba)
      }
  };

  return (
    <div className="dashboard-container ttcn">
      <div className="dashboard-box tdtn">
        <h1>Dashboard de Sets T8 👑</h1>
        <p>Items t8</p>
        <button onClick={handleLogout}>Cerrar sesión</button>
        
        <hr/>
        
        {loading ? (
          <p>Preparando las categorías de armadura...</p>
        ) : (
          <div className="item-category-grid">
            {itemCategories.map(category => (
              // 👈 1. Asignamos la ref y agregamos el evento onMouseLeave
              <div 
                key={category.key} 
                className="item-category-card"
                ref={el => cardRefs.current[category.key] = el}
                onMouseLeave={() => handleMouseLeave(category.key)}
                // Opcional: onMouseEnter para asegurar que el scroll esté al inicio al entrar (no siempre es necesario)
                onMouseEnter={el => el.currentTarget.scrollTop = 0} 
              >
                
                {/* ÍTEM DE PORTADA (SET1 o similar) */}
                <div className="category-cover">
                    <img 
                      src={`${IMG_BASE_URL}${category.coverId}`} 
                      alt={category.name} 
                      className="category-icon"
                    />
                    <p className="category-name">{category.name}</p>
                </div>

                {/* CONTENEDOR DE SCROLL (Este contenido se oculta/muestra/scrollea) */}
                <div className="category-scroll-container">
                  {category.items.map(itemId => (
                    <div key={itemId} className="item-card-detail">
                      <img 
                        src={`${IMG_BASE_URL}${itemId}`} 
                        alt={itemId} 
                        className="item-icon"
                      />
                      {/* Eliminamos el nombre de la categoría repetido para limpiar el texto */}
                      <p className="item-name-detail">{formatItemName(itemId).replace(category.name, '').trim()}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}