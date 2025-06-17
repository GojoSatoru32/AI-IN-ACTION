import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { ConflictZone } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, AlertTriangle, Calendar, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

interface InteractiveMapProps {
  zones: ConflictZone[];
  selectedZone?: ConflictZone | null;
  onZoneSelect: (zone: ConflictZone | null) => void;
}

// Custom marker icons
const createCustomIcon = (severity: string, status: string) => {
  const severityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#f97316',
    critical: '#ef4444',
  };

  const statusBorderColors = {
    'active-conflict': '#ef4444',
    'ceasefire': '#f59e0b',
    'negotiation': '#3b82f6',
    'post-conflict': '#8b5cf6',
    'stable-peace': '#10b981',
    'at-risk': '#f97316',
  };

  return L.divIcon({
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background-color: ${severityColors[severity]};
        border: 3px solid ${statusBorderColors[status]};
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        animation: pulse 2s infinite;
      "></div>
      <style>
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      </style>
    `,
    className: 'custom-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

function MapEvents({ onZoneSelect }: { onZoneSelect: (zone: ConflictZone | null) => void }) {
  const map = useMap();

  useEffect(() => {
    const handleClick = () => {
      onZoneSelect(null);
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onZoneSelect]);

  return null;
}

export function InteractiveMap({ zones, selectedZone, onZoneSelect }: InteractiveMapProps) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'active-conflict': 'bg-red-500',
      'ceasefire': 'bg-yellow-500',
      'negotiation': 'bg-blue-500',
      'post-conflict': 'bg-purple-500',
      'stable-peace': 'bg-green-500',
      'at-risk': 'bg-orange-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20',
      medium: 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20',
      high: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/20',
      critical: 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20',
    };
    return colors[severity] || 'text-gray-600 bg-gray-100';
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[20, 0]}
        zoom={3}
        className="w-full h-full rounded-xl overflow-hidden"
        style={{ background: 'transparent' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        <MapEvents onZoneSelect={onZoneSelect} />

        {zones.map((zone) => (
          <Marker
            key={zone.id}
            position={zone.coordinates}
            icon={createCustomIcon(zone.severity, zone.status)}
            eventHandlers={{
              click: () => onZoneSelect(zone),
            }}
          >
            <Popup>
              <div className="max-w-xs">
                <h3 className="font-semibold text-lg mb-2">{zone.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{zone.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className={getSeverityColor(zone.severity)}>
                    {zone.severity}
                  </Badge>
                  <Badge variant="outline">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(zone.status)} mr-1`} />
                    {zone.status.replace('-', ' ')}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  onClick={() => onZoneSelect(zone)}
                  className="w-full"
                >
                  View Details
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Zone Detail Panel */}
      <AnimatePresence>
        {selectedZone && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
            className="absolute top-4 right-4 bottom-4 w-96 z-[1000]"
          >
            <Card className="h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-gray-200/20 dark:border-gray-700/20 shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{selectedZone.name}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{selectedZone.continent}</span>
                      <span>•</span>
                      <span className="capitalize">{selectedZone.conflictType}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onZoneSelect(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge className={getSeverityColor(selectedZone.severity)}>
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {selectedZone.severity}
                  </Badge>
                  <Badge variant="outline">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedZone.status)} mr-1`} />
                    {selectedZone.status.replace('-', ' ')}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 overflow-y-auto">
                {/* Description */}
                <div>
                  <h4 className="font-medium mb-2">Overview</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedZone.background}
                  </p>
                </div>

                {/* Statistics */}
                <div>
                  <h4 className="font-medium mb-3">Impact Statistics</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">Affected</span>
                      </div>
                      <div className="text-lg font-semibold">
                        {formatNumber(selectedZone.statistics.affectedPopulation)}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">Displaced</span>
                      </div>
                      <div className="text-lg font-semibold">
                        {formatNumber(selectedZone.statistics.displacement)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">Duration</span>
                    </div>
                    <div className="text-sm font-medium">{selectedZone.statistics.duration}</div>
                  </div>
                </div>

                {/* Peace Efforts */}
                {selectedZone.peaceEfforts.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Peace Efforts</h4>
                    <div className="space-y-3">
                      {selectedZone.peaceEfforts.slice(0, 2).map((effort) => (
                        <div key={effort.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-sm">{effort.title}</h5>
                            <Badge
                              variant={effort.status === 'active' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {effort.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {effort.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* NGOs */}
                {selectedZone.ngos.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Active Organizations</h4>
                    <div className="space-y-2">
                      {selectedZone.ngos.slice(0, 3).map((ngo) => (
                        <div key={ngo.id} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="font-medium text-sm mb-1">{ngo.name}</div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            {ngo.description}
                          </p>
                          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                            {ngo.impact}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={() => navigate(`/case-study/${selectedZone.id}`)}
                    className="w-full"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Full Case Study
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/contribute')}
                    className="w-full"
                  >
                    Contribute Ideas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}