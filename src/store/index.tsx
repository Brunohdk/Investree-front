import React, { createContext, useState, useContext } from 'react'

interface ContextProps {
    theme: String,
    setTheme?: any,
}

const AppContext = createContext<ContextProps>({} as ContextProps)

const StoreProvider: React.FC = ({children}) => {
    const [ theme, setTheme ] = useState<String>('default')

    return (
        <AppContext.Provider value={{
            theme,
            setTheme,
        }}>
            {children}
        </AppContext.Provider>
    )
}

function useTheme() {
    const { theme, setTheme } = useContext(AppContext);

    return { theme, setTheme }
}

export { StoreProvider, useTheme}