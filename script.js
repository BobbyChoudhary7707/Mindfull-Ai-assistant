(function() {
    // ========= APIs =========

// WEATHER API
async function getWeather(city = "Pune") {
    const apiKey = "abc123xyz456";

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    addChatMessage(
        `🌦️ ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`,
        "bot"
    );
}

// TRANSLATOR API
async function translateText(text) {
    const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        body: JSON.stringify({
            q: text,
            source: "en",
            target: "hi",
            format: "text"
        }),
        headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();

    addChatMessage("🌍 " + data.translatedText, "bot");
}

// SPORTS API
async function getSports() {
    const apiKey = "YOUR_CRICAPI_KEY";

    const res = await fetch(
        `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`
    );

    const data = await res.json();

    if (data.data && data.data.length > 0) {
        let match = data.data[0];

        addChatMessage(
            `🏏 ${match.name}\nScore: ${match.score[0]?.r}/${match.score[0]?.w}`,
            "bot"
        );
    } else {
        addChatMessage("No live matches 😢", "bot");
    }
}
    // ========= DOM =========
    const messageInput = document.getElementById('messageInput');
    const fileBtn = document.getElementById("fileBtn");
const fileInput = document.getElementById("fileInput");

if (fileBtn && fileInput) {
    fileBtn.onclick = () => fileInput.click();

   fileInput.onchange = () => {
    const file = fileInput.files[0];
    handleFileUpload(file); // 🔥 new system
};
}
    const dropZone = document.getElementById("dropZone");

// SHOW DROP AREA
document.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("active");
});

// HIDE DROP AREA
document.addEventListener("dragleave", () => {
    dropZone.classList.remove("active");
});

// DROP FILE
document.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("active");

    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
});

    const newChatBtn = document.querySelector('.new-chat-btn');
    const navItems = document.querySelectorAll('.nav-item');
    const chatMessagesDiv = document.getElementById('chatMessages');
    const cmdButtons = document.querySelectorAll(".cmd-btn");

cmdButtons.forEach(btn => {
    btn.onclick = () => {
        // remove old active
        cmdButtons.forEach(b => b.classList.remove("active"));

        // add new active
        btn.classList.add("active");

        // auto remove after 1s
        setTimeout(() => {
            btn.classList.remove("active");
        }, 1000);

        const cmd = btn.getAttribute("data-cmd");
        messageInput.value = cmd + " ";
        messageInput.focus();
    };
});
    const themeSelector = document.getElementById("themeSelector");
    const colorPicker = document.getElementById("primaryColor");
    const micBtn = document.getElementById("micBtn");
    const cameraBtn = document.getElementById("cameraBtn");
    const imageGenBtn = document.getElementById("imageGenBtn");
    const translations = {
    en: {
        title: "How can I help you today?",
        placeholder: "Message here...",
        settings: "Settings"
    },
    hi: {
        title: "मैं आपकी कैसे मदद कर सकता हूँ?",
        placeholder: "यहाँ लिखें...",
        settings: "सेटिंग्स"
    },
    es: {
        title: "¿Cómo puedo ayudarte hoy?",
        placeholder: "Escribe aquí...",
        settings: "Configuración"
    },
    fr: {
        title: "Comment puis-je vous aider aujourd'hui ?",
        placeholder: "Tapez ici...",
        settings: "Paramètres"
    },
    de: {
        title: "Wie kann ich Ihnen heute helfen?",
        placeholder: "Hier eingeben...",
        settings: "Einstellungen"
    },
    zh: {
        title: "我今天能帮你什么？",
        placeholder: "在这里输入...",
        settings: "设置"
    },
    ja: {
        title: "今日はどのようにお手伝いできますか？",
        placeholder: "ここに入力...",
        settings: "設定"
    },
    ru: {
        title: "Чем я могу помочь вам сегодня?",
        placeholder: "Введите здесь...",
        settings: "Настройки"
    },
    ar: {
        title: "كيف يمكنني مساعدتك اليوم؟",
        placeholder: "اكتب هنا...",
        settings: "الإعدادات"
    },
    pt: {
        title: "Como posso ajudá-lo hoje?",
        placeholder: "Digite aqui...",
        settings: "Configurações"
    },
    hinglish: {
        title: "Main aapki kaise help karu?",
        placeholder: "Yaha likho...",
        settings: "Settings"
    }
};
    // ========= PREMIUM SPLASH =========
