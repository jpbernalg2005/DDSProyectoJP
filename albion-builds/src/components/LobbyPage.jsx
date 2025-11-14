import { User, Layers3, Flame, Search } from 'lucide-react';

export const LobbyPage = ({ navigate }) => {
    return (
        <div className="lobby-container">
            <h1 className="lobby-title">Bienvenido al Codex del Guerrero ⚔️</h1>
            <p className="lobby-subtitle">Tu portal esencial para planificar y optimizar tus *builds* en Albion Online.</p>
            
            <div className="feature-grid">
                <div className="feature-card" onClick={() => navigate('/buildcreator')}>
                    <Layers3 size={40} className="feature-icon"/>
                    <h2>Creador de Builds</h2>
                    <p>Diseña tu equipo, habilidades y consumibles paso a paso.</p>
                </div>
                <div className="feature-card" onClick={() => navigate('/communitybuilds')}>
                    <Flame size={40} className="feature-icon"/>
                    <h2>Explorar Comunidad</h2>
                    <p>Descubre y vota las estrategias compartidas por otros jugadores.</p>
                </div>
                <div className="feature-card" onClick={() => navigate('/itemexplorer')}>
                    <Search size={40} className="feature-icon"/>
                    <h2>Explorador de Ítems</h2>
                    <p>Revisa estadísticas y variantes de todo el equipo de Tier 8.</p>
                </div>
                <div className="feature-card" onClick={() => navigate('/mybuilds')}>
                    <User size={40} className="feature-icon"/>
                    <h2>Mis Builds</h2>
                    <p>Accede y gestiona tu colección de equipamientos guardados.</p>
                </div>
            </div>
            
            <p className="footer-note">¡Prepárate para las Tierras Lejanas! 🗺️</p>
        </div>
    );
};