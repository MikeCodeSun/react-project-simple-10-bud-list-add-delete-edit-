import React from "react";
import { useEffect } from "react";

export default function Alert({ alert, showAlert }) {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      showAlert();
    }, 2000);
  }, []);
  return <p className={`alert alert-${alert.type}`}>{alert.msg}</p>;
}
