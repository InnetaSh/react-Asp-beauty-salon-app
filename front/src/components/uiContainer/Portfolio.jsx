import React, { useEffect, useState } from 'react';
import EditPortfolioModal from "../modals/EditPortfolioModal";
import AddPortfolioModal from "../modals/AddPortfolioModal";
import BunnerTitle from "../ui/bunner-title";
import ImgList from "../ui/img-list";

const Portfolio = ({ masterId, isMain = false }) => {
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [addPortfolio, setAddPortfolio] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [title, setTitle] = useState('Our Work');
  const [folderPath, setFolderPath] = useState('');

  const fetchPortfolio = () => {
    const path = isMain ? "/api/Masters/portfolio" : `/api/Masters/${masterId}/portfolio`;
    fetch(path)
      .then(res => res.json())
      .then(data => {
    const portfolio = isMain ? data.filter(item => item.topPhoto) : data;
    setPortfolioItems(portfolio);

   
    const firstPath = portfolio[0]?.imageSrc;
    if (firstPath) {
        const lastSlashIndex = firstPath.lastIndexOf("/");
        const folder = firstPath.substring(0, lastSlashIndex + 1);
        setFolderPath(folder);
        console.log("folderPath:", folder);
    }

    console.log("Найден portfolioItems: ", data);

      })
      .catch(err => {
        console.error("Ошибка при получении портфолио:", err);
      });
  };

  useEffect(() => {
    if (!isMain) {
      setTitle("Портфолио мастера")
    }
    if (masterId || isMain) {
      fetchPortfolio();
    }
  }, [masterId, isMain]);



  const handleDelete = async (id) => {
    if (!window.confirm("Удалить это portfolio?")) return;

    try {
      const res = await fetch(`/api/masters/portfolio/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Ошибка при удалении");
      fetchPortfolio();
    } catch (err) {
      console.error("Ошибка при удалении:", err);
    }
  };

  const handleEdit = (works) => {
    console.log("Редактировать (onEdit) нажато2");
    console.log('portfolio---', works);
    setEditingPortfolio(works);
  };

  const handleAdd = () => {
    console.log("Add portfolio", folderPath);
    setAddPortfolio(true);
    console.log("Add: service");
  };


  return (
    <div>
      <BunnerTitle title={title} />

      <ImgList
        portfolio={portfolioItems}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onAdd={handleAdd}
        isMain={isMain}
      />

      {editingPortfolio && (
        <EditPortfolioModal
          portfolio={editingPortfolio}
          onClose={() => setEditingPortfolio(null)}
          onSave={fetchPortfolio}
        />
      )}
      {addPortfolio && (
        <AddPortfolioModal
          masterId={masterId}
          folderPath={folderPath}
          onClose={() => setAddPortfolio(false)}
          onSave={fetchPortfolio}
        />
      )}
    </div>
  );
};

export default Portfolio;
