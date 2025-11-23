import { ScriptHTMLAttributes, useRef } from "react";

function Script({ onLoad, ...props }: ScriptHTMLAttributes<HTMLScriptElement>) {
  const ref = useRef<HTMLScriptElement>(null);

  return (
    <script
      async
      ref={(node) => {
        ref.current = node;
        ref.current.onload = onLoad;
      }}
      {...props}
    />
  );
}

export default Script;
