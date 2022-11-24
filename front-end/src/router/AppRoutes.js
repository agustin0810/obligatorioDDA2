import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";

// Import pages

import Home from '../pages/home';
//Clientes
import {MainClients} from '../pages/Clients/mainClients';
import {ClientsAdd} from '../pages/Clients/clientsAdd';
import {ClientsDel} from '../pages/Clients/clientsDel';
import {ClientsModifyList} from '../pages/Clients/clientsModifyList';
import {ClientsList} from '../pages/Clients/clientsList';
import {ClientsModify} from '../pages/Clients/clientModify';
//Planes
import {MainPlans} from '../pages/Plans/mainPlans';
import {PlansAdd} from '../pages/Plans/plansAdd';
import {PlansDel} from '../pages/Plans/plansDel';
import {PlansModifyList} from '../pages/Plans/plansModifyList';
import {PlansList} from '../pages/Plans/plansList';
import {PlansModify} from '../pages/Plans/plansModify';
//Extras
import {CompraViaje} from '../pages/Extras/compraViaje'
import {Listing} from '../pages/Extras/listing'
import {PlanImages} from '../pages/Plans/planImages'

function AppRoutes(){
    return(
      <Router>
      <div>
        <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/clientes" element={<MainClients />} />
        <Route path="/clientes/add" element={<ClientsAdd />} />
        <Route path="/clientes/delete" element={<ClientsDel />} />
        <Route path="/clientes/modify" element={<ClientsModifyList />} />
        <Route path="/clientes/list" element={<ClientsList />} />
        <Route path="/clientes/modifyClient/:id" element={<ClientsModify />} />

        <Route path="/planesdeviaje" element={<MainPlans />} />
        <Route path="/planesdeviaje/add" element={<PlansAdd />} />
        <Route path="/planesdeviaje/delete" element={<PlansDel />} />
        <Route path="/planesdeviaje/modify" element={<PlansModifyList />} />
        <Route path="/planesdeviaje/list" element={<PlansList />} />
        <Route path="/planesdeviaje/modifyPlan/:id" element={<PlansModify />} />

        <Route path="/compraViaje" element={<CompraViaje />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/planImages/:id" element={<PlanImages />} />

        </Routes>
      </div>
    </Router>
    )
}
export default AppRoutes;