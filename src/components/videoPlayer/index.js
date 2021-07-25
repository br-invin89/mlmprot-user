import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

export default ({ sourceUrl }) => {
  const videoSrc = {
    type: "video",
    sources: [
      {
        src:
          "https://rawcdn.githack.com/chintan9/Big-Buck-Bunny/e577fdbb23064bdd8ac4cecf13db86eef5720565/BigBuckBunny720p30s.mp4",
        type: "video/mp4",
        size: 720,
      },
    ],
  };
  return <Plyr source={videoSrc} />;
};
