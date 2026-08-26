// @ts-nocheck
importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js");

let pyodide: any = null;

async function initPyodide() {
  pyodide = await (self as any).loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/"
  });
  // Load micropip to allow dynamic package installation
  await pyodide.loadPackage("micropip");
}

let initPromise = initPyodide();

self.onmessage = async (event) => {
  const { code, testCode, id } = event.data;
  
  try {
    await initPromise;
    
    // Dynamically load any imports using micropip before running
    await pyodide.loadPackagesFromImports(code);

    // Create a custom namespace for execution
    const namespace = pyodide.toPy({});
    namespace.set("__user_code__", code);
    
    // Add command dispatcher for drone movement
    namespace.set("__post_command__", (action: string) => {
      self.postMessage({ id, type: 'COMMAND', action });
    });
    
    // Redirect stdout in Python side instead of relying on Pyodide's internal setStdout
    await pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()

def move_up():
    __post_command__("MOVE_UP")
def move_down():
    __post_command__("MOVE_DOWN")
def move_left():
    __post_command__("MOVE_LEFT")
def move_right():
    __post_command__("MOVE_RIGHT")
def move_forward():
    __post_command__("MOVE_UP") # Map forward to up
    
def is_path_clear():
    return False # For level 17 logic branch to test else path
    `, { globals: namespace });

    // Run the code
    await pyodide.runPythonAsync(code, { globals: namespace });
    
    // Run AST tests if provided
    if (testCode) {
      namespace.set("__test_code__", testCode);
      await pyodide.runPythonAsync(`
try:
    exec(__test_code__)
except Exception as e:
    raise Exception(f"VALIDATION_ERROR: {str(e)}")
      `, { globals: namespace });
    }

    // Extract the stdout value
    const stdout = await pyodide.runPythonAsync("sys.stdout.getvalue()", { globals: namespace });
    
    self.postMessage({ id, type: 'success', stdout });
  } catch (error: any) {
    let errorMessage = error.message || String(error);
    
    // Handle validation (AST) errors separately
    if (errorMessage.includes("VALIDATION_ERROR: ")) {
      const validationMsg = errorMessage.split("VALIDATION_ERROR: ")[1].split("\\n")[0];
      self.postMessage({ id, type: 'validation_error', error: "ОШИБКА АНАЛИЗА КОДА: " + validationMsg });
      return;
    }

    // Clean up scary Pyodide internal tracebacks to only show user code errors
    const execIndex = errorMessage.indexOf('File "<exec>"');
    if (execIndex !== -1) {
      errorMessage = "Traceback (most recent call last):\\n  " + errorMessage.substring(execIndex);
    }
    
    self.postMessage({ id, type: 'error', error: errorMessage });
  }
};
