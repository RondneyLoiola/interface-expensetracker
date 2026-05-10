import { Route, Routes } from "react-router";
import Layout from "./Layout/layout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/private/Dashboard";
import Register from "./pages/Register";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
	return (
		<Routes>
			<Route element={<PrivateRoutes />}>
				<Route element={<Layout />}>
					<Route path="/dashboard" element={<Home />} />
				</Route>
			</Route>
			<Route path="/entrar" element={<Login />} />
			<Route path="/cadastro" element={<Register />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
