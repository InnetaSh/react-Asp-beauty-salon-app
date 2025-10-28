//Главная, баннер, топ-услуги, акции
// 
import React, { useEffect, useState } from 'react';
import MainHeader from '../../components/uiContainer/MainHeader'
import Products from '../../components/uiContainer/Products'
import Teams from '../../components/uiContainer/Teams'
import WeddingBunner from '../../components/uiContainer/WeddingBunner'
import Services from '../../components/uiContainer/Services'
import InfoWellcome from '../../components/uiContainer/InfoWellcome'
import Portfolio from '../../components/uiContainer/Portfolio'

import '../../index.css'

export default function HomePage({ token, setToken }) {

    const [username, setUsername] = useState("");
    const [roleName, setRoleName] = useState("Client");
    const [error, setError] = useState("");
    console.log("token",token);
        console.log("roleName",roleName);
    // -------------------------------------------------------------------------

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5266/api/protected", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setError("Ошибка авторизации (401)");
                    } else {
                        setError("Произошла ошибка при загрузке данных");
                    }
                    return;
                }

                const data = await response.json();
  console.log("data",data);
                setUsername(data.username);
                setRoleName(data.roleName);

                console.log(data.Username, data.RoleName);
            } catch (err) {
                setError("Ошибка авторизации (401)");
                console.error(err);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    // -----------------------------------------------------------------------------



    return (
        <div className='main'>
            <div className='main-container'>
                <MainHeader token ={token} setToken={setToken}/>
                <InfoWellcome />
                <Services isMain={true} roleName={roleName} />
                <WeddingBunner />
                <Teams isMain={true} roleName={roleName} />
                <Portfolio isMain={true} roleName={roleName} />
                <Products />
            </div>
        </div>
    )
}