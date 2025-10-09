
import React from "react";

export default function MenuText({ title, onClick }) {
  return (
    <button className="menu_btn" onClick={onClick}>
      {title}
    </button>
  );
}