
import React, { useState } from 'react';
import { Command } from 'cmdk';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Input } from './ui/input';

interface AddVisitorProps {
  onAdd: (country: string, coordinates: [number, number]) => void;
  onClose: () => void;
}

// Expanded countries list with coordinates as tuples
const countries: Array<{ name: string; coordinates: [number, number] }> = [
  { name: 'United States', coordinates: [-95.7129, 37.0902] as [number, number] },
  { name: 'United Kingdom', coordinates: [-0.1276, 51.5074] as [number, number] },
  { name: 'France', coordinates: [2.3522, 48.8566] as [number, number] },
  { name: 'Germany', coordinates: [13.4050, 52.5200] as [number, number] },
  { name: 'Japan', coordinates: [139.6917, 35.6895] as [number, number] },
  { name: 'Australia', coordinates: [133.7751, -25.2744] as [number, number] },
  { name: 'Brazil', coordinates: [-47.8645, -15.7942] as [number, number] },
  { name: 'India', coordinates: [78.9629, 20.5937] as [number, number] },
  { name: 'China', coordinates: [104.1954, 35.8617] as [number, number] },
  { name: 'Canada', coordinates: [-106.3468, 56.1304] as [number, number] },
  { name: 'Spain', coordinates: [-3.7492, 40.4637] as [number, number] },
  { name: 'Italy', coordinates: [12.4964, 41.9028] as [number, number] },
  { name: 'Russia', coordinates: [37.6173, 55.7558] as [number, number] },
  { name: 'Mexico', coordinates: [-102.5528, 23.6345] as [number, number] },
  { name: 'South Korea', coordinates: [127.9785, 37.5665] as [number, number] },
  { name: 'Indonesia', coordinates: [106.8456, -6.2088] as [number, number] },
  { name: 'Turkey', coordinates: [32.8597, 39.9334] as [number, number] },
  { name: 'Saudi Arabia', coordinates: [45.0792, 23.8859] as [number, number] },
  { name: 'South Africa', coordinates: [22.9375, -30.5595] as [number, number] },
  { name: 'Argentina', coordinates: [-58.3816, -34.6037] as [number, number] },
].sort((a, b) => a.name.localeCompare(b.name));

const AddVisitor: React.FC<AddVisitorProps> = ({ onAdd, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<typeof countries[0] | null>(null);
  const [visitorCount, setVisitorCount] = useState(1);

  const handleAdd = () => {
    if (selectedCountry) {
      for (let i = 0; i < visitorCount; i++) {
        onAdd(selectedCountry.name, selectedCountry.coordinates);
      }
      setSelectedCountry(null);
      setVisitorCount(1);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="glass p-4 rounded-lg w-[300px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">Add Visitors</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <Command className="rounded-lg border shadow-md">
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search countries..."
              className="h-9 px-3 py-2 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <Command.List className="max-h-[200px] overflow-y-auto p-2">
              <Command.Empty className="py-6 text-center text-sm">
                No countries found.
              </Command.Empty>
              {countries.map((country) => (
                <Command.Item
                  key={country.name}
                  value={country.name}
                  onSelect={() => setSelectedCountry(country)}
                  className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                    "aria-selected:bg-white/10 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    "hover:bg-white/10"
                  )}
                >
                  {country.name}
                </Command.Item>
              ))}
            </Command.List>
          </Command>

          {selectedCountry && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Number of Visitors</label>
                <Input
                  type="number"
                  min="1"
                  value={visitorCount}
                  onChange={(e) => setVisitorCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="bg-transparent border-white/10"
                />
              </div>

              <Button 
                className="w-full"
                onClick={handleAdd}
              >
                Add Visitors
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddVisitor;
