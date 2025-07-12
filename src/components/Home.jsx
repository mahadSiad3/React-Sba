import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Anime Recommendation Generator</h1>
      <h3>(lets be honest, you're tired of having to wonder what to watch)</h3>
        <button className="startButton" onClick={() => navigate("/recommend")}>Start</button>
        
    </div>
  );
}