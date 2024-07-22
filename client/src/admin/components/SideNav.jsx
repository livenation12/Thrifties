import React from 'react'
import Logo from './../../assets/logo.png'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AreaChartIcon, LayoutDashboardIcon, Package2Icon, User2Icon, Users2Icon } from "lucide-react"
import { NavLink, Link } from "react-router-dom"

export default function SideNav() {
        const menu = [
                {
                        title: 'Products',
                        icon: <Package2Icon />,
                        path: 'products'
                },
                {
                        title: 'Sales',
                        icon: <AreaChartIcon />,
                        path: 'sales'
                },
                {
                        title: 'Admins',
                        icon: <Users2Icon />,
                        path: 'founders'
                },
                {
                        title: 'My Profile',
                        icon: <User2Icon />,
                        path: 'profile'
                },
        ]
        return (

                <Table>
                        <TableCaption>All rights deserved</TableCaption>
                        <TableHeader>
                                <TableRow>
                                        <TableHead className="flex items-center">
                                                <img className="h-10 object-cover" src={Logo} alt="" /> <span className="hidden lg:inline mx-2">Coralds Administrator</span>
                                        </TableHead>
                                </TableRow>
                        </TableHeader>
                        <TableBody>
                                <TableRow>
                                        <TableBody>
                                                <Link className="admin-side-nav flex justify-center mx-5 my-4 md:justify-start hover:text-slate-500" to="">
                                                        <span><LayoutDashboardIcon /></span>
                                                        <span className="hidden md:inline mx-2"> Dashboard</span>
                                                </Link>
                                        </TableBody>
                                </TableRow>
                                {
                                        menu.map((item, index) => (
                                                <TableRow key={index}>
                                                        <TableCell >
                                                                <NavLink className="admin-side-nav flex justify-center md:justify-start space-x-3 hover:text-slate-500" to={item.path}>
                                                                        <span className="">{item?.icon}</span><span className="hidden md:inline">{item.title}</span>
                                                                </NavLink>
                                                        </TableCell>
                                                </TableRow>
                                        ))
                                }
                        </TableBody>
                </Table>

        )
}
