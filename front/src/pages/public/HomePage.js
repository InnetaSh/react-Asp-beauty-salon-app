//Главная, баннер, топ-услуги, акции
// 
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
    const [roleName, setRoleName] = useState("client");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5238/api/protected", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsername(response.data.Username);
                setRoleName(response.data.roleName);

                console.log(response.data.Username, response.data.RoleName);

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

      const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.reload();
  };


    return (
        <div className='main'>
            <div className='main-container'>
                <MainHeader />
                <InfoWellcome />
                <Services isMain={true} roleName={roleName}/>
                <WeddingBunner />
                <Teams isMain={true} roleName={roleName}/>
                <Portfolio isMain={true} roleName={roleName}/>
                <Products />
            </div>
        </div>
    )
}