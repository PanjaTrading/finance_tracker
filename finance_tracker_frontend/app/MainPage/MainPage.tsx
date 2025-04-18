"use client";
import { useState } from "react";
import styles from "./MainPage.module.css";


interface TaxBreakdown {
  tax?: number;
  salary_after_tax?: number;
  message?: string;
}

interface TaxResult {
  base_salary: number;
  old_regime: TaxBreakdown;
  new_regime: TaxBreakdown;
}

const MainPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [baseSalary, setBaseSalary] = useState("");
  const [totalDeduction, setTotalDeduction] = useState("");
  const [taxResult, setTaxResult] = useState<TaxResult | null>(null);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      base_salary: parseFloat(baseSalary),
      total_deductions: totalDeduction ? parseFloat(totalDeduction) : 0,
    };

    try {
      // Making an API request
      const response = await fetch("http://127.0.0.1:8000/calculate_tax", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const result: TaxResult = await response.json();
      setTaxResult(result);
    } catch (error) {
      console.error("Error fetching tax data:", error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.textContainer}>
        <h1 className={styles.heading}>Hi, I am your Finance Advisor</h1>
      </div>

      <div className={styles.buttonContainer}>
        {!showForm ? (
          <button className={styles.signUpButton} onClick={() => setShowForm(true)}>
            Let's Begin
          </button>
        ) : (
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <label>
              Base Salary:
              <input
                type="number"
                value={baseSalary}
                onChange={(e) => setBaseSalary(e.target.value)}
                required
              />
            </label>
            <label>
              Total Deductions:
              <input
                type="number"
                value={totalDeduction}
                onChange={(e) => setTotalDeduction(e.target.value)}
              />
            </label>
            <button type="submit" className={styles.submitButton}>
              Calculate Tax
            </button>
          </form>
        )}
      </div>

      {taxResult && (
        <div className={styles.resultContainer}>
          <h2>Tax Calculation Result</h2>

          <div>
            <h3>Old Regime:</h3>
            {taxResult.old_regime.message ? (
              <p>{taxResult.old_regime.message}</p>
            ) : (
              <>
                <p>Total Tax: ₹{taxResult.old_regime.tax}</p>
                <p>Salary After Tax: ₹{taxResult.old_regime.salary_after_tax}</p>
              </>
            )}
          </div>

          <div>
            <h3>New Regime:</h3>
            {taxResult.new_regime.message ? (
              <p>{taxResult.new_regime.message}</p>
            ) : (
              <>
                <p>Total Tax: ₹{taxResult.new_regime.tax}</p>
                <p>Salary After Tax: ₹{taxResult.new_regime.salary_after_tax}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
