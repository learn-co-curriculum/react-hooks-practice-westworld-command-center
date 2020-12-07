import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";
import client from "../services/FetchClient";
import { formatAreaName } from "../services/utils";
import "../stylesheets/App.css";

function App() {
  const [hosts, setHosts] = useState([]);
  const [selectedHostId, setSelectedHostId] = useState(null);
  const [areas, setAreas] = useState([]);
  useEffect(() => {
    // Using Promise.all ensures that all data
    // is fetched from both endpoints before setting state
    Promise.all([
      // see services/FetchClient.js for the API client implementation
      client.get("/hosts"),
      client.get("/areas"),
    ]).then(([hosts, areas]) => {
      setHosts(hosts);
      setAreas(areas);
    });
  }, []);

  function handleSelectHost(host) {
    setSelectedHostId(host.id);
  }

  function handleUpdateHost(updatedHost) {
    const udpatedHosts = hosts.map((host) =>
      host.id === updatedHost.id ? updatedHost : host
    );
    setHosts(udpatedHosts);
  }

  function handleClickActivate(activate) {
    // this won't persist on the server
    const updatedHosts = hosts.map((host) => ({
      ...host,
      active: activate,
    }));
    setHosts(updatedHosts);
  }

  const formattedAreas = areas.map((area) => ({
    ...area,
    formattedName: formatAreaName(area.name),
    hosts: hosts.filter((host) => host.area === area.name),
  }));

  const formattedHosts = hosts.map((host) => ({
    ...host,
    selected: host.id === selectedHostId,
  }));

  const selectedHost = hosts.find((host) => host.id === selectedHostId);
  const inactiveHosts = formattedHosts.filter((host) => !host.active);
  const allHostsActive =
    hosts.length === hosts.filter((host) => host.active).length;

  return (
    <Segment id="app">
      <WestworldMap areas={formattedAreas} onHostClick={handleSelectHost} />
      <Headquarters
        areas={formattedAreas}
        hosts={inactiveHosts}
        selectedHost={selectedHost}
        allHostsActive={allHostsActive}
        onHostClick={handleSelectHost}
        onUpdateHost={handleUpdateHost}
        onClickActivate={handleClickActivate}
      />
    </Segment>
  );
}

export default App;
