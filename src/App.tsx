import * as React from "react";
import { LOGS } from "./data";
import "./styles.css";

function sleep(time = 0) {
  const wakeUpTime = Date.now() + time;
  while (Date.now() < wakeUpTime) {}
}

function ServerLogs({ logs }: { logs: string[] }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      console.log("in use effect");
      sleep(1000);
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  console.log("rendering " + logs.length + " logs");

  return (
    <div ref={containerRef} role="log" className="container">
      {logs.map((log, idx) => (
        <pre key={idx}>{log}</pre>
      ))}
    </div>
  );
}

export default function App() {
  const [newLogIdx, setNewLogIdx] = React.useState(50);
  const [logs, setLogs] = React.useState(LOGS.slice(0, newLogIdx));

  function handleNewMessage() {
    if (newLogIdx < LOGS.length - 1) {
      setLogs((prev) => [...prev, LOGS[newLogIdx]]);
      setNewLogIdx((prev) => prev + 1);
    }
  }

  return (
    <div>
      <button onClick={handleNewMessage} style={{ marginBottom: "20px" }}>
        Simulate new log
      </button>
      <ServerLogs logs={logs} />
    </div>
  );
}
