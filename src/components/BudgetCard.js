import {Button, Card, ProgressBar, Stack} from "react-bootstrap";
import { currencyFormater } from "../utils";

export const BudgetCard = ({name, amount, max, gray, onAddExpenseClick, hiddeButtons, onViewExpenseClick}) => {
    console.log("onAddExpenseClick prop:", onAddExpenseClick); // Add this line

    const classNames = []
    if(amount > max){
        classNames.push("bg-danger",  "bg-opacity-10")
    } else if(gray){
        classNames.push("bg-light")
    }
  return (
    <Card className={classNames.join(" ")}>
        <Card.Body>
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-3 fw-normal">
                <div className="me-2">{name}</div>
                <div className="d-flex align-items-baseline">{currencyFormater.format(amount)} 
                {max && (<span className="text-muted ms-1 fs-6">
                / {currencyFormater.format(max)}
                </span>
                )}
                </div>
            </Card.Title>
            {max && (<ProgressBar
            className="rounded-pill"
            variant={getProgressBarvariant(amount, max)}
            min={0}
            max={max}
            now={amount}/>)}
            {!hiddeButtons && (<Stack direction="horizontal" gap={2} className="mt-4">
                <Button variant="outline-primary" className="ms-auto" 
                onClick={onAddExpenseClick}>
                    Add Expense
                </Button>
                <Button 
                onClick={onViewExpenseClick}
                variant="outline-secondary" >View Expense</Button>
            </Stack>)}
        </Card.Body>
    </Card>
    )
}

function getProgressBarvariant(amount, max){
    const ratio = amount / max
    if (ratio < 0.5) return "primary"
    if (ratio < 0.75) return "warning"
    return "danger"
}
