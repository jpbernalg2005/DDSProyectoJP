import { useEffect, useState } from 'react';
import { getBuilds } from '../utils/storage'; 
import { BuildCard } from './Buildcard.jsx'; 

export const CommunityBuilds = () => {
    const [communityBuilds, setCommunityBuilds] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect se encarga de cargar y filtrar
    useEffect(() => {
        const allBuilds = getBuilds();
        const publicBuilds = allBuilds.filter(build => build.isPublic === true);
        
        setCommunityBuilds(publicBuilds);
        setLoading(false);
    }, []); // El array vacío asegura que solo se ejecute al montar

    return (
        <>
            <h1 className="dashboard-title">🔥 Community Builds</h1>
            <p className="dashboard-subtitle">Explora las builds compartidas por ti (guardadas localmente como públicas).</p>
            
            <div className="builds-list mt-5">
                {loading ? (
                    <p>Cargando builds...</p>
                ) : communityBuilds.length === 0 ? (
                    <p>No hay builds públicas guardadas en este navegador.</p>
                ) : (
                    communityBuilds.map(build => (
                        <BuildCard key={build.id} build={build} />
                    ))
                )}
            </div>
        </>
    );
};