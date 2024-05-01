import { Divider } from "antd";
import { useEffect, useRef, useState } from "react";
import MediaPlayer from "./components/MediaPlayer";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";
const UseRefHook = ({ activeKey }: { activeKey: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const [videoPlay, setVideoPlay] = useState<boolean>(false);
  useEffect(() => {
    if (!inputRef.current) return;
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [activeKey]);

  const handleVideoPlay = (play: boolean) => {
    if (play) {
      setVideoPlay(true);
      videoPlayerRef.current?.play();
      return;
    }
    setVideoPlay(false);
    videoPlayerRef.current?.pause();
  };
  return (
    <>
      <h3>
        <code>useRef</code> is a React Hook that lets you reference a value that’s not needed for
        rendering.
      </h3>
      <Divider />
      <ul>
        <li>
          You can store information between re-renders (unlike regular variables, which reset on
          every render).
        </li>
        <li>
          Changing it does not trigger a re-render (unlike state variables, which trigger a
          re-render).
        </li>
        <li>
          The information is local to each copy of your component (unlike the variables outside,
          which are shared).
        </li>
      </ul>
      <Divider />
      <h4>Auto focus input component by useRef()</h4>
      <input type="text" ref={inputRef} />
      <Divider />
      <h4>Control media player by useRef & forwardRef</h4>
      <span>Parent Component : </span>
      {videoPlay ? (
        <PauseCircleOutlined
          style={{ fontSize: "26px", color: "#08c", marginLeft: "40px" }}
          onClick={() => handleVideoPlay(false)}
        />
      ) : (
        <PlayCircleOutlined
          style={{ fontSize: "26px", color: "#08c", marginLeft: "40px" }}
          onClick={() => handleVideoPlay(true)}
        />
      )}

      <MediaPlayer ref={videoPlayerRef} />
    </>
  );
};

export default UseRefHook;
