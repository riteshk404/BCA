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
    <div className="max-w-6xl text-center mx-auto pt-24  ">
      <h1 className="text-4xl font-bold text-blue-800 ">
        Let's take a quick test 
      </h1>
      <p className="mt-2 text-lg md:text-xl text-gray-600">
        Click on <b>Start</b>
      </p>
    </div>
  );
}
