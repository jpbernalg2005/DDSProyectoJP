import { useState } from "react";
import { 
    Shield, Droplet, Zap, ArrowLeftRight, Clock, Map, Lock, Upload 
} from 'lucide-react'; 
// importamos los estilos si fuera necesario

// --- COMPONENTE BuildCreator ---
export const BuildCreator = () => {
    // Simulando el slot vacío con un placeholder circular SVG
    const EmptySlot = ({ name }) => (
        <div className="equipment-slot empty-slot">
            <span className="slot-name">{name}</span>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" stroke="#444" strokeWidth="4" fill="#2a2a2a" />
            </svg>
        </div>
    );

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
        console.log(`Guardando build como ${type}:`, buildDetails);
        alert(`Build '${buildDetails.name}' guardada como ${type}.`);
    };
    
    return (
        <div className="build-creator-container">
            <h1 className="dashboard-title">🔨 Creador de Builds</h1>
            <p className="dashboard-subtitle">Ensambla tu equipamiento y comparte tu estrategia con la comunidad.</p>
            
            <div className="creation-layout">
                <div className="layout-col build-preview-area">
                    <div className="character-display">
                        <div className="placeholder-character">
                            <img 
                                src="https://placehold.co/100x200/4f4f4f/ffffff?text=Avatar" 
                                alt="Character Placeholder"
                                style={{ borderRadius: '4px', width: 'auto', height: '660px'  }}
                            />
                        </div>
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