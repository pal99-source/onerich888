<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎰 ZEUS-SLOT 88 - LOGIN & DAFTAR</title>
    <script src="https://gstatic.com"></script>
    <script src="https://gstatic.com"></script>
    <script src="https://gstatic.com"></script>
    <style>
        body {
            margin:0; padding:10px; background:#0b0b13; color:#fff;
            font-family:sans-serif; display:flex; justify-content:center; align-items:center; min-height:95vh;
        }
        .auth-container {
            background:#161624; border:1px solid #333; padding:25px; border-radius:12px;
            width:100%; max-width:360px; box-sizing:border-box; box-shadow:0 8px 24px rgba(0,0,0,0.6);
        }
        h2 { text-align:center; color:#4af3a2; margin-top:0; font-size:24px; letter-spacing:1px; }
        .tab-box { display:flex; margin-bottom:20px; border-bottom:2px solid #222; }
        .tab { flex:1; text-align:center; padding:10px; cursor:pointer; color:#888; font-weight:bold; }
        .tab.active { color:#4af3a2; border-bottom:2px solid #4af3a2; }
        .input-group { margin-bottom:15px; }
        label { display:block; font-size:12px; color:#aaa; margin-bottom:5px; }
        input {
            width:100%; padding:10px; background:#0f0f1a; border:1px solid #4e54c8;
            color:#fff; border-radius:6px; box-sizing:border-box; font-size:14px;
        }
        input:focus { border-color:#4af3a2; outline:none; }
        .action-btn {
            background:#4e54c8; color:#fff; border:none; padding:12px; width:100%;
            font-size:16px; font-weight:bold; border-radius:6px; cursor:pointer; margin-top:10px;
        }
        .msg-box { text-align:center; color:#ff4757; font-size:13px; margin-top:10px; min-height:18px; }
    </style>
</head>
<body>

<div class="auth-container">
    <h2>🎰 ZEUS-SLOT 88</h2>
    <div class="tab-box">
        <div class="tab active" id="tab-login" onclick="switchTab('login')">LOGIN</div>
        <div class="tab" id="tab-register" onclick="switchTab('register')">DAFTAR</div>
    </div>

    <div class="input-group" id="group-username" style="display:none;">
        <label>Nama Lengkap / Username</label>
        <input type="text" id="auth-username" placeholder="Masukkan nama kamu">
    </div>
    <div class="input-group">
        <label>Email Akun</label>
        <input type="email" id="auth-email" placeholder="contoh@gmail.com">
    </div>
    <div class="input-group">
        <label>Kata Sandi (Password)</label>
        <input type="password" id="auth-pass" placeholder="Minimal 6 karakter">
    </div>

    <button class="action-btn" id="btn-submit" onclick="handleAuth()">MASUK KE PERMAINAN</button>
    <div class="msg-box" id="error-msg"></div>
</div>

<script>
    const firebaseConfig = {
        apiKey: "AIzaSyAjyCrAkxRDyuCFqs7qb1KN4x6jstivfBg",
        authDomain: "://firebaseapp.com",
        databaseURL: "https://firebaseio.com",
        projectId: "site-judjut-newproj",
        storageBucket: "site-judjut-newproj.firebasestorage.app",
        messagingSenderId: "480370155025",
        appId: "1:480370155025:web:33c8162f05b994c681dbb0"
    };
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.database();

    let currentMode = 'login';

    function switchTab(mode) {
        currentMode = mode;
        document.getElementById('error-msg').innerHTML = '';
        if (mode === 'login') {
            document.getElementById('tab-login').classList.add('active');
            document.getElementById('tab-register').classList.remove('active');
            document.getElementById('group-username').style.display = 'none';
            document.getElementById('btn-submit').innerHTML = 'MASUK KE PERMAINAN';
        } else {
            document.getElementById('tab-login').classList.remove('active');
            document.getElementById('tab-register').classList.add('active');
            document.getElementById('group-username').style.display = 'block';
            document.getElementById('btn-submit').innerHTML = 'BUAT AKUN BARU';
        }
    }

    function handleAuth() {
        const email = document.getElementById('auth-email').value;
        const pass = document.getElementById('auth-pass').value;
        const username = document.getElementById('auth-username').value;
        const errorMsg = document.getElementById('error-msg');

        if(!email || !pass) {
            errorMsg.innerHTML = "Semua kolom wajib diisi!";
            return;
        }

        if (currentMode === 'register') {
            if(!username) { errorMsg.innerHTML = "Username tidak boleh kosong!"; return; }
            auth.createUserWithEmailAndPassword(email, pass)
                .then((userCredential) => {
                    var user = userCredential.user;
                    db.ref('users/' + user.uid).set({
                        username: username,
                        email: email,
                        saldo: 50000,
                        statusRTP: "normal",
                        statusDeposit: "none",
                        jumlahDeposit: 0,
                        buktiGambarUrl: ""
                    }).then(() => {
                        window.location.href = "dashboard.html";
                    });
                })
                .catch((error) => { errorMsg.innerHTML = error.message; });
        } else {
            auth.signInWithEmailAndPassword(email, pass)
                .then((userCredential) => {
                    window.location.href = "dashboard.html";
                })
                .catch((error) => { errorMsg.innerHTML = "Email atau password salah!"; });
        }
    }

    auth.onAuthStateChanged((user) => {
        if (user) { window.location.href = "dashboard.html"; }
    });
</script>
</body>
</html>
