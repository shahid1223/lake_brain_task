"use client";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { signIn } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Home() {


  const router = useRouter();

  const initialValues = {
    login: '',
    password: '',
    rememberMe: false,
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const { username, password } = values;
    signIn("credentials",{
      redirect:false,
      email: username,
      password: password
    })
    // Handle form submission logic here
    
        // try {
        //     const res = await fetch("http://localhost:3000/api/login", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             email: username,
        //             password: password
        //         }),
        //     });
        //     if (res.ok) {
        //       router.push('/pages/dashboard');
        //   }
        // } catch (error) {
        //     console.log(error);
        // }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='space-y-4'>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <h2 className='text-[#FFF] text-center text-[64px] font-normal leading-normal'>Sign in</h2>
            <p className='text-[#FFF] text-center text-[16px] font-normal leading-normal my-6'>Sign in and start managing your candidates!</p>

            <div>
              <Field
                type="text"
                name="username"
                placeholder="username"
                className="w-full px-4 py-3 rounded-lg bg-[#224957] mt-2 text-white focus:outline-none"
                autoFocus
                autoComplete="off"
                required
              />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-[#224957] mt-2 text-white focus:outline-none"
                autoComplete="off"
                required
              />
            </div>

            <div className='flex justify-between items-center my-4'>
              <div className='flex w-full items-baseline'>
                <Field
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  className="px-4 py-3 rounded-lg bg-[#224957] mt-2 text-white focus:outline-none"
                />
                <label htmlFor="rememberMe" className="ml-3 text-[#FFF] text-center text-[14px] font-normal leading-normal">Remember Me</label>
              </div>
              <a href='www.facebook.com' className='text-[#20DF7F] w-full text-end text-[14px] font-normal leading-normal '>Forgot password?</a>
            </div>

            <div className='flex justify-center items-center'>
              <button type="submit" className='text-[#FFF] rounded-lg shadow-sm text-center bg-[#20DF7F] box-s text-[16px] font-medium leading-5 capitalize w-full h-[45px] flex-shrink-0'>Login</button>
            </div>
          </Form>
        </Formik>
        <div className='flex justify-center items-center'>
          <Link href='/pages/auth/signup' className='text-[#20DF7F] w-full text-center text-[14px] font-normal leading-normal '>do not have account? <span className='underline'>Sign up</span></Link>
        </div>
        <div className="px-6 sm:px-0 max-w-sm" onClick={() => signIn("google")}>
          <button type="button" className="text-white w-full h-[45px] bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign in with Google<div></div></button>
        </div>
      </div>
    </main>
  )
}
