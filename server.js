const express = require('express');
const { Sequelize, Op } = require('sequelize');
const path = require('path');

const app = express();
const port = 3333;

const sequelize = new Sequelize('hospital', 'postgres', '비밀번호~', {
    host: 'localhost', 
    dialect: 'postgres',
    port: 5432 
});


const Hospital = require(path.join(__dirname, 'models', 'hospital.js'))(sequelize); //병원목록
const Emp = require(path.join(__dirname, 'models', 'emp.js'))(sequelize); //직원 확인


app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));



////////////////////////////////////////////////////////////////
//######################  LOGIN  #############################//
////////////////////////////////////////////////////////////////
app.post('/api/login_V1', async (req, res) => {
    const { empuid, emppwd } = req.body;

    if (!empuid) {
        return res.status(400).json({ message: '아이디를 입력하세요.' });
    }else if(!emppwd){
        return res.status(400).json({ message: "비밀번호를 입력하세요."});
    }

    try {

        //유저 확인
        const user = await Emp.findOne({
            where: {
                empuid: empuid,
                empstrdte: { [Op.lte]: new Date() },
                empenddte: { [Op.gte]: new Date() }
            }
        });

        if (!user) {
            return res.status(401).json({ message: '아이디가 존재하지 않거나 해당 계정의 사용일자가 일치하지 않습니다. 관리자에게 문의하세요.' });
        }

        if (emppwd !== user.emppwd) {
            return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
        }

        res.status(200).json({ 
            message: user.empnam +'님 반갑습니다.',
            user: {
                empuid: user.empuid,
                empnam: user.empnam,
                empdepcod: user.empdepcod
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).send('로그인 처리 중 오류가 발생했습니다.');
    }
});


////////////////////////////////////////////////////////////////
//######################   관리   #############################//
////////////////////////////////////////////////////////////////


//[GET] 병원 불러오기
app.get('/api/hospitals_V1', async (req, res) => {
    try {
        const hospitals = await Hospital.findAll();
        res.json(hospitals);
    } catch (error) {
        console.error('Get Error', error);
        res.status(500).json({ message: '리스트 조회 중 오류가 발생했습니다.', error: error.message });
    }
});

//[POST] 병원 추가 
app.post('/api/hospitals_V1', async (req, res) => {
    try {
        const newHospital = await Hospital.create(req.body);
        res.status(201).json(newHospital);
    } catch (error) {
        console.error('Add Error:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ errors: error.errors.map(e => e.message) });
        }
        res.status(500).send('Error');
    }
});

//[GET] 회원가입 아이디 중복확인
app.get('/api/manage/check-id/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await Emp.findOne({ where: { empuid: userId } });
        if (user) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error('Check ID Error:', error);
        res.status(500).send('아이디 확인 중 오류가 발생했습니다.');
    }
});

// [POST] 회원가입
app.post('/api/manage/signup_V1', async (req, res) => {

    const { empuid, emppwd, empnam, empdepcod } = req.body;
    if (!empuid || !emppwd || !empnam || !empdepcod) {
        return res.status(400).json({ message: '입력되지 않은 항목이 있습니다.' });
    }

    try {
        const newUser = await Emp.create({
            empuid, emppwd, empnam, empdepcod,
            empstrdte: new Date(),
            empenddte: new Date('2999-12-31')
        });
        res.status(201).json({ message: '회원가입이 완료되었습니다.', user: newUser });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: '이미 사용중인 아이디입니다.' });
        }
        console.error('singup Error:', error);
        res.status(500).send('회원가입 중 오류가 발생했습니다.');
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

async function runServer() {
    try {
        await sequelize.authenticate();

        await sequelize.sync();

        app.listen(port, () => {
            console.log(`run run http://localhost:${port}`);
        });
    } catch (error) {
        console.error('run Error:', error);
        process.exit(1);
    }
}

runServer();

