import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import CadastrarContato from "./CadastrarContato";
import Contatos from "./Contatos";
import EditarContato from "./EditarContato";


const AgendaApp = () => {
  const location = useLocation();
  const showButton = location.pathname !== "/+";

  return (
    <div>
      {showButton && (
        
          <Link to="/+"><button>Adicionar Contato</button></Link>
      )}

      <Routes>
        <Route path="/" element={<Contatos />} />
        <Route path="/+" element={<CadastrarContato />} />
        <Route path="/editarcontato" element ={<EditarContato />} />
      </Routes>
    </div>
  );
};

export default function Agenda() {
  return (
    <Router>
      <AgendaApp />
    </Router>
  );
}
