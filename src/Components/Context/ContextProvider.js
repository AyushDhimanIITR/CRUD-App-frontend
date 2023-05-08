import React, { createContext, useState } from "react";

export const addData = createContext("");
export const updateData = createContext("");
export const delData = createContext("");

const ContextProvider = ({ children }) => {

    const [udata, setUData] = useState("");
    const [updata, setUpData] = useState("");
    const [dltData, setDltData] = useState("");
    return (
        <addData.Provider value={{ udata, setUData }}>
            <updateData.Provider value={{ updata, setUpData }}>
                <delData.Provider value={{ dltData, setDltData }}>

                    {children}

                </delData.Provider>
            </updateData.Provider>
        </addData.Provider>

    )
};

export default ContextProvider;