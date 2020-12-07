import React from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import client from "../services/FetchClient";
import { Log } from "../services/Log";
import "../stylesheets/HostInfo.css";

function HostInfo({ host, areas, onUpdateHost, onAddLog }) {
  function handleOptionChange(e, { value }) {
    const newArea = areas.find((area) => area.name === value);
    // check if there's space in the area
    if (newArea.hosts.length < newArea.limit) {
      // if so, update the host
      client
        .patch(`/hosts/${host.id}`, {
          area: newArea.name,
        })
        .then((updatedHost) => {
          // use callback to set state in app
          onUpdateHost(updatedHost);
          // also log the change
          onAddLog(
            Log.notify(`${host.firstName} set in area ${newArea.formattedName}`)
          );
        });
    } else {
      onAddLog(
        Log.error(
          `Too many hosts. Cannot add ${host.firstName} to ${newArea.formattedName}`
        )
      );
    }
  }

  function handleRadioChange(e, { checked }) {
    client
      .patch(`/hosts/${host.id}`, {
        active: checked,
      })
      .then((updatedHost) => {
        // use callback to set state in app
        onUpdateHost(updatedHost);
        // also log the change
        if (checked) {
          onAddLog(Log.warn(`Activated ${host.firstName}`));
        } else {
          onAddLog(Log.notify(`Decommissioned ${host.firstName}`));
        }
      });
  }

  const { imageUrl, firstName, gender, active, area } = host;
  const options = areas.map((area) => ({
    key: area.name,
    text: area.formattedName,
    value: area.name,
  }));

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image src={imageUrl} floated="left" size="small" className="hostImg" />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {firstName} |{" "}
              {gender === "Male" ? <Icon name="man" /> : <Icon name="woman" />}
            </Card.Header>
            <Card.Meta>
              <Radio
                onChange={handleRadioChange}
                label={active ? "Active" : "Decommissioned"}
                checked={active}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={area}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
