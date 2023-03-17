import { Center, Box } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

import SceneMatter from "./Components/SceneMatter";

window.onload = function () {
  function resize() {
    let canvas = document.querySelector("canvas");
    let ww = window.innerWidth;
    let wh = window.innerHeight;
    let wRatio = ww / wh;
    let gameRatio = (config.width as number) / (config.height as number);

    if (canvas) {
      if (wRatio < gameRatio) {
        canvas.style.width = ww + "px";
        canvas.style.height = ww / gameRatio + "px";
      } else {
        canvas.style.width = wh * gameRatio + "px";
        canvas.style.height = wh + "px";
      }
    }
  }
  resize();
  window.addEventListener("resize", resize, false);
};

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 640,
  height: 960,
  backgroundColor: "#000000",
  pixelArt: true,
  physics: {
    default: "matter",
  },
  scene: SceneMatter,
  parent: "game-content",
};

const App: React.FC = () => {
  const gameRef = useRef<any>();

  const setGame = () => {
    gameRef.current || (gameRef.current = new Phaser.Game(config));
  };

  useEffect(() => {
    setGame();
  }, []);

  return (
    <Center w={"100vw"} h={"100vh"} bg={"#000000"}>
      <Box id="game-content"></Box>
    </Center>
  );
};

export default App;