const progressBar = document.getElementById("progressBar");
const loadingText = document.getElementById("loadingText");
const splash = document.getElementById("splash");

let progress = 0;

const steps = [
    "Initializing...",
    "Loading modules...",
    "Setting up AI...",
    "Almost done...",
    "Ready 🚀"
];

let stepIndex = 0;

let interval = setInterval(() => {
    progress++;

    // progress bar
    if (progressBar) {
        progressBar.style.width = progress + "%";
    }

    // change text every 20%
    if (progress % 20 === 0 && stepIndex < steps.length) {
        loadingText.innerText = steps[stepIndex];
        stepIndex++;
    }

    // finish
    if (progress >= 100) {
        clearInterval(interval);

        setTimeout(() => {
            splash.style.opacity = "0";
            splash.style.transition = "0.5s";

            setTimeout(() => {
                splash.style.display = "none";
            }, 500);
        }, 500);
    }

}, 30);

    // ========= STORAGE =========
    let chats = JSON.parse(localStorage.getItem("chats")) || [];
    let currentChat = [];
    let memory = JSON.parse(localStorage.getItem("memory")) || {};
    const MAX_CHATS = 7; // 👈 you can change limit

    // ========= THEME =========
    function setTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }

    function autoTheme() {
        const hour = new Date().getHours();
        if (hour >= 7 && hour < 19) {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
    else autoTheme();

    if (themeSelector) {
        themeSelector.addEventListener("change", (e) => {
            setTheme(e.target.value);
        });
    }

    if (colorPicker) {
        const savedColor = localStorage.getItem("customColor");
        if (savedColor) {
            document.documentElement.style.setProperty("--bubble-user", savedColor);
        }

        colorPicker.addEventListener("input", (e) => {
            const color = e.target.value;
            document.documentElement.style.setProperty("--bubble-user", color);
            document.documentElement.style.setProperty("--text", color);
            localStorage.setItem("customColor", color);
        });
    }
    const languageSelector = document.getElementById("languageSelector");

function setLanguage(lang) {
    if (!translations[lang]) return; // safety

    localStorage.setItem("lang", lang);

    document.querySelector(".welcome-message h1").innerText =
        translations[lang].title;

    document.getElementById("messageInput").placeholder =
        translations[lang].placeholder;

    document.getElementById("settingsBtn").innerHTML =
        "⚙️ " + translations[lang].settings;
}

    // LOAD SAVED LANGUAGE
    const savedLang = localStorage.getItem("lang") || "en";
    setLanguage(savedLang);

    if (languageSelector) {
    languageSelector.value = savedLang;

    languageSelector.addEventListener("change", (e) => {
        setLanguage(e.target.value);
    });
}
    function detectUserLanguage(text) {
    // basic detection (improve later with API)
    if (/[\u0900-\u097F]/.test(text)) return "hi"; // Hindi
    if (/[\u4e00-\u9fff]/.test(text)) return "zh"; // Chinese
    if (/[\u0600-\u06FF]/.test(text)) return "ar"; // Arabic
    if (/[\u0400-\u04FF]/.test(text)) return "ru"; // Russian
    if (/[\u3040-\u30FF]/.test(text)) return "ja";
    if (/[\u00C0-\u00FF]/.test(text)) return "es"; // Spanish/French/Portuguese 
    if (/[\u00C0-\u00FF]/.test(text)) return "fr";
    if (/[\u00C0-\u00FF]/.test(text)) return "de";  
    if (/[\u00C0-\u00FF]/.test(text)) return "pt";  
    if (/[\u0900-\u097F]/.test(text) && /[a-zA-Z]/.test(text)) return "hinglish"; // Hinglish   
    return "en"; // default
}

    // ========= MARKDOWN =========
    function formatMessage(text) {
        text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        text = text.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
        text = text.replace(/`(.*?)`/g, "<code>$1</code>");
        return text;
    }

    // ========= CHAT =========
    function addChatMessage(text, type, save = true) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", type);

    const span = document.createElement("span");

    span.innerHTML = formatMessage(text);

    msgDiv.appendChild(span);
    chatMessagesDiv.appendChild(msgDiv);

    if (save && type === "user") {
    currentChat.push({ text, type });
    }


    msgDiv.scrollIntoView({ behavior: "smooth" });
}

    // ========= MEMORY =========
    function updateMemory(msg) {
        if (memory.name && message.toLowerCase().includes("who am i")) {
    return `You are ${memory.name} 😎`;
}
        return null;
    }

    // ========= AI =========
    function generateSmartReply(message) {

        const memReply = updateMemory(message.toLowerCase());
        if (memReply) return memReply;

        if (memory.name) {
            return `Hey ${memory.name}, I remember you 👀`;
        }

        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            return "Hello 👋 How can I help you?";
        }

        if (lowerMsg.includes('ai')) {
            return "AI is powerful 🔥";
        }

        return "Tell me more...";
    }

    // ========= USER =========
    async function handleUserMessage() {
    let userMsg = messageInput.value.trim();
    if (!userMsg) return;

    messageInput.value = "";
    addChatMessage(userMsg, "user");

    showTyping();

    // 🌍 detect language
    let detectedLang = detectUserLanguage(userMsg);

    // 🔄 convert to English for AI
    let englishMsg = await translateText(userMsg, "en");

    // 🤖 generate reply (English)
    let reply = generateSmartReply(englishMsg);

    // 🔁 translate back to selected UI language
    let selectedLang = localStorage.getItem("lang") || "en";
    let finalReply = await translateText(reply, selectedLang);

    setTimeout(() => {
        document.getElementById("typing")?.remove();
        addChatMessage(finalReply, "bot");
    }, 500);
}
    function showTyping() {
        const typing = document.createElement("div");
        typing.classList.add("message", "bot");
        typing.id = "typing";
        typing.innerHTML = "<span>🤖 Typing...</span>";
        chatMessagesDiv.appendChild(typing);
    }

    // ========= HISTORY =========
    function saveChat() {
    if (currentChat.length === 0) return;

    chats.push(currentChat);

    // 🔥 AUTO DELETE OLD CHATS
    if (chats.length > MAX_CHATS) {
        chats.shift(); // remove oldest
    }

    localStorage.setItem("chats", JSON.stringify(chats));
    renderHistory();
}
    function resetNewChat() {
    saveChat();
    currentChat = [];
    chatMessagesDiv.innerHTML = `
        <div class="welcome-message">
            <h1>How can I help you today?</h1>
            <p class="sub-line">Ask anything and I'll do my best to assist.</p>
        </div>
    `;
}

