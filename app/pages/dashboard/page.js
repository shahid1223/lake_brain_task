"use client";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';

export default function Home() {
    const { status } = useSession();

    console.log(status)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className='flex justify-center items-center'>
                <button onClick={() => signOut()} type="submit" className='text-[#FFF]  rounded-lg shadow-sm text-center bg-[#20DF7F] box-s text-[16px] font-medium leading-5 capitalize w-[300px] h-[45px] flex-shrink-0'>Sign Out</button>
            </div>
        </main>
    )
}
