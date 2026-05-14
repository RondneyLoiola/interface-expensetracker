/** biome-ignore-all lint/correctness/useExhaustiveDependencies: useEffect */
import { ArrowDown, ChartGantt, List } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import NewExpense from "../../components/NewExpense";
import { RecentExpense } from "../../components/RecentExpenses";
import { api } from "../../services/api";
import type { Expense, ExpenseSummary } from "../../types/expense";
import { PriceConvert } from "../../utils/priceConvert";

const initialSummary: ExpenseSummary = {
	totalAmount: 0,
	totalExpenses: 0,
	expensesByCategory: [],
}

function Home() {
	const [expense, setExpenses] = useState<Expense[]>([]);
	const [summary, setSummary] = useState<ExpenseSummary>(initialSummary);
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedMonth, _setSelectedMonth] = useState(
		new Date().getMonth() + 1,
	);
	const [selectedYear, _setSelectedYear] = useState(new Date().getFullYear());

	const fetchExpenses = async () => {
		setLoading(true);
		try {
			const url = `/expenses/me?month=0${selectedMonth}&year=${selectedYear}`;
			const { data } = await api.get(url);

			if (!data) {
				throw new Error("Erro ao buscar dados!");
			}

			setExpenses(data.expenses);
		} catch (error) {
			console.error("Erro ao buscar despesas:", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchExpensesSummary = async () => {
		try {
			const url = `/expenses/summary/me?month=0${selectedMonth}&year=${selectedYear}`;
			const { data } = await api.get(url);

			if(!data) {
				throw new Error("Erro ao buscar dados!");
			}

			setSummary(data);
		} catch (error) {
			console.error("Erro ao buscar resumo de despesas:", error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchExpenses();
		fetchExpensesSummary();
	}, [selectedMonth, selectedYear]);

	// Recarrega quando cria ou deleta uma despesa
	const handleExpenseChange = () => {
		fetchExpenses();
	};

	return (
		<section className="w-full flex flex-col items-start md:ml-80 py-4">
			<div>
				<h1 className="font-bold text-3xl">Calculadora de Despesas</h1>
				<p className="text-gray-600 mt-2">
					Adicione e gerencia suas despesas facilmente
				</p>
			</div>

			<div>
				<div className="flex gap-6 items-center justify-center">
					<Card
						className="bg-red-200 text-red-500"
						icon={<ArrowDown size={20} />}
						title="Total de Despesas"
						subtitle="Este mês"
						value={PriceConvert(summary.totalAmount)}
					/>
					<Card
						className="bg-blue-200 text-blue-500"
						icon={<List size={20} />}
						title="Número de Despesas"
						subtitle="Despesas deste Mês"
						value={summary.totalExpenses}
					/>
					<Card
						className="bg-green-200 text-green-700"
						icon={<ChartGantt size={20} />}
						title="Média por Despesa"
						subtitle="Valor Médio deste Mês"
						value={PriceConvert(
							summary.totalExpenses > 0
								? summary.totalAmount / summary.totalExpenses
								: 0.0,
						)}
					/>
				</div>

				<div className="flex gap-3">
					<NewExpense onExpenseCreated={handleExpenseChange} />
					<RecentExpense
						expenses={expense}
						onExpenseChange={handleExpenseChange}
						isLoading={loading}
					/>
				</div>
			</div>
		</section>
	);
}

export default Home;
