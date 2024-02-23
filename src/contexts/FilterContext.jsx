import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [filterState, setFilterState] = useState({ filterText: '', filterOption: '' });

  return (
    <FilterContext.Provider value={{ filterState, setFilterState }}>
      {children}
    </FilterContext.Provider>
  );
};
