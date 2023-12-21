import './App.css';
import Game from './Game';

function App() {
  const winner = ""

  return (
    <div>
      { winner ? (
        {winner} 
      ) : (
        <Game />
      )}
    </div>
  );
}

export default App;