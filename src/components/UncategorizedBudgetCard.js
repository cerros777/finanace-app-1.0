import { UNCATEGORIZED_BUDGET_ID, useBudget } from "../context/BudgetProvider";
import { BudgetCard } from "./BudgetCard";


export default function UncategorizedBudgetCard(props) {
const { getBudgetExpenses } = useBudget()
const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
)
if(amount === 0) return null

  return  <BudgetCard gray amount={amount} name="Uncategorized" {...props}></BudgetCard>
  
}
