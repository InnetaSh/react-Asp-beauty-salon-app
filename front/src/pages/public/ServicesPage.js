//Список всех услуг
/// /services

import { useLocation, useNavigate } from "react-router-dom"
import Header from '../../components/uiContainer/Header'
import Services from '../../components/uiContainer/Services'


export default function ServicesPage()
{
   

    return(
         <div className='main'>
            <div className='main-container'>
                <Header />
                <Services flag={true}/>
               
            </div>
        </div>
    )
}