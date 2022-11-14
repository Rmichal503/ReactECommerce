import { useState,createContext } from "react"


export const CartContext = createContext({
    toggleDropdown:0,
    setToggleDropdown: ()=>{}
})

export const CartProvider = ({children})=>{
    const [toggleDropdown, setToggleDropdown]=useState(0)
    const value = {toggleDropdown,setToggleDropdown}
    return(<CartContext.Provider value={value}>{children}</CartContext.Provider>)
}