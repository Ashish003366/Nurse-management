#  Nurse Management System

A full-stack web application to manage nurse records using Node.js, Express, MySQL, and vanilla JavaScript.
Users can view, add, delete, search, and export nurse data in CSV or Excel format.

##  Features

- View all nurse records in a responsive table
- Add new nurse entries with name, license number, DOB, and age
- Delete existing records with a single click
- Real-time search by name, license number, DOB, or age
- Export data to CSV or Excel
- Clean UI with responsive design

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, MySQL
- **Frontend:** HTML, CSS, JavaScript
- **Database:** MySQL
- **Export:** `xlsx` and `json2csv` for file generation

## 📂 Project Structure
nurse-management/
├── server.js
├── db.js
├── routes/
│   └── nurseRoutes.js
├── controllers/
│   └── nurseController.js
├── public/
│   ├── index.html  
│   ├── style.css  
│   └── script.js    



## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Ashish003366/Nurse-management.git
cd nurse-management
```
### 2. Install Dependencies
npm install


### 3. Configure MySQL
```
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'nurse_db'
});
```
### SQL query to create table 
```
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'nurse_db'
});
```
