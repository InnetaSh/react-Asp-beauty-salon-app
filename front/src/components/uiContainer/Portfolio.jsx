import React, { useEffect, useState } from 'react';
import EditPortfolioModal from "../modals/EditPortfolioModal";
import BunnerTitle from "../ui/bunner-title";
import ImgList from "../ui/img-list"; 

const Portfolio = ({ masterId, isMain = false }) => {
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [title, setTitle] = useState('Our Work');


  const fetchPortfolio = () => {
    const path  = isMain? "/api/Masters/portfolio" :`/api/Masters/${masterId}/portfolio`;
    fetch(path)
      .then(res => res.json())
      .then(data => {
        const portfolio = isMain ? data.filter(item => item.topPhoto) : data;
        setPortfolioItems(portfolio);
        console.log("Найден portfolioItems: ", data);
      })
      .catch(err => {
        console.error("Ошибка при получении портфолио:", err);
      });
  };

  useEffect(() => {
    if(!isMain){
      setTitle("Портфолио мастера")
    }
  if (masterId || isMain) {
    fetchPortfolio();
  }
}, [masterId, isMain]);

  

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить это portfolio?")) return;

    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Ошибка при удалении");
      fetchPortfolio();
    } catch (err) {
      console.error("Ошибка при удалении:", err);
    }
  };

  const handleEdit = (works) => {
      console.log("Редактировать (onEdit) нажато2");
      console.log('portfolio---',works);
    setEditingPortfolio(works);
  };

  return (
    <div>
      <BunnerTitle title={title} />

      <ImgList
        portfolio={portfolioItems}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {editingPortfolio && (
        <EditPortfolioModal
          portfolio={editingPortfolio}
          onClose={() => setEditingPortfolio(null)}
          onSave={fetchPortfolio}
        />
      )}
    </div>
  );
};

export default Portfolio;
