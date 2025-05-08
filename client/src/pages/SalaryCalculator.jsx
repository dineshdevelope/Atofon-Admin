import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";

const SalaryCalculator = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    const fetchSingleEmployee = async () => {
      try {
        const response = await API.get(`/api/employee/${id}`);
        setEmployee(response.data.data || null);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch employee:", error);
        setError(
          error.response?.data?.message ||
            "Something went wrong while fetching employee data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSingleEmployee();
  }, [id]);

  const months = [
    { value: 1, name: "January" },
    { value: 2, name: "February" },
    { value: 3, name: "March" },
    { value: 4, name: "April" },
    { value: 5, name: "May" },
    { value: 6, name: "June" },
    { value: 7, name: "July" },
    { value: 8, name: "August" },
    { value: 9, name: "September" },
    { value: 10, name: "October" },
    { value: 11, name: "November" },
    { value: 12, name: "December" },
  ];

  const [form, setForm] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    holidays: "",
    leavesTaken: "",
  });

  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCalculating(true);

    try {
      const salary = Number(employee.salary);
      if (isNaN(salary)) {
        throw new Error("Invalid salary value.");
      }
      const month = Number(form.month);
      const year = Number(form.year);
      const holidays = Number(form.holidays);
      const leavesTaken = Number(form.leavesTaken);
      const leaveBalance = 1;

      if (salary <= 0) throw new Error("Salary must be greater than zero.");
      if (!month || month < 1 || month > 12) {
        throw new Error("Month must be between 1 and 12.");
      }
      if (!year || year < 1900) {
        throw new Error("Please enter a valid year (after 1900).");
      }
      if (holidays < 0) throw new Error("Holidays cannot be negative.");
      if (leavesTaken < 0) throw new Error("Leaves taken cannot be negative.");

      const totalDays = new Date(year, month, 0).getDate();
      const workingDays = totalDays - holidays;

      if (workingDays <= 0) {
        throw new Error("Working days must be greater than zero.");
      }

      const perDaySalary = salary / workingDays;
      let bonus = 0;
      let leaveDeduction = 0;
      let excessLeaves = 0;

      if (leavesTaken === 0) {
        bonus = perDaySalary;
      } else if (leavesTaken > 1) {
        excessLeaves = Math.max(0, leavesTaken - leaveBalance);
        leaveDeduction = excessLeaves * perDaySalary;
      }

      const finalSalary = salary - leaveDeduction + bonus;
      const monthYear = new Date(year, month - 1).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });

      setResult({
        month: monthYear,
        totalDays,
        workingDays,
        perDaySalary: perDaySalary.toFixed(2),
        bonus: bonus.toFixed(2),
        leaveDeduction: leaveDeduction.toFixed(2),
        finalSalary: finalSalary.toFixed(2),
      });
      setError(null);
      setShowResultModal(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCalculating(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-xl mx-auto p-6 text-center"
      >
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-xl mx-auto p-4 md:p-6"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl font-bold mb-6 text-center text-blue-600"
      >
        Salary Calculator
      </motion.h2>

      <motion.div variants={itemVariants}>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Employee Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{employee?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600">Base Salary</p>
              <p className="font-medium">
                ₹
                {employee?.salary
                  ? Number(employee.salary).toLocaleString("en-IN")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.form
        variants={containerVariants}
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 mb-6"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="month">
            Month
          </label>
          <select
            id="month"
            name="month"
            value={form.month}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.name}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="year">
            Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            placeholder="e.g., 2023"
            min="1900"
            value={form.year}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="holidays">
            Number of Holidays
          </label>
          <input
            type="number"
            id="holidays"
            name="holidays"
            placeholder="e.g., 2"
            min="0"
            value={form.holidays}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="leavesTaken">
            Leaves Taken
          </label>
          <input
            type="number"
            id="leavesTaken"
            name="leavesTaken"
            placeholder="e.g., 0 - if no leaves taken"
            min="0"
            value={form.leavesTaken}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          >
            {error}
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={isCalculating}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
              isCalculating
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isCalculating ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Calculating...
              </span>
            ) : (
              "Calculate Salary"
            )}
          </button>
        </motion.div>
      </motion.form>

      {/* Modal for all devices */}
      {showResultModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-600">
                  Salary Details for {result.month}
                </h3>
                <button
                  onClick={() => setShowResultModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Total Days:</span>
                  <span className="font-medium">{result.totalDays}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Working Days:</span>
                  <span className="font-medium">{result.workingDays}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Per Day Salary:</span>
                  <span className="font-medium">₹{result.perDaySalary}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Bonus:</span>
                  <span className="font-medium text-green-600">
                    ₹{result.bonus}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Leave Deduction:</span>
                  <span className="font-medium text-red-600">
                    ₹{result.leaveDeduction}
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-600 font-semibold">
                    Final Salary:
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    ₹{result.finalSalary}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowResultModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default SalaryCalculator;
