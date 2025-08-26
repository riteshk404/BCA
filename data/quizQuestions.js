// data/quizQuestions.js

const quizQuestions = [
  // --- General Knowledge ---
  {
    id: 1,
    type: "gk",
    question: "What is the capital of Nepal?",
    options: ["Pokhara", "Kathmandu", "Lalitpur", "Bhaktapur"],
    answer: "Kathmandu",
  },
  {
    id: 2,
    type: "gk",
    question: "Who is known as the 'Light of Asia'?",
    options: ["Mahatma Gandhi", "Lord Buddha", "Jawaharlal Nehru", "Nelson Mandela"],
    answer: "Lord Buddha",
  },
  {
    id: 3,
    type: "gk",
    question: "Mount Everest lies in which district of Nepal?",
    options: ["Solukhumbu", "Dolakha", "Taplejung", "Mustang"],
    answer: "Solukhumbu",
  },

  // --- English ---
  {
    id: 4,
    type: "english",
    question: "Choose the correct spelling:",
    options: ["Recieve", "Receive", "Receeve", "Receve"],
    answer: "Receive",
  },
  {
    id: 5,
    type: "english",
    question: "Fill in the blank: She _____ to school every day.",
    options: ["go", "goes", "going", "gone"],
    answer: "goes",
  },
  {
    id: 6,
    type: "english",
    question: "Which of the following is a synonym of 'Happy'?",
    options: ["Sad", "Joyful", "Angry", "Upset"],
    answer: "Joyful",
  },

  // --- Math ---
  {
    id: 7,
    type: "math",
    question: "2 + 2 = ?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    id: 8,
    type: "math",
    question: "What is 12 × 8?",
    options: ["88", "96", "108", "84"],
    answer: "96",
  },
  {
    id: 9,
    type: "math",
    question: "The square root of 144 is:",
    options: ["10", "11", "12", "13"],
    answer: "12",
  },

  // --- Science ---
  {
    id: 10,
    type: "gk", // science could be separate later
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    id: 11,
    type: "gk",
    question: "What gas do humans need to survive?",
    options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    answer: "Oxygen",
  },
  {
    id: 12,
    type: "gk",
    question: "Water boils at what temperature (at sea level)?",
    options: ["50°C", "75°C", "100°C", "150°C"],
    answer: "100°C",
  },
];

export default quizQuestions;
