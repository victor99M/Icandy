import React, { useEffect, useState } from "react";
import mercaPventa from "./mercadoPventa";
import endpoints from "endpoints";

const FORM_ID = "payment-form";

export default function Product({ datos }) {
  const [preferenceId, setPreferenceId] = useState(null);
  useEffect(() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId LO OBETENMOS CON LA COMUNICACION CON PHP
    mercaPventa(datos).then((response) => {
      if (response) {
        setPreferenceId(response);
      }
    });
  }, [datos]);

  useEffect(() => {
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago

      const btn_element = document.querySelector("#payment-form > button");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://www.mercadopago.com.mx/integrations/v1/web-payment-checkout.js";
      script.setAttribute("data-preference-id", preferenceId);

      if (btn_element) btn_element.parentNode.replaceChild(script, btn_element);
      else {
        const form = document.getElementById(FORM_ID);
        form.appendChild(script);
      }
    }
  }, [preferenceId]);

  return <form id={FORM_ID} method="POST" action={endpoints.mercadoPago} />;
}
