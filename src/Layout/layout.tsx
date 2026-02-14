import { Outlet } from "react-router";
import { SiderBar } from "../components/SideBar";

function Layout() {
	return (
		<div>
			<div className="flex">
				<SiderBar />
				<Outlet />
			</div>
		</div>
	);
}

export default Layout;
