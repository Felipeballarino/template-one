import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [personalInformation, setPersonalInformation] = useState([]);

    const fetchInfo = async () => {
        setPersonalInformation([])
    }

    useEffect(() => {
        fetchInfo()
    }, [])

    return (
        <SettingsContext.Provider value={{ personalInformation }}>
            {children}
        </SettingsContext.Provider>
    )
}


// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => useContext(SettingsContext);