function renderHistory(filter = "") {
    const historyDiv = document.getElementById("chatHistory");
    if (!historyDiv) return;

    historyDiv.innerHTML = "";

    const sortedChats = [...chats].sort((a, b) => b.pinned - a.pinned);

    sortedChats.forEach((chatObj, index) => {
        let firstUserMsg = chatObj.messages?.find(m => m.type === "user");
        if (!firstUserMsg) return;

        let text = firstUserMsg.text;

        if (filter && !text.toLowerCase().includes(filter.toLowerCase())) return;

        const item = document.createElement("div");
        item.className = "nav-item";

        item.innerHTML = `
            ${chatObj.pinned ? "📌" : ""} 💬 ${text.slice(0, 20)}
            <span class="pin-btn">📍</span>
        `;

        item.onclick = () => loadChat(index);

        item.querySelector(".pin-btn").onclick = (e) => {
            e.stopPropagation();
            chatObj.pinned = !chatObj.pinned;
            localStorage.setItem("chats", JSON.stringify(chats));
            renderHistory();
        };

        historyDiv.appendChild(item);
    });
}
    const searchInput = document.getElementById("historySearch");

if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        renderHistory(e.target.value);
    });
}
   function loadChat(index) {
    chatMessagesDiv.innerHTML = "";

    const chatObj = chats[index];
    if (!chatObj || !chatObj.messages) return;

    currentChat = chatObj.messages;

    currentChat.forEach(msg => {
        addChatMessage(msg.text, msg.type, false);
    });
}

    // ========= NAV =========
    function handleNavClick(text) {
        if (text === "New chat") {
            resetNewChat();
        } else {
            addChatMessage(`${text} clicked`, "bot");
        }
    }
    function clearAllHistory() {
    // clear storage
    localStorage.removeItem("chats");

    // reset current chat
    chats = [];
    currentChat = [];

    // clear UI
    chatMessagesDiv.innerHTML = `
        <div class="welcome-message">
            <h1>How can I help you today?</h1>
            <p class="sub-line">Ask anything and I'll do my best to assist.</p>
        </div>
    `;

    // clear sidebar history
    const historyDiv = document.getElementById("chatHistory");
    if (historyDiv) historyDiv.innerHTML = "";
}

    // ========= EVENTS =========
    messageInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleUserMessage(function detectCommand(msg) {
    if (msg.startsWith("/calc")) return "calc";
    if (msg.startsWith("/weather")) return "weather";
    if (msg.startsWith("/translate")) return "translate";
    if (msg.startsWith("/sports")) return "sports";

    return null;
});
        }
    });
    const clearBtn = document.getElementById("clearHistoryBtn");

