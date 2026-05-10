export function Loading() {
	return (
		<div className="flex items-center justify-center bg-white">
			<div className="relative">
				<div className="w-16 h-16 rounded-full border-4 border-blue-200"></div>

				<div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>

				<div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl"></div>
			</div>
		</div>
	);
}
