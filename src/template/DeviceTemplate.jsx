import React, { useEffect, useState } from "react";

const DeviceTemplate = (props) => {
  //{component: , MobileComponent}
  const [screen, setScreen] = useState({
    width: window.innerWidth,
  });
  const [Component, setComponent] = useState(props.Component);
  const changeSize = () => {
    setScreen({
      width: window.innerWidth,
    });
  };
  useEffect(() => {
    window.onload = changeSize;
    window.onresize = changeSize;
    return () => {
      window.removeEventListener("onload", changeSize);
      window.removeEventListener("onresize", changeSize);
    };
  }, []);
  useEffect(() => {
    if (screen.width < 768 && props.MobileComponent) {
      setComponent(props.MobileComponent);
    } else {
      setComponent(props.Component);
    }
  }, [screen.width]);
  return <>{Component}</>;
};

export default DeviceTemplate;