if (clearBtn) {
    clearBtn.onclick = () => {
        if (confirm("Are you sure you want to clear all chat history?")) {
            clearAllHistory();
        }
    };
}

    if (newChatBtn) newChatBtn.onclick = resetNewChat;

    navItems.forEach(item => {
        item.onclick = function() {
            navItems.forEach(n => n.classList.remove("active"));
            this.classList.add("active");
            handleNavClick(this.innerText.trim());
        };
    });

    // ========= VOICE =========
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition && micBtn) {
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";

        micBtn.onclick = () => recognition.start();

        recognition.onresult = (e) => {
            messageInput.value = e.results[0][0].transcript;
        };
    }
    // 📷 CAMERA
if (cameraBtn) {
    cameraBtn.onclick = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            const video = document.createElement("video");
            video.srcObject = stream;
            video.play();

            const canvas = document.createElement("canvas");

            setTimeout(() => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(video, 0, 0);

                addChatMessage("📷 Photo captured!", "user");

                stream.getTracks().forEach(track => track.stop());
            }, 2000);

        } catch {
            alert("Camera not allowed ❌");
        }
    };
}
// 🖼️ IMAGE GENERATOR
if (imageGenBtn) {
    imageGenBtn.onclick = () => {
        const prompt = messageInput.value.trim();

        if (!prompt) {
            addChatMessage("⚠️ Type something for image", "bot");
            return;
        }

        const imgUrl = `https://via.placeholder.com/300x200?text=${encodeURIComponent(prompt)}`;

        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message", "bot");

        const img = document.createElement("img");
        img.src = imgUrl;
        img.style.maxWidth = "200px";
        img.style.borderRadius = "10px";

        msgDiv.appendChild(img);
        chatMessagesDiv.appendChild(msgDiv);

        msgDiv.scrollIntoView({ behavior: "smooth" });
    };
}

    // ========= INIT =========
    renderHistory();
// SETTINGS PANEL
const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
if (settingsBtn && settingsPanel) {
    settingsBtn.onclick = () => {
        settingsPanel.classList.toggle("active");
        settingsBtn.classList.toggle("active");
    };
}
const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");
const appContainer = document.querySelector(".app-container");

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("closed");
        appContainer.classList.toggle("sidebar-closed");

        toggleBtn.innerHTML =
            sidebar.classList.contains("closed") ? "❯" : "☰";
    });
}
})();

// CLOSE on outside click
document.addEventListener("click", (e) => {
    const panel = document.getElementById("settingsPanel");
    const btn = document.getElementById("settingsBtn");

    if (!panel.contains(e.target) && !btn.contains(e.target)) {
        panel.classList.remove("active");
        btn.classList.remove("active");
    }
});
const fontSize = document.getElementById("fontSize");
const fontStyle = document.getElementById("fontStyle");

// font size
fontSize.onchange = (e) => {
    document.body.style.fontSize = e.target.value;
    localStorage.setItem("fontSize", e.target.value);
};

// font style
fontStyle.onchange = (e) => {
    document.body.style.fontFamily = e.target.value;
    localStorage.setItem("fontStyle", e.target.value);
};

// load saved
const savedSize = localStorage.getItem("fontSize");
if (savedSize) document.body.style.fontSize = savedSize;

const savedFont = localStorage.getItem("fontStyle");
if (savedFont) document.body.style.fontFamily = savedFont;


function runPlugin(command, msg) {

    if (command === "calc") {
        let exp = msg.replace("/calc", "").trim();
        try {
            let result = eval(exp);
            addChatMessage("🧮 Result: " + result, "bot");
        } catch {
            addChatMessage("❌ Invalid calculation", "bot");
        }
    }

    if (command === "weather") {
        getWeather();
    }

    if (command === "translate") {
        let text = msg.replace("/translate", "").trim();
        translateText(text);
    }

    if (command === "sports") {
        getSports();
    }
} {

    if (command === "calc") {
        let exp = msg.replace("/calc", "").trim();
        try {
            let result = eval(exp);
            addChatMessage("🧮 Result: " + result, "bot");
        } catch {
            addChatMessage("❌ Invalid calculation", "bot");
        }
    }

    if (command === "weather") {
        addChatMessage("🌦️ Showing weather below 👇", "bot");
    }

    if (command === "translate") {
        let text = msg.replace("/translate", "").trim();
        addChatMessage("🌍 Translated: " + text.split("").reverse().join(""), "bot");
    }

    if (command === "sports") {
        showSportsNews();
    }
}


function showSportsNews() {
    const news = [
        "🏏 India wins thrilling match!",
        "⚽ Champions League highlights trending",
        "🏀 NBA playoffs heating up",
        "🎾 Grand Slam updates coming soon"
    ];

    let random = news[Math.floor(Math.random() * news.length)];

    addChatMessage("📰 Sports News: " + random, "bot");
}

const cmdButtons = document.querySelectorAll(".cmd-btn");

cmdButtons.forEach(btn => {
    btn.onclick = () => {
        const cmd = btn.getAttribute("data-cmd");
        messageInput.value = cmd + " ";
        messageInput.focus();
    };
});

btn.onclick = () => {
    const cmd = btn.getAttribute("data-cmd");
    runPlugin(cmd.replace("/", ""), cmd);
};
const shareBtn = document.getElementById("shareBtn");

if (shareBtn) {
    shareBtn.onclick = async () => {
        const chatText = getFullChatText();

        if (navigator.share) {
            await navigator.share({
                title: "My AI Chat",
                text: chatText
            });
        } else {
            showShareOptions(chatText);
        }
    };
}






async function getWeather(city = "Pune") {
    try {
        const apiKey = "YOUR_REAL_KEY";

        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await res.json();

        if (data.cod !== 200) {
            addChatMessage("❌ Weather error: " + data.message, "bot");
            return;
        }

        addChatMessage(
            `🌦️ ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`,
            "bot"
        );

    } catch (err) {
        addChatMessage("❌ Weather API failed", "bot");
        console.error(err);
    }
}


async function translateText(text, targetLang = "en") {
    try {
        const res = await fetch("https://translate.argosopentech.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: text,
                source: "auto",
                target: targetLang,
                format: "text"
            }),
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();
        return data.translatedText;

    } catch {
        return text; // fallback
    }
}


if (command === "translate") {
    let text = msg.replace("/translate", "").trim();
    translateText(text);
}

async function getSports() {
    const apiKey = "YOUR_API_KEY";

    const res = await fetch(
        `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`
    );

    const data = await res.json();

    if (data.data && data.data.length > 0) {
        let match = data.data[0];

        addChatMessage(
            `🏏 ${match.name}\nScore: ${match.score[0]?.r}/${match.score[0]?.w}`,
            "bot"
        );
    } else {
        addChatMessage("No live matches 😢", "bot");
    }
}





if (command === "sports") {
    getSports();
}



function detectCommand(msg) {
    if (msg.startsWith("/calc")) return "calc";
    if (msg.startsWith("/weather")) return "weather";
    if (msg.startsWith("/translate")) return "translate";
    if (msg.startsWith("/sports")) return "sports";

    return null;
}
function handleFileUpload(file) {
    if (!file) return;

    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", "user");

    // IMAGE PREVIEW
    if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.className = "preview-img";
        img.src = URL.createObjectURL(file);
        msgDiv.appendChild(img);
    } else {
        msgDiv.innerHTML = "📎 " + file.name;
    }

    // PROGRESS BAR
    const progressBar = document.createElement("div");
    progressBar.className = "upload-progress-bar";

    const progressFill = document.createElement("div");
    progressFill.className = "upload-progress-fill";

    progressBar.appendChild(progressFill);
    msgDiv.appendChild(progressBar);

    chatMessagesDiv.appendChild(msgDiv);

    // FAKE UPLOAD PROGRESS (SIMULATION)
    let progress = 0;

    const interval = setInterval(() => {
        progress += 10;
        progressFill.style.width = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 100);
}
