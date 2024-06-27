import { useContext, createContext, useEffect, useState, useCallback } from "react"

const FetchContext = createContext()

export const FetchProvider = ({ children, request }) => {
        const [fetchedData, setFetchedData] = useState([])
        const [refreshData, setRefreshData] = useState(0)

        const refreshFetchedData = useCallback(() => {
                setRefreshData((prev) => (prev + 1));
        }, [])

        useEffect(() => {
                const getList = async () => {
                        const list = await request()
                        if (list) {
                                setFetchedData(list)
                        }
                } 
                getList()
        }, [refreshData])

        return <FetchContext.Provider value={{ fetchedData, refreshFetchedData }}>
                {children}
        </FetchContext.Provider>
}


export const useFetchContext = () => {
        return useContext(FetchContext)
}
