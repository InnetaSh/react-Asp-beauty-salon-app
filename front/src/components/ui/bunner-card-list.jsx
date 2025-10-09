import CardList from "./card-list";
import React from "react";

export default function BannerCardList({ products, onLearnMore }) {
  return (
    <div className="banner-card-list">
      <h2 className="section-title">Top Services</h2>
      <div className="bottom-line"> </div>
      <CardList products={products} onLearnMore={onLearnMore} />
    </div>
  );
}