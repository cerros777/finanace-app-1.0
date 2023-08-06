import { Button, Container, Stack } from "react-bootstrap";
import { BudgetCard } from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal"; 
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudget } from "./context/BudgetProvider";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

  

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalById, setaddExpenseModalById] = useState()
  const { budgets, getBudgetExpenses} = useBudget()

  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true)
    setaddExpenseModalById(budgetId)
  }
  //clear local storage and you need to add the button with the onClick event
  // const clearLocalStorage = () => {
  //   localStorage.clear();
  //   window.location.reload(); // Refresh the page to reset the state
  // };

  return (
  <>
    <Container className="my-4">
      <Stack direction="horizontal" gap={2} className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary" onClick={() => setShowAddBudgetModal(true)} >Add Budget</Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
      </Stack>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start",
        }}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            return(
              <BudgetCard 
              key={budget.id} 
              name={budget.name}
              max={budget.max} 
              amount={amount}
              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              onViewExpenseClick={() => setViewExpensesModalBudgetId(budget.id)}>
              </BudgetCard>
            )
          })}
          <UncategorizedBudgetCard 
          onAddExpenseClick={openAddExpenseModal}
          onViewExpenseClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}>
          </UncategorizedBudgetCard>
          <TotalBudgetCard></TotalBudgetCard>
      </div>
    </Container>
    <AddBudgetModal 
    show={showAddBudgetModal} 
    handleClose={() => {setShowAddBudgetModal(false)}}
    />
    <AddExpenseModal 
    show={showAddExpenseModal}
    defaultBudgetId={addExpenseModalById} 
    handleClose={() => {setShowAddExpenseModal(false)}}
    />
    <ViewExpensesModal
    budgetId={viewExpensesModalBudgetId}
    handleClose={() => setViewExpensesModalBudgetId()} />
  </>
  )
}

export default App;
