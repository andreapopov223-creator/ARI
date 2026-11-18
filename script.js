const voiceButton = document.getElementById("voiceButton");
const statusText = document.getElementById("statusText");
const chat = document.getElementById("chat");

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messages = document.getElementById("messages");

let isAwake = false;

// Нажатие на центральную кнопку
voiceButton.addEventListener("click", () => {
    isAwake = !isAwake;

    if (isAwake) {
        statusText.textContent = "ARI активен";
        chat.classList.add("open");
    } else {
        statusText.textContent = "ARI спит";
        chat.classList.remove("open");
    }
});

// Добавление сообщения
function sendMessage() {
    const text = messageInput.value.trim();

    if (text === "") return;

    const message = document.createElement("div");
    message.className = "message user-message";
    message.textContent = text;

    messages.appendChild(message);

    messageInput.value = "";
    messages.scrollTop = messages.scrollHeight;

    statusText.textContent = "ARI получил сообщение";
}

// Кнопка отправки
sendButton.addEventListener("click", sendMessage);

// Отправка через Enter
messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
const pageScreen = document.getElementById("pageScreen");
const pageTitle = document.getElementById("pageTitle");
const pageDescription = document.getElementById("pageDescription");
const backButton = document.getElementById("backButton");

const voiceSection = document.querySelector(".voice-section");
const bottomMenu = document.querySelector(".bottom-menu");
const status = document.querySelector(".status");

const pages = {
    subscription: {
        title: "Подписка",
        description: "Здесь будут тарифы ARI Free, Plus и Pro."
    },

    files: {
        title: "Файлы",
        description: "Здесь можно будет загружать и анализировать файлы."
    },

    apps: {
        title: "Приложения",
        description: "Здесь будут инструменты и приложения ARI."
    },

    profile: {
        title: "Профиль",
        description: "Здесь будут настройки и информация об аккаунте."
    }
};


// Открытие разделов
document.querySelectorAll(".bottom-menu button").forEach(button => {
    button.addEventListener("click", () => {
        const page = pages[button.dataset.page];

        if (!page) return;

        chat.classList.remove("open");

        pageTitle.textContent = page.title;
        pageDescription.textContent = page.description;

        // Переключение содержимого разделов
        const subscriptionContent =
            document.getElementById("subscriptionContent");

        const filesContent =
            document.getElementById("filesContent");

        const profileContent =
            document.getElementById("profileContent");

        subscriptionContent.style.display =
            button.dataset.page === "subscription" ? "flex" : "none";

        filesContent.style.display =
            button.dataset.page === "files" ? "flex" : "none";

        profileContent.style.display =
            button.dataset.page === "profile" ? "flex" : "none";
        const appsContent = document.getElementById("appsContent");

        appsContent.style.display =
        button.dataset.page === "apps" ? "flex" : "none";
        pageScreen.classList.add("active");

        voiceSection.style.display = "none";
        status.style.display = "none";
    });
});

// Возврат на главный экран
backButton.addEventListener("click", () => {
    document.getElementById("appsContent").style.display = "none";
    pageScreen.classList.remove("active");

    document.getElementById("subscriptionContent").style.display = "none";
    document.getElementById("filesContent").style.display = "none";
    document.getElementById("profileContent").style.display = "none";

    voiceSection.style.display = "flex";
    status.style.display = "flex";
    bottomMenu.style.display = "flex";
});

// ===== ARI FILE MANAGER =====

const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");

let selectedFiles = [];

fileInput.addEventListener("change", () => {
    const newFiles = Array.from(fileInput.files);

    newFiles.forEach(file => {
        const exists = selectedFiles.some(
            item => item.name === file.name &&
                    item.size === file.size
        );

        if (!exists) {
            selectedFiles.push(file);
        }
    });

    fileInput.value = "";
    renderFiles();
});

function renderFiles() {
    fileList.innerHTML = "";

    if (selectedFiles.length === 0) {
        fileList.innerHTML =
            '<p class="empty-files">Пока здесь пусто</p>';
        return;
    }

    selectedFiles.forEach((file, index) => {
        const item = document.createElement("div");
        item.className = "file-item";

        const icon = document.createElement("div");
        icon.className = "file-icon";
        icon.textContent = "📄";

        const info = document.createElement("div");
        info.className = "file-info";

        const name = document.createElement("strong");
        name.textContent = file.name;

        const size = document.createElement("span");
        size.textContent =
            (file.size / 1024).toFixed(1) + " КБ";

        const remove = document.createElement("button");
        remove.className = "file-remove";
        remove.textContent = "×";
        remove.addEventListener("click", () => {
            selectedFiles.splice(index, 1);
            renderFiles();
        });

        info.appendChild(name);
        info.appendChild(size);

        item.appendChild(icon);
        item.appendChild(info);
        item.appendChild(remove);

        fileList.appendChild(item);
    });
}
