// Estado global dos lugares (Context API), compartilhado entre todas as telas.
import React, { createContext, useContext, useState, useCallback } from 'react';
import { STATUS } from '../theme/theme';

const PlacesContext = createContext(null);

export function PlacesProvider({ children }) {
  const [places, setPlaces] = useState([]);

  const addPlace = useCallback((data) => {
    const novo = { ...data, id: Date.now().toString() };
    setPlaces((prev) => [novo, ...prev]);
    return novo;
  }, []);

  const updatePlace = useCallback((id, changes) => {
    setPlaces((prev) => prev.map((p) => (p.id === id ? { ...p, ...changes } : p)));
  }, []);

  const markVisited = useCallback((id) => updatePlace(id, { status: STATUS.VISITADO }), [updatePlace]);

  const removePlace = useCallback((id) => {
    setPlaces((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getPlace = useCallback((id) => places.find((p) => p.id === id), [places]);

  return (
    <PlacesContext.Provider
      value={{ places, addPlace, updatePlace, markVisited, removePlace, getPlace }}
    >
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlaces() {
  const ctx = useContext(PlacesContext);
  if (!ctx) throw new Error('usePlaces deve ser usado dentro de PlacesProvider');
  return ctx;
}
