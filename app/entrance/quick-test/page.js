"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import quiz from "@/data/quiz";

export default function EntranceQuestionsPage() {
  const [start, setStart] = useState(false);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 min default
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Timer
  useEffect(() => {
    if (start && !submitted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0 && !submitted) handleSubmit();
  }, [timeLeft, start, submitted]);

  // Fullscreen detection
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fs =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
      setIsFullscreen(!!fs);

      if (start && !submitted && !fs) handleSubmit();
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener(
      "webkitfullscreenchange",
      handleFullscreenChange
    );
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, [start, submitted]);

  const handleAnswer = (id, option) => {
    setAnswers((prev) => ({ ...prev, [id]: option }));
  };

  const handleSubmit = () => {
    let sc = 0;
    quiz.forEach((q) => {
      if (answers[q.id] === q.answer) sc++;
    });
    setScore(sc);
    setSubmitted(true);
    document.exitFullscreen?.();
  };

  const openFullscreen = () => {
    const elem = document.getElementById("fullscreen-wrapper");
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
  };

  const getMessage = () => {
    if (score <= quiz.length * 0.3) return "Low performance, keep practicing!";
    if (score <= quiz.length * 0.6) return "Average performance, you can do better!";
    if (score <= quiz.length * 0.85) return "Better performance, good job!";
    return "Best performance, excellent work!";
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <div
      id="fullscreen-wrapper"
      className="flex justify-center items-start min-h-screen bg-gray-50 p-8 pt-[2px]"
    >
      {/* BCA link/logo only in fullscreen */}
      {isFullscreen && (
        <Link href="/">
          <div className="flex flex-col items-center absolute top-4 left-4 cursor-pointer">
            <Image
              src="/images/association.png"
              alt="BCA Association Logo"
              width={80}
              height={80}
            />
            <span className="mx-3 text-xl font-bold text-blue-800 hidden md:block">
              BCA Association MMC
            </span>
          </div>
        </Link>
      )}

      <div
        id="quiz-container"
        className="border-2 border-gray-500 rounded-lg bg-white w-[65vw] max-w-[90%] h-[100vh] flex flex-col relative"
      >
        {!start && !submitted && (
          <div className="text-center m-auto space-y-4 p-6">
            <h1 className="text-2xl font-bold">Let’s take a quick test</h1>
            <p className="text-gray-600">
              You will get multiple-choice questions. Best of luck 🍀
            </p>
            <button
              onClick={() => {
                setStart(true);
                openFullscreen();
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Start Test
            </button>
          </div>
        )}

        {start && !submitted && (
          <>
            {/* Timer + progress */}
            <div className="flex justify-between items-center p-4 border border-blue-600">
              <p className="font-semibold text-red-600">
                ⏰ Time Left: {formatTime(timeLeft)}
              </p>
              <p className="text-gray-600">
                Answered {Object.keys(answers).length} / {quiz.length}
              </p>
            </div>

            {/* Questions scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {quiz.map((q) => (
                <div key={q.id} className="border-b pb-4">
                  <h2 className="text-lg font-semibold mb-2">
                    {q.id}. {q.question}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(q.id, opt)}
                        className={`px-4 py-2 border rounded-lg text-left ${
                          answers[q.id] === opt
                            ? "bg-blue-200 border-blue-500"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit button pinned at bottom */}
            <div className="p-2 flex justify-center absolute bottom-[21rem] right-[-14rem]  ">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 w-36 h-12 text-md font-bold bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Submit Test
              </button>
            </div>
          </>
        )}

        {/* Modal after submit */}
        {submitted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-96 space-y-4">
              <h2 className="text-xl font-bold text-green-600">🎉 Congratulations!</h2>
              
              <p>
                You scored <span className="font-bold">{score}</span> out of {quiz.length}
              </p>
              <p className="italic">{getMessage()}</p>
              <p className="font-medium">
                BCA Association wishes you best of luck 🍀
              </p>

              <div className="flex flex-col space-y-2 mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Retry
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-yellow-500 text-white rounded-lg"
                >
                  Retest
                </button>
                <button
                  onClick={() =>
                    (window.location.href = "/entrance/model-question")
                  }
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg"
                >
                  View Model Question
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
