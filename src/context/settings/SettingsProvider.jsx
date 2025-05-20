import { SettingsContext } from "./SettingsContext";

export const GlobalDataProvider = ({ children }) => {



    return (
        <SettingsContext.Provider
            value={{

            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
