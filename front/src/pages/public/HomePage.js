//Главная, баннер, топ-услуги, акции
// /
import React from 'react'
import { useNavigate } from "react-router-dom"
import MainHeader from '../../components/uiContainer/MainHeader'
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
                <MainHeader />
                <InfoWellcome />
                <Services isMain={true}/>
                <WeddingBunner />
                <Teams/>
                <OurWorks/>
                <Products />
            </div>
        </div>
    )
}