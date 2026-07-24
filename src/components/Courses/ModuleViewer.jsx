import React, { useState } from "react";

export default function ModuleViewer({ modules, setModules }) {
  const [expandedModule, setExpandedModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);

  const toggleModule = (index) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  const toggleComplete = (index, e) => {
    e.stopPropagation();
    if (completedModules.includes(index)) {
      setCompletedModules(completedModules.filter(i => i !== index));
    } else {
      setCompletedModules([...completedModules, index]);
    }
  };

  if (!modules || modules.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No modules available for this course.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {modules.map((module, index) => (
        <div 
          key={module.id || index} 
          className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-[#F2A93B]/30 transition-colors"
        >
          {/* Module Header */}
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleModule(index)}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                completedModules.includes(index) 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {completedModules.includes(index) ? '✓' : index + 1}
              </div>
              <div>
                <h3 className="font-semibold text-[#0B2545] text-sm">
                  {module.title || `Module ${index + 1}`}
                </h3>
                {module.description && (
                  <p className="text-xs text-gray-500 truncate max-w-md">{module.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => toggleComplete(index, e)}
                className={`text-xs font-bold px-3 py-1 rounded-full transition ${
                  completedModules.includes(index)
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {completedModules.includes(index) ? 'Completed ✓' : 'Mark Complete'}
              </button>
              <span className="text-gray-400 text-sm">
                {expandedModule === index ? '▲' : '▼'}
              </span>
            </div>
          </div>

          {/* Module Content */}
          {expandedModule === index && (
            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
              {module.content ? (
                <div className="prose prose-sm max-w-none text-gray-600">
                  <p>{module.content}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No content available for this module.</p>
              )}
              
              {module.resources && module.resources.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Resources</h4>
                  <ul className="space-y-1">
                    {module.resources.map((resource, i) => (
                      <li key={i}>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#F2A93B] hover:underline">
                          {resource.title || `Resource ${i + 1}`}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Progress Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Progress: <span className="font-semibold text-[#0B2545]">{completedModules.length}</span> of{' '}
            <span className="font-semibold text-[#0B2545]">{modules.length}</span> modules completed
          </span>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#F2A93B] rounded-full transition-all duration-500"
              style={{ width: `${(completedModules.length / modules.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}