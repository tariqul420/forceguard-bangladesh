'use client';

import { createContext, useState, ReactNode } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

interface DataContextType {
  mapLocation: Location;
  setMapLocation: React.Dispatch<React.SetStateAction<Location>>;
}

export const DataContext = createContext<DataContextType | null>(null);

const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mapLocation, setMapLocation] = useState<Location>({
    latitude: 23.8103,
    longitude: 90.4125,
  });

  return <DataContext.Provider value={{ mapLocation, setMapLocation }}>{children}</DataContext.Provider>;
};

export default DataProvider;
