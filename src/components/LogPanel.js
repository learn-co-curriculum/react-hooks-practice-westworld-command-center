import React from "react";
import { Segment, Button } from "semantic-ui-react";
import { Log } from "../services/Log";

function LogPanel({ logs, allHostsActive, onClickActivate, onAddLog }) {
  function handleClickActivate() {
    const activate = !allHostsActive;
    if (activate) {
      onAddLog(Log.warn("Activating all hosts!"));
    } else {
      onAddLog(Log.notify("Decommissiong all hosts."));
    }
    onClickActivate(activate);
  }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>

      <Button
        fluid
        color={allHostsActive ? "green" : "red"}
        content={allHostsActive ? "DECOMMISSION ALL" : "ACTIVATE ALL"}
        onClick={handleClickActivate}
      />
    </Segment>
  );
}

export default LogPanel;