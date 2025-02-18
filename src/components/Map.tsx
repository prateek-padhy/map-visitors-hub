
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Eye, EyeOff, Plus } from 'lucide-react';
import AddVisitor from './AddVisitor';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface MapProps {
  className?: string;
}

interface Visitor {
  country: string;
  count: number;
  coordinates: [number, number];
}

const Map: React.FC<MapProps> = ({ className }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [showAddVisitor, setShowAddVisitor] = useState(false);
  const [showVisitors, setShowVisitors] = useState(false);
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoicHJhdGVlay1wYWRoeSIsImEiOiJjbTc5Z2ptMGwwNDRyMnJzYm1hM3lweW01In0.XtTCyFimo951D2wU1V0mkA';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [0, 20],
      zoom: 2,
      projection: 'globe',
      pitch: 45,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('style.load', () => {
      map.current?.setFog({
        color: 'rgb(12, 12, 14)',
        'high-color': 'rgb(20, 20, 25)',
        'horizon-blend': 0.2,
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const addVisitor = (country: string, coordinates: [number, number]) => {
    setVisitors(prev => {
      const existing = prev.find(v => v.country === country);
      if (existing) {
        return prev.map(v => 
          v.country === country 
            ? { ...v, count: v.count + 1 }
            : v
        );
      }
      return [...prev, { country, coordinates, count: 1 }];
    });
    setShowAddVisitor(false);
  };

  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    const markers = document.getElementsByClassName('visitor-marker');
    while (markers.length > 0) {
      markers[0].remove();
    }

    // Add new markers if showVisitors is true
    if (showVisitors) {
      visitors.forEach(visitor => {
        const el = document.createElement('div');
        el.className = 'visitor-marker glass absolute px-3 py-1 rounded-full text-sm text-white transform -translate-x-1/2 -translate-y-1/2';
        el.innerHTML = `${visitor.country}: ${visitor.count}`;
        
        new mapboxgl.Marker({ element: el })
          .setLngLat(visitor.coordinates)
          .addTo(map.current!);
      });
    }
  }, [visitors, showVisitors]);

  return (
    <div className={cn("relative w-full h-screen", className)}>
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Control buttons */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-4">
        <Button
          variant="outline"
          size="icon"
          className="glass hover:bg-white/20 transition-colors duration-200"
          onClick={() => setShowAddVisitor(!showAddVisitor)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="glass hover:bg-white/20 transition-colors duration-200"
          onClick={() => setShowVisitors(!showVisitors)}
        >
          {showVisitors ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Add visitor dialog */}
      {showAddVisitor && (
        <AddVisitor
          onAdd={addVisitor}
          onClose={() => setShowAddVisitor(false)}
        />
      )}
    </div>
  );
};

export default Map;
