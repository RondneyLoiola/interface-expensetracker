import { Calculator, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useUser } from "../hooks/auth";

export function SiderBar() {
	const navigate = useNavigate();
	const { logout } = useUser();
	const { pathname } = useLocation();

	const { userInfo } = useUser();

	const getInitials = (name: string) => {
		const names = name.split(" ");
		if (names.length >= 2) {
			return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`;
		}
		return name.charAt(0);
	};

	const handleLogout = () => {
		if (window.confirm("Deseja realmente sair?")) {
			logout();
		}
		return;
	};

	// Verifica se tem foto do Google
	const hasGooglePhoto = userInfo?.user?.photoURL;

	return (
		<div className="h-screen bg-(--bg-primary)">
			<div className="flex flex-col h-full">
				<nav className="w-60 flex flex-col gap-1 flex-1">
					<div className="flex items-center p-4 pt-6">
						<div className="flex items-center space-x-2 hover:bg-gray-50 rounded-full transition-colors duration-200">
							{hasGooglePhoto ? (
								<img
									src={userInfo.user.photoURL}
									alt={userInfo?.user?.name || "Usuário"}
									className="w-10 h-10 rounded-full object-cover shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer ring-2 ring-emerald-400"
								/>
							) : (
								<div className="w-10 h-10 flex items-center justify-center bg-linear-to-br from-emerald-400 to-teal-500 rounded-full font-bold text-white shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
									{userInfo?.user?.name ? getInitials(userInfo.user.name) : "U"}
								</div>
							)}

							<div className="hidden sm:block text-left">
								<p className="text-sm font-semibold text-gray-700">
									{userInfo?.user?.name || "Usuário"}
								</p>
								<p className="text-xs text-gray-500">
									{userInfo?.user?.email || "user@email.com"}
								</p>
							</div>


						</div>
					</div>

					<button
						type="button"
						onClick={() => navigate("/dashboard")}
						className={`${pathname === "/dashboard" ? "bg-green-100 text-green-800" : ""} flex items-center gap-3 p-6 w-full transition-all duration-200 hover:bg-green-100 text-left group`}
					>
						<Calculator
							size={20}
							className="group-hover:text-green-800 transition-colors"
						/>
						<span className="group-hover:text-green-800 transition-colors">
							Dashboard
						</span>
					</button>

					<button
						onClick={handleLogout}
						type="button"
						className="flex items-center mt-auto gap-3 px-7 py-6 transition-all duration-200 hover:bg-red-900/20 text-left w-full group  text-red-400"
					>
						<LogOut
							size={20}
							className="group-hover:text-red-300 transition-colors"
						/>
						<span className="group-hover:text-red-300 transition-colors">
							Sair
						</span>
					</button>
				</nav>
			</div>
		</div>
	);
}
