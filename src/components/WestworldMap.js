import React from "react";
import Area from "./Area";
import { Segment } from "semantic-ui-react";

function WestworldMap({ areas, onHostClick }) {
  const areaList = areas.map((area) => (
    <Area key={area.id} area={area} onHostClick={onHostClick} />
  ));

  return <Segment id="map">{areaList}</Segment>;
}

export default WestworldMap;
