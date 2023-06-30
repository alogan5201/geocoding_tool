import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpringRef } from "@react-spring/web";

import styles from "./styles.module.css";

const pages = [
  ({ style }) => <animated.div style={{ ...style, background: "lightpink" }}>A</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: "lightblue" }}>B</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: "lightgreen" }}>C</animated.div>,
];

export default function BasicTransition() {
  const [index, set] = useState(0);
  const onClick = () => set((state) => (state + 1) % 3);
  const transRef = useSpringRef();
  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });
  useEffect(() => {
    transRef.start();
  }, [index]);
  return (
    <div className={`flex fill ${styles.container}`} onClick={onClick}>
      {transitions((style, i) => {
        const Page = pages[i];
        return <Page style={style} />;
      })}
    </div>
  );
}