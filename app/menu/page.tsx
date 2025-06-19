import React from "react";
import JidleniListek from "../components/JidleniListek";
import SeznamAlergenu from "../components/SeznamAlergenu";


const Page = () => {
    return (
        <div>
            <div className='header-card-nav center-text'>
                <h1 className='header-card-nadpis'>Naše menu</h1>
                <h2 className='header-card-podnadpis'>Ochutnejte tradiční českou kuchyni připravenou podle osvědčených receptur z kvalitních surovin.</h2>
            </div>

            <div className='width-p-page'>
                <div className='center-text'>
                    <h3 className='text-nadpis'>Jídelní lístek</h3>
                    <p className='text-podnadpis'>Vyberte si z našich specialit</p>
                </div>
                <JidleniListek />
                <SeznamAlergenu />     
            </div>
        </div>
    )
}

export default Page;