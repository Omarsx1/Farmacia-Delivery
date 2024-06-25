import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope as faEnvelopeRegular } from '@fortawesome/free-regular-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img width={250} src={assets.logo} alt="Logo" />
          <h3>Farmacia La Unión</h3>
          <p>Rápido, confiable y siempre a tu alcance.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <FontAwesomeIcon icon={faEnvelopeRegular} className="social-icon" />
          </div>
        </div>
        <div className="footer-content-group">
          <div className="footer-content-center">
            <h2>Menu</h2>
            <ul>
              <li>Inicio</li>
              <li>Orden</li>
              <li>Acerca de</li>
              <li>Contacto</li>
            </ul>
          </div>
          <div className="footer-content-right">
            <h2>Hablemos</h2>
            <ul>
              <li><h3>Celular</h3></li>
              <li>926 457 894</li>
              <li>934 468 752</li>              
            </ul>
          </div>
          <div className="footer-content-address">
            <h2>Dirección</h2>
            <ul>
              <li>Av. Alfredo Benavides 4652,<br /> Santiago de Surco 15038</li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright {currentYear} © farmacialaunion.com
      </p>
    </div>
  );
};

export default Footer;
