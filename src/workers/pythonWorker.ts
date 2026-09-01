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
  const { code, testCode, id, env } = event.data;
  
  try {
    await initPromise;
    
    // Dynamically load any imports using micropip before running
    await pyodide.loadPackagesFromImports(code);
    
    // Create a custom namespace for execution
    const namespace = pyodide.toPy({});
    namespace.set("__user_code__", code);
    
    if (env) {
      namespace.set("__init_drone_x__", env.droneX);
      namespace.set("__init_drone_y__", env.droneY);
      namespace.set("__init_target_x__", env.targetX);
      namespace.set("__init_target_y__", env.targetY);
      namespace.set("__obstacles__", pyodide.toPy(env.obstacles || []));
      namespace.set("__teleports__", pyodide.toPy(env.teleports || []));
    } else {
      namespace.set("__init_drone_x__", 0);
      namespace.set("__init_drone_y__", 0);
      namespace.set("__init_target_x__", 0);
      namespace.set("__init_target_y__", 0);
      namespace.set("__obstacles__", pyodide.toPy([]));
      namespace.set("__teleports__", pyodide.toPy([]));
    }
    
    // Add command dispatcher for drone movement
    namespace.set("__post_command__", (action: string) => {
      self.postMessage({ id, type: 'COMMAND', action });
    });
    
    // Redirect stdout in Python side instead of relying on Pyodide's internal setStdout
    await pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()

DRONE_X = __init_drone_x__
DRONE_Y = __init_drone_y__
TARGET_X = __init_target_x__
TARGET_Y = __init_target_y__

def _check_teleport():
    global DRONE_X, DRONE_Y
    for t in __teleports__:
        if DRONE_X == t['from']['x'] and DRONE_Y == t['from']['y']:
            DRONE_X = t['to']['x']
            DRONE_Y = t['to']['y']
            break

def move_up(steps=1):
    global DRONE_Y
    for _ in range(steps):
        __post_command__("MOVE_UP")
        DRONE_Y -= 1
        _check_teleport()

def move_down(steps=1):
    global DRONE_Y
    for _ in range(steps):
        __post_command__("MOVE_DOWN")
        DRONE_Y += 1
        _check_teleport()

def move_left(steps=1):
    global DRONE_X
    for _ in range(steps):
        __post_command__("MOVE_LEFT")
        DRONE_X -= 1
        _check_teleport()

def move_right(steps=1):
    global DRONE_X
    for _ in range(steps):
        __post_command__("MOVE_RIGHT")
        DRONE_X += 1
        _check_teleport()

def move_forward(steps=1):
    move_up(steps)
    
def grab():
    __post_command__("GRAB")
    
def drop():
    __post_command__("DROP")

def is_path_clear():
    # Check if the next cell up (forward) is clear
    next_x = DRONE_X
    next_y = DRONE_Y - 1
    if next_y < 0: return False
    for obs in __obstacles__:
        if obs['x'] == next_x and obs['y'] == next_y:
            return False
    return True
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
