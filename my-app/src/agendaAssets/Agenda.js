// Importa os componentes e hooks necessários da biblioteca react-router-dom para gerenciar as rotas da aplicação.
import {
  BrowserRouter as Router,  // Renomeia o componente BrowserRouter para Router para uso na aplicação.
  Routes,                   // Componente que define a lista de rotas da aplicação.
  Route,                    // Componente que define uma rota específica.
  Link,                     // Componente que cria links de navegação.
  useLocation,              // Hook que retorna o objeto de localização atual.
} from "react-router-dom";

// Importa os componentes de página para a aplicação.
import CadastrarContato from "./CadastrarContato"; // Componente para cadastrar um novo contato.
import Contatos from "./Contatos";                 // Componente para listar os contatos existentes.
import EditarContato from "./EditarContato";       // Componente para editar um contato existente.

const AgendaApp = () => {
  // Usa o hook `useLocation` para obter o objeto de localização atual, que contém informações sobre o URL atual.
  const location = useLocation();

  // Define uma variável `showButton` que será verdadeira se o caminho atual não for "/+".
  // Isso determina se o botão "Adicionar Contato" deve ser exibido.
  const showButton = location.pathname !== "/+";

  return (
    <div>
      {/* Renderiza um botão "Adicionar Contato" somente se `showButton` for verdadeiro. */}
      {showButton && (
        <Link to="/+">
          <button>Adicionar Contato</button>
        </Link>
      )}

      {/* Define as rotas da aplicação usando o componente `Routes`. */}
      <Routes>
        {/* Rota para a página inicial que exibe o componente `Contatos`. */}
        <Route path="/" element={<Contatos />} />
        
        {/* Rota para a página de cadastro de contato que exibe o componente `CadastrarContato`. */}
        <Route path="/+" element={<CadastrarContato />} />
        
        {/* Rota para a página de edição de contato que exibe o componente `EditarContato`. */}
        <Route path="/editarcontato" element={<EditarContato />} />
      </Routes>
    </div>
  );
};

// Componente principal que envolve a aplicação com o `Router` para gerenciar o roteamento.
export default function Agenda() {
  return (
    <Router>
      <AgendaApp />
    </Router>
  );
}
