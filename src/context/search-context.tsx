"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

declare global {
  interface Window {
    storage: {
      get: (
        key: string,
        shared?: boolean
      ) => Promise<{ key: string; value: string; shared: boolean } | null>;
      set: (
        key: string,
        value: string,
        shared?: boolean
      ) => Promise<{ key: string; value: string; shared: boolean } | null>;
      delete: (
        key: string,
        shared?: boolean
      ) => Promise<{ key: string; deleted: boolean; shared: boolean } | null>;
      list: (
        prefix?: string,
        shared?: boolean
      ) => Promise<{ keys: string[]; prefix?: string; shared: boolean } | null>;
    };
  }
}

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

  useEffect(() => {
    const loadSearches = async () => {
      try {
        const result = await window.storage.get("recent-searches");
        if (result?.value) {
          const parsed = JSON.parse(result.value);
          setSearches(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.log("No existing searches found, starting fresh");
        setSearches([]);
      } finally {
        setIsLoaded(true);
      }
    };

    loadSearches();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const saveSearches = async () => {
        try {
          await window.storage.set("recent-searches", JSON.stringify(searches));
        } catch (error) {
          console.error("Failed to save searches:", error);
        }
      };

      saveSearches();
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
