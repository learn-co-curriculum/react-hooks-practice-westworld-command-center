import React from "react";
import Host from "./Host";
import { Card } from "semantic-ui-react";

function HostList({ hosts, onHostClick }) {
  const hostList = hosts.map((host) => (
    <Host key={host.id} host={host} onHostClick={onHostClick} />
  ));

  return <Card.Group itemsPerRow={6}>{hostList}</Card.Group>;
}

export default HostList;