import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

// eslint-disable-next-line react/prop-types
export const SearchContextProvider = ({ children }) => {
    const [search, setSearch] = useState("");
    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearchContext = () => {
    return useContext(SearchContext);
};
