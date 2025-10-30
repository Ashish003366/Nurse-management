const pool = require('../db');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const XLSX = require('xlsx');

exports.getAllNurses = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM nurses');
  res.json(rows);
};

exports.addNurse = async (req, res) => {
  const { name, license_number, dob, age } = req.body;
  await pool.query('INSERT INTO nurses (name, license_number, dob, age) VALUES (?, ?, ?, ?)', [name, license_number, dob, age]);
  res.sendStatus(201);
};
exports.createNurse = async (req, res) => {
  const { name, license_number, dob, age } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO nurses (name, license_number, dob, age) VALUES (?, ?, ?, ?)',
      [name, license_number, dob, age]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add nurse' });
  }
};

exports.updateNurse = async (req, res) => {
  const { name, license_number, dob, age } = req.body;
  const { id } = req.params;
  await pool.query('UPDATE nurses SET name=?, license_number=?, dob=?, age=? WHERE id=?', [name, license_number, dob, age, id]);
  res.sendStatus(200);
};

exports.deleteNurse = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM nurses WHERE id=?', [id]);
  res.sendStatus(200);
};

exports.downloadData = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM nurses');
  const type = req.params.type;

  if (type === 'csv') {
    const csvWriter = createCsvWriter({
      path: 'nurses.csv',
      header: [
        { id: 'id', title: 'Id' },
        { id: 'name', title: 'Name' },
        { id: 'license_number', title: 'License Number' },
        { id: 'dob', title: 'Date of Birth' },
        { id: 'age', title: 'Age' },
      ],
    });
    await csvWriter.writeRecords(rows);
    res.download('nurses.csv');
  } else {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Nurses');
    XLSX.writeFile(workbook, 'nurses.xlsx');
    res.download('nurses.xlsx');
  }
};