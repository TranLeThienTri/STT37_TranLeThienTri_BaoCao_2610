const express = require("express");
const mysql = require("mysql2");
const mongoose = require('mongoose');
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Cho phép truy cập các file trong thư mục uploads

// Thiết lập multer để tải file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục lưu file
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file
    }
});
const upload = multer({ storage }); // Tạo biến upload cho việc tải file


// Connect to MongoDB
// const mongoURI = 'mongodb://localhost:27017/mobile'; // Replace with your MongoDB URI

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));



// Cấu hình kết nối MySQL
const db = mysql.createConnection({
    host: "localhost", // Địa chỉ server MySQL
    user: "root", // Tên người dùng MySQL
    password: "sapassword", // Mật khẩu MySQL
    database: "mobile", // Tên database
});

// Kết nối đến MySQL
db.connect((err) => {
    if (err) {
        console.error("Lỗi kết nối MySQL:", err);
        return;
    }
    console.log("Đã kết nối thành công tới MySQL!");
});

// Route để kiểm tra kết nối
app.get("/user", (req, res) => {
    db.query("SELECT * FROM user", (err, results) => {
        if (err) {
            res.status(500).send("Lỗi khi truy vấn dữ liệu");
        } else {
            res.json(results);
        }
    });
});

// login
// Endpoint để đăng nhập
app.post("/auth/login", (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM user WHERE name = ? AND password = ?";
    db.query(query, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length > 0) {
            res.json({ message: "Login successful", user: result[0] });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    });
});

// Endpoint để đăng ký tài khoản
app.post("/user/register", upload.single("avatar"), (req, res) => {
    const { username, password } = req.body;
    const avatar = req.file ? req.file.filename : null;

    console.log("avt", avatar);

    // kiểm tra username có tồn tại hay chưa
    const checkQuery = "SELECT * FROM user WHERE name = ?";
    db.query(checkQuery, [username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }

        if (result.length > 0) {
            return res.status(409).json({ error: "Username already exists" });
        }

        // thêm user vào database
        const insertQuery =
            "INSERT INTO user (name, password, avatar) VALUES (?, ?, ?)";
        db.query(insertQuery, [username, password, avatar], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database error" });
            }
            res.status(201).json({
                message: "User registered successfully",
                userId: result.insertId,
            });
        });
    });
});

// Endpoint delete
app.delete("/user/:id", (req, res) => {
    const id = req.params.id;
    db.query(`DELETE FROM user WHERE id = ${id}`, (err, results) => {
        if (err) {
            res.status(500).send("Lỗi khi xóa dữ liệu");
        } else {
            res.status(200).json("Xóa dữ liệu thành công");
        }
    });
});

// // update
app.put("/user/:id", (req, res) => {
    const id = req.params.id;
    const { name, password, image } = req.body;
    db.query(
        `UPDATE user SET name = '${name}', password = '${password}', avatar = '${image}' WHERE id = ${id}`,
        (err, results) => {
            if (err) {
                res.status(500).send("Lỗi khi cập nhật dữ liệu");
            } else {
                res.status(200).json("Cập nhật dữ liệu thành công");
            }
        }
    );
});

// Endpoint để đăng ký tài khoản
// app.post('/register', upload.single('avatar'), (req, res) => {
//     const { username, password } = req.body;
//     const avatar = req.file ? req.file.filename : null;
//     console.log(req.file);

//     // Kiểm tra username có tồn tại không
//     const checkQuery = 'SELECT * FROM Account WHERE username = ?';
//     db.query(checkQuery, [username], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: 'Database error' });
//         }
//         if (result.length > 0) {
//             return res.status(409).json({ error: 'Username already exists' });
//         }

//         // Thêm tài khoản mới vào cơ sở dữ liệu
//         const insertQuery = 'INSERT INTO Account (username, password, avatar) VALUES (?, ?, ?)';
//         db.query(insertQuery, [username, password, avatar], (err, result) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Database error' });
//             }
//             res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
//         });
//     });
// });




// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
