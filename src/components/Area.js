import React from "react";
import HostList from "./HostList";
import "../stylesheets/Area.css";

function Area({ area, onHostClick }) {
  const { name, formattedName, limit, hosts } = area;

  const activeHosts = hosts.filter((host) => host.active);

  return (
    <div className="area" id={name}>
      <h3 className="labels">
        {formattedName} | Limit: {limit}
      </h3>
      <HostList hosts={activeHosts} onHostClick={onHostClick} />
    </div>
  );
}

export default Area;