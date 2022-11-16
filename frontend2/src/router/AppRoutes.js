import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";

// Import pages
import {MainClients} from '../pages/Clients/mainClients';
import {MainPlans} from '../pages/Plans/mainPlans';
import Home from '../pages/home';
import {ClientsAdd} from '../pages/Clients/clientsAdd';
import {ClientsDel} from '../pages/Clients/clientsDel';
import {ClientsModify} from '../pages/Clients/clientsModify';
import {ClientsList} from '../pages/Clients/clientsList';

function AppRoutes(){
    return(
      <Router>
      <div>
        <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/clientes" element={<MainClients />} />
        <Route path="/clientes/add" element={<ClientsAdd />} />
        <Route path="/clientes/delete" element={<ClientsDel />} />
        <Route path="/clientes/modify" element={<ClientsModify />} />
        <Route path="/clientes/list" element={<ClientsList />} />

        <Route path="/planesdeviaje" element={<MainPlans />} />
        </Routes>
      </div>
    </Router>
    )
}
export default AppRoutes;