// ==================== 设置你的密码（自己修改） ====================
const SECRET_PASSWORD = "kky666";   // 

// 检查当前是否已登录
function isLoggedIn() {
    return sessionStorage.getItem("loggedIn") === "true";
}

// 登录函数
function login(password) {
    if (password === SECRET_PASSWORD) {
        sessionStorage.setItem("loggedIn", "true");
        return true;
    } else {
        return false;
    }
}

// 退出登录
function logout() {
    sessionStorage.removeItem("loggedIn");
    window.location.href = "index.html";  // 跳回首页
}

// 页面加载时的逻辑
document.addEventListener("DOMContentLoaded", function() {
    // 如果在首页（存在登录按钮）
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        // 首页的登录逻辑
        loginBtn.addEventListener("click", function() {
            const pwd = document.getElementById("passwordInput").value;
            if (login(pwd)) {
                window.location.href = "secret.html";  // 跳转到私密页面
            } else {
                document.getElementById("errorMsg").innerText = "密码错误，请重试";
            }
        });
    }

    // 如果在私密页面 (secret.html)
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        // 检查登录状态，未登录则跳回首页
        if (!isLoggedIn()) {
            window.location.href = "index.html";
        }
        
        // 退出按钮
        logoutBtn.addEventListener("click", logout);
        
        // 加载私密内容（照片库、灵魂伴侣、职业规划）
        loadSecretContent();
    }
});

// 加载私密内容（所有数据都在这里，你可以随意修改）
function loadSecretContent() {
    // ========== 1. 照片库 ==========
    // 在这里列出你想展示的照片文件名（需要先把照片文件放到 my-website 文件夹里）
    const photoFiles = [
        "photo1.jpg",
        "photo2.jpg",
        "photo3.jpg"
        // 可以继续增加，例如 "photo4.jpg", "my-trip.jpg"
    ];
    
    const photoGrid = document.getElementById("photoGrid");
    if (photoGrid) {
        photoGrid.innerHTML = ""; // 清空
        photoFiles.forEach(file => {
            // 创建一个图片元素，如果图片不存在会显示破损图标
            const img = document.createElement("img");
            img.src = file;
            img.alt = "照片";
            img.onerror = () => { img.src = "https://via.placeholder.com/200?text=照片未找到"; };
            photoGrid.appendChild(img);
        });
    }

    // ========== 2. 灵魂伴侣 ==========
    const soulmateDiv = document.getElementById("soulmateContent");
    if (soulmateDiv) {
        soulmateDiv.innerHTML = `
            <div class="soulmate-card">
                <p>✨ 对我来说，灵魂伴侣是那个能让你做最真实自己的人，彼此理解、互相成长。 ✨</p>
                <p>—— 无论是一起看夕阳，还是安静地各自读书，都能感受到深深的连接。</p>
                <!-- 你可以在这里放一张代表灵魂伴侣的图片，把图片放在文件夹中，下面取消注释 -->
                <!-- <img src="soulmate.jpg" alt="灵魂伴侣"> -->
            </div>
        `;
    }

    // ========== 3. 职业规划 ==========
    const careerDiv = document.getElementById("careerList");
    if (careerDiv) {
        careerDiv.innerHTML = `
            <ul class="career-list">
                <li>
                    <div class="title">🎯 阶段一：前端开发入门</div>
                    <div class="period">2025年 - 2026年</div>
                    <div class="desc">掌握HTML、CSS、JavaScript，能独立制作个人网站和简单交互页面。</div>
                </li>
                <li>
                    <div class="title">🚀 阶段二：全栈工程师</div>
                    <div class="period">2027年 - 2028年</div>
                    <div class="desc">学习Node.js、数据库，能够开发完整的Web应用，参与开源项目。</div>
                </li>
                <li>
                    <div class="title">💡 阶段三：技术专家/架构师</div>
                    <div class="period">2029年以后</div>
                    <div class="desc">深入特定领域（如AI、云原生），带领团队解决复杂问题，同时保持终身学习。</div>
                </li>
            </ul>
        `;
    }
}
