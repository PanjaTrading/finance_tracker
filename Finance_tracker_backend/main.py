from fastapi import FastAPI, HTTPException
from tax_logic.tax_logic import SalaryInput 
from fastapi.middleware.cors import CORSMiddleware 

app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, replace with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

def format_tax_result(base_salary, tax):
    if isinstance(tax, (int,float)):
        return {
            "tax": tax,
            "salary_after_tax": base_salary - tax
        }
    return {
        "message": tax
    }
    
@app.get("/")
def read_root():
    return {"message": "Welcome to the Finance Tracker API!"}

@app.post("/calculate_tax")
def calculate_tax(data: SalaryInput):
    try:
        base_salary = float(data.base_salary)
        total_deductions = float(data.total_deductions) if data.total_deductions else 0
        # Ensure base_salary and total_deductions are valid numbers
        if base_salary < 0 or total_deductions < 0:
            raise HTTPException(status_code=400, detail="Invalid salary or deduction values")

        # Calculate tax using the correct methods
        tax_old = data.calculate_tax_old_regime()
        tax_new = data.calculate_tax_new_regime()
        p = format_tax_result(base_salary, tax_new)
        print(p)
        return {
            "base_salary": base_salary,
            "old_regime": format_tax_result(base_salary, tax_old),
            "new_regime": format_tax_result(base_salary, tax_new)
        }

    except Exception as e:
        print("Error:", str(e))  # Debugging logs
