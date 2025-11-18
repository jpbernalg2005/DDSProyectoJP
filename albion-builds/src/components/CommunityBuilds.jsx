// src/components/CommunityBuilds.jsx

import { useEffect, useState } from 'react';
// Importamos la función específica para la comunidad
import { getPublicBuilds } from '../utils/storage.js'; 
import { BuildCard } from './Buildcard.jsx'; 

export const CommunityBuilds = () => {
    const [communityBuilds, setCommunityBuilds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const loadCommunityBuilds = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Llama a la nueva función optimizada de Firestore
                const publicBuilds = await getPublicBuilds(); 
                
                // Verifica que el resultado sea un array antes de establecer el estado
                if (Array.isArray(publicBuilds)) {
                    setCommunityBuilds(publicBuilds);
                } else {
                    // Si getPublicBuilds falla por alguna razón (aunque debería lanzar un error)
                    setError("La lista de builds no fue devuelta correctamente.");
                }

            } catch (err) {
                console.error("Error al cargar Builds comunitarias:", err);
                // Muestra un mensaje de error amigable al usuario
                setError("Fallo al conectar con la base de datos para obtener builds públicas.");
                setCommunityBuilds([]);
            } finally {
                setLoading(false);
            }
        };

        loadCommunityBuilds();
    }, []); 

    return (
        <div className="community-builds-dashboard p-6 bg-gray-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold text-blue-400 mb-6">🌎 Community Builds ({communityBuilds.length})</h1>
            <p className="text-gray-400 mb-6">Explora las builds que otros jugadores han compartido públicamente.</p>
            
            {error && <div className="p-4 bg-red-800 text-red-100 rounded-lg mb-4">❌ {error}</div>}
            
            {loading ? (
                <div className="text-xl text-gray-400">Cargando builds comunitarias...</div>
            ) : communityBuilds.length === 0 ? (
                <div className="text-center p-10 bg-gray-800 rounded-lg">
                    <p className="text-lg text-gray-400">No se encontraron builds públicas o tu base de datos está vacía.</p>
                </div>
            ) : (
                <div className="builds-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {communityBuilds.map(build => (
                        <BuildCard 
                            key={build.id} 
                            build={build} 
                            // Nota: No se pasa onDelete a las builds comunitarias
                        />
                    ))}
                </div>
            )}
        </div>
    );
};