import { useState, useEffect } from "react";
import { 
    Shield, Droplet, Zap, ArrowLeftRight, Clock, Map, Lock, Upload, X 
} from 'lucide-react'; 
// ¡Importamos el archivo CSS!
import '../styles/BuildCreator.css'; 
import { saveNewBuild } from '../utils/storage'; 

// URL base para las imágenes de los ítems
const IMG_BASE_URL = "https://render.albiononline.com/api/v1/item/";

// --- CONSTANTES DE DATOS DE ÍTEMS ---
// (Estas listas deben estar completas para que el selector funcione)

const T8_ARMOR_PLATE = [
    "T8_ARMOR_PLATE_SET1", "T8_ARMOR_PLATE_SET2", "T8_ARMOR_PLATE_SET3", "T8_ARMOR_PLATE_ROYAL", "T8_ARMOR_PLATE_HELL", "T8_ARMOR_PLATE_KEEPER", "T8_ARMOR_PLATE_AVALON", "T8_ARMOR_PLATE_FEY", "T8_ARMOR_PLATE_UNDEAD",
];
const T8_HEAD_PLATE = [
    "T8_HEAD_PLATE_SET1", "T8_HEAD_PLATE_SET2", "T8_HEAD_PLATE_SET3", "T8_HEAD_PLATE_ROYAL", "T8_HEAD_PLATE_HELL", "T8_HEAD_PLATE_KEEPER", "T8_HEAD_PLATE_AVALON", "T8_HEAD_PLATE_FEY", "T8_HEAD_PLATE_UNDEAD",
];
const T8_SHOES_PLATE = [
    "T8_SHOES_PLATE_SET1", "T8_SHOES_PLATE_SET2", "T8_SHOES_PLATE_SET3", "T8_SHOES_PLATE_ROYAL", "T8_SHOES_PLATE_HELL", "T8_SHOES_PLATE_KEEPER", "T8_SHOES_PLATE_AVALON", "T8_SHOES_PLATE_FEY", "T8_SHOES_PLATE_UNDEAD",
];

const T8_ARMOR_LEATHER = [
    "T8_ARMOR_LEATHER_SET1", "T8_ARMOR_LEATHER_SET2", "T8_ARMOR_LEATHER_SET3", "T8_ARMOR_LEATHER_ROYAL", "T8_ARMOR_LEATHER_HELL", "T8_ARMOR_LEATHER_MORGANA", "T8_ARMOR_LEATHER_AVALON", "T8_ARMOR_LEATHER_FEY", "T8_ARMOR_LEATHER_UNDEAD",
];
const T8_HEAD_LEATHER = [
    "T8_HEAD_LEATHER_SET1", "T8_HEAD_LEATHER_SET2", "T8_HEAD_LEATHER_SET3", "T8_HEAD_LEATHER_ROYAL", "T8_HEAD_LEATHER_HELL", "T8_HEAD_LEATHER_MORGANA", "T8_HEAD_LEATHER_AVALON", "T8_HEAD_LEATHER_FEY", "T8_HEAD_LEATHER_UNDEAD",
];
const T8_SHOES_LEATHER = [
    "T8_SHOES_LEATHER_SET1", "T8_SHOES_LEATHER_SET2", "T8_SHOES_LEATHER_SET3", "T8_SHOES_LEATHER_ROYAL", "T8_SHOES_LEATHER_HELL", "T8_SHOES_LEATHER_MORGANA", "T8_SHOES_LEATHER_AVALON", "T8_SHOES_LEATHER_FEY", "T8_SHOES_LEATHER_UNDEAD",
];

const T8_ARMOR_CLOTH = [
    "T8_ARMOR_CLOTH_SET1", "T8_ARMOR_CLOTH_SET2", "T8_ARMOR_CLOTH_SET3", "T8_ARMOR_CLOTH_ROYAL", "T8_ARMOR_CLOTH_HELL", "T8_ARMOR_CLOTH_KEEPER", "T8_ARMOR_CLOTH_AVALON", "T8_ARMOR_CLOTH_FEY", "T8_ARMOR_CLOTH_MORGANA",
];
const T8_HEAD_CLOTH = [
    "T8_HEAD_CLOTH_SET1", "T8_HEAD_CLOTH_SET2", "T8_HEAD_CLOTH_SET3", "T8_HEAD_CLOTH_ROYAL", "T8_HEAD_CLOTH_HELL", "T8_HEAD_CLOTH_KEEPER", "T8_HEAD_CLOTH_AVALON", "T8_HEAD_CLOTH_FEY", "T8_HEAD_CLOTH_MORGANA",
];
const T8_SHOES_CLOTH = [
    "T8_SHOES_CLOTH_SET1", "T8_SHOES_CLOTH_SET2", "T8_SHOES_CLOTH_SET3", "T8_SHOES_CLOTH_ROYAL", "T8_SHOES_CLOTH_HELL", "T8_SHOES_CLOTH_KEEPER", "T8_SHOES_CLOTH_AVALON", "T8_SHOES_CLOTH_FEY", "T8_SHOES_CLOTH_MORGANA",
];

const T8_CURSED_STAFFS = [
    "T8_MAIN_CURSEDSTAFF", "T8_2H_CURSEDSTAFF", "T8_2H_DEMONICSTAFF", "T8_MAIN_CURSEDSTAFF_UNDEAD", "T8_2H_SKULLORB_HELL", "T8_2H_CURSEDSTAFF_MORGANA", "T8_MAIN_CURSEDSTAFF_AVALON", "T8_MAIN_CURSEDSTAFF_CRYSTAL",
];
const T8_FROST_STAFFS = [
    "T8_MAIN_FROSTSTAFF", "T8_2H_FROSTSTAFF", "T8_2H_GLACIALSTAFF", "T8_MAIN_FROSTSTAFF_KEEPER", "T8_2H_ICECRYSTAL_UNDEAD", "T8_2H_FROSTSTAFF_CRYSTAL", "T8_2H_ICEGAUNTLETS_HELL", "T8_MAIN_FROSTSTAFF_AVALON",
];
const T8_ARCANE_STAFFS = [
    "T8_MAIN_ARCANESTAFF", "T8_2H_ARCANESTAFF", "T8_2H_ENIGMATICSTAFF", "T8_MAIN_ARCANESTAFF_UNDEAD", "T8_2H_ARCANESTAFF_HELL", "T8_2H_ENIGMATICORB_MORGANA", "T8_2H_ARCANE_RINGPAIR_AVALON", "T8_2H_ARCANESTAFF_CRYSTAL",
];
const T8_HOLY_STAFFS = [
    "T8_MAIN_HOLYSTAFF", "T8_2H_HOLYSTAFF", "T8_2H_DIVINESTAFF", "T8_MAIN_HOLYSTAFF_MORGANA", "T8_2H_HOLYSTAFF_HELL", "T8_2H_HOLYSTAFF_UNDEAD", "T8_MAIN_HOLYSTAFF_AVALON", "T8_2H_HOLYSTAFF_CRYSTAL",
];
const T8_FIRE_STAFFS = [
    "T8_MAIN_FIRESTAFF", "T8_2H_FIRESTAFF", "T8_2H_INFERNOSTAFF", "T8_MAIN_FIRESTAFF_KEEPER", "T8_2H_FIRESTAFF_HELL", "T8_2H_INFERNOSTAFF_MORGANA", "T8_2H_FIRE_RINGPAIR_AVALON", "T8_MAIN_FIRESTAFF_CRYSTAL",
];
const T8_NATURE_STAFFS = [
    "T8_2H_NATURESTAFF", "T8_MAIN_NATURESTAFF", "T8_2H_WILDSTAFF", "T8_2H_NATURESTAFF_HELL", "T8_MAIN_NATURESTAFF_KEEPER", "T8_2H_NATURESTAFF_KEEPER", "T8_MAIN_NATURESTAFF_AVALON", "T8_MAIN_NATURESTAFF_CRYSTAL",
];
const T8_SHAPESHIFTER_WEAPONS = [
    "T8_2H_SHAPESHIFTER_SET1", "T8_2H_SHAPESHIFTER_SET2", "T8_2H_SHAPESHIFTER_SET3", "T8_2H_SHAPESHIFTER_MORGANA", "T8_2H_SHAPESHIFTER_HELL", "T8_2H_SHAPESHIFTER_KEEPER", "T8_2H_SHAPESHIFTER_AVALON", "T8_2H_SHAPESHIFTER_CRYSTAL",
];
const T8_QUARTER_STAFFS = [
    "T8_2H_QUARTERSTAFF", "T8_2H_IRONCLADEDSTAFF", "T8_2H_DOUBLEBLADEDSTAFF", "T8_2H_COMBATSTAFF_MORGANA", "T8_2H_TWINSCYTHE_HELL", "T8_2H_ROCKSTAFF_KEEPER", "T8_2H_QUARTERSTAFF_AVALON", "T8_2H_DOUBLEBLADEDSTAFF_CRYSTAL",
];
const T8_SPEARS = [
    "T8_MAIN_SPEAR", "T8_2H_SPEAR", "T8_2H_GLAIVE", "T8_MAIN_SPEAR_KEEPER", "T8_2H_HARPOON_HELL", "T8_2H_TRIDENT_UNDEAD", "T8_MAIN_SPEAR_LANCE_AVALON", "T8_2H_GLAIVE_CRYSTAL",
];
const T8_DAGGERS = [
    "T8_MAIN_DAGGER", "T8_2H_DAGGERPAIR", "T8_2H_CLAWPAIR", "T8_MAIN_RAPIER_MORGANA", "T8_MAIN_DAGGER_HELL", "T8_2H_DUALSICKLE_UNDEAD", "T8_2H_DAGGER_KATAR_AVALON", "T8_2H_DAGGERPAIR_CRYSTAL",
];
const T8_CROSSBOWS = [
    "T8_MAIN_1HCROSSBOW", "T8_2H_CROSSBOW", "T8_2H_CROSSBOWLARGE", "T8_2H_REPEATINGCROSSBOW_UNDEAD", "T8_2H_DUALCROSSBOW_HELL", "T8_2H_CROSSBOWLARGE_MORGANA", "T8_2H_CROSSBOW_CANNON_AVALON", "T8_2H_DUALCROSSBOW_CRYSTAL",
];
const T8_BOWS = [
    "T8_2H_BOW", "T8_2H_WARBOW", "T8_2H_LONGBOW", "T8_2H_BOW_HELL", "T8_2H_BOW_AVALON", "T8_2H_BOW_KEEPER", "T8_2H_BOW_CRYSTAL", "T8_2H_LONGBOW_UNDEAD",
];
const T8_KNUCKLES = [
    "T8_2H_KNUCKLES_SET1", "T8_2H_KNUCKLES_SET2", "T8_2H_KNUCKLES_SET3", "T8_2H_KNUCKLES_KEEPER", "T8_2H_KNUCKLES_HELL", "T8_2H_KNUCKLES_MORGANA", "T8_2H_KNUCKLES_AVALON", "T8_2H_KNUCKLES_CRYSTAL",
];
const T8_HAMMERS = [
    "T8_MAIN_HAMMER", "T8_2H_HAMMER", "T8_2H_POLEHAMMER", "T8_2H_HAMMER_UNDEAD", "T8_2H_DUALHAMMER_HELL", "T8_2H_HAMMER_AVALON", "T8_2H_RAM_KEEPER", "T8_2H_HAMMER_CRYSTAL",
];
const T8_MACES = [
    "T8_MAIN_MACE", "T8_2H_MACE", "T8_2H_FLAIL", "T8_MAIN_ROCKMACE_KEEPER", "T8_MAIN_MACE_HELL", "T8_2H_MACE_MORGANA", "T8_2H_DUALMACE_AVALON", "T8_MAIN_MACE_CRYSTAL",
];
const T8_AXES = [
    "T8_MAIN_AXE", "T8_2H_AXE", "T8_2H_HALBERD", "T8_2H_SCYTHE_HELL", "T8_2H_SCYTHE_CRYSTAL", "T8_2H_DUALAXE_KEEPER", "T8_2H_AXE_AVALON", "T8_2H_HALBERD_MORGANA",
];
const T8_SWORDS = [
    "T8_MAIN_SWORD", "T8_2H_CLAYMORE", "T8_2H_DUALSWORD", "T8_MAIN_SCIMITAR_MORGANA", "T8_2H_CLEAVER_HELL", "T8_2H_DUALSCIMITAR_UNDEAD", "T8_2H_CLAYMORE_AVALON", "T8_MAIN_SWORD_CRYSTAL",
];
const T8_OFF_HAND_TUTORS = [
    "T8_OFF_BOOK", "T8_OFF_ORB_MORGANA", "T8_OFF_DEMONSKULL_HELL", "T8_OFF_TOTEM_KEEPER", "T8_OFF_CENSER_AVALON", "T8_OFF_TOME_CRYSTAL",
];
const T8_OFF_HAND_TOOLS = [
    "T8_OFF_TORCH", "T8_OFF_HORN_KEEPER", "T8_OFF_TALISMAN_AVALON", "T8_OFF_LAMP_UNDEAD", "T8_OFF_JESTERCANE_HELL", "T8_OFF_TORCH_CRYSTAL",
];
const T8_OFF_HAND_SHIELDS = [
    "T8_OFF_SHIELD", "T8_OFF_TOWERSHIELD_UNDEAD", "T8_OFF_SHIELD_HELL", "T8_OFF_SPIKEDSHIELD_MORGANA", "T8_OFF_SHIELD_AVALON", "T8_OFF_SHIELD_CRYSTAL"
];
// --- FIN CONSTANTES DE DATOS DE ÍTEMS ---

// --- MAPEO DE SLOTS A CATEGORÍAS ---
// Define qué categorías de ítems son válidas para cada slot
const SLOT_CATEGORY_MAP = {
    // Armas (Cualquier cosa que no sea OFF)
    mainhand: [
        { name: "Bastones Malditos", items: T8_CURSED_STAFFS }, 
        { name: "Bastones de Hielo", items: T8_FROST_STAFFS }, 
        { name: "Bastones Arcanos", items: T8_ARCANE_STAFFS },
        { name: "Bastones Sagrados", items: T8_HOLY_STAFFS },
        { name: "Bastones de Fuego", items: T8_FIRE_STAFFS },
        { name: "Bastones Naturales", items: T8_NATURE_STAFFS },
        { name: "Cambiaformas", items: T8_SHAPESHIFTER_WEAPONS },
        { name: "Varas", items: T8_QUARTER_STAFFS },
        { name: "Lanzas", items: T8_SPEARS },
        { name: "Dagas", items: T8_DAGGERS },
        { name: "Ballestas", items: T8_CROSSBOWS },
        { name: "Arcos", items: T8_BOWS },
        { name: "Puños", items: T8_KNUCKLES },
        { name: "Martillos", items: T8_HAMMERS },
        { name: "Mazas", items: T8_MACES },
        { name: "Hachas", items: T8_AXES },
        { name: "Espadas", items: T8_SWORDS },

        // ... (Aquí irían otras categorías de armas como Espadas, Hachas, etc.)
    ],
    // Off Hand
    offhand: [
        { name: "Libros", items: T8_OFF_HAND_TUTORS },
        { name: "Antorchas", items: T8_OFF_HAND_TOOLS },
        { name: "Escudos", items: T8_OFF_HAND_SHIELDS },
    ],
    // Cascos
    head: [
        { name: "Cascos de Placa", items: T8_HEAD_PLATE }, 
        { name: "Capuchas de Cuero", items: T8_HEAD_LEATHER },
        { name: "Hábitos de Tela", items: T8_HEAD_CLOTH },
    ],
    // Armaduras
    chest: [
        { name: "Armaduras de Placa", items: T8_ARMOR_PLATE },
        { name: "Chaquetas de Cuero", items: T8_ARMOR_LEATHER },
        { name: "Túnicas de Tela", items: T8_ARMOR_CLOTH },
    ],
    // Botas
    shoes: [
        { name: "Botas de Placa", items: T8_SHOES_PLATE },
        { name: "Zapatos de Cuero", items: T8_SHOES_LEATHER },
        { name: "Sandalias de Tela", items: T8_SHOES_CLOTH },
    ],
};

// --- MAPEO DE NOMBRES DE ÍTEMS (Simplificado para el ejemplo) ---
// En una aplicación real, esta lista sería mucho más grande, pero es crucial para mostrar el nombre.
const ITEM_NAME_MAP = {
    "T8_MAIN_CURSEDSTAFF": "Bastón Maldito",
    "T8_2H_CURSEDSTAFF": "Gran Bastón Maldito",
    "T8_MAIN_FROSTSTAFF": "Bastón de Escarcha",
    "T8_OFF_BOOK": "Libro de la Naturaleza",
    "T8_HEAD_PLATE_SET1": "Casco de Soldado",
    "T8_ARMOR_PLATE_SET1": "Armadura de Soldado",
    "T8_SHOES_PLATE_SET1": "Botas de Soldado",
    "T8_CAPE": "Capa Común",
    "T8_MEAL_FISH_BOWL": "Estofado de Pescado",
    "T8_POTION_HEAL": "Poción de Curación Mayor",
    // ... agregar el resto de los nombres reales de los ítems T8 aquí ...
    // Aquí solo mantenemos los nombres de los ítems usados en el SLOT_CATEGORY_MAP
};


// --- COMPONENTE ItemSelector (Modal) ---
const ItemSelector = ({ slotKey, onClose, onSelect }) => {
    // Definimos qué categorías son válidas para el slot que se está editando
    const categories = SLOT_CATEGORY_MAP[slotKey] || [];
    const [currentCategory, setCurrentCategory] = useState(categories[0]?.name || null);

    // Mapeamos ítems para la categoría actual
    const currentItems = categories
        .find(cat => cat.name === currentCategory)
        ?.items || [];
    
    // Obtener la clave de ID de la categoría para prefiltrar en el mapa
    const currentCategoryKey = categories.find(cat => cat.name === currentCategory)?.items[0]?.split('_').slice(0, 3).join('_') || '';
        
    // Si no hay ítems válidos, cerramos
    if (categories.length === 0) {
        return (
            // Clases del CSS externo
            <div className="item-selector-overlay">
                <div className="item-selector-modal">
                    <p>No hay ítems definidos para este slot.</p>
                    <button onClick={onClose} className="btn-secondary">Cerrar</button>
                </div>
            </div>
        );
    }

    return (
        // Clases del CSS externo
        <div className="item-selector-overlay">
            <div className="item-selector-modal">
                <div className="modal-header">
                    <h2>Seleccionar {slotKey.charAt(0).toUpperCase() + slotKey.slice(1)}</h2>
                    <button onClick={onClose} className="close-button"><X size={20}/></button>
                </div>
                
                {/* Pestañas de Categoría (Ej: Placa, Cuero, Tela) */}
                <div className="category-tabs">
                    {categories.map(cat => (
                        <button 
                            key={cat.name} 
                            // Clases del CSS externo
                            className={`tab-button ${cat.name === currentCategory ? 'tab-active' : ''}`}
                            onClick={() => setCurrentCategory(cat.name)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Contenedor de Ítems */}
                <div className="item-list-container">
                    {currentItems.map(itemId => (
                        <div 
                            key={itemId} 
                            // Clases del CSS externo
                            className="item-selection-card" 
                            onClick={() => onSelect(slotKey, itemId)}
                        >
                            <img 
                                src={`${IMG_BASE_URL}${itemId}`} 
                                alt={itemId} 
                                onError={(e) => e.target.src = "https://placehold.co/64x64/0f172a/ffffff?text=?"}
                            />
                            <p>{ITEM_NAME_MAP[itemId] || itemId}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- COMPONENTE BuildCreator PRINCIPAL ---
export const BuildCreator = () => {
    
    

    // --- ESTADOS PRINCIPALES ---
    const [selectedItems, setSelectedItems] = useState({
        head: null,  mainhand: null, chest: null, offhand: null, shoes: null
    });
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [currentSlotKey, setCurrentSlotKey] = useState(null);
    // ----------------------------

    
    
    const activities = [
        { key: 'solo-pve', label: 'Solo PvE', icon: '👤' },
        { key: 'group-pve', label: 'Group PvE', icon: '👥' },
        { key: 'ganking', label: 'Ganking', icon: '🔪' },
        { key: 'hellgate', label: 'Hellgate', icon: '🔥' },
        { key: 'corrupted', label: 'Corrupted Dungeon', icon: '💀' },
        { key: 'gathering', label: 'Gathering', icon: '⛏️' },
        { key: 'fame-farm', label: 'Fame Farm', icon: '🌟' },
        { key: 'zvz', label: 'ZVZ', icon: '🌟' },
    ];
    
    const [buildDetails, setBuildDetails] = useState({
        name: '',
        description: '',
        activityType: 'solo-pve',
    });

    // Lógica para abrir el selector
    const handleSlotClick = (key) => {
        setCurrentSlotKey(key);
        setIsSelectorOpen(true);
    };

    // Lógica para seleccionar un ítem
    const handleItemSelect = (slotKey, itemId) => {
        setSelectedItems(prev => ({ ...prev, [slotKey]: itemId }));
        setIsSelectorOpen(false);
        setCurrentSlotKey(null);
    };
    
    // Lógica para limpiar el slot
    const handleClearSlot = (slotKey, e) => {
        e.stopPropagation(); // Evitar que se abra el selector
        setSelectedItems(prev => ({ ...prev, [slotKey]: null }));
    };

    const handleDetailChange = (e) => {
        const { name, value } = e.target;
        setBuildDetails(prev => ({ ...prev, [name]: value }));
    };

    // LÓGICA DE GUARDADO UTILIZANDO localStorage
    const handleSave = (isPublic) => {
        if (!buildDetails.name.trim()) {
            alert("Por favor, dale un nombre a tu Build antes de guardarla.");
            return;
        }
        
        // Verifica que al menos el Arma Principal o la Armadura estén seleccionados
        if (!selectedItems.mainhand && !selectedItems.chest) {
             alert("Selecciona al menos un Arma o Armadura para guardar la Build.");
             return;
        }

        const buildData = {
            name: buildDetails.name,
            description: buildDetails.description,
            activityType: buildDetails.activityType,
            equipment: selectedItems, 
        };

        // Usa la función de utilidad para guardar
        saveNewBuild(buildData, isPublic);

        const type = isPublic ? 'Pública' : 'Privada';
        alert(`Build '${buildDetails.name}' guardada localmente como ${type}.`);
        
        // Reiniciar estados
        setSelectedItems({  head: null,  mainhand: null, chest: null, offhand: null, shoes: null });
        setBuildDetails({ name: '', description: '', activityType: 'solo-pve' });
    };

    // Slot definitions with layout styles
    const slots = [
        // Las propiedades 'style' quedan aquí porque definen la posición ABSOLUTA
        { key: 'head', name: 'Casco', style: { top: '20%', left: '50%' } },
        { key: 'mainhand', name: 'Arma Principal', style: { top: '50%', left: '25%' } },
        { key: 'chest', name: 'Armadura', style: { top: '50%', left: '50%' } },
        { key: 'offhand', name: 'Mano Secundaria', style: { top: '50%', left: '75%' } },
        { key: 'shoes', name: 'Botas', style: { top: '80%', left: '50%' } },
    ];
    
    // Función para renderizar el contenido del slot (imagen o placeholder)
    const renderSlotContent = (key) => {
        const itemId = selectedItems[key];
        const isFilled = !!itemId;
        
        return (
            // Clases del CSS externo
            <div 
                className={`equipment-slot ${isFilled ? 'equipment-slot-filled' : 'empty-slot'}`}
                onClick={() => handleSlotClick(key)}
                onContextMenu={(e) => handleClearSlot(key, e)} // Usar clic derecho para limpiar
                title={isFilled ? ITEM_NAME_MAP[itemId] || itemId : `Seleccionar ${slots.find(s => s.key === key)?.name}`}
            >
                {/* Clase del CSS externo */}
                <span className="slot-name">{slots.find(s => s.key === key)?.name.split(' ')[0]}</span>
                {isFilled ? (
                    <img 
                        src={`${IMG_BASE_URL}${itemId}`} 
                        alt={ITEM_NAME_MAP[itemId] || itemId} 
                        onError={(e) => e.target.src = "https://placehold.co/64x64/0f172a/ffffff?text=?"}
                    />
                ) : (
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="45" stroke="#444" strokeWidth="4" fill="#2a2a2a" />
                    </svg>
                )}
            </div>
        );
    };

    return (
        // Clase del CSS externo
        <div className="build-creator-container">
            {/* ELIMINAMOS la inserción de ComponentStyles */}
            
            {/* Renderizar el selector si está abierto */}
            {isSelectorOpen && (
                <ItemSelector 
                    slotKey={currentSlotKey} 
                    onClose={() => setIsSelectorOpen(false)} 
                    onSelect={handleItemSelect} 
                />
            )}

            {/* Clases del CSS externo */}
            <h1 className="dashboard-title">🔨 Creador de Builds</h1>
            <p className="dashboard-subtitle">Ensambla tu equipamiento y comparte tu estrategia con la comunidad. (Clic derecho para limpiar un slot).</p>
            
            <div className="creation-layout">
                {/* Columna 1: Visualización y Stats */}
                <div className="layout-col build-preview-area">
                    
                    <div className="character-display">
                    

                        {/* Renderizado de Slots */}
                        {slots.map(slot => (
                            // Clase del CSS externo
                            <div 
                                key={slot.key} 
                                className="equipment-slot-wrapper" 
                                style={slot.style}
                            >
                                {renderSlotContent(slot.key)}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Columna 2: Detalles y Acciones */}
                <div className="layout-col build-details-area">
                    <div className="build-input-group">
                        <label htmlFor="build-name">Nombre de la Build</label>
                        <input 
                            id="build-name" 
                            name="name"
                            type="text" 
                            placeholder="Ej: Curandero ZvZ T8.3" 
                            value={buildDetails.name}
                            onChange={handleDetailChange}
                        />
                    </div>
                    
                    <div className="build-input-group">
                        <label htmlFor="build-description">Descripción / Notas</label>
                        <textarea 
                            id="build-description" 
                            name="description"
                            placeholder="Describe el propósito de la build, fortalezas y debilidades."
                            rows="6"
                            value={buildDetails.description}
                            onChange={handleDetailChange}
                        ></textarea>
                    </div>

                    <div className="activity-type-panel">
                        <h3 className="panel-title">Tipo de Actividad</h3>
                        <div className="activity-grid">
                            {activities.map(activity => (
                                <label key={activity.key} className="activity-label">
                                    <input 
                                        type="radio" 
                                        name="activityType" 
                                        value={activity.key}
                                        checked={buildDetails.activityType === activity.key}
                                        onChange={handleDetailChange}
                                    />
                                    <span className="radio-content">
                                        {activity.icon} {activity.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="action-buttons-group">
                        <button 
                            className="btn-primary"
                            onClick={() => handleSave(true)}
                        >
                            <Upload size={20}/> Guardar & Publicar
                        </button>
                        <button 
                            className="btn-secondary"
                            onClick={() => handleSave(false)}
                        >
                            <Lock size={20}/> Guardar como Privada
                        </button>
                        <button 
                            className="btn-tertiary"
                            onClick={() => setBuildDetails({ name: '', description: '', activityType: 'solo-pve' })}
                        >
                            Reiniciar Build
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};