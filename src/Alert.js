import React from "react";

export default function Alert({ alert }) {
  return <p className={`alert alert-${alert.type}`}>{alert.msg}</p>;
}
