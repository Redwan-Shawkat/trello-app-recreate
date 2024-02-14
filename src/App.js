import { UseDispatch, useSelector,useDispatch } from 'react-redux';
import './App.css';

function App({children}) {

  const board = useSelector((storeState) => storeState.board)
  const list = useSelector((storeState) => storeState.list)
  const task = useSelector((storeState) => storeState.task)

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
