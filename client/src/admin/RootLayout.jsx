
import { Outlet } from "react-router-dom"
import SideNav from "./components/SideNav"

export default function RootLayout() {

        return (
                <div className="max-w-[100vw] min-h-[100vh] grid grid-cols-6 bg-slate-500 overflow-auto">
                        <div className="max-h-full bg-slate-100 col-span-1 hidden lg:flex">
                                <SideNav />
                        </div>
                        <div className="col-span-6 lg:col-span-5 text-slate-200 m-5">
                                <Outlet />
                        </div>
                </div>
        )
}