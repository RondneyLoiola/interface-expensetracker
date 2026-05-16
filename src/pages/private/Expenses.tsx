/** biome-ignore-all lint/correctness/useExhaustiveDependencies: useEffect */

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import api from "../../services/api";
import type { Category } from "../../types/category";
import type { Expense, ExpenseSummary } from "../../types/expense";

const initialSummary: ExpenseSummary = {
	totalAmount: 0,
	totalExpenses: 0,
	expensesByCategory: [],
};

function Expenses() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [_expense, setExpenses] = useState<Expense[]>([]);
	const [summary, setSummary] = useState<ExpenseSummary>(initialSummary);
	const [currentMonth, setCurrentMonth] = useState<number>(
		new Date().getMonth() + 1,
	);
	const [currentYear, setCurrentYear] = useState<number>(
		new Date().getFullYear(),
	);
	const [_loading, setLoading] = useState<boolean>(false);

	const months = [
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

	const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

	const handleNextMonth = () => {
		if (currentMonth === 12) {
			setCurrentMonth(1);
			setCurrentYear(currentYear + 1);
		} else {
			setCurrentMonth(currentMonth + 1);
		}
	};

	const handlePreviousMonth = () => {
		if (currentMonth === 1) {
			setCurrentMonth(12);
			setCurrentYear(currentYear - 1);
		} else {
			setCurrentMonth(currentMonth - 1);
		}
	};

	const fetchCategories = async () => {
		setLoading(true);

		try {
			const { data } = await api.get("/categories");
			setCategories(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const fetchExpenses = async () => {
		setLoading(true);

		try {
			const monthFormatted = String(currentMonth).padStart(2, "0");

			const url = `/expenses/me?month=${monthFormatted}&year=${currentYear}`;

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
			const monthFormatted = String(currentMonth).padStart(2, "0");

			const url = `/expenses/summary/me?month=${monthFormatted}&year=${currentYear}`;

			const { data } = await api.get(url);

			if (!data) {
				throw new Error("Erro ao buscar dados!");
			}

			setSummary(data);
		} catch (error) {
			console.error("Erro ao buscar resumo de despesas:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCategories();
		fetchExpenses();
		fetchExpensesSummary();
	}, [currentMonth, currentYear]);

	return (
		<section className="w-full flex items-start md:ml-40 py-4">
			{/* Lado Esquerdo */}
			<div className="flex flex-col gap-4 h-full w-[50%]">
				<form className="flex items-center justify-center gap-4 bg-white rounded-lg px-4 py-2">
					<button
						type="button"
						aria-label="Mês anterior"
						className="h-12 w-12 text-xl flex items-center justify-center hover:bg-gray-100 hover:rounded-full transform duration-200"
						onClick={handlePreviousMonth}
					>
						<ChevronLeft />
					</button>
					<select
						className="border border-blue-500 bg-white rounded-lg text-xl pl-2 py-2 focus:ring-2 focus:ring-blue-500 outline-0"
						name="month"
						value={currentMonth}
						onChange={(e) => setCurrentMonth(Number(e.target.value))}
					>
						{months.map((month, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: key option
							<option key={i} value={i + 1}>
								{month}
							</option>
						))}
					</select>

					<select
						className="border border-blue-500 bg-white rounded-lg text-xl px-2 py-2 focus:ring-2 focus:ring-blue-500 outline-0"
						name="year"
						value={currentYear}
						onChange={(e) => setCurrentYear(Number(e.target.value))}
					>
						{years.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
					<button
						type="button"
						aria-label="Próximo mês"
						className="h-12 w-12 text-xl flex items-center justify-center hover:bg-gray-100 hover:rounded-full transform duration-200"
						onClick={handleNextMonth}
					>
						<ChevronRight />
					</button>
				</form>

				{/* Gráfico */}
				<div className="w-full p-4 bg-white rounded-2xl flex ">
					{summary.expensesByCategory.length > 0 ? (
						<div className="w-full h-100 mt-4 flex ">
							<ResponsiveContainer width={500} height="100%">
								<PieChart>
									<Pie
										data={summary.expensesByCategory}
										cx="50%"
										cy="50%"
										outerRadius={150}
										dataKey="amount"
										nameKey="categoryName"
										labelLine={false}
									>
										{summary.expensesByCategory.map((entry) => (
											<Cell key={entry.categoryId} fill={entry.categoryColor} />
										))}
									</Pie>
									<Tooltip formatter={(value) => `R$ ${value}`} />
								</PieChart>
							</ResponsiveContainer>

							<div className="h-full flex flex-col gap-4 items-center justify-center">
								{categories.map((category) => (
									<div
										className="flex items-center gap-2 w-full justify-start"
										key={category._id}
									>
										<div
											style={{ background: `${category.color}` }}
											className="w-6 h-6 rounded-2xl"
										/>
										<span>{category.name}</span>
									</div>
								))}
							</div>
						</div>
					) : (
						<div className="flex flex-col items-center justify-center h-72 w-full">
							<p className="text-2xl font-bold">Nenhuma despesa encontrada</p>
						</div>
					)}
				</div>
			</div>

			<div className="h-full w-px bg-gray-300 mx-2">

			</div>

			{/* Lado Direito */}
			<div className="w-[50%] h-full p-4 bg-red-200">
				<h2>{currentMonth === 1 ? `Janeiro de ${currentYear}` : `${months[currentMonth - 1]} de ${currentYear}`}</h2>
			</div>
		</section>
	);
}

export default Expenses;
