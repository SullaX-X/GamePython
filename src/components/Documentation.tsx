import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Terminal, Code, ChevronRight } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { docs } from '../data/docs';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Documentation() {
  const { isDocsOpen, toggleDocsMenu, currentDocTopic, openDocs, theme } = useGameStore();

  const activeDocId = currentDocTopic || docs[0].id;
  const activeDoc = docs.find(d => d.id === activeDocId) || docs[0];

  return (
    <AnimatePresence>
      {isDocsOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-black/80 backdrop-blur-sm p-4 md:p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl w-full max-w-6xl h-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
          >
            {/* Sidebar Navigation */}
            <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col max-h-[40vh] md:max-h-full">
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-blue-400" size={24} />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">База Данных</h2>
                </div>
                <button onClick={toggleDocsMenu} className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors md:hidden">
                  <X size={24} />
                </button>
              </div>
              
              <div className="overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {docs.map(doc => {
                  const isActive = doc.id === activeDocId;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => openDocs(doc.id)}
                      className={twMerge(
                        clsx(
                          "w-full text-left p-4 rounded-xl flex items-center justify-between group transition-all",
                          isActive ? "bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/50 text-blue-900 dark:text-white" : "border border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                        )
                      )}
                    >
                      <span className="font-bold text-sm">{doc.title}</span>
                      <ChevronRight size={16} className={clsx("transition-transform", isActive ? "text-blue-400 translate-x-1" : "text-slate-600 group-hover:text-slate-400")} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900 min-h-0 relative">
              <div className="absolute top-4 right-4 hidden md:block">
                <button onClick={toggleDocsMenu} className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                <div className="max-w-3xl mx-auto prose dark:prose-invert prose-slate prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-pre:bg-slate-50 dark:prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-800 prose-pre:p-0 prose-pre:rounded-xl">
                  <Markdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      strong: ({node, ...props}) => <strong className="text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-400/10 px-1.5 py-0.5 rounded" {...props} />,
                      em: ({node, ...props}) => <em className="text-blue-700 dark:text-blue-400 font-medium not-italic bg-blue-100 dark:bg-blue-400/10 px-1.5 py-0.5 rounded" {...props} />,
                      code: (props) => {
                        const {children, className, node, ...rest} = props;
                        const match = /language-(\w+)/.exec(className || '');
                        return !match ? (
                          <code className="text-amber-700 dark:text-amber-400 font-mono font-bold bg-amber-100 dark:bg-amber-400/10 px-1.5 py-0.5 rounded text-sm before:content-none after:content-none" {...rest}>
                            {children}
                          </code>
                        ) : (
                          <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                            children={String(children).replace(/\n$/, '')}
                            language={match[1]}
                            style={theme === 'dark' ? vscDarkPlus : prism}
                            className="!bg-transparent !m-0 !p-4 text-sm"
                          />
                        );
                      }
                    }}
                  >
                    {activeDoc.content}
                  </Markdown>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
