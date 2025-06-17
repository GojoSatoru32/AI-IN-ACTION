import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Globe, TrendingUp, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { Sidebar } from '@/components/layout/Sidebar';
import { useMapData } from '@/hooks/useMapData';
import { ConflictZone } from '@/types';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export function Home() {
  const { zones, loading, filters, updateFilters, clearFilters } = useMapData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<ConflictZone | null>(null);

  const stats = {
    totalConflicts: zones.length,
    activeEfforts: zones.reduce((acc, zone) => acc + zone.peaceEfforts.filter(e => e.status === 'active').length, 0),
    peopleAffected: zones.reduce((acc, zone) => acc + zone.statistics.affectedPopulation, 0),
    ngosInvolved: zones.reduce((acc, zone) => acc + zone.ngos.length, 0),
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/5 dark:to-purple-400/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
              Interactive Peacebuilding Map
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore global conflict zones, discover peace initiatives, and contribute to building a more peaceful world.
            </p>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Globe className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalConflicts}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Conflict Zones
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.activeEfforts}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Peace Efforts
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(stats.peopleAffected)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  People Affected
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.ngosInvolved}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  NGOs Involved
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 overflow-hidden"
        >
          {/* Map Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/20 dark:border-gray-700/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Global Conflict Zones
            </h2>
            <Button
              onClick={() => setIsSidebarOpen(true)}
              variant="outline"
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {(filters.continents.length > 0 || 
                filters.conflictTypes.length > 0 || 
                filters.statuses.length > 0 || 
                filters.severityLevels.length > 0 ||
                filters.search.length > 0) && (
                <span className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
                  {filters.continents.length + 
                   filters.conflictTypes.length + 
                   filters.statuses.length + 
                   filters.severityLevels.length +
                   (filters.search.length > 0 ? 1 : 0)}
                </span>
              )}
            </Button>
          </div>

          {/* Map Container */}
          <div className="relative h-[600px] bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
            <InteractiveMap
              zones={zones}
              selectedZone={selectedZone}
              onZoneSelect={setSelectedZone}
            />
          </div>
        </motion.div>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        filters={filters}
        onUpdateFilters={updateFilters}
        onClearFilters={clearFilters}
        resultCount={zones.length}
      />
    </div>
  );
}