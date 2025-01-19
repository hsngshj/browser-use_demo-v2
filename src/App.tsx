import React, { useState } from 'react';
import { Send, Loader2, ChevronDown, ChevronRight } from 'lucide-react';

interface ExecutionLog {
  timestamp: string;
  step: string;
  details: Record<string, any>;
}

function App() {
  const [task, setTask] = useState('');
  const [model, setModel] = useState('gpt-4o-mini');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [isLogsVisible, setIsLogsVisible] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLogs([]);
    setResult(null);
    
    try {
      const response = await fetch('http://localhost:5000/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task, model }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.text();
      const parsedData = JSON.parse(data);
      const extractedContent = parsedData.history[parsedData.history.length - 1].result[0].extracted_content;
      setResult(extractedContent);
      setLogs([parsedData]);
    } catch (error) {
      console.error('Error executing task:', error);
      setResult('エラーが発生しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browser-use demo</h1>
        </header>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            タスク実行システム
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="task" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                実行したいタスクを入力してください
              </label>
              <div className="relative">
                <input
                  id="task"
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="例: 東京都の居酒屋を教えて"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  disabled={isLoading}
                />
            </div>

            <div>
              <label 
                htmlFor="model" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                モデルを選択してください
              </label>
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                disabled={isLoading}
              >
                <option value="gpt-4o-mini">gpt-4o-mini</option>
                <option value="gpt-4o">gpt-4o</option>
                <option value="gpt-3.5">gpt-3.5</option>
              </select>
            </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !task.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  処理中...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  実行する
                </>
              )}
            </button>
          </form>

          {result && !isLoading && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                実行結果
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-line">
                <pre>{result}</pre>
              </div>
            </div>
          )}

          {(logs.length > 0 || isLoading) && (
            <div className="mt-8">
              <button
                onClick={() => setIsLogsVisible(!isLogsVisible)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 hover:text-gray-900"
              >
                {isLogsVisible ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                実行ログ
              </button>
              {isLogsVisible && (
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-200 overflow-x-auto">
                  {logs.length > 0 && (
                    <div className="mb-2">
                      <pre className="text-gray-300 mt-1">
                        {JSON.stringify(logs[0], null, 2)}
                      </pre>
                    </div>
                  )}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      処理中...
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
