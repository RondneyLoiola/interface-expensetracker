/** biome-ignore-all lint/correctness/useExhaustiveDependencies: useEffect */
import { useEffect, useState } from "react";
import api from "../../services/api";
import type { Expense } from "../../types/expense";

function Expenses() {
	const [_expense, setExpenses] = useState<Expense[]>([]);
	const [currentMonth, _setCurrentMonth] = useState(
		new Date().getMonth() + 1,
	);
	const [currentYear, _setCurrentYear] = useState(new Date().getFullYear());
	const [_loading, setLoading] = useState(false);

	const _months = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	];

	const fetchExpenses = async () => {
		setLoading(true);
        console.log(currentMonth)
		try {
			const url = `/expenses/me?month=0${currentMonth}&year=${currentYear}`;
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

	useEffect(() => {
		fetchExpenses();
	}, [currentMonth, currentYear]);

	return (
        <section>
            <h1>oi 0{currentMonth}</h1>
        </section>
    );
}

export default Expenses;

{
	/* <div className="flex gap-2">
				<select
					value={selectedMonth}
					onChange={(e) => setSelectedMonth(Number(e.target.value))}
					className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
				>
					{months.map((month, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: key option
						<option key={i} value={i + i}>
							{month}
						</option>
					))}
				</select>

				<select
					value={selectedYear}
					onChange={(e) => setSelectedYear(Number(e.target.value))}
					className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
				>
					{[2023, 2024, 2025, 2026].map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
			</div> */
}
