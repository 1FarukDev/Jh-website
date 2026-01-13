"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface SearchContextType {
  searches: string[];
  addSearch: (search: string) => void;
  removeSearch: (index: number) => void;
  clearSearches: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
  maxSearches?: number;
}

export function SearchProvider({
  children,
  maxSearches = 10,
}: SearchProviderProps) {
  const [searches, setSearches] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load searches from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    try {
      const stored = localStorage.getItem("recent-searches");
      if (stored) {
        const parsed = JSON.parse(stored);
        setSearches(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.log("No existing searches found, starting fresh");
      setSearches([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save searches to localStorage whenever they change
  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;
    
    try {
      localStorage.setItem("recent-searches", JSON.stringify(searches));
    } catch (error) {
      console.error("Failed to save searches:", error);
    }
  }, [searches, isLoaded]);

  const addSearch = (search: string) => {
    const trimmedSearch = search.trim();
    if (!trimmedSearch) return;

    setSearches((prev) => {
      const filtered = prev.filter((s) => s !== trimmedSearch);
      const updated = [trimmedSearch, ...filtered];
      return updated.slice(0, maxSearches);
    });
  };

  const removeSearch = (index: number) => {
    setSearches((prev) => prev.filter((_, i) => i !== index));
  };

  const clearSearches = () => {
    setSearches([]);
  };

  return (
    <SearchContext.Provider
      value={{ searches, addSearch, removeSearch, clearSearches }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}