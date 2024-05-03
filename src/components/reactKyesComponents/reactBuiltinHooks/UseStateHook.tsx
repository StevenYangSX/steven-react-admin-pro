import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
// Import markdown files
import useStateHookDocument from "./mdFiles/useStateHook.md";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
const UseStateHook = () => {
  return (
    <div style={{ margin: "20px", height: "75vh", overflow: "auto" }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        children={useStateHookDocument}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={atomDark}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default UseStateHook;
