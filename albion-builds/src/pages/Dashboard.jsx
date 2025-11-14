import { useState, useEffect, useRef } from "react";
// Ruta corregida para importar los estilos
import "../styles/Dashboard.css"; 
// Importamos el logo de la ruta especificada. 
// En una aplicación React configurada con create-react-app o Vite,
// un archivo en `public/LogoP.png` se accede como `/LogoP.png`.
import LogoImage from '/LogoP.png'; 
// Iconos de Lucide React para la barra de navegación y la interfaz
import { 
    Search, User, Layers3, Flame, LogIn, 
    Shield, Droplet, Zap, ArrowLeftRight, Clock, Map, Lock, Upload 
} from 'lucide-react'; 

const IMG_BASE_URL = "https://render.albiononline.com/api/v1/item/";

// --- CONSTANTE DE IDS COMPLETA (Se mantiene igual) ---
const T8_RAW_IDS = [
    // Armaduras (Placa, Cuero, Tela)
    "T8_ARMOR_PLATE_SET1", "T8_ARMOR_PLATE_SET2", "T8_ARMOR_PLATE_SET3", "T8_ARMOR_PLATE_ROYAL", "T8_ARMOR_PLATE_HELL", "T8_ARMOR_PLATE_KEEPER", "T8_ARMOR_PLATE_AVALON", "T8_ARMOR_PLATE_FEY", "T8_ARMOR_PLATE_UNDEAD",
    "T8_HEAD_PLATE_SET1", "T8_HEAD_PLATE_SET2", "T8_HEAD_PLATE_SET3", "T8_HEAD_PLATE_ROYAL", "T8_HEAD_PLATE_HELL", "T8_HEAD_PLATE_KEEPER", "T8_HEAD_PLATE_AVALON", "T8_HEAD_PLATE_FEY", "T8_HEAD_PLATE_UNDEAD",
    "T8_SHOES_PLATE_SET1", "T8_SHOES_PLATE_SET2", "T8_SHOES_PLATE_SET3", "T8_SHOES_PLATE_ROYAL", "T8_SHOES_PLATE_HELL", "T8_SHOES_PLATE_KEEPER", "T8_SHOES_PLATE_AVALON", "T8_SHOES_PLATE_FEY", "T8_SHOES_PLATE_UNDEAD",
    "T8_ARMOR_LEATHER_SET1", "T8_ARMOR_LEATHER_SET2", "T8_ARMOR_LEATHER_SET3", "T8_ARMOR_LEATHER_ROYAL", "T8_ARMOR_LEATHER_HELL", "T8_ARMOR_LEATHER_MORGANA", "T8_ARMOR_LEATHER_AVALON", "T8_ARMOR_LEATHER_FEY", "T8_ARMOR_LEATHER_UNDEAD",
    "T8_HEAD_LEATHER_SET1", "T8_HEAD_LEATHER_SET2", "T8_HEAD_LEATHER_SET3", "T8_HEAD_LEATHER_ROYAL", "T8_HEAD_LEATHER_HELL", "T8_HEAD_LEATHER_MORGANA", "T8_HEAD_LEATHER_AVALON", "T8_HEAD_LEATHER_FEY", "T8_HEAD_LEATHER_UNDEAD",
    "T8_SHOES_LEATHER_SET1", "T8_SHOES_LEATHER_SET2", "T8_SHOES_LEATHER_SET3", "T8_SHOES_LEATHER_ROYAL", "T8_SHOES_LEATHER_HELL", "T8_SHOES_LEATHER_MORGANA", "T8_SHOES_LEATHER_AVALON", "T8_SHOES_LEATHER_FEY", "T8_SHOES_LEATHER_UNDEAD",
    "T8_ARMOR_CLOTH_SET1", "T8_ARMOR_CLOTH_SET2", "T8_ARMOR_CLOTH_SET3", "T8_ARMOR_CLOTH_ROYAL", "T8_ARMOR_CLOTH_HELL", "T8_ARMOR_CLOTH_KEEPER", "T8_ARMOR_CLOTH_AVALON", "T8_ARMOR_CLOTH_FEY", "T8_ARMOR_CLOTH_MORGANA",
    "T8_HEAD_CLOTH_SET1", "T8_HEAD_CLOTH_SET2", "T8_HEAD_CLOTH_SET3", "T8_HEAD_CLOTH_ROYAL", "T8_HEAD_CLOTH_HELL", "T8_HEAD_CLOTH_KEEPER", "T8_HEAD_CLOTH_AVALON", "T8_HEAD_CLOTH_FEY", "T8_HEAD_CLOTH_MORGANA",
    "T8_SHOES_CLOTH_SET1", "T8_SHOES_CLOTH_SET2", "T8_SHOES_CLOTH_SET3", "T8_SHOES_CLOTH_ROYAL", "T8_SHOES_CLOTH_HELL", "T8_SHOES_CLOTH_KEEPER", "T8_SHOES_CLOTH_AVALON", "T8_SHOES_CLOTH_FEY", "T8_SHOES_CLOTH_MORGANA",

    // Cursed Staffs (Bastones Malditos)
    "T8_MAIN_CURSEDSTAFF", "T8_2H_CURSEDSTAFF", "T8_2H_DEMONICSTAFF", "T8_MAIN_CURSEDSTAFF_UNDEAD", "T8_2H_SKULLORB_HELL", "T8_2H_CURSEDSTAFF_MORGANA", "T8_MAIN_CURSEDSTAFF_AVALON", "T8_MAIN_CURSEDSTAFF_CRYSTAL",
    // Frost Staffs (Bastones de Escarcha)
    "T8_MAIN_FROSTSTAFF", "T8_2H_FROSTSTAFF", "T8_2H_GLACIALSTAFF", "T8_MAIN_FROSTSTAFF_KEEPER", "T8_2H_ICECRYSTAL_UNDEAD", "T8_2H_FROSTSTAFF_CRYSTAL", "T8_2H_ICEGAUNTLETS_HELL", "T8_MAIN_FROSTSTAFF_AVALON",
    // Arcane Staffs (Bastones Arcanos)
    "T8_MAIN_ARCANESTAFF", "T8_2H_ARCANESTAFF", "T8_2H_ENIGMATICSTAFF", "T8_MAIN_ARCANESTAFF_UNDEAD", "T8_2H_ARCANESTAFF_HELL", "T8_2H_ENIGMATICORB_MORGANA", "T8_2H_ARCANE_RINGPAIR_AVALON", "T8_2H_ARCANESTAFF_CRYSTAL",
    // Holy Staffs (Bastones Sagrados)
    "T8_MAIN_HOLYSTAFF", "T8_2H_HOLYSTAFF", "T8_2H_DIVINESTAFF", "T8_MAIN_HOLYSTAFF_MORGANA", "T8_2H_HOLYSTAFF_HELL", "T8_2H_HOLYSTAFF_UNDEAD", "T8_MAIN_HOLYSTAFF_AVALON", "T8_2H_HOLYSTAFF_CRYSTAL",
    // Fire Staffs (Bastones de Fuego)
    "T8_MAIN_FIRESTAFF", "T8_2H_FIRESTAFF", "T8_2H_INFERNOSTAFF", "T8_MAIN_FIRESTAFF_KEEPER", "T8_2H_FIRESTAFF_HELL", "T8_2H_INFERNOSTAFF_MORGANA", "T8_2H_FIRE_RINGPAIR_AVALON", "T8_MAIN_FIRESTAFF_CRYSTAL",
    // Nature Staffs (Bastones de Naturaleza)
    "T8_2H_NATURESTAFF", "T8_MAIN_NATURESTAFF", "T8_2H_WILDSTAFF", "T8_2H_NATURESTAFF_HELL", "T8_MAIN_NATURESTAFF_KEEPER", "T8_2H_NATURESTAFF_KEEPER", "T8_MAIN_NATURESTAFF_AVALON", "T8_MAIN_NATURESTAFF_CRYSTAL",
    // Shapeshifter Weapons (Armas de Cambiaformas)
    "T8_2H_SHAPESHIFTER_SET1", "T8_2H_SHAPESHIFTER_SET2", "T8_2H_SHAPESHIFTER_SET3", "T8_2H_SHAPESHIFTER_MORGANA", "T8_2H_SHAPESHIFTER_HELL", "T8_2H_SHAPESHIFTER_KEEPER", "T8_2H_SHAPESHIFTER_AVALON", "T8_2H_SHAPESHIFTER_CRYSTAL",
    // Quarter Staffs (Bastones)
    "T8_2H_QUARTERSTAFF", "T8_2H_IRONCLADEDSTAFF", "T8_2H_DOUBLEBLADEDSTAFF", "T8_2H_COMBATSTAFF_MORGANA", "T8_2H_TWINSCYTHE_HELL", "T8_2H_ROCKSTAFF_KEEPER", "T8_2H_QUARTERSTAFF_AVALON", "T8_2H_DOUBLEBLADEDSTAFF_CRYSTAL",
    // Spears (Lanzas)
    "T8_MAIN_SPEAR", "T8_2H_SPEAR", "T8_2H_GLAIVE", "T8_MAIN_SPEAR_KEEPER", "T8_2H_HARPOON_HELL", "T8_2H_TRIDENT_UNDEAD", "T8_MAIN_SPEAR_LANCE_AVALON", "T8_2H_GLAIVE_CRYSTAL",
    // Daggers (Dagas)
    "T8_MAIN_DAGGER", "T8_2H_DAGGERPAIR", "T8_2H_CLAWPAIR", "T8_MAIN_RAPIER_MORGANA", "T8_MAIN_DAGGER_HELL", "T8_2H_DUALSICKLE_UNDEAD", "T8_2H_DAGGER_KATAR_AVALON", "T8_2H_DAGGERPAIR_CRYSTAL",
    // Crossbows (Ballestas)
    "T8_MAIN_1HCROSSBOW", "T8_2H_CROSSBOW", "T8_2H_CROSSBOWLARGE", "T8_2H_REPEATINGCROSSBOW_UNDEAD", "T8_2H_DUALCROSSBOW_HELL", "T8_2H_CROSSBOWLARGE_MORGANA", "T8_2H_CROSSBOW_CANNON_AVALON", "T8_2H_DUALCROSSBOW_CRYSTAL",
    // Bows (Arcos)
    "T8_2H_BOW", "T8_2H_WARBOW", "T8_2H_LONGBOW", "T8_2H_BOW_HELL", "T8_2H_BOW_AVALON", "T8_2H_BOW_KEEPER", "T8_2H_BOW_CRYSTAL", "T8_2H_LONGBOW_UNDEAD",
    // Knuckles (Puños)
    "T8_2H_KNUCKLES_SET1", "T8_2H_KNUCKLES_SET2", "T8_2H_KNUCKLES_SET3", "T8_2H_KNUCKLES_KEEPER", "T8_2H_KNUCKLES_HELL", "T8_2H_KNUCKLES_MORGANA", "T8_2H_KNUCKLES_AVALON", "T8_2H_KNUCKLES_CRYSTAL",
    // Hammers (Martillos)
    "T8_MAIN_HAMMER", "T8_2H_HAMMER", "T8_2H_POLEHAMMER", "T8_2H_HAMMER_UNDEAD", "T8_2H_DUALHAMMER_HELL", "T8_2H_HAMMER_AVALON", "T8_2H_RAM_KEEPER", "T8_2H_HAMMER_CRYSTAL",
    // Maces (Mazas)
    "T8_MAIN_MACE", "T8_2H_MACE", "T8_2H_FLAIL", "T8_MAIN_ROCKMACE_KEEPER", "T8_MAIN_MACE_HELL", "T8_2H_MACE_MORGANA", "T8_2H_DUALMACE_AVALON", "T8_MAIN_MACE_CRYSTAL",
    // Axes (Hachas)
    "T8_MAIN_AXE", "T8_2H_AXE", "T8_2H_HALBERD", "T8_2H_SCYTHE_HELL", "T8_2H_SCYTHE_CRYSTAL", "T8_2H_DUALAXE_KEEPER", "T8_2H_AXE_AVALON", "T8_2H_HALBERD_MORGANA",
    // Swords (Espadas)
    "T8_MAIN_SWORD", "T8_2H_CLAYMORE", "T8_2H_DUALSWORD", "T8_MAIN_SCIMITAR_MORGANA", "T8_2H_CLEAVER_HELL", "T8_2H_DUALSCIMITAR_UNDEAD", "T8_2H_CLAYMORE_AVALON", "T8_MAIN_SWORD_CRYSTAL",
    // Off-Hand Items (Objetos de Mano Secundaria)
    "T8_OFF_BOOK", "T8_OFF_ORB_MORGANA", "T8_OFF_DEMONSKULL_HELL", "T8_OFF_TOTEM_KEEPER", "T8_OFF_CENSER_AVALON", "T8_OFF_TOME_CRYSTAL",
    "T8_OFF_TORCH", "T8_OFF_HORN_KEEPER", "T8_OFF_TALISMAN_AVALON", "T8_OFF_LAMP_UNDEAD", "T8_OFF_JESTERCANE_HELL", "T8_OFF_TORCH_CRYSTAL",
    "T8_OFF_SHIELD", "T8_OFF_TOWERSHIELD_UNDEAD", "T8_OFF_SHIELD_HELL", "T8_OFF_SPIKEDSHIELD_MORGANA", "T8_OFF_SHIELD_AVALON", "T8_OFF_SHIELD_CRYSTAL"
];
// --- FIN CONSTANTE DE IDS COMPLETA ---


