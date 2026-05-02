// app/api/upload/route.js
import { sql } from '@vercel/postgres';
import ExcelJS from 'exceljs';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');
        const id = formData.get('id');
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
            rows.push({
                TopicId: parseInt(id),
                Question: rowData.Question,
                AnswerId: rowData.Answer,
                Answers: [rowData.Answer1, rowData.Answer2, rowData.Answer3, rowData.Answer4],
            });
        });

        for (let i = 0; i < rows.length; i++) {
            await sql`
           INSERT INTO module_questions (TopicId, Question, AnswerId) 
           VALUES (${rows[i].TopicId}, ${rows[i].Question}, ${rows[i].AnswerId});
           `
            let result = await sql`
           SELECT * FROM module_questions 
           ORDER BY Id DESC
           LIMIT 1
           `

            console.log(result)
            let answerSQL = `INSERT INTO module_answers (QuestionId, Answer)
                VALUES ${rows[i].Answers.map((answer) => '(' + result.rows[0].Id + ',' + answer + ')')}
                `

            console.log(answerSQL)
            let answers = await sql`                
                    ${answerSQL}
                `

            console.log(answers)
        }

        return Response.json({ count: rows.length });
    } catch (err) {
        console.log(err.message)
        return Response.json({ error: err.message }, { status: 500 });
    }
}