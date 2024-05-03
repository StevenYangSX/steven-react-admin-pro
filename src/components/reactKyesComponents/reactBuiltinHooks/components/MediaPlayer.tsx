import { forwardRef } from "react";

const MediaPlayer = forwardRef((_props: any, ref: any) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span>Child Component : </span>
      <video style={{ margin: "30px" }} width="250" ref={ref}>
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
});
export default MediaPlayer;
