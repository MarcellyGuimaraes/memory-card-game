import './styles.css'
import { cards } from '../../data/cards';
import { Grid } from '../../components/Grid';

function App() {
  return (
    <div className="app">
      <Grid cards={cards} />
    </div>
  )
}

export default App