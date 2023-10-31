"use client"

import Link from 'next/link';
import { FC, useState } from 'react';
import NavItems from '../utils/NavItems';
import { ThemeSwitcher } from '../utils/ThemeSwitcher';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi'

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
}

const Header: FC<Props> = ({ activeItem, setOpen }) => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [active, setActive] = useState(false);

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.screenY > 85) {
                setActive(true)
            } else {
                setActive(false)
            }
        })
    };

    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            {
                setOpenSidebar(false)
            }
        }
    }

    return (
        <div className='w-full relative'>
            <div className={`${active ? "dark:bg-opacity-50 dark_gradient fixed top-0 left-0 w-full z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500" : "w-full border-b dark:border-[#ffffff1c] z-[80] dark:shadow"}`}>
                <div className='layout'>
                    <div className='w-full flex items-center justify-between p-3'>
                        <div>
                            <Link href={'/'} className={`text-[25px] font-poppins font-medium text`}>WEB LMS</Link>
                        </div>
                        <div className='flex items-center justify-between '>
                            <NavItems activeItem={activeItem} isMobile={false} />
                            <ThemeSwitcher />
                            {/* only for mobile  */}
                            <div className='lg:hidden'>
                                <HiOutlineMenuAlt3 className='cursor-pointer text' size={25} onClick={() => setOpenSidebar(true)} />
                            </div>
                            <HiOutlineUserCircle className='hidden lg:block cursor-pointer text' size={25} onClick={() => setOpen(true)} />
                        </div>
                    </div>
                </div>
                {/* mobile sidebar  */}
                {openSidebar && (
                    <div id='screen' onClick={handleClose} className='fixed w-full h-screen top-0 left-0 z-[999] dark:bg-[unset] bg-[#00000024]'>
                        <div className='w-[70%] fixed z-[999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0'>
                            <NavItems activeItem={activeItem} isMobile={true} />
                            <HiOutlineUserCircle className='cursor-pointer ml-5 my-2 text' size={25} onClick={() => setOpen(true)} />
                            <br />
                            <br />
                            <p className='px-2 pl-5 text'>Copyright @2023 Web lms</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;