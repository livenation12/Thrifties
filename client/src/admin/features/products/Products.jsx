//hooks
import { NavLink, Outlet } from 'react-router-dom'
import React from 'react'
import { productLinks } from './data/data'
import { useSelector } from 'react-redux'

export default function Products() {
        const { categories } = useSelector(state => state.categories)
        console.log(categories);
        return (
                <div className='grid lg:grid-cols-4 gap-4 text-black'>
                        <div className='col-span-4 flex flex-wrap gap-2'>
                                {productLinks.map((link) => (
                                        <NavLink
                                                key={link.accessLink}
                                                to={link.accessLink}
                                                className={
                                                        `product-link relative text-sm w-40 rounded h-20 p-5 hover:text-slate-200 text-white inline-flex justify-center text-center items-center font-semibold gap-x-1 
                                                        ${link.bgColor} hover:${link.bgColor}/60 shadow-md`
                                                }
                                        >
                                                {React.createElement(link.icon, { size: 22, className: 'absolute top-2 left-4' })}
                                                <span className='absolute bottom-2 right-4'>{link.header}</span>
                                        </NavLink>
                                ))}
                        </div>
                        <div className='col-span-4'>
                                <Outlet />
                        </div>

                </div>
        )
}
