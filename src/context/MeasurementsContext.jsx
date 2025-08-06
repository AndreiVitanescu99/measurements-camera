import React, { createContext, useState } from "react";

export const MeasurementContext = createContext();

export const MeasurementProvider = ({ children }) => {
    const [measurementData, setMeasurementData] = useState(null);

    return (
        <MeasurementContext.Provider value={{ measurementData, setMeasurementData }}>
            {children}
        </MeasurementContext.Provider>
    );
};