import { Route, Routes } from "react-router";
import Layout from "./Layout/layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/private/Dashboard";
import Expenses from "./pages/private/Expenses";
import Register from "./pages/Register";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
	return (
		<Routes>
			<Route element={<PrivateRoutes />}>
				<Route element={<Layout />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/expenses" element={<Expenses />} />
				</Route>
			</Route>
			<Route path="/entrar" element={<Login />} />
			<Route path="/cadastro" element={<Register />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
