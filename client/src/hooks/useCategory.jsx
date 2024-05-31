import { useContext, createContext, useEffect, useState, useCallback } from "react"
import useFetch from "./useFetch"

const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
        const [categoryList, setCategoryList] = useState([])
        const [refreshList, setRefreshList] = useState(0)

        const refreshCategoryList = useCallback(() => {
                setRefreshList(prev => prev + 1);
        }, [categoryList])

        useEffect(() => {
                const getList = async () => {
                        const list = await useFetch('/categories', {})
                        if (list) {
                                setCategoryList(list)
                        }
                }
                getList()
        }, [refreshList])

        return <CategoryContext.Provider value={{categoryList, refreshCategoryList}}>
                {children}
        </CategoryContext.Provider>
}


export const useCategory = () => {
        return useContext(CategoryContext)
}
