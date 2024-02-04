const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const upload = require('./middleware/multerMiddleware')
const authenticatedMiddleware = require('./middleware/authMiddleware')
const fs = require('fs')
const usermodel = require('./db/userModel');
const fileModel = require('./db/fileModel')
const path = require('path')
const http = require('http')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const JWTSECRET = "JWTSECRET"


app.post('/login', async (req, res) => {
    try {
        const userExist = await usermodel.findOne({ emailId: req.body.emailId });
        if (!userExist) {
            throw new Error("user not exist");
        }
        const compairePassword = await bcrypt.compare(req.body.password, userExist.password);
        if (!compairePassword) {
            throw new Error("Please check your email or password");
        }

        const userInfo = {
            id: userExist._id,
            fullname: userExist.fullName || `${userExist.firstName}  ${userExist.lastName}`,
            emailId: userExist.emailId,
        }


        const token = jwt.sign(userInfo, JWTSECRET, {
            expiresIn: '24h',
        });

        res.status(201).json({
            status: 201,
            message: "user log in",
            auth: {
                fullName: `${userExist.firstName}  ${userExist.lastName}`,
                token: token
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message)
    }
});

app.post('/register', async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        await usermodel.create({ ...req.body, password: hashPassword });
        res.status(201).json({
            status: 201,
            message: "user registerd"
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message)
    }
});

app.post('/upload', authenticatedMiddleware, upload.single('file'), async (req, res) => {
    try {
        const url = __dirname + path.join(`/Uploads/${req.fileNo}.png`)
        await fileModel.create({ fileName: req.file?.originalname, mimetype: req.file?.mimetype, url: url, user: req.user.id, downloadCode: req.fileNo });
        res.status(201).json({
            status: 201,
            message: "file uploaded"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.get('/userFiles', authenticatedMiddleware, async (req, res) => {
    try {
        const userData = await fileModel.find({ user: req.user.id });
        res.status(201).json({
            status: 201,
            Data: userData
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.delete('/deleteFile', authenticatedMiddleware, async (req, res) => {
    try {
        const { id } = req.query;
        const userData = await fileModel.findOneAndDelete({ _id: id });
        res.status(201).json({
            status: 201,
            Data: userData
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.post('/download', authenticatedMiddleware, async (req, res) => {
    try {
        const fileData = await fileModel.findOne({ _id: req.body.id });
        if (fileData.downloadCode !== req.body.downloadCode) {
            throw new Error('wrong download code')
        }

        var file = fs.readFileSync(fileData.url, 'base64');
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename=file.png`);
        res.writeHead(201)
        res.end(file);
  
        // fs.readFile(fileData.url, 'binary',(err,result)=>{
        //  res.setHeader('Content-Type', 'image/png');
        // res.setHeader('Content-Disposition', 'attachment; filename=your_file_name');
        // res.write(result, 'binary');
        // res.end();
        // });
        // res.set({'Content-Type': 'image/png'});
        // res.status(201).download(fileData.url)


        // // res.setHeader('Content-Length', stat.size);
        // res.setHeader('Content-Type', 'image/jpeg');
        // res.setHeader('Content-Disposition', 'attachment; filename=your_file_name');
        // res.write(file, 'binary');
        // res.end();

    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message)
    }
})

app.listen(3004, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/imageG')
        .then(() => {
            console.log('db connected to server...');
        })
        .catch((err) => {
            console.log(err);
        })
})