/**
 * Initial table data.
 */
var buildingTableData = [["headerA", "headerB", "10"]];
export const nbRows = 1000; // <5K: 5ms: 10K: 32ms
for (let i=1; i<=nbRows; i++) {
    buildingTableData.push([i.toString(), (i + 10).toString(),
                            `=SUM(A${i+1}, B${i+1}) + C1`]);
}

export const tableData = buildingTableData;
