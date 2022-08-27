import { useRef, useEffect } from "react";
import styled from "styled-components";

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    new window.ol.Map({
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
      ],
      target: mapRef.current.id,
      view: new window.ol.View({
        center: [center.lng, center.lat],
        zoom: zoom,
      }),
    });
  }, [center, zoom]);

  return <StyledMap ref={mapRef} id="map"></StyledMap>;
};

const StyledMap = styled.div`
    height: 100%
    width: 100%
`;

export default Map;
