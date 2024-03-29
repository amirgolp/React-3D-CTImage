import React, { useState, useContext } from "react";

import rock from "./Rock/Berea.vti";

import {
  View,
  ShareDataSet,
  SliceRepresentation,
  Reader,
  Contexts,
  VolumeController,
  VolumeRepresentation,
} from "react-vtk-js";

function Slider(props) {
  const view = useContext(Contexts.ViewContext);
  function onChange(e) {
    const value = Number(e.currentTarget.value);
    props.setValue(value);
    setTimeout(view.renderView, 0);
  }
  return (
    <input
      type="range"
      min="0"
      max={props.max}
      value={props.value}
      onChange={onChange}
      style={{
        position: "absolute",
        zIndex: 100,
        left: "5px",
        top: "5px",
        ...props.style,
      }}
    />
  );
}

function App(props) {
  const [iSlice, setISlice] = useState(128);
  const [jSlice, setJSlice] = useState(128);
  const [kSlice, setKSlice] = useState(47);
  const [colorWindow, setColorWindow] = useState(4095);
  const [colorLevel, setColorLevel] = useState(1000);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ width: "50vw", height: "100vh", display: "inline-block" }}>
        <View
          id="0"
          cameraPosition={[1, 0, 0]}
          cameraViewUp={[0, 0, -1]}
          cameraParallelProjection={false}
          background={[1, 1, 1]}
        >
          <ShareDataSet>
            <Reader vtkClass="vtkXMLImageDataReader" url={rock} />
          </ShareDataSet>
          <Slider
            max={399}
            value={iSlice}
            setValue={setISlice}
            style={{ left: "5px" }}
          />
          <Slider
            max={399}
            value={jSlice}
            setValue={setJSlice}
            style={{ left: "155px" }}
          />
          <Slider
            max={399}
            value={kSlice}
            setValue={setKSlice}
            style={{ left: "305px" }}
          />
          <Slider
            max={5}
            value={colorLevel}
            setValue={setColorLevel}
            style={{ top: "30px", left: "5px" }}
          />
          <Slider
            max={5}
            value={colorWindow}
            setValue={setColorWindow}
            style={{ top: "30px", left: "305px" }}
          />
          <SliceRepresentation
            iSlice={iSlice}
            property={{ colorWindow, colorLevel }}
          >
            <ShareDataSet />
          </SliceRepresentation>
          <SliceRepresentation
            jSlice={jSlice}
            property={{ colorWindow, colorLevel }}
          >
            <ShareDataSet />
          </SliceRepresentation>
          <SliceRepresentation
            kSlice={kSlice}
            property={{ colorWindow, colorLevel }}
          >
            <ShareDataSet />
          </SliceRepresentation>
        </View>
      </div>
      <div style={{ width: "50vw", height: "100vh", display: "inline-block" }}>
        <View
          id="0"
          background={[0, 0, 0]}
          cameraPosition={[1, 0, 0]}
          cameraViewUp={[0, 0, -1]}
          cameraParallelProjection={false}
        >
          <VolumeRepresentation>
            <div style={{ display: "none" }}>
              <VolumeController />
            </div>
            <ShareDataSet />
          </VolumeRepresentation>
        </View>
      </div>
    </div>
  );
}
export default App;
