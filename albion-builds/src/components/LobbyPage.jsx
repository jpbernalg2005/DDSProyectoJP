import { User, Layers3, Flame, Search } from 'lucide-react';
import "../styles/Lobby.css";

export const LobbyPage = ({ navigate }) => {
    return (
        <div className="lobby-container">
            <h1 className="lobby-title">Bienvenido a Warrior's Codex ⚔️</h1>
            <p className="lobby-subtitle">Tu portal esencial para planificar tus builds en Albion Online.</p>
            
            <div className="feature-grid">
                <div className="feature-card" onClick={() => navigate('/buildcreator')}>
                    <Layers3 size={40} className="feature-icon"/>
                    <h2>Creador de Builds</h2>
                    <p>Diseña tu equipo paso a paso.</p>
                </div>
                <div className="feature-card" onClick={() => navigate('/communitybuilds')}>
                    <Flame size={40} className="feature-icon"/>
                    <h2>Explorar Comunidad</h2>
                    <p>Descubre y vota los equipamientos compartidas por otros jugadores.</p>
                </div>
                <div className="feature-card" onClick={() => navigate('/itemexplorer')}>
                    <Search size={40} className="feature-icon"/>
                    <h2>Explorador de Ítems</h2>
                    <p>Revisa estadísticas y variantes de todo el equipo.</p>
                </div>
                <div className="feature-card" onClick={() => navigate('/mybuilds')}>
                    <User size={40} className="feature-icon"/>
                    <h2>Mis Builds</h2>
                    <p>Accede y gestiona tu colección de equipamientos guardados.</p>
                </div>
            </div>
        </div>
    );
};