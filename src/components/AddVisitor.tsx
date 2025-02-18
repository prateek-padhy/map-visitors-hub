
import React, { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddVisitorProps {
  onAdd: (country: string, coordinates: [number, number]) => void;
  onClose: () => void;
}

// Extended list of countries with coordinates
const countries: Array<{ name: string; coordinates: [number, number] }> = [
  { name: 'Afghanistan', coordinates: [67.7100, 33.9391] as [number, number] },
  { name: 'Albania', coordinates: [20.1683, 41.1533] as [number, number] },
  { name: 'Algeria', coordinates: [1.6597, 28.0339] as [number, number] },
  { name: 'Angola', coordinates: [17.8739, -11.2027] as [number, number] },
  { name: 'Argentina', coordinates: [-63.6167, -38.4161] as [number, number] },
  { name: 'Australia', coordinates: [133.7751, -25.2744] as [number, number] },
  { name: 'Austria', coordinates: [14.5501, 47.5162] as [number, number] },
  { name: 'Bangladesh', coordinates: [90.3563, 23.6850] as [number, number] },
  { name: 'Belgium', coordinates: [4.4699, 50.8503] as [number, number] },
  { name: 'Brazil', coordinates: [-51.9253, -14.2350] as [number, number] },
  { name: 'Canada', coordinates: [-106.3468, 56.1304] as [number, number] },
  { name: 'China', coordinates: [104.1954, 35.8617] as [number, number] },
  { name: 'Colombia', coordinates: [-74.2973, 4.5709] as [number, number] },
  { name: 'Denmark', coordinates: [9.5018, 56.2639] as [number, number] },
  { name: 'Egypt', coordinates: [30.8025, 26.8206] as [number, number] },
  { name: 'France', coordinates: [2.2137, 46.2276] as [number, number] },
  { name: 'Germany', coordinates: [10.4515, 51.1657] as [number, number] },
  { name: 'Greece', coordinates: [21.8243, 39.0742] as [number, number] },
  { name: 'India', coordinates: [78.9629, 20.5937] as [number, number] },
  { name: 'Indonesia', coordinates: [113.9213, -0.7893] as [number, number] },
  { name: 'Iran', coordinates: [53.6880, 32.4279] as [number, number] },
  { name: 'Iraq', coordinates: [43.6793, 33.2232] as [number, number] },
  { name: 'Ireland', coordinates: [-8.2439, 53.4129] as [number, number] },
  { name: 'Israel', coordinates: [34.8516, 31.0461] as [number, number] },
  { name: 'Italy', coordinates: [12.5674, 41.8719] as [number, number] },
  { name: 'Japan', coordinates: [138.2529, 36.2048] as [number, number] },
  { name: 'Mexico', coordinates: [-102.5528, 23.6345] as [number, number] },
  { name: 'Netherlands', coordinates: [5.2913, 52.1326] as [number, number] },
  { name: 'New Zealand', coordinates: [174.8860, -40.9006] as [number, number] },
  { name: 'Nigeria', coordinates: [8.6753, 9.0820] as [number, number] },
  { name: 'Norway', coordinates: [8.4689, 60.4720] as [number, number] },
  { name: 'Pakistan', coordinates: [69.3451, 30.3753] as [number, number] },
  { name: 'Poland', coordinates: [19.1451, 51.9194] as [number, number] },
  { name: 'Portugal', coordinates: [-8.2245, 39.3999] as [number, number] },
  { name: 'Russia', coordinates: [105.3188, 61.5240] as [number, number] },
  { name: 'Saudi Arabia', coordinates: [45.0792, 23.8859] as [number, number] },
  { name: 'South Africa', coordinates: [22.9375, -30.5595] as [number, number] },
  { name: 'South Korea', coordinates: [127.9785, 35.9078] as [number, number] },
  { name: 'Spain', coordinates: [-3.7492, 40.4637] as [number, number] },
  { name: 'Sweden', coordinates: [18.6435, 60.1282] as [number, number] },
  { name: 'Switzerland', coordinates: [8.2275, 46.8182] as [number, number] },
  { name: 'Thailand', coordinates: [100.9925, 15.8700] as [number, number] },
  { name: 'Turkey', coordinates: [35.2433, 38.9637] as [number, number] },
  { name: 'Ukraine', coordinates: [31.1656, 48.3794] as [number, number] },
  { name: 'United Kingdom', coordinates: [-3.4359, 55.3781] as [number, number] },
  { name: 'United States', coordinates: [-95.7129, 37.0902] as [number, number] },
  { name: 'Vietnam', coordinates: [108.2772, 14.0583] as [number, number] },
].sort((a, b) => a.name.localeCompare(b.name));

const AddVisitor: React.FC<AddVisitorProps> = ({ onAdd, onClose }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [visitorCount, setVisitorCount] = useState(1);

  const handleAdd = () => {
    const country = countries.find(c => c.name === selectedCountry);
    if (country) {
      for (let i = 0; i < visitorCount; i++) {
        onAdd(country.name, country.coordinates);
      }
      setSelectedCountry('');
      setVisitorCount(1);
      onClose();
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
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Select Country</label>
            <Select
              value={selectedCountry}
              onValueChange={setSelectedCountry}
            >
              <SelectTrigger className="w-full bg-transparent border-white/10">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.name} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
            disabled={!selectedCountry}
          >
            Add Visitors
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddVisitor;
