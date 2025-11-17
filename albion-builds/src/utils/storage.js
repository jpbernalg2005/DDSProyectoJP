// Funciones de utilidad para manejar la persistencia de Builds en localStorage

/**
 * Carga todas las builds guardadas de localStorage.
 * @returns {Array} Lista de builds.
 */
export const getBuilds = () => {
    try {
        const buildsJson = localStorage.getItem('albion_builds');
        return buildsJson ? JSON.parse(buildsJson) : [];
    } catch (e) {
        console.error("Error al cargar builds:", e);
        return [];
    }
};

/**
 * Guarda una nueva build.
 * IMPORTANTE: Genera un ID único para la build.
 * @param {object} buildData - Datos de la build (name, description, equipment, etc.)
 * @param {boolean} isPublic - Si la build es pública o privada.
 */
export const saveNewBuild = (buildData, isPublic) => {
    const existingBuilds = getBuilds();
    const newBuild = {
        // Genera un ID único (usando timestamp) para que la función de borrado funcione.
        id: Date.now().toString(), 
        ...buildData,
        isPublic: isPublic,
    };

    const updatedBuilds = [...existingBuilds, newBuild];
    
    try {
        localStorage.setItem('albion_builds', JSON.stringify(updatedBuilds));
    } catch (e) {
        console.error("Error al guardar build:", e);
    }
};

/**
 * Elimina una build del localStorage por su ID y recarga el estado.
 * @param {string} buildId - El ID único de la build a eliminar.
 * @returns {boolean} True si se eliminó con éxito.
 */
export const deleteBuild = (buildId) => {
    const existingBuilds = getBuilds();
    
    // Filtra el array, manteniendo SOLO las builds cuyo ID NO coincide.
    const updatedBuilds = existingBuilds.filter(build => build.id !== buildId); 
    
    try {
        localStorage.setItem('albion_builds', JSON.stringify(updatedBuilds));
        return true;
    } catch (e) {
        console.error("Error al eliminar build:", e);
        return false;
    }
};

// --- MOCK DATA para que otros componentes puedan importar estas constantes ---

export const IMG_BASE_URL = "https://render.albiononline.com/api/v1/item/";

export const ITEM_NAME_MAP = {
    // Mapeo mínimo de ejemplo
    "T8_MAIN_CURSEDSTAFF": "Bastón Maldito",
    "T8_ARMOR_PLATE_SET1": "Armadura de Soldado",
    "T8_HEAD_PLATE_SET1": "Casco de Soldado",
    "T8_SHOES_PLATE_SET1": "Botas de Soldado",
    "T8_CAPE": "Capa Común",
    "T8_MEAL_FISH_BOWL": "Estofado de Pescado",
    "T8_POTION_HEAL": "Poción de Curación Mayor",
};

export const EQUIPMENT_SLOTS = [
    'head', 'chest', 'shoes', 'mainhand', 'offhand', 'cape', 'bag', 'food', 'potion'
];