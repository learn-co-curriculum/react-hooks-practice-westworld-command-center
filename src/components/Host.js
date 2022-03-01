import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({ host, onHostClick }) {
  const { imageUrl, selected } = host;

  function handleClick() {
    onHostClick(host);
  }

  return (
    <Card
      className={selected ? "host selected" : "host"}
      onClick={handleClick}
      image={imageUrl}
      raised
      link
    />
  );
}

export default Host;
