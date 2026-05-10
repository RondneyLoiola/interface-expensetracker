import { Route, Routes } from "react-router";
import Layout from "./Layout/layout";
import Home from "./pages/private/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoutes from "./routes/PrivateRoutes";
import NotFound from "./pages/NotFound";

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
