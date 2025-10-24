import React from "react";

const SavedSolutions: React.FC = () => {
  const solutions = [
    { title: "Land Dispute Resolution Act", category: "Property Law" },
    { title: "FIR Filing Process", category: "Criminal Law" },
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/3 animate-fade-in-slow">
      <h3 className="text-lg font-semibold text-dark-text mb-4">Saved Solutions</h3>
      <div className="space-y-3">
        {solutions.map((sol, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-light-bg p-3 rounded-xl hover:bg-primary-light transition"
          >
            <div>
              <p className="font-medium text-dark-text">{sol.title}</p>
              <p className="text-sm text-gray-500">{sol.category}</p>
            </div>
            <span className="text-primary text-2xl">›</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedSolutions;
