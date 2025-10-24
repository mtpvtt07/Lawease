import React from "react";

const ConsultationHistory: React.FC = () => {
  const consultations = [
    {
      name: "Adv. Priya Sharma",
      license: "JoM Fia M 8n 115 2015",
      status: "Completed",
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Adv. Anil Gupta",
      license: "JoM Fia M 8n 215 2012",
      status: "Scheduled",
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/3 animate-fade-in">
      <h3 className="text-lg font-semibold text-dark-text mb-4">
        Consultation History
      </h3>
      <div className="space-y-3">
        {consultations.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-light-bg p-3 rounded-xl hover:bg-primary-light transition"
          >
            <div>
              <p className="font-medium text-dark-text">{item.name}</p>
              <p className="text-sm text-gray-500">{item.license}</p>
            </div>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${item.color}`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultationHistory;
