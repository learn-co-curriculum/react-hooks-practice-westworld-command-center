import React from "react";
import { Segment, Image } from "semantic-ui-react";
import * as Images from "../services/Images";

function Details() {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.

  return (
    <Segment id="details" className="HQComps">
      {true ? <Image size="medium" src={Images.westworldLogo} /> : null}
    </Segment>
  );
}

export default Details;
