function getInput() {
  try {
    const input = JSON.parse(process.argv[2]);
    if (!input || typeof input !== "object") {
      throw new Error("Invalid input");
    }
    return input;
  } catch (error) {
    console.debug({ agv: process.argv, error });
    throw error;
  }
}

const testResults = getInput()["test-result"];

let printResults = [];
Object.keys(testResults).forEach(function (key) {
  printResults.push({
    node: key.match(/node@(\d+)/)[1],
    manager: key.match(/\[(.+)\]/)[1],
    package: key.includes("(A)") ? "A: 😈👹👼"  : key.includes("(B)") ? "B: 👼😈👹": "C: 👹👼😈",
    result: testResults[key].indexOf("evil-dummy-cli") > -1 ? "👹" : testResults[key].indexOf("awful-dummy-cli") > -1 ? '😈': "👼",
  });
});

printResults
  .sort((a, b) => (a.node > b.node ? 1 : a.node === b.node ? 0 : -1))
  .sort((a, b) =>
    a.manager > b.manager ? 1 : a.manager === b.manager ? 0 : -1,
  );

const aPrintResults = printResults.filter((el) => el.package.includes("A:"));
const bPrintResults = printResults.filter((el) => el.package.includes("B:"));
const cPrintResults = printResults.filter((el) => el.package.includes("C:"));

console.log("package-A.json");
console.table(aPrintResults);

console.log("package-B.json");
console.table(bPrintResults);

console.log("package-C.json");
console.table(cPrintResults);
