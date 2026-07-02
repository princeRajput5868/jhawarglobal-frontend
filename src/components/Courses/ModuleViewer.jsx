import React, { useMemo, useState } from "react";

function safeString(v) {
  if (v === null || v === undefined) return "";
  return String(v);
}

function QuizRenderer({ quiz, onCompleteQuiz }) {
  // Basic generic quiz support. If quiz schema differs, it degrades gracefully.
  // Supported shapes:
  // 1) { questions: [{ question, options: [], correctIndex }] }
  // 2) { questions: [{ q, choices: [] }] }
  // 3) Any other: show placeholder.

  const questions = useMemo(() => {
    if (!quiz) return [];

    if (Array.isArray(quiz.questions)) return quiz.questions;
    // common alternative key
    if (Array.isArray(quiz.items)) return quiz.items;

    return [];
  }, [quiz]);

  const normalized = useMemo(() => {
    return questions.map((q) => {
      const text = q.question ?? q.q ?? q.text ?? "";
      const options = q.options ?? q.choices ?? q.answers ?? [];
      const correctIndex =
        q.correctIndex ?? q.correct ?? q.answerIndex ?? (typeof q.correctChoice === "number" ? q.correctChoice : undefined);

      return { text: safeString(text), options: Array.isArray(options) ? options : [], correctIndex };
    });
  }, [questions]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState({}); // idx -> optionIndex
  const [checked, setChecked] = useState(false);

  if (!quiz) return null;
  if (!normalized.length) {
    return (
      <div className="mt-4 rounded-lg bg-gray-50 border border-gray-100 p-4">
        <div className="font-extrabold text-gray-900 text-sm">Quiz</div>
        <div className="text-gray-600 text-sm mt-1">Quiz format is not supported in this demo.</div>
      </div>
    );
  }

  const current = normalized[activeIndex];
  const currentSelected = selected[activeIndex];

  const isAnswered = typeof currentSelected === "number";

  const check = () => {
    setChecked(true);
    onCompleteQuiz?.();
  };

  return (
    <div className="mt-5 rounded-lg border border-gray-100 bg-white overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-extrabold text-gray-900 text-sm">Quiz</div>
            <div className="text-xs text-gray-500 mt-1">Question {activeIndex + 1} of {normalized.length}</div>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveIndex((i) => (i - 1 + normalized.length) % normalized.length);
              setChecked(false);
            }}
            className="text-xs font-bold text-red-700 hover:underline"
            disabled={normalized.length <= 1}
          >
            Prev
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="font-bold text-gray-900 text-base">{current.text}</div>

        <div className="mt-4 grid gap-2">
          {current.options.map((opt, optIndex) => {
            const isSelected = selected[activeIndex] === optIndex;
            return (
              <label
                key={optIndex}
                className={`cursor-pointer rounded-md border px-4 py-2 text-sm transition-colors ${
                  isSelected ? "border-red-200 bg-red-50" : "border-gray-200 hover:border-red-300"
                }`}
              >
                <input
                  type="radio"
                  name={`quiz-${activeIndex}`}
                  className="mr-2"
                  checked={isSelected}
                  onChange={() => {
                    setSelected((s) => ({ ...s, [activeIndex]: optIndex }));
                    setChecked(false);
                  }}
                />
                {opt}
              </label>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-3 items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setActiveIndex((i) => (i + 1) % normalized.length);
              setChecked(false);
            }}
            className="text-xs font-bold text-red-700 hover:underline"
            disabled={normalized.length <= 1}
          >
            Next
          </button>

          <button
            type="button"
            onClick={check}
            disabled={!isAnswered || checked}
            className={`inline-flex items-center justify-center px-4 py-2 rounded-md font-bold text-sm transition-colors ${
              !isAnswered || checked
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-[#C62828] hover:bg-[#8E0000] text-white"
            }`}
          >
            {checked ? "Checked" : "Check Answer"}
          </button>
        </div>

        <div className="mt-3 text-xs text-gray-500">
          Note: This demo doesn’t enforce scoring (completion is based on course completion button).
        </div>
      </div>
    </div>
  );
}

export default function ModuleViewer({ modules, fullName, setFullName }) {
  const [selectedId, setSelectedId] = useState(null);
  const selectedModule = useMemo(() => {
    if (!Array.isArray(modules) || modules.length === 0) return null;
    const byId = modules.find((m) => String(m.id) === String(selectedId));
    return byId || modules[0];
  }, [modules, selectedId]);

  const [quizCompletedCount, setQuizCompletedCount] = useState(0);

  const orderedModules = useMemo(() => {
    return Array.isArray(modules)
      ? [...modules].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
      : [];
  }, [modules]);

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-extrabold text-gray-900">Syllabus & Learning</h2>
            <div className="text-xs text-gray-500">{orderedModules.length} modules</div>
          </div>

          <div className="mt-5 grid md:grid-cols-5 gap-6">
            <div className="md:col-span-2">
              <div className="space-y-3 max-h-[520px] overflow-auto pr-1">
                {orderedModules.length === 0 ? (
                  <div className="text-gray-600">No modules found.</div>
                ) : (
                  orderedModules.map((m) => {
                    const active = String(m.id) === String(selectedModule?.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedId(m.id)}
                        className={`w-full text-left border rounded-lg px-4 py-3 transition-colors ${
                          active ? "border-red-200 bg-red-50" : "border-gray-200 hover:border-red-300"
                        }`}
                      >
                        <div className="text-xs font-bold text-gray-500">Module {m.orderIndex}</div>
                        <div className="text-sm font-extrabold text-gray-900 mt-1 line-clamp-2">{m.title}</div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <div className="md:col-span-3">
              {!selectedModule ? (
                <div className="text-gray-600">Select a module</div>
              ) : (
                <>
                  <div className="rounded-lg border border-gray-100 overflow-hidden bg-white">
                    <div className="px-5 py-4 border-b border-gray-100">
                      <div className="text-xs font-bold text-gray-500">Module {selectedModule.orderIndex}</div>
                      <div className="text-lg font-extrabold text-gray-900">{selectedModule.title}</div>
                    </div>

                    <div className="p-5">
                      {selectedModule.content && (
                        <div className="prose prose-sm max-w-none text-gray-700">
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">{selectedModule.content}</div>
                        </div>
                      )}

                      {selectedModule.videoUrl && (
                        <div className="mt-4">
                          <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">Video</div>
                          <div className="mt-2">
                            <a
                              href={selectedModule.videoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-red-700 font-bold hover:underline break-all"
                            >
                              Open video link
                            </a>
                          </div>
                        </div>
                      )}

                      {selectedModule.quiz ? (
                        <QuizRenderer
                          quiz={selectedModule.quiz}
                          onCompleteQuiz={() => setQuizCompletedCount((c) => c + 1)}
                        />
                      ) : (
                        <div className="mt-5 text-xs text-gray-500">No quiz for this module.</div>
                      )}

                      <div className="mt-4 text-xs text-gray-500">
                        Quiz checks done: {quizCompletedCount}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">Your Details</h2>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-red-700"
          />

          <div className="mt-4 text-xs text-gray-500">
            Complete the course using the button on the right card.
          </div>
        </div>
      </div>
    </div>
  );
}

