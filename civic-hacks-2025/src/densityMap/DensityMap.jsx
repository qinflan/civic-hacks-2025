import "ol/ol.css";
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { Map, View } from 'ol';
import { useRef, useEffect } from 'react';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';

export default function DensityMap({taxonKey}) {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center:[0, 0],
        zoom: 2
      })
    });
    const layer = new VectorTileLayer({
      source: new VectorTileSource({
        format: new MVT(),
        url:'https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}.mvt?basisOfRecord=OCCURRENCE,OBSERVATION&taxonKey=' + taxonKey.taxonKey
      }),
    });
    map.addLayer(layer);

    return () => map.setTarget(undefined);
  }, [taxonKey]);

  return <div ref={mapRef} style={{ width: "100vw", height: "100vh" }} />;
}
