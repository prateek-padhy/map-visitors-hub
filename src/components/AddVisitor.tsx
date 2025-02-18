
import React, { useState } from 'react';
import { Command } from 'cmdk';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface AddVisitorProps {
  onAdd: (country: string, coordinates: [number, number]) => void;
  onClose: () => void;
}

// Sample countries data with coordinates explicitly typed as tuples
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
].sort((a, b) => a.name.localeCompare(b.name));

const AddVisitor: React.FC<AddVisitorProps> = ({ onAdd, onClose }) => {
  const [search, setSearch] = useState('');

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
                onSelect={() => onAdd(country.name, country.coordinates)}
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
      </div>
    </div>
  );
};

export default AddVisitor;
