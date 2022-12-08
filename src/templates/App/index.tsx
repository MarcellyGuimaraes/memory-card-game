import './styles.css'
import { cards } from '../../data/cards';
import { Grid } from '../../components/Grid';
import Footer from '../../components/Footer';

function App() {
  return (
    <div className="app">
      <Grid cards={cards} />
      <Footer />
    </div>
  )
}

export default App