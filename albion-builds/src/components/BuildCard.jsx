import React from 'react';
import { X, Lock, Flame, Trash2 } from 'lucide-react'; 

// Corregido: asumimos que el CSS está en el mismo directorio para evitar el error de ruta
import '../styles/BuildCard.css';

const IMG_BASE_URL = "https://render.albiononline.com/api/v1/item/";
const ITEM_NAME_MAP = { 
    // Mapeo mínimo para que el componente funcione
    "T8_MAIN_CURSEDSTAFF": "Bastón Maldito",
    "T8_ARMOR_PLATE_SET1": "Armadura de Soldado",
    "T8_HEAD_PLATE_SET1": "Casco de Soldado",
    "T8_SHOES_PLATE_SET1": "Botas de Soldado",
};
const EQUIPMENT_SLOTS = [
    'head', 'chest', 'shoes', 'mainhand', 'offhand'
]; 
// --- FIN MOCK DATA ---


// Componente para visualizar el ítem
const ItemDisplay = ({ itemId, slotName }) => {
    // Las clases 'item-icon-box empty' y 'item-icon-box filled' ahora provienen del archivo BuildCard.css
    const isFilled = !!itemId;
    
    // Convertimos el nombre del slot a un nombre corto para el placeholder
    const shortName = slotName.split(' ')[0].slice(0, 3);
    
    if (!isFilled) {
        return (
            // Se mantiene la clase 'item-icon-box empty'
            <div className="item-icon-box empty">
                {/* Estas clases (text-xs text-gray-500 opacity-50) parecen ser de Tailwind CSS y se mantienen */}
                <span className="text-xs text-gray-500 opacity-50">{shortName}</span>
            </div>
        );
    }

    return (
        // Se mantiene la clase 'item-icon-box filled'
        <div className="item-icon-box filled" title={ITEM_NAME_MAP[itemId] || itemId}>
            <img 
                src={`${IMG_BASE_URL}${itemId}`} 
                alt={ITEM_NAME_MAP[itemId] || itemId} 
                className="w-full h-full object-contain"
                onError={(e) => e.target.src = "https://placehold.co/64x64/0f172a/ffffff?text=?"}
            />
        </div>
    );
};

// Componente principal de la tarjeta de Build
// Aceptamos 'onDelete' como una nueva prop
export const BuildCard = ({ build, onDelete }) => { 
    const { id, name, description, activityType, equipment, isPublic } = build;

    return (
        // Se mantiene la clase 'build-card-container'
        <div className="build-card-container">
            {/* Se mantienen las clases del archivo CSS: build-header, build-title-text, build-metadata, build-status, private, public */}
            <div className="build-header">
                <div>
                    <div className="build-title-text">{name}</div>
                    <div className="text-sm text-gray-400 mt-1">{description || "Sin descripción detallada."}</div>
                </div>
                
                {/* >>> BOTÓN DE BORRADO: Aparece si se pasa la función onDelete <<< */}
                {onDelete && (
                    <button 
                        className="delete-button" 
                        title="Borrar Build"
                        // Al hacer clic, llamamos a la función onDelete con el ID de la build
                        onClick={() => onDelete(id)} 
                    >
                        <Trash2 size={16}/> 
                    </button>
                )}
                
                <div className="build-metadata">
                    <span className="build-status" style={{ backgroundColor: '#4a4a4a' }}>Actividad: {activityType.toUpperCase()}</span>
                    <div className={`build-status ${isPublic ? 'public' : 'private'}`}>
                        {isPublic ? <Flame size={14}/> : <Lock size={14}/>}
                        {isPublic ? 'Pública' : 'Privada'}
                    </div>
                </div>
            </div>

            {/* Visualización del Equipamiento */}
            <div className="equipment-grid-view">
                {EQUIPMENT_SLOTS.map(slotKey => (
                    <ItemDisplay 
                        key={slotKey} 
                        itemId={equipment[slotKey]} 
                        slotName={slotKey.toUpperCase()}
                    />
                ))}
            </div>

            {/* Botón de ejemplo para futuras acciones */}
            <button className="text-xs text-blue-400 mt-2 text-left hover:text-blue-300">
                Ver Detalles / Clonar Build
            </button>
        </div>
    );
};