//Главная, баннер, топ-услуги, акции
// /
import React from 'react'
import { useNavigate } from "react-router-dom"
import Header from '../../components/uiContainer/Header'
import Products from '../../components/uiContainer/Products'
import Teams from '../../components/uiContainer/Teams'
import OurWorks from '../../components/uiContainer/OurWorks'
import WeddingBunner from '../../components/uiContainer/WeddingBunner'
import Services from '../../components/uiContainer/Services'
import InfoWellcome from '../../components/uiContainer/InfoWellcome'

import '../../index.css'

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className='main'>
            <div className='main-container'>
                <Header />
                <InfoWellcome />
                <Services flag={false}/>
                <WeddingBunner />
                <Teams/>
                <OurWorks/>
                <Products />
            </div>
        </div>
    )
}