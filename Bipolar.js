import React, { useState } from "react";

const BipolarTest = () => {
  const questions = [
    "You felt so good or hyper that other people thought you were not your normal self or were so hyper that you got into trouble?",
    "You were so irritable that you shouted at people or started fights or arguments?",
    "You felt much more self-confident than usual?",
    "You got much less sleep than usual and found you didn’t really miss it?",
    "You were much more talkative or spoke much faster than usual?",
    "Thoughts raced through your head or you couldn’t slow your mind down?",
    "You were so easily distracted by things around you that you had trouble concentrating or staying on track?",
  ];

  const additionalQuestions = [
    "If you checked YES to more than one of the above, have several of these ever happened during the same period of time?",
    "Have these problems ever caused serious issues like being unable to work, family/money/legal troubles, or arguments?",
    "Have any of your blood relatives had manic-depressive illness or bipolar disorder?",
  ];

  const [responses, setResponses] = useState(Array(questions.length + additionalQuestions.length).fill(""));

  const handleResponseChange = (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  const handleSubmit = async () => {
    console.log("Submitting responses:", responses);

    try {
      const response = await fetch("http://localhost:3000/api/bipolar-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Responses submitted successfully!");
      } else {
        alert("Submission failed: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting responses:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#B6FCD2",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Bipolar Test</h1>
      <p style={{ textAlign: "center", marginBottom: "40px" }}>
        Please answer the questions honestly based on your experiences. All fields are required.
      </p>
      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
        {questions.map((question, index) => (
          <div key={index} style={{ marginBottom: "30px" }}>
            <p>
              <strong>Q{index + 1}: </strong>
              {question}
            </p>
            <label>
              <input
                type="radio"
                name={`question-${index}`}
                value="YES"
                onChange={() => handleResponseChange(index, "YES")}
              />{" "}
              YES
            </label>
            <label style={{ marginLeft: "20px" }}>
              <input
                type="radio"
                name={`question-${index}`}
                value="NO"
                onChange={() => handleResponseChange(index, "NO")}
              />{" "}
              NO
            </label>
          </div>
        ))}
        {additionalQuestions.map((question, index) => (
          <div key={questions.length + index} style={{ marginBottom: "30px" }}>
            <p>
              <strong>Q{questions.length + index + 1}: </strong>
              {question}
            </p>
            <label>
              <input
                type="radio"
                name={`additional-${index}`}
                value="YES"
                onChange={() => handleResponseChange(questions.length + index, "YES")}
              />{" "}
              YES
            </label>
            <label style={{ marginLeft: "20px" }}>
              <input
                type="radio"
                name={`additional-${index}`}
                value="NO"
                onChange={() => handleResponseChange(questions.length + index, "NO")}
              />{" "}
              NO
            </label>
            {index === 1 && (
              <>
                <label style={{ marginLeft: "20px" }}>
                  <input
                    type="radio"
                    name={`additional-${index}`}
                    value="MODERATE PROBLEM"
                    onChange={() => handleResponseChange(questions.length + index, "MODERATE PROBLEM")}
                  />{" "}
                  MODERATE PROBLEM
                </label>
                <label style={{ marginLeft: "20px" }}>
                  <input
                    type="radio"
                    name={`additional-${index}`}
                    value="MINOR PROBLEM"
                    onChange={() => handleResponseChange(questions.length + index, "MINOR PROBLEM")}
                  />{" "}
                  MINOR PROBLEM
                </label>
              </>
            )}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default BipolarTest;
