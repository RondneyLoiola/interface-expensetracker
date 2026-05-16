/** biome-ignore-all lint/correctness/useExhaustiveDependencies: useEffect */
import { BookText, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import type { Expense } from "../types/expense";
import { formatDate } from "../utils/formatDate";
import { Loading } from "../utils/loading";

interface RecentExpenseProps {
	expenses: Expense[];
	isLoading: boolean;
	onExpenseChange: () => void;
}

export function RecentExpense({
	expenses,
	isLoading,
	onExpenseChange,
}: RecentExpenseProps) {
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const deleteExpense = async (expenseId: string) => {
		if (!window.confirm("Tem certeza que deseja deletar essa despesa?")) return;

		setDeletingId(expenseId);

		try {
			await api.delete(`/expenses/${expenseId}`);
			toast.success("Despesa deletada com sucesso!");
			onExpenseChange();
		} catch (_error) {
			toast.error("Erro ao deletar despesa!");
		} finally {
			setDeletingId(null);
		}
	};

	const clearAllExpenses = async () => {
		if (!window.confirm("Tem certeza que deseja limpar todas as despesas?"))
			return;

		try {
			await api.delete("/expenses/me/all");
			toast.success("Todas as despesas foram removidas!");
			onExpenseChange();
		} catch (error) {
			console.log(error);
			toast.error("Erro ao limpar despesas!");
		}
	};

	// ordenar despesas por data mais recente
	const sortedExpenses = [...expenses].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	return (
		<div className="p-6 max-h-screen w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-bold text-gray-900">Despesas deste Mês</h2>
				{expenses.length > 0 && (
					<button
						type="button"
						onClick={clearAllExpenses}
						disabled={isLoading}
						className="text-red-500 text-sm flex items-center gap-2 font-medium hover:text-red-600 transition-colors"
					>
						<Trash2 size={16} />
						Limpar Tudo
					</button>
				)}
			</div>

			<div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
				{isLoading ? (
					<Loading />
				) : sortedExpenses.length > 0 ? (
					sortedExpenses.map((expense) => (
						<div
							key={expense._id}
							className={`w-full flex justify-between items-center border border-gray-200 p-4 rounded-md hover:bg-gray-100 transition-color 
								${deletingId === expense._id ? "opacity-50 pointer-events-none" : "hover:bg-gray-50"}
								`}
						>
							<div className="flex items-center gap-4">
								<div className="flex-1">
									<h3 className="font-semibold text-gray-900 mb-0.5">
										{expense.name}
									</h3>
									<div className="flex gap-1 text-sm text-gray-500">
										<p
											style={{ color: expense.category.color }}
											className="font-bold"
										>
											{expense.category.name}
										</p>
										•<p>{formatDate(expense.date)}</p>
									</div>
								</div>
							</div>

							<div className="flex items-center gap-4">
								<span className="font-bold text-gray-900">
									R$ {expense.amount.toFixed(2).replace(".", ",")}
								</span>

								<button
									type="button"
									onClick={() => deleteExpense(expense._id)}
									disabled={deletingId === expense._id}
									className="w-8 h-8 flex items-center justify-center rounded-full bg-red-200 text-red-500 hover:text-red-700 transition-colors"
									aria-label="Deletar despesa"
								>
									{deletingId === expense._id ? (
										<Loading />
									) : (
										<Trash2 size={18} />
									)}
								</button>
							</div>
						</div>
					))
				) : (
					<div className="flex justify-center items-center flex-col gap-4 text-gray-400 py-20 overflow-hidden">
						<BookText size={48} strokeWidth={1.5} />
						<span className="font-semibold text-lg">
							Nenhuma despesa adicionada
						</span>
						<span className="text-sm text-gray-500">
							Adicione sua primeira despesa para comecar
						</span>
					</div>
				)}
			</div>
		</div>
	);
}
