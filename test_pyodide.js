const { loadPyodide } = require('pyodide');
async function test() {
  const pyodide = await loadPyodide();
  const arr = [{ from: { x: 1, y: 2 } }];
  const namespace = pyodide.toPy({});
  namespace.set("arr", pyodide.toPy(arr));
  await pyodide.runPythonAsync(`
print(arr[0]['from']['x'])
`, { globals: namespace });
}
test();
