/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import NavBar from "./components/NavBar"


const layout = ({ children }) => {
    return (
        <div className="grid grid-cols-6 w-full h-full">
            {/* <Header /> */}
            <NavBar />  
            <main className='flex justify-center col-span-5'>
                {children}
            </main>
        </div>
    )
}

export default layout