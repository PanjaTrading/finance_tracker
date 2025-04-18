from typing import Union
from pydantic import BaseModel

class SalaryInput(BaseModel):
    
    base_salary : float
    total_deductions : float
        
    def calculate_tax_old_regime(self):
        
        taxable_income = max(0, self.base_salary - self.total_deductions)
        tax = 0
        if taxable_income <= 250000:
            return "No Tax is applicable under old tax regime"
        
        elif  250000 < taxable_income < 500000:
            tax += (taxable_income - 250000) * 0.05

        elif taxable_income == 500000:
            tax += 12500
            
        elif 500000 < taxable_income < 1000000:
            tax += (taxable_income - 1000000) * 0.20 + 12500

        elif taxable_income == 1000000:
            tax += 112500
        
        elif taxable_income > 1000000:
            tax += (1000000 - taxable_income) * 0.20 + 100000
            
        return tax


    def calculate_tax_new_regime(self):
        taxable_income = self.base_salary 
        tax = 0
        
        if taxable_income <= 400000:
            return "No Tax is applicable under new tax regime"

        elif 400000 < taxable_income < 800000:
            tax += (taxable_income - 400000) * 0.05
        
        elif taxable_income == 800000:
            tax += 20000

        elif 800000 < taxable_income < 1200000:
            tax += (taxable_income - 800000) * 0.10 + 20000
        
        elif taxable_income == 1200000:
            tax += 60000
        
        elif 1200000 < taxable_income < 1600000:
            tax += (taxable_income - 1200000) * 0.15 + 60000   
        
        elif taxable_income == 1600000:
            tax +=  120000
            
        elif 1600000 < taxable_income < 2000000:
            tax += (taxable_income - 1600000) * 0.20 + 120000   
        
        elif taxable_income == 2000000:
            tax +=  200000
            
        elif 2000000 < taxable_income < 2400000:
            tax += (taxable_income - 2000000) * 0.25 + 200000   
        
        elif taxable_income == 2400000:
            tax +=  300000
        
        elif 2400000 < taxable_income:
            tax += (taxable_income - 2400000) * 0.30 + 300000  
            
        return tax