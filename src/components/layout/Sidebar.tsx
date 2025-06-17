import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { MapFilters } from '@/types';
import { continents, conflictTypes, peacebuildingStatuses } from '@/data/conflictData';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: MapFilters;
  onUpdateFilters: (filters: Partial<MapFilters>) => void;
  onClearFilters: () => void;
  resultCount: number;
}

const severityLevels = ['low', 'medium', 'high', 'critical'];

const statusColors = {
  'active-conflict': 'bg-red-500',
  'ceasefire': 'bg-yellow-500',
  'negotiation': 'bg-blue-500',
  'post-conflict': 'bg-purple-500',
  'stable-peace': 'bg-green-500',
  'at-risk': 'bg-orange-500',
};

const severityColors = {
  low: 'bg-green-400',
  medium: 'bg-yellow-400',
  high: 'bg-orange-500',
  critical: 'bg-red-500',
};

export function Sidebar({
  isOpen,
  onClose,
  filters,
  onUpdateFilters,
  onClearFilters,
  resultCount,
}: SidebarProps) {
  const hasActiveFilters = 
    filters.continents.length > 0 ||
    filters.conflictTypes.length > 0 ||
    filters.statuses.length > 0 ||
    filters.severityLevels.length > 0 ||
    filters.search.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
            className="fixed left-0 top-16 bottom-0 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/20 dark:border-gray-700/20 z-50 lg:relative lg:top-0"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200/20 dark:border-gray-700/20">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-blue-500" />
                  <h2 className="text-lg font-semibold">Filters</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="lg:hidden"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="flex-1 px-6">
                <div className="space-y-6 py-6">
                  {/* Search */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Search Regions
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search conflict zones..."
                        value={filters.search}
                        onChange={(e) => onUpdateFilters({ search: e.target.value })}
                        className="pl-10 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Results count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {resultCount} region{resultCount !== 1 ? 's' : ''} found
                    </span>
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearFilters}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      >
                        Clear all
                      </Button>
                    )}
                  </div>

                  {/* Continents */}
                  <FilterSection
                    title="Continents"
                    items={continents}
                    selectedItems={filters.continents}
                    onSelectionChange={(continents) => onUpdateFilters({ continents })}
                  />

                  {/* Conflict Types */}
                  <FilterSection
                    title="Conflict Types"
                    items={conflictTypes}
                    selectedItems={filters.conflictTypes}
                    onSelectionChange={(conflictTypes) => onUpdateFilters({ conflictTypes })}
                    capitalize
                  />

                  {/* Peacebuilding Status */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Peacebuilding Status
                    </label>
                    <div className="space-y-2">
                      {peacebuildingStatuses.map((status) => (
                        <div key={status} className="flex items-center space-x-3">
                          <Checkbox
                            id={status}
                            checked={filters.statuses.includes(status)}
                            onCheckedChange={(checked) => {
                              const newStatuses = checked
                                ? [...filters.statuses, status]
                                : filters.statuses.filter(s => s !== status);
                              onUpdateFilters({ statuses: newStatuses });
                            }}
                          />
                          <label
                            htmlFor={status}
                            className="flex items-center space-x-2 text-sm cursor-pointer flex-1"
                          >
                            <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
                            <span className="capitalize">
                              {status.replace('-', ' ')}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Severity Levels */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Severity Levels
                    </label>
                    <div className="space-y-2">
                      {severityLevels.map((level) => (
                        <div key={level} className="flex items-center space-x-3">
                          <Checkbox
                            id={level}
                            checked={filters.severityLevels.includes(level)}
                            onCheckedChange={(checked) => {
                              const newLevels = checked
                                ? [...filters.severityLevels, level]
                                : filters.severityLevels.filter(l => l !== level);
                              onUpdateFilters({ severityLevels: newLevels });
                            }}
                          />
                          <label
                            htmlFor={level}
                            className="flex items-center space-x-2 text-sm cursor-pointer flex-1"
                          >
                            <div className={`w-3 h-3 rounded-full ${severityColors[level]}`} />
                            <span className="capitalize">{level}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="p-6 border-t border-gray-200/20 dark:border-gray-700/20">
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Active Filters
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {filters.search && (
                        <Badge variant="secondary" className="text-xs">
                          Search: {filters.search}
                        </Badge>
                      )}
                      {filters.continents.map(continent => (
                        <Badge key={continent} variant="secondary" className="text-xs">
                          {continent}
                        </Badge>
                      ))}
                      {filters.conflictTypes.map(type => (
                        <Badge key={type} variant="secondary" className="text-xs capitalize">
                          {type}
                        </Badge>
                      ))}
                      {filters.statuses.map(status => (
                        <Badge key={status} variant="secondary" className="text-xs capitalize">
                          {status.replace('-', ' ')}
                        </Badge>
                      ))}
                      {filters.severityLevels.map(level => (
                        <Badge key={level} variant="secondary" className="text-xs capitalize">
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface FilterSectionProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onSelectionChange: (items: string[]) => void;
  capitalize?: boolean;
}

function FilterSection({
  title,
  items,
  selectedItems,
  onSelectionChange,
  capitalize = false,
}: FilterSectionProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {title}
      </label>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-center space-x-3">
            <Checkbox
              id={item}
              checked={selectedItems.includes(item)}
              onCheckedChange={(checked) => {
                const newItems = checked
                  ? [...selectedItems, item]
                  : selectedItems.filter(i => i !== item);
                onSelectionChange(newItems);
              }}
            />
            <label
              htmlFor={item}
              className="text-sm cursor-pointer flex-1"
            >
              {capitalize ? item.charAt(0).toUpperCase() + item.slice(1) : item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}