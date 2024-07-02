import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [payment, setPayment] = useState("cod");
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    calle: "",
    ciudad: "",
    distrito: "",
    codigoPostal: "",
    pais: "",
    celular: "",
  });

  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    url,
    setCartItems,
    currency,
    deliveryCharge,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const isFormValid = () => {
    return Object.values(data).every((value) => value.trim() !== "");
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Por favor, llene todos los campos del formulario.");
      return;
    }

    if (payment === "stripe") {
      const whatsappMessage = `He realizado el pago, quiero validar mi compra.\n\nDatos del pedido:\n${Object.entries(
        data
      )
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")}`;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      window.location.href = `https://wa.me/51950378253?text=${encodedMessage}`;
    } else {
      let orderItems = [];
      food_list.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      });
      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + deliveryCharge,
      };
      try {
        let response = await axios.post(
          url + "/api/order/placecod",
          orderData,
          {
            headers: { token },
          }
        );
        if (response.data.success) {
          navigate("/myorders");
          toast.success(response.data.message);
          setCartItems({});
        } else {
          toast.error("Algo salió mal");
        }
      } catch (error) {
        toast.error("Error al procesar el pedido");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Para realizar un pedido, inicie sesión primero");
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Datos de envío</p>
        <div className="multi-field">
          <input
            type="text"
            name="nombre"
            onChange={onChangeHandler}
            value={data.nombre}
            placeholder="Nombre"
            required
          />
          <input
            type="text"
            name="apellido"
            onChange={onChangeHandler}
            value={data.apellido}
            placeholder="Apellido"
            required
          />
        </div>
        <input
          type="email"
          name="correo"
          onChange={onChangeHandler}
          value={data.correo}
          placeholder="Correo electrónico"
          required
        />
        <input
          type="text"
          name="calle"
          onChange={onChangeHandler}
          value={data.calle}
          placeholder="Calle"
          required
        />
        <div className="multi-field">
          <input
            type="text"
            name="ciudad"
            onChange={onChangeHandler}
            value={data.ciudad}
            placeholder="Ciudad"
            required
          />
          <input
            type="text"
            name="distrito"
            onChange={onChangeHandler}
            value={data.distrito}
            placeholder="Distrito"
            required
          />
        </div>
        <div className="multi-field">
          <input
            type="text"
            name="codigoPostal"
            onChange={onChangeHandler}
            value={data.codigoPostal}
            placeholder="Código Postal"
            required
          />
          <input
            type="text"
            name="pais"
            onChange={onChangeHandler}
            value={data.pais}
            placeholder="País"
            required
          />
        </div>
        <input
          type="text"
          name="celular"
          onChange={onChangeHandler}
          value={data.celular}
          placeholder="Celular"
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Total de venta</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>
                {currency}
                {getTotalCartAmount()}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Gratis</p>
              <p>
                {currency}
                {getTotalCartAmount() === 0 ? 0 : deliveryCharge}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                {currency}
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + deliveryCharge}
              </b>
            </div>
          </div>
        </div>
        <div className="payment">
          <h2 className="text-xl">Métodos de pago</h2>
          <div onClick={() => setPayment("cod")} className="payment-option">
            <p>Pago contra entrega</p>
          </div>
          <div onClick={() => setPayment("stripe")} className="payment-option">
            <p>Monederos (Yape, Plin)</p>
          </div>
        </div>
        <button className="place-order-submit" type="submit">
          {payment === "cod" ? "Realizar Pago" : "Validar Compra"}
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;