import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel";
import "../stylesheets/Headquarters.css";

function Headquarters({
  areas,
  hosts,
  selectedHost,
  allHostsActive,
  onHostClick,
  onUpdateHost,
  onClickActivate,
}) {
  const [logs, setLogs] = useState([]);

  function handleAddLog(log) {
    setLogs([...logs, log]);
  }

  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage hosts={hosts} onHostClick={onHostClick} />
      </Grid.Column>
      <Grid.Column width={5}>
        <Details
          areas={areas}
          host={selectedHost}
          onUpdateHost={onUpdateHost}
          onAddLog={handleAddLog}
        />
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel
          logs={logs}
          allHostsActive={allHostsActive}
          onClickActivate={onClickActivate}
          onAddLog={handleAddLog}
        />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
