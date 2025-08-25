"use client";

import Link from "next/link";

const entranceQuestions = [
  { title: "Entrance Model Set 1", file: "model1" },
  { title: "Entrance Model Set 2", file: "model2" },
  { title: "Entrance Model Set 3", file: "model3" },
  { title: "Entrance Model Set 4", file: "model4" },
];


export default function EntranceQuestionsPage() {
  return (
    <div className="max-w-6xl mx-auto pt-24  ">
      <h1 className="text-3xl font-bold text-blue-900 text-center">
        Entrance Model Questions
      </h1>
      <p className="text-gray-600 text-center mt-2">
        Click a set to preview the PDF
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {entranceQuestions.map((q, idx) => (
          <Link
            key={idx}
            href={`/entrance-questions/${q.file}`}
            className="border rounded-lg shadow hover:shadow-md p-6 text-left transition transform hover:-translate-y-1 hover:bg-blue-50 cursor-pointer"
          >
            <h3 className="text-lg font-medium text-blue-800">{q.title}</h3>
            <p className="text-sm text-gray-600 mt-2">Click to view PDF</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
