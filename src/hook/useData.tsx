import { DataContext } from "@/provider/DataProvider";
import { useContext } from "react";

const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};

export default useData;
