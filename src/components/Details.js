import React from "react";
import { Segment, Image } from "semantic-ui-react";
import * as Images from "../services/Images";
import HostInfo from "./HostInfo";

function Details({ host, areas, onUpdateHost, onAddLog }) {
  
  return (
    <Segment id="details" className="HQComps">
      {host ? (
        <HostInfo
          host={host}
          areas={areas}
          onUpdateHost={onUpdateHost}
          onAddLog={onAddLog}
        />
      ) : (
        <Image size="medium" src={Images.westworldLogo} />
      )}
    </Segment>
  );
}

export default Details;
