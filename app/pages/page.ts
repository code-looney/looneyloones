"use client";

import React, { useState, useEffect } from "react";

// Importing individual character components for "SUBMIT"
import s from "@characters/s";
import u from "@characters/u";
import b from "@characters/b";
import m from "@characters/m";
import i from "@characters/i";
import t from "@characters/t";

// Importing utilities for even/odd check and values
import { isEven } from "is-even-ai"; // Function to check if the number is even
import { falseValue } from "false"; // False value for odd numbers
import { trueValue } from "true"; // True value for even numbers

const HomePage: React.FC = () => {
  const [currentNumber, setCurrentNumber] = useState<number | null>(null); // Track the random number
  const [numberResult, setNumberResult] = useState<boolean | null>(null); // Track the result (True/False based on even/odd)
  const [statusMessage, setStatusMessage] = useState<string>(""); // Feedback message for user
  const [resultHistory, setResultHistory] = useState<
    { number: number; result: string; description: string }[]
  >([]); // Log of previous results

  // Compact object in row format
  const resultMap = {
    even: { value: trueValue, label: "Even", description: "Divisible by 2", style: { color: "green", fontWeight: "bold" } },
    odd: { value: falseValue, label: "Odd", description: "Not divisible by 2", style: { color: "red", fontWeight: "bold" } },
  };

  useEffect(() => {
    if (currentNumber !== null) {
      const isEvenNumber = isEven(currentNumber);
      const resultKey = isEvenNumber ? "even" : "odd";
      const resultData = resultMap[resultKey];

      setNumberResult(resultData.value); // Capture the result (True/False)
      setStatusMessage(resultData.description); // Set a status message based on the result

      // Log the result in the history
      setResultHistory((prevHistory) => [
        ...prevHistory,
        { number: currentNumber, result: resultData.label, description: resultData.description },
      ]);
    }
  }, [currentNumber]); // Effect triggers whenever currentNumber changes

  const handleButtonClick = () => {
    const randomNumber = Math.floor(Math.random() * 100); // Generate a random number between 0 and 99
    setCurrentNumber(randomNumber); // Update the state to trigger the useEffect
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f3f4f6", padding: "2rem" }}>
      <div style={{ backgroundColor: "white", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px", width: "100%", maxWidth: "500px", padding: "1.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "600", marginBottom: "1rem" }}>
          <button style={{ backgroundColor: "#3b82f6", color: "white", padding: "0.75rem 1.5rem", borderRadius: "8px", border: "none", fontSize: "1rem", cursor: "pointer" }}>
            {s} {u} {b} {m} {i} {t}
          </button>
        </h1>

        <div style={{ fontSize: "1.5rem", fontWeight: "700", margin: "1rem 0" }}>
          {currentNumber !== null ? `Number: ${currentNumber}` : "Click to generate a number"}
        </div>

        <div style={numberResult !== null ? resultMap[numberResult ? "even" : "odd"].style : {}}>
          {statusMessage}
        </div>

        <button onClick={handleButtonClick} style={{ marginTop: "1rem", padding: "0.75rem 1.5rem", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1rem" }}>
          {s} {u} {b} {m} {i} {t}
        </button>

        <div style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>History</h2>
          <div>
            {resultHistory.map((entry, index) => (
              <div key={index} style={{ padding: "0.5rem", backgroundColor: "#f3f4f6", borderRadius: "8px", marginBottom: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1rem" }}>
                  <span>Number: {entry.number}</span>
                  <span style={resultMap[entry.result.toLowerCase() as "even" | "odd"].style}>{entry.result}</span>
                </div>
                <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>{entry.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