// --- Funciones Auxiliares (CORREGIDAS) ---

/**
 * Mapeo para agrupar todos los IDs de una familia de arma bajo una sola clave.
 * La clave debe ser única y representativa (Ej: CURSEDSTAFFS).
 */
const WEAPON_GROUP_MAP = {
    // Bastones
    'CURSEDSTAFF': 'CURSEDSTAFFS', // Bastones Malditos
    'FROSTSTAFF': 'FROSTSTAFFS',   // Bastones Escarcha
    'ARCANESTAFF': 'ARCANESTAFFS', // Bastones Arcanos
    'HOLYSTAFF': 'HOLYSTAFFS',     // Bastones Sagrados
    'FIRESTAFF': 'FIRESTAFFS',     // Bastones Fuego
    'NATURESTAFF': 'NATURESTAFFS', // Bastones Naturaleza
    'SHAPESHIFTER': 'SHAPESHIFTERS', // Cambiaformas
    'QUARTERSTAFF': 'QUARTERSTAFFS', // Varas / Bastones
    
    // Armas Cuerpo a Cuerpo y Rango
    'SPEAR': 'SPEARS',       // Lanzas
    'DAGGER': 'DAGGERS',     // Dagas (incluye RAPIER, CLAWPAIR, DUALSICKLE)
    'CROSSBOW': 'CROSSBOWS', // Ballestas
    'BOW': 'BOWS',           // Arcos
    'KNUCKLES': 'KNUCKLES',  // Puños
    'HAMMER': 'HAMMERS',     // Martillos
    'MACE': 'MACES',         // Mazas
    'AXE': 'AXES',           // Hachas
    'SWORD': 'SWORDS',       // Espadas
    
    // Off-hand
    'OFF': 'OFF_HANDS',      // Objetos de Mano Secundaria
    
    // Armaduras (dejan la clave tal cual)
    'ARMOR': 'ARMOR',
    'HEAD': 'HEAD',
    'SHOES': 'SHOES',
};

