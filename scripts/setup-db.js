require('dotenv').config({ path: '.env.local' });
const { sql } = require('@vercel/postgres');

async function setup() {
  await sql`
    CREATE TABLE IF NOT EXISTS Users (
      Id SERIAL PRIMARY KEY,
      FullName VARCHAR(255) NOT NULL,
      Email VARCHAR(255) UNIQUE NOT NULL,
      PasswordHash VARCHAR(255) NOT NULL,
      PasswordSALT VARCHAR(255) NOT NULL,
      LoginCookie VARCHAR(255),
      CreatedAt TIMESTAMP DEFAULT NOW()
    );
  `;

  process.exit(0);
}

// setup().catch(console.error);

async function CreatingModulesTable() {
  const results = await sql`
    CREATE TABLE IF NOT EXISTS modules (
      Id SERIAL PRIMARY KEY,
      ModuleName VARCHAR(255) NOT NULL,
      ModuleCode VARCHAR(255) UNIQUE NOT NULL,
      CreatedAt TIMESTAMP DEFAULT NOW()
    );
  `;

  console.log(results)
}

async function createModuleQuestions() {
  const results = await sql`
    CREATE TABLE IF NOT EXISTS module_questions (
      Id SERIAL PRIMARY KEY,
      ModuleId INTEGER NOT NULL,
      Tag VARCHAR(255) NOT NULL,
      Question VARCHAR(255) NOT NULL,
      Answer VARCHAR(255) NOT NULL
      CONSTRAINT fk_module FOREIGN KEY (ModuleId) REFERENCES modules(id) ON DELETE CASCADE,
    );
  `;

  console.log(results)
}

async function insertModuleQuestions() {
  const results = await sql`
    insert into module_questions(ModuleId, Tag, Question, Answer)
    values 
    (1, 'History', 'What did Hilbert propose in 1900?', 'A mechanical system to prove all true mathematical statements - essentially imagining a proof-generating algorithm before computers existed.'),
    (1, 'History', 'What did Gödel prove in 1931?', 'No algorithm can prove all true statements in mathematics - either some truths are unprovable, or some false statements have proofs.'),
    (1, 'History', 'What did Turing prove about his universal machine?', 'There are fundamental questions about the machine itself that the machine cannot answer.'),
    (1, 'Key figures', 'What did McCulloch and Pitts contribute to computer theory?', 'A mathematical model of animal neural nets - a theoretical machine similar to Turing''s but with certain limitations.'),
    (1, 'Key figures', 'What did Noam Chomsky contribute?', 'Mathematical models for describing languages, which shed light on formal and computer languages.'),
    (1, 'Key result', 'What is the ultimate result of the course?', 'No matter how powerful a machine is, there will always be simple, well-defined problems it cannot solve.'),
    (1, 'Terminology', 'Why is ''computation'' a misleading name for this field?', 'It implies arithmetic, but computers also do word processing, sorting, searching, and more - ''computer theory'' is broader and more accurate.'),
    (1, 'Core concept', 'Why are computer languages easy for machines but human languages hard?', 'We know exactly how machines parse instructions; human language understanding is far more complex and not fully understood.'),
    (1, 'History', 'What role did WW2 play in building the first computer?', 'Military funding to break the German secret code provided the motivation and resources; Turing himself helped build the machine.'),
    (1, 'Core concept', 'What is an algorithm, and what steps are not allowed?', 'A precise procedure or program. Steps like guessing or trying infinitely many possibilities at once are prohibited - only definite, executable steps are allowed.'),
    (1, 'Method', 'What is the core interplay method used throughout the course?', 'Introduce a new machine → learn its language. Develop a new language → find a machine that corresponds to it.')
    `;

  console.log(results.rowCount)
}

async function createTopicsTable() {
  const results = await sql`
    CREATE TABLE IF NOT EXISTS module_topics (
      Id SERIAL PRIMARY KEY,
      ModuleId INTEGER NOT NULL,
      Title VARCHAR(255) NOT NULL
  );
  `;

  console.log(results)

}

async function createSubTopicsTable() {
  const results = await sql`
    CREATE TABLE IF NOT EXISTS module_subtopics (
      Id SERIAL PRIMARY KEY,
      topicId INTEGER NOT NULL,
      Title VARCHAR(255) NOT NULL,
      Description TEXT
  );
  `;

  console.log(results)

}

// createSubTopicsTable()

async function SelectQuery() {
  const results = await sql`
    select * from module_topics
  `;

  console.log(results.rows)
}

// SelectQuery()

async function insertTopic() {
  const results = await sql`
    insert into module_subtopics(TopicId, Title,Description) values (1, '1-1 Computers and Information
Systems in Daily Life','Discuss common applications of computers and
information systems.');
  `;

  console.log(results.rowCount)
}


async function droptable() {
  const results = await sql`
    drop table module_subtopics
  `;
  console.log(results)

}

async function createTags() {
  const results = await sql`
        CREATE TABLE IF NOT EXISTS module_tags (
          Id SERIAL PRIMARY KEY,
      subtopicId INTEGER NOT NULL,
      Title VARCHAR(255) NOT NULL
  );
  `;

  console.log(results)

}

async function insertTags() {
  const results = await sql`
    insert into module_tags(subtopicId, Title) values (1, 'Education'), (1, 'Retail & Banking'), (1, 'Mobile Tech'), (1, 'Social Media'), (1, 'COVID-19 Impact');
  `;

  console.log(results.rowCount)
}

// insertTags()