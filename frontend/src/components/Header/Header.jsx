import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2 className="text-blue-600">Entrega a domicilio de productos farmacéuticos esenciales.</h2>
        <p className="text-blue-300">Rápido, confiable y siempre a tu alcance.</p>
        <button className="bg-blue-600 px-4 py-2 rounded-full text-lg text-white">
          Ver Productos
        </button>
      </div>
    </div>
  );
};

export default Header;