/**
 * Asigna el ID del ítem a su clave de grupo principal.
 */
const getCategoryKey = (id) => {
    // 1. Manejo de Armaduras
    if (id.includes('ARMOR') || id.includes('HEAD') || id.includes('SHOES')) {
        const parts = id.split('_');
        return `${parts[1]}_${parts[2]}`; // Ej: ARMOR_PLATE, HEAD_LEATHER
    }

    // 2. Manejo de Armas y Off-hand
    const baseId = id.replace('T8_', '').replace('MAIN_', '').replace('2H_', '');
    
    for (const prefix in WEAPON_GROUP_MAP) {
        if (baseId.includes(prefix)) {
             // Las armaduras ya están cubiertas arriba.
             // Para OFF, la clave es 'OFF'
            if (prefix === 'OFF') return 'OFF';
            
            // Para las armas, devolver la clave del grupo
            return prefix;
        }
    }
    return 'UNKNOWN';
};


/**
 * Traduce y da formato al nombre del ítem.
 * Prioriza la traducción de artefactos para que el nombre en la tarjeta sea limpio.
 */
const formatItemName = (id) => {
    let name = id.replace('T8_', '').replace(/(_MAIN|_2H)/g, ' '); // Limpiar prefijos de mano
    
    // 1. Detección de Categoría para el manejo de Armaduras/Materiales
    let category = ''; 
    if (id.includes('LEATHER')) category = 'LEATHER';
    else if (id.includes('PLATE')) category = 'PLATE';
    else if (id.includes('CLOTH')) category = 'CLOTH';
    
    // 2. Traducción de Familias de Armas (para nombres de grupos/títulos de tarjeta)
    name = name.replace('CURSEDSTAFFS', 'Bastones Malditos');
    name = name.replace('FROSTSTAFFS', 'Bastones Escarcha');
    name = name.replace('ARCANESTAFFS', 'Bastones Arcanos');
    name = name.replace('HOLYSTAFFS', 'Bastones Sagrados');
    name = name.replace('FIRESTAFFS', 'Bastones Fuego');
    name = name.replace('NATURESTAFFS', 'Bastones Naturaleza');
    name = name.replace('SHAPESHIFTERS', 'Armas Cambiaformas');
    name = name.replace('QUARTERSTAFFS', 'Vara / Bastón'); // Nombre unificado

    // 3. Traducciones de Slots de Armaduras
    name = name.replace('ARMOR', 'Armadura').replace('HEAD', 'Casco').replace('SHOES', 'Botas');
    name = name.replace('PLATE', 'Placa').replace('LEATHER', 'Cuero').replace('CLOTH', 'Tela');
    
    // 4. Traducción de artefactos y nombres específicos (para detalles de ítem)
    name = name.replace('GLACIALSTAFF', 'Granizobardo').replace('ICECRYSTAL', 'Cristal de Hielo');
    name = name.replace('DEMONICSTAFF', 'Bastón de la Plaga').replace('SKULLORB', 'Orbe Calavera');
    name = name.replace('ENIGMATICSTAFF', 'Bastón Enigmático').replace('ENIGMATICORB', 'Orbe Enigmático');
    name = name.replace('DIVINESTAFF', 'Bastón Divino');
    name = name.replace('INFERNOSTAFF', 'Bastón Infernal');
    name = name.replace('WILDSTAFF', 'Bastón Salvaje');
    name = name.replace('IRONCLADEDSTAFF', 'Bastón con Revestimiento');
    name = name.replace('DOUBLEBLADEDSTAFF', 'Doble Filo');
    name = name.replace('GLAIVE', 'Hacha Larga');
    name = name.replace('CLAWPAIR', 'Par de Garras');
    name = name.replace('CROSSBOWLARGE', 'Ballesta Pesada');
    name = name.replace('WARBOW', 'Arco de Guerra').replace('LONGBOW', 'Arco Largo');
    name = name.replace('POLEHAMMER', 'Martillo de Guerra');
    name = name.replace('FLAIL', 'Mangual');
    name = name.replace('HALBERD', 'Alabarda');
    name = name.replace('CLAYMORE', 'Mandoble').replace('DUALSWORD', 'Espadas Dobles');
    name = name.replace('RAPIER', 'Florete'); // Daga artefacto
    name = name.replace('DUALSICKLE', 'Doble Hoz');
    name = name.replace('TWINSCYTHE', 'Doble Guadaña');
    name = name.replace('ROCKSTAFF', 'Bastón de Roca');
    name = name.replace('TRIDENT', 'Tridente');
    name = name.replace('HARPOON', 'Arpón');
    name = name.replace('SCYTHE', 'Guadaña');
    name = name.replace('CLEAVER', 'Cuchilla');

    // 5. Traducción de Off-hand
    name = name.replace('OFF_HANDS', 'Objetos de Mano Secundaria');
    name = name.replace('OFF_BOOK', 'Libro');
    name = name.replace('OFF_ORB', 'Orbe');
    name = name.replace('OFF_DEMONSKULL', 'Calavera Demoníaca');
    name = name.replace('OFF_TOTEM', 'Tótem');
    name = name.replace('OFF_CENSER', 'Incensario');
    name = name.replace('OFF_TOME', 'Tomo');
    name = name.replace('OFF_TORCH', 'Antorcha');
    name = name.replace('OFF_HORN', 'Cuerno');
    name = name.replace('OFF_TALISMAN', 'Talismán');
    name = name.replace('OFF_LAMP', 'Lámpara');
    name = name.replace('OFF_JESTERCANE', 'Cetro de Bufón');
    name = name.replace('OFF_SHIELD', 'Escudo');
    
    // 6. Nombres de Facciones/Sets (Comunes)
    name = name.replace('ROYAL', 'Real').replace('AVALON', 'Avalon').replace('HELL', 'Infernal').replace('KEEPER', 'Guardián').replace('MORGANA', 'Morgana').replace('UNDEAD', 'No Muerto').replace('CRYSTAL', 'Cristal').replace('FEY', 'Fey');

    // Nombres de Armaduras base (SET1/2/3)
    if (category === 'LEATHER') name = name.replace('SET1', 'Mercenario').replace('SET2', 'Cazador').replace('SET3', 'Asesino'); 
    else if (category === 'CLOTH') name = name.replace('SET1', 'Erudito').replace('SET2', 'Clérigo').replace('SET3', 'Mago'); 
    else if (category === 'PLATE') name = name.replace('SET1', 'Soldado').replace('SET2', 'Caballero').replace('SET3', 'Guardián'); 
    
    // 7. Limpieza y Capitalización
    name = name.replace(/_/g, ' ').replace(/\s\s+/g, ' ').toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
    return name.trim();
};

/**
 * Agrupa los IDs de los ítems en categorías.
 * CORREGIDO para usar la lógica de mapeo para armas.
 */
const groupItems = (items) => {
    const groups = {};
    items.forEach(id => {
        const baseKey = getCategoryKey(id);
        
        // Usar el mapa para obtener el nombre del grupo final (Ej: CURSEDSTAFFS)
        const categoryKey = WEAPON_GROUP_MAP[baseKey] || baseKey;
        const finalKey = `T8_${categoryKey}`;

        // Determinar la imagen de portada (Cover ID)
        let coverId;
        if (id.includes('ARMOR') || id.includes('HEAD') || id.includes('SHOES')) {
            // Armaduras: usar el SET1 base
            coverId = id.replace(/_(SET\d|ROYAL|HELL|KEEPER|AVALON|FEY|UNDEAD|MORGANA)/, '_SET1');
        } else if (categoryKey === 'OFF_HANDS') {
            // Off-hand: Usar el Libro como cover
            coverId = 'T8_OFF_BOOK';
        } else if (categoryKey === 'SHAPESHIFTERS') {
            // Cambiaformas: Usar el SET1
            coverId = 'T8_2H_SHAPESHIFTER_SET1';
        } else if (id.includes(categoryKey.replace('S', ''))) {
            // Armas: Buscar el arma MAIN o 2H base (sin artefacto)
            const baseType = categoryKey.replace('S', ''); // Ej: CURSEDSTAFF
            // Buscar la versión base MAIN o 2H, prefiriendo MAIN si existe
            coverId = items.find(itemId => 
                itemId === `T8_MAIN_${baseType}` || itemId === `T8_2H_${baseType}`
            );
            if (!coverId) coverId = id; // Fallback si no encuentra la base (ej: KNUCKLES)
        } else {
             coverId = id;
        }

        if (!groups[finalKey]) {
            groups[finalKey] = {
                // Formatear la clave del grupo (Ej: Bastones Malditos)
                name: formatItemName(finalKey.replace('T8_', '')), 
                key: finalKey,
                items: [],
                coverId: coverId,
            };
        }
        groups[finalKey].items.push(id);
    });
    return Object.values(groups);
};


// --- Componente de la Barra de Navegación (sin cambios) ---

const Navbar = ({ handleLogout, currentView, setCurrentView }) => {
    // Función para manejar el cambio de vista y establecer la clase activa
    const getLinkClass = (viewName) => (
        `nav-link ${currentView === viewName ? 'nav-link-active' : ''}`
    );

    return (
        <nav className="navbar">
            {/* Logo y Título */}
            <div className="navbar-logo" onClick={() => setCurrentView('explorer')}>
                <img 
                    src={LogoImage} 
                    alt="Warrior Codex Logo" 
                    className="logo-icon logo-image" 
                />
                <span className="logo-text">WARRIOR'S CODEX</span>
            </div>

            {/* Enlaces principales */}
            <div className="navbar-links">
                <a href="#" className={getLinkClass('creator')} onClick={() => setCurrentView('creator')}>
                    <Layers3 size={16}/> Build Creator
                </a>
                <a href="#" className={getLinkClass('community')} onClick={() => setCurrentView('community')}>
                    <Flame size={16}/> Community Builds
                </a>
                <a href="#" className={getLinkClass('mybuilds')} onClick={() => setCurrentView('mybuilds')}>
                    <User size={16}/> My Builds
                </a>
                <a href="#" className={getLinkClass('explorer')} onClick={() => setCurrentView('explorer')}>
                    <Search size={16}/> Item Explorer
                </a>
            </div>

            {/* Acciones y Buscador */}
            <div className="navbar-actions">
                <div className="search-bar">
                    <input type="text" placeholder="Buscar builds..." className="search-input"/>
                    <button className="search-button" aria-label="Buscar">
                        <Search size={18}/>
                    </button>
                </div>
                
                <button 
                    onClick={handleLogout} 
                    className="login-button logout-button"
                    title="Cerrar Sesión"
                >
                    <LogIn size={18}/> Logout
                </button>
            </div>
        </nav>
    );
};


// --- Componente Explorador de Ítems (sin cambios en la lógica del componente) ---

const ItemExplorer = () => {
    const [itemCategories, setItemCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const cardRefs = useRef({});

    useEffect(() => {
        const timer = setTimeout(() => {
            // Se usa la constante T8_RAW_IDS actualizada y la función groupItems modificada
            const groupedList = groupItems(T8_RAW_IDS);
            setItemCategories(groupedList);
            setLoading(false);
        }, 500); 

        return () => clearTimeout(timer);
    }, []);

    const handleMouseLeave = (key) => {
        const card = cardRefs.current[key];
        if (card) {
            card.scrollTop = 0; 
        }
    };

    return (
        <>
            <h1 className="dashboard-title">Explora los Sets T8 👑</h1>
            <p className="dashboard-subtitle">Selecciona una categoría de armadura o arma para ver los ítems únicos.</p>
            <hr/>
            {loading ? (
                <p>Preparando las categorías de armadura y arma...</p>
            ) : (
                <div className="item-category-grid">
                    {itemCategories.map(category => (
                        <div 
                            key={category.key} 
                            className="item-category-card"
                            ref={el => cardRefs.current[category.key] = el}
                            onMouseLeave={() => handleMouseLeave(category.key)}
                        >
                            <div className="category-cover">
                                <img 
                                    src={`${IMG_BASE_URL}${category.coverId}`} 
                                    alt={category.name} 
                                    className="category-icon"
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = "https://placehold.co/64x64/0f172a/ffffff?text=Item";
                                    }}
                                />
                                <p className="category-name">{category.name}</p>
                            </div>
                            <div className="category-scroll-container">
                                {category.items.map(itemId => (
                                    <div key={itemId} className="item-card-detail">
                                        <img 
                                            src={`${IMG_BASE_URL}${itemId}`} 
                                            alt={itemId} 
                                            className="item-icon"
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = "https://placehold.co/32x32/0f172a/ffffff?text=Item";
                                            }}
                                        />
                                        <p className="item-name-detail">{formatItemName(itemId).replace(category.name, '').trim()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

// --- Componente Creador de Builds (se mantiene igual) ---

const BuildCreator = () => {
    // Simulando el slot vacío con un placeholder circular SVG
    const EmptySlot = ({ name }) => (
        <div className="equipment-slot empty-slot">
            <span className="slot-name">{name}</span>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="#444" strokeWidth="4" fill="#2a2a2a" />
            </svg>
        </div>
    );

    // Slots de equipo comunes para la visualización central
    const slots = [
        { key: 'mainhand', name: 'Arma Principal', style: { top: '3%', left: '48%' } },
        { key: 'offhand', name: 'Mano Secundaria', style: { top: '3%', right: '23%' } },
        { key: 'head', name: 'Casco', style: { top: '15%', left: '48%' } },
        { key: 'cape', name: 'Capa', style: { top: '23%', right: '13%' } },
        { key: 'chest', name: 'Armadura', style: { top: '35%', left: '48%' } },
        { key: 'shoes', name: 'Botas', style: { top: '55%', left: '48%' } },
        { key: 'bag', name: 'Mochila', style: { bottom: '5%', left: '23%' } },
        { key: 'mount', name: 'Montura', style: { bottom: '5%', right: '48%' } },
        { key: 'food', name: 'Comida', style: { bottom: '15%', left: '48%' } },
        { key: 'potion', name: 'Poción', style: { bottom: '30%', left: '13%' } },
        // ... slots adicionales si se necesitan (pociones/comida fuera del círculo central)
    ];

    const stats = [
        { name: 'Health', value: '3,200', icon: <Droplet size={18} /> },
        { name: 'Damage', value: '1,150', icon: <Zap size={18} /> },
        { name: 'Defense', value: '450', icon: <Shield size={18} /> },
        { name: 'Resistencia', value: '250', icon: <Clock size={18} /> },
        { name: 'C. Efec.', value: '18%', icon: <ArrowLeftRight size={18} /> },
        { name: 'Movilidad', value: '100%', icon: <Map size={18} /> },
    ];

    const activities = [
        { key: 'solo-pve', label: 'Solo PvE', icon: '👤' },
        { key: 'group-pve', label: 'Group PvE', icon: '👥' },
        { key: 'ganking', label: 'Ganking', icon: '🔪' },
        { key: 'hellgate', label: 'Hellgate', icon: '🔥' },
        { key: 'corrupted', label: 'Corrupted Dungeon', icon: '💀' },
        { key: 'gathering', label: 'Gathering', icon: '⛏️' },
        { key: 'fame-farm', label: 'Fame Farm', icon: '🌟' },
    ];
    
    // Estado simulado para la build
    const [buildDetails, setBuildDetails] = useState({
        name: '',
        description: '',
        activityType: 'solo-pve',
    });

    const handleDetailChange = (e) => {
        const { name, value } = e.target;
        setBuildDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (isPublic) => {
        const type = isPublic ? 'Público' : 'Privado';
        // Aquí se enviaría la build a Firebase Firestore
        console.log(`Guardando build como ${type}:`, buildDetails);
        alert(`Build '${buildDetails.name}' guardada como ${type}.`);
    };

    return (
        <div className="build-creator-container">
            <h1 className="dashboard-title">🔨 Creador de Builds</h1>
            <p className="dashboard-subtitle">Ensambla tu equipamiento y comparte tu estrategia con la comunidad.</p>
            
            <div className="creation-layout">
                {/* Columna 1: Ítems y Visualización Central */}
                <div className="layout-col build-preview-area">
                    <div className="character-display">
                        <div className="placeholder-character">
                            {/* Placeholder simple de personaje */}
                            <img 
                                src="https://placehold.co/100x200/4f4f4f/ffffff?text=Avatar" 
                                alt="Character Placeholder"
                                style={{ borderRadius: '4px', width: 'auto', height: '660px'  }}
                            />
                        </div>
                        {/* Slots de equipo - Usamos CSS absoluto para posicionar como un anillo */}
                        {slots.map(slot => (
                            <div 
                                key={slot.key} 
                                className="equipment-slot-wrapper" 
                                style={slot.style}
                                title={`Seleccionar ${slot.name}`}
                            >
                                <EmptySlot name={slot.name.split(' ')[0]} />
                            </div>
                        ))}
                    </div>

                    {/* Sección de Estadísticas Simuladas */}
                    <div className="stats-panel">
                        <h3 className="panel-title">Estadísticas (Estimadas)</h3>
                        <div className="stats-grid">
                            {stats.map(stat => (
                                <div key={stat.name} className="stat-item">
                                    <div className="stat-icon-wrapper">{stat.icon}</div>
                                    <p className="stat-label">{stat.name}</p>
                                    <p className="stat-value">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Columna 2: Detalles de la Build y Acciones */}
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

                    {/* Botones de Acción */}
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


// --- Componente Principal Dashboard (se mantiene igual) ---

export default function Dashboard({ setIsLoggedIn }) {
    // Estado para controlar la vista actual: 'creator', 'explorer', 'community', 'mybuilds'
    const [currentView, setCurrentView] = useState('creator'); 
    
    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    
    const renderContent = () => {
        switch (currentView) {
            case 'creator':
                return <BuildCreator />;
            case 'community':
                return <div><h1 className="dashboard-title">Community Builds</h1><p className="dashboard-subtitle">Contenido futuro: Explora builds de otros jugadores.</p></div>;
            case 'mybuilds':
                return <div><h1 className="dashboard-title">My Builds</h1><p className="dashboard-subtitle">Contenido futuro: Tus builds privadas y públicas.</p></div>;
            case 'explorer':
            default:
                return <ItemExplorer />;
        }
    }

    return (
        <div className="full-app-container">
            <Navbar 
                handleLogout={handleLogout} 
                currentView={currentView}
                setCurrentView={setCurrentView}
            /> 

            <div className="dashboard-container ttcn">
                <div className="dashboard-box tdtn">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}