export interface SubTopic {
  title: string;
  duration: string;
}

export interface Day {
  day: number;
  title: string;
  module: string;
  status: "completed" | "current" | "locked";
  xp: number;
  topics: SubTopic[];
  description: string;
}

export const roadmapData: Day[] = [
  // Module 1: Python Basics
  {
    day: 1,
    title: "The Python Genesis",
    module: "Python Basics",
    status: "completed",
    xp: 200,
    description: "What is Python, why it's the king of simplicity, and printing your first words.",
    topics: [
      { title: "Introduction to Python", duration: "5m" },
      { title: "The print() function", duration: "10m" },
      { title: "Syntax & Indentation", duration: "10m" }
    ]
  },
  {
    day: 2,
    title: "Storage Units (Variables)",
    module: "Python Basics",
    status: "completed",
    xp: 250,
    description: "How Python remembers data, dynamic typing, and naming conventions.",
    topics: [
      { title: "Variables & Assignment", duration: "10m" },
      { title: "Naming Rules (Snake Case)", duration: "5m" },
      { title: "Input from User", duration: "15m" }
    ]
  },
  {
    day: 3,
    title: "The Data Zoo",
    module: "Python Basics",
    status: "completed",
    xp: 300,
    description: "Strings, Integers, Floats, and Booleans – the DNA of your programs.",
    topics: [
      { title: "Primitive Data Types", duration: "15m" },
      { title: "Type Conversion (Casting)", duration: "10m" },
      { title: "Basic Operators (+, -, *, /)", duration: "15m" }
    ]
  },
  {
    day: 4,
    title: "Mastering Strings",
    module: "Python Basics",
    status: "completed",
    xp: 250,
    description: "Indexing, slicing, and common string methods for text manipulation.",
    topics: [
      { title: "Zero-based Indexing", duration: "10m" },
      { title: "String Slicing [start:stop]", duration: "15m" },
      { title: "Methods: upper(), split(), strip()", duration: "15m" }
    ]
  },
  {
    day: 5,
    title: "Making Choices (If-Else)",
    module: "Python Basics",
    status: "current",
    xp: 400,
    description: "Control flow using conditions and logical operators (and, or, not).",
    topics: [
      { title: "The if/elif/else block", duration: "20m" },
      { title: "Comparison Operators (==, !=)", duration: "10m" },
      { title: "Logical Operators", duration: "15m" }
    ]
  },
  {
    day: 6,
    title: "The Infinite Loop (Loops)",
    module: "Python Basics",
    status: "locked",
    xp: 350,
    description: "Repeating tasks with While loops and iterating sequences with For loops.",
    topics: [
      { title: "The While Loop", duration: "20m" },
      { title: "The For Loop with range()", duration: "20m" },
      { title: "Break & Continue", duration: "10m" }
    ]
  },
  {
    day: 7,
    title: "List Mastery",
    module: "Python Basics",
    status: "locked",
    xp: 450,
    description: "The most important data structure – storing collections of information.",
    topics: [
      { title: "Creating & Modifying Lists", duration: "20m" },
      { title: "List Methods (append, pop, insert)", duration: "15m" },
      { title: "Nested Lists", duration: "10m" }
    ]
  },
  {
    day: 8,
    title: "Tuples & Sets",
    module: "Python Basics",
    status: "locked",
    xp: 300,
    description: "Immutable data and unique collections for optimized performance.",
    topics: [
      { title: "Immutability with Tuples", duration: "15m" },
      { title: "Unique Items in Sets", duration: "10m" },
      { title: "Set Operations (Union, Intersection)", duration: "15m" }
    ]
  },
  {
    day: 9,
    title: "The Dictionary (Maps)",
    module: "Python Basics",
    status: "locked",
    xp: 400,
    description: "Key-value pair storage. The powerhouse of real-world data handling.",
    topics: [
      { title: "Key-Value Logic", duration: "15m" },
      { title: "Dictionary Methods", duration: "15m" },
      { title: "Iterating through Keys/Values", duration: "15m" }
    ]
  },
  {
    day: 10,
    title: "Function Factory",
    module: "Python Basics",
    status: "locked",
    xp: 500,
    description: "Writing reusable code blocks with parameters and return values.",
    topics: [
      { title: "def keyword & scope", duration: "20m" },
      { title: "Arguments (args, kwargs)", duration: "15m" },
      { title: "Return Statement", duration: "10m" }
    ]
  },
  {
    day: 11,
    title: "Project: CLI Calculator",
    module: "Python Basics",
    status: "locked",
    xp: 1000,
    description: "Build your first real application combining variables, inputs, and functions.",
    topics: [
      { title: "Project Brief", duration: "5m" },
      { title: "Building logic", duration: "45m" },
      { title: "Error Handling intro", duration: "10m" }
    ]
  },
  // Module 2: Intermediate Python
  {
    day: 15,
    title: "List Comprehension",
    module: "Intermediate Python",
    status: "locked",
    xp: 400,
    description: "Write powerful one-liners to process lists elegantly.",
    topics: [
      { title: "Comprehension Syntax", duration: "15m" },
      { title: "Conditional Filters", duration: "10m" },
      { title: "Dict & Set Comprehension", duration: "15m" }
    ]
  },
  {
    day: 18,
    title: "Object Oriented Python",
    module: "Intermediate Python",
    status: "locked",
    xp: 600,
    description: "Classes, Objects, and the magic of self. Bringing structure to chaos.",
    topics: [
      { title: "Class Definition", duration: "20m" },
      { title: "Methods & Attributes", duration: "20m" },
      { title: "Inheritance Basics", duration: "20m" }
    ]
  },
  // Module 3: NumPy
  {
    day: 22,
    title: "NumPy Fundamentals",
    module: "NumPy",
    status: "locked",
    xp: 500,
    description: "The multi-dimensional array powerhouse. Faster than standard lists.",
    topics: [
      { title: "ND-Arrays", duration: "20m" },
      { title: "Broadcasting", duration: "15m" },
      { title: "Math Ops", duration: "15m" }
    ]
  },
  // Module 4: Pandas
  {
    day: 26,
    title: "Pandas DataFrames",
    module: "Pandas",
    status: "locked",
    xp: 600,
    description: "Working with rows and columns like a pro. The heart of Data Analysis.",
    topics: [
      { title: "Series vs DataFrame", duration: "15m" },
      { title: "Loading CSVs", duration: "10m" },
      { title: "Filtering Data", duration: "20m" }
    ]
  },
  {
    day: 30,
    title: "Final Project: Sports Analyst",
    module: "Pandas",
    status: "locked",
    xp: 2000,
    description: "Analyze real sports data using everything you've learned in 30 days.",
    topics: [
      { title: "Data Cleaning", duration: "30m" },
      { title: "Visualization", duration: "30m" },
      { title: "Final Submission", duration: "20m" }
    ]
  }
];
