import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"


export const ShopLayout = () => {
    return(
        <div className="w-screen h-screen bg-black">
            <div className="w-full h-16 bg-white">
                <NavBar/>
            </div>
            <div className="">
                <Outlet/>
            </div>
            
        </div>
    )
}