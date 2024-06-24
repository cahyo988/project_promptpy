
"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"


const Nav = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }
        setUpProviders();
    }, []);

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href="/" className='flex gap-2 flex-center'>
                <Image src={"/assets/images/logo.svg"} className='object-contain'
                    width={30}
                    height={30}
                    alt='promptpy' />
                <p className='Promptpy'>Promptpy</p>
            </Link>


            {/* // Desktop Navigation  */}
            <div className='sm:flex hidden'>
                <div className="fixed left-4 bottom-4 z-50 opacity-50">
                    <Link href="https://www.linkedin.com/in/cahyo-saputra-a26411204/t"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                         text-2xl md:text-2xl sm:text-2xl 
                         text-black opacity-60 hover:opacity-100 hover:text-gray-700
                         transition-all duration-300 ease-in-out
                     "
                    >
                        <FontAwesomeIcon
                            icon={faLinkedin}
                            size='2x'
                        />
                    </Link>
                </div>
                {session?.user ? (
                    <div className='flex gam-3 md:gap-5'>
                        <Link href="/create-prompt" className='black_btn'>
                            Create Post
                        </Link>
                        <button type='button' onClick={signOut} className='outline_btn'>
                            Sign Out
                        </button>
                        <Link href='/profile'>
                            <Image src={session?.user.image}
                                width={37}
                                height={37}
                                className='rounded-full'
                                alt='profile'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className='black_btn'
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* mobile navigation */}
            <div className='sm:hidden flex relative'>
                <div className="fixed left-4 bottom-4 z-50 opacity-50">
                    <Link href="https://www.linkedin.com/in/cahyo-saputra-a26411204/t"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                         text-2xl md:text-2xl sm:text-2xl 
                         text-black opacity-60 hover:opacity-100 hover:text-gray-700
                         transition-all duration-300 ease-in-out
                     "
                    >
                        <FontAwesomeIcon
                            icon={faLinkedin}
                           
                        />
                    </Link>
                </div>
                {session?.user ? (
                    <div className='flex'>
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                            onClick={() => setToggleDropdown((prev) => !prev)} z
                        />
                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href="/profile"
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href='/create-prompt'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button type='button' onClick={() => {
                                    setToggleDropdown(false);
                                    signOut();
                                }
                                }
                                    className='mt-5 w-full black_btn'>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className='black_btn'
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>


        </nav>
    )
}

export default Nav;