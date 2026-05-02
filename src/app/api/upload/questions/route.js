// app/api/upload/route.js
import ExcelJS from 'exceljs';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');
        const buffer = Buffer.from(await file.arrayBuffer());

        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        const sheet = workbook.worksheets[0];

        // Extract headers from row 1
        const headers = [];
        sheet.getRow(1).eachCell((cell) => {
            headers.push(cell.value);
        });

        // Extract data rows
        const rows = [];
        sheet.eachRow((row, rowIndex) => {
            if (rowIndex === 1) return; // skip header
            const rowData = {};
            row.eachCell((cell, colIndex) => {
                rowData[headers[colIndex - 1]] = cell.value;
            });
            rows.push(rowData);
        });

        // TODO: Save `rows` to your database here
        // e.g. await db.insert(yourTable).values(rows);
        console.log('Extracted rows:', rows);

        return Response.json({ count: rows.length });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}