document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const hackerConsole = document.getElementById('hacker-console');
    const loadingProgress = document.getElementById('loading-progress');
    const loadingStatusText = document.getElementById('loading-status-text');
    const appContainer = document.getElementById('app-container');

    const authScreen = document.getElementById('auth-screen');
    const authTitle = document.getElementById('auth-title');
    const authUsername = document.getElementById('auth-username');
    const authPassword = document.getElementById('auth-password');
    const authConfirmPassword = document.getElementById('auth-confirm-password');
    const authMainBtn = document.getElementById('auth-main-btn');
    const authMessage = document.getElementById('auth-message');
    const toggleAuthMode = document.getElementById('toggle-auth-mode');

    const mainChatListScreen = document.getElementById('main-chat-list-screen');
    const chatListContent = document.getElementById('chat-list-content');
    const searchChatIcon = document.getElementById('search-chat-icon');
    const chatSearchBar = document.getElementById('chat-search-bar');
    const promoBanner = document.getElementById('promo-banner');
    const closePromoBtn = document.getElementById('close-promo-btn');
    const fabChat = document.getElementById('fab-chat');

    const individualChatScreen = document.getElementById('individual-chat-screen');
    const backToChatListBtn = document.getElementById('back-to-chat-list');
    const currentChatAvatarImg = document.getElementById('current-chat-avatar-img');
    const currentChatAvatarText = document.getElementById('current-chat-avatar-text');
    const currentChatName = document.getElementById('current-chat-name');
    const currentChatStatus = document.getElementById('current-chat-status');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendMessageBtn = document.getElementById('send-message-btn');
    const callBtn = document.getElementById('call-btn');

    const callScreen = document.getElementById('call-screen');
    const backFromCallBtn = document.getElementById('back-from-call');
    const callAvatarImg = document.getElementById('call-avatar-img');
    const callAvatarText = document.getElementById('call-avatar-text');
    const callPartnerName = document.getElementById('call-partner-name');
    const callStatus = document.getElementById('call-status');
    const callTimer = document.getElementById('call-timer');
    const endCallBtn = document.querySelector('.end-call-btn');

    const statusScreen = document.getElementById('status-screen');
    const callsScreen = document.getElementById('calls-screen');
    const settingsScreen = document.getElementById('settings-screen');
    const backFromSettingsBtn = document.getElementById('back-from-settings');
    const profileScreen = document.getElementById('profile-screen');
    const backFromProfileBtn = document.getElementById('back-from-profile');
    const logoutBtnSettings = document.getElementById('logout-btn');
    const logoutBtnProfile = document.querySelector('#profile-screen .logout-btn');

    const userProfileName = document.getElementById('user-profile-name');
    const userProfileStatus = document.getElementById('user-profile-status');
    const userProfileAvatarText = document.getElementById('user-profile-avatar-text');
    const userProfileAvatarImg = document.getElementById('user-profile-avatar-img');
    const changeAvatarBtn = document.getElementById('change-avatar-btn');
    const avatarUpload = document.getElementById('avatar-upload');
    const editableName = document.getElementById('editable-name');
    const editablePhone = document.getElementById('editable-phone');
    const editableStatus = document.getElementById('editable-status');

    const bottomNavBtns = document.querySelectorAll('#bottom-nav .nav-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');


    let currentScreen = loadingScreen;
    let authMode = 'login'; // 'login' or 'register'
    let currentChatPartner = null;
    let callTimerInterval = null;

    // --- Utility Functions ---
    const showScreen = (screenToShow, direction = 'right') => {
        const prevScreen = currentScreen;

        // Reset previous screen's transform for next potential transition
        prevScreen.style.transform = '';
        prevScreen.style.opacity = '';

        // Add class to hide and transition out the previous screen
        prevScreen.classList.remove('active');
        prevScreen.classList.add('inactive'); // Temporarily move out

        // Prepare new screen for transition
        if (direction === 'right') {
            screenToShow.style.transform = 'translateX(100%)';
        } else { // 'left'
            screenToShow.style.transform = 'translateX(-100%)';
        }
        screenToShow.style.opacity = '0';
        screenToShow.classList.remove('inactive');
        screenToShow.classList.add('show'); // Use show to make it display: flex immediately

        // Force reflow to ensure initial state is applied before transition
        screenToShow.offsetWidth;

        // Start transition
        screenToShow.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
        screenToShow.style.transform = 'translateX(0)';
        screenToShow.style.opacity = '1';

        // After transition, set to active and hide previous
        setTimeout(() => {
            screenToShow.classList.add('active');
            screenToShow.classList.remove('show'); // Remove show as it's now active
            prevScreen.style.display = 'none'; // Fully hide previous screen
            prevScreen.classList.remove('inactive'); // Remove inactive class
        }, 400); // Match CSS transition duration

        currentScreen = screenToShow;
    };

    // --- Loading Screen Logic ---
    const loadingTexts = [
        "Initializing Annas Chat v3.5.0 Ultimate...",
        "Establishing Secure Connection [AES-256]...",
        "Authenticating Quantum Encryption Protocol...",
        "Scanning for optimal data routes...",
        "Loading UI Modules [Dark/Light Mode Ready]...",
        "Compiling AnimeFX Core Libraries...",
        "Calibrating Real-time Communication Channels...",
        "Activating AI-Powered Chat Assistant...",
        "Optimizing Performance Parameters...",
        "Verifying System Integrity (CRC32 Check)...",
        "Engaging Hyper-Thread Processing...",
        "Establishing P2P Encryption with Annas Servers...",
        "Fetching User Profile Data...",
        "Synchronizing Chat History...",
        "Almost there! Preparing your Ultimate Chat Experience...",
        "Access Granted. Welcome, User."
    ];
    let textIndex = 0;
    let charIndex = 0;
    let progressBarWidth = 0;
    const typeSpeed = 50; // ms per character
    const delayBetweenTexts = 1000; // ms

    const typeWriterEffect = () => {
        if (textIndex < loadingTexts.length) {
            const currentText = loadingTexts[textIndex];
            if (charIndex < currentText.length) {
                hackerConsole.textContent += currentText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriterEffect, typeSpeed);
            } else {
                hackerConsole.textContent += '\n'; // New line after each text
                textIndex++;
                charIndex = 0;
                updateProgressBar();
                setTimeout(typeWriterEffect, delayBetweenTexts);
            }
        } else {
            // All texts displayed, loading complete
            loadingStatusText.textContent = "Loading Complete. Launching Application...";
            setTimeout(() => {
                loadingScreen.classList.add('inactive'); // Start fade out and move left
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    showScreen(authScreen); // Show auth screen after loading
                }, 400); // Match CSS transition duration
            }, 1000);
        }
    };

    const updateProgressBar = () => {
        const progressPerText = 100 / loadingTexts.length;
        progressBarWidth += progressPerText;
        if (progressBarWidth > 100) progressBarWidth = 100;
        loadingProgress.style.width = `${progressBarWidth}%`;
        loadingStatusText.textContent = `Loading: ${Math.round(progressBarWidth)}%`;
    };

    // Start loading animation
    typeWriterEffect();

    // --- Auth Screen Logic ---
    toggleAuthMode.addEventListener('click', () => {
        if (authMode === 'login') {
            authMode = 'register';
            authTitle.textContent = 'Daftar Akun Baru';
            authConfirmPassword.style.display = 'block';
            authMainBtn.textContent = 'Daftar';
            toggleAuthMode.textContent = 'Sudah punya akun? Masuk di sini.';
        } else {
            authMode = 'login';
            authTitle.textContent = 'Selamat Datang!';
            authConfirmPassword.style.display = 'none';
            authMainBtn.textContent = 'Masuk';
            toggleAuthMode.textContent = 'Belum punya akun? Daftar di sini.';
        }
        authMessage.textContent = ''; // Clear message on mode switch
    });

    authMainBtn.addEventListener('click', () => {
        const username = authUsername.value.trim();
        const password = authPassword.value.trim();
        const confirmPassword = authConfirmPassword.value.trim();

        if (username === '' || password === '') {
            authMessage.style.color = var(--danger-color);
            authMessage.textContent = 'Nama pengguna dan kata sandi tidak boleh kosong!';
            return;
        }

        if (authMode === 'register') {
            if (password !== confirmPassword) {
                authMessage.style.color = var(--danger-color);
                authMessage.textContent = 'Kata sandi tidak cocok!';
                return;
            }
            // Simulate successful registration
            authMessage.style.color = var(--success-color);
            authMessage.textContent = 'Pendaftaran berhasil! Silakan masuk.';
            // Optionally, switch to login mode after successful registration
            setTimeout(() => {
                authMode = 'login';
                authTitle.textContent = 'Selamat Datang!';
                authConfirmPassword.style.display = 'none';
                authMainBtn.textContent = 'Masuk';
                toggleAuthMode.textContent = 'Belum punya akun? Daftar di sini.';
                authUsername.value = '';
                authPassword.value = '';
                authConfirmPassword.value = '';
                authMessage.textContent = '';
            }, 1500);
        } else { // Login mode
            // Simulate login
            if (username === 'user' && password === 'pass') { // Simple hardcoded login
                authMessage.style.color = var(--success-color);
                authMessage.textContent = 'Login berhasil! Memuat chat...';
                setTimeout(() => {
                    authUsername.value = '';
                    authPassword.value = '';
                    showScreen(mainChatListScreen);
                    populateChatList(); // Load chat list after login
                    showPromoBanner(); // Show promo banner after login
                }, 1000);
            } else {
                authMessage.style.color = var(--danger-color);
                authMessage.textContent = 'Nama pengguna atau kata sandi salah!';
            }
        }
    });

    // --- Main Chat List Screen Logic ---
    const dummyChats = [
        { id: 'anna', name: 'Anna (Admin)', avatar: 'A', isOnline: true, lastMessage: 'Selamat datang di Annas Chat Ultimate!', time: '15:30', unread: 1, isAdmin: true },
        { id: 'budi', name: 'Budi Santoso', avatar: 'B', isOnline: true, lastMessage: 'Oke, sampai nanti!', time: '14:15', unread: 0 },
        { id: 'citra', name: 'Citra Dewi', avatar: 'C', isOnline: false, lastMessage: 'Terima kasih banyak ya!', time: 'Kemarin', unread: 3 },
        { id: 'diana', name: 'Diana Putri', avatar: 'D', isOnline: true, lastMessage: 'Saya sudah transfer.', time: '10:00', unread: 0 },
        { id: 'eko', name: 'Eko Nugroho', avatar: 'E', isOnline: false, lastMessage: 'Baik, saya cek dulu.', time: 'Selasa', unread: 0 },
        { id: 'fitri', name: 'Fitriani', avatar: 'F', isOnline: true, lastMessage: 'Kapan bisa ketemu?', time: '09:45', unread: 1 },
        { id: 'angga', name: 'Angga Pratama', avatar: 'A', isOnline: false, lastMessage: 'Notifikasi baru: Anda mendapatkan 100 koin!', time: 'Minggu', unread: 1 },
        { id: 'hanif', name: 'Hanif Ramadhan', avatar: 'H', isOnline: true, lastMessage: 'Oke, siap!', time: '17:00', unread: 0 },
        { id: 'lia', name: 'Lia Anggraini', avatar: 'L', isOnline: false, lastMessage: 'Sudah di terima.', time: 'Rabu', unread: 0 },
        { id: 'rizky', name: 'Rizky Fadillah', avatar: 'R', isOnline: true, lastMessage: 'Mantap!', time: '16:20', unread: 2 },
    ];

    const populateChatList = (searchTerm = '') => {
        chatListContent.innerHTML = '';
        const filteredChats = dummyChats.filter(chat =>
            chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filteredChats.forEach(chat => {
            const chatItem = document.createElement('div');
            chatItem.classList.add('chat-list-item');
            chatItem.dataset.chatId = chat.id;

            chatItem.innerHTML = `
                <div class="avatar">
                    ${chat.avatar.length === 1 ? `<span>${chat.avatar}</span>` : `<img src="${chat.avatar}" alt="${chat.name}">`}
                    ${chat.isOnline ? '<div class="online-indicator"></div>' : ''}
                </div>
                <div class="chat-info">
                    <div class="chat-name">${chat.name} ${chat.isAdmin ? '<i class="fas fa-check-circle admin-badge" title="Admin Terverifikasi"></i>' : ''}</div>
                    <div class="last-message">${chat.lastMessage}</div>
                </div>
                <div class="chat-meta">
                    <span class="timestamp">${chat.time}</span>
                    ${chat.unread > 0 ? `<span class="unread-count">${chat.unread}</span>` : ''}
                </div>
            `;
            chatListContent.appendChild(chatItem);

            chatItem.addEventListener('click', () => openIndividualChat(chat));
        });
    };

    searchChatIcon.addEventListener('click', () => {
        chatSearchBar.focus();
    });

    chatSearchBar.addEventListener('input', (e) => {
        populateChatList(e.target.value);
    });

    closePromoBtn.addEventListener('click', () => {
        promoBanner.style.display = 'none';
    });

    const showPromoBanner = () => {
        promoBanner.style.display = 'flex';
        setTimeout(() => {
            promoBanner.classList.add('show'); // If you add a .show class for fade-in
        }, 100);
    };

    // --- Individual Chat Screen Logic ---
    const dummyMessages = {
        'anna': [
            { sender: 'received', text: 'Halo Annas!', time: '15:28' },
            { sender: 'sent', text: 'Halo Annas! Selamat datang di Annas Chat Ultimate.', time: '15:29' },
            { sender: 'received', text: 'Wah, keren banget aplikasinya!', time: '15:30' },
            { sender: 'sent', text: 'Terima kasih! Kami berusaha memberikan yang terbaik.', time: '15:30' },
            { sender: 'info', text: 'Anda sekarang terhubung dengan Annas (Admin)', time: '15:31' }
        ],
        'budi': [
            { sender: 'received', text: 'Hai, Annas. Ada apa?', time: '14:10' },
            { sender: 'sent', text: 'Cuma mau nanya kabar, bro. Baik-baik aja?', time: '14:11' },
            { sender: 'received', text: 'Baik kok! Kamu gimana?', time: '14:12' },
            { sender: 'sent', text: 'Puji Tuhan, baik juga. Ada waktu ngopi nanti?', time: '14:13' },
            { sender: 'received', text: 'Oke, sampai nanti!', time: '14:15' }
        ],
        // Add more dummy messages for other chats
    };

    const openIndividualChat = (chat) => {
        currentChatPartner = chat;
        currentChatName.textContent = chat.name;
        currentChatStatus.textContent = chat.isOnline ? 'Online' : chat.time; // Show last seen if offline

        if (chat.avatar.length === 1) {
            currentChatAvatarText.textContent = chat.avatar;
            currentChatAvatarImg.style.display = 'none';
            currentChatAvatarText.style.display = 'flex';
        } else {
            currentChatAvatarImg.src = chat.avatar;
            currentChatAvatarImg.style.display = 'block';
            currentChatAvatarText.style.display = 'none';
        }

        chatMessages.innerHTML = ''; // Clear previous messages
        const messages = dummyMessages[chat.id] || [];
        messages.forEach(msg => {
            addMessageToChat(msg.sender, msg.text, msg.time, msg.sender === 'received' ? chat.name : 'Anda');
        });
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom

        showScreen(individualChatScreen);
    };

    const addMessageToChat = (sender, text, time, senderName = '') => {
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble');
        messageBubble.classList.add(sender);

        let content = '';
        if (sender === 'info') {
            content = text;
        } else {
            content = `
                ${sender === 'received' ? `<span class="message-sender">${senderName}</span>` : ''}
                ${text}
                <span class="message-timestamp">${time}</span>
            `;
        }
        messageBubble.innerHTML = content;
        chatMessages.appendChild(messageBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto scroll to latest message
    };

    backToChatListBtn.addEventListener('click', () => {
        showScreen(mainChatListScreen, 'left');
        messageInput.value = ''; // Clear input field
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent new line
            sendMessageBtn.click();
        }
    });
    // Auto-resize textarea
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = (messageInput.scrollHeight) + 'px';
    });


    sendMessageBtn.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const now = new Date();
            const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            addMessageToChat('sent', messageText, time, 'Anda');
            messageInput.value = '';
            messageInput.style.height = 'auto'; // Reset height
            // Simulate a reply after a short delay
            setTimeout(() => {
                const reply = "Oke, saya sudah terima pesan Anda.";
                addMessageToChat('received', reply, time, currentChatPartner.name);
            }, 1000);
        }
    });

    // --- Call Screen Logic ---
    callBtn.addEventListener('click', () => {
        if (!currentChatPartner) return;

        callPartnerName.textContent = currentChatPartner.name;
        if (currentChatPartner.avatar.length === 1) {
            callAvatarText.textContent = currentChatPartner.avatar;
            callAvatarImg.style.display = 'none';
            callAvatarText.style.display = 'flex';
        } else {
            callAvatarImg.src = currentChatPartner.avatar;
            callAvatarImg.style.display = 'block';
            callAvatarText.style.display = 'none';
        }

        callStatus.textContent = 'Memanggil...';
        callTimer.style.display = 'none';
        clearInterval(callTimerInterval); // Clear any previous timer

        showScreen(callScreen);

        // Simulate call answer after 3 seconds
        setTimeout(() => {
            callStatus.textContent = 'Terhubung';
            callTimer.style.display = 'block';
            let seconds = 0;
            callTimerInterval = setInterval(() => {
                seconds++;
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                callTimer.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
            }, 1000);
        }, 3000);
    });

    backFromCallBtn.addEventListener('click', () => {
        clearInterval(callTimerInterval);
        showScreen(individualChatScreen, 'left');
    });

    endCallBtn.addEventListener('click', () => {
        clearInterval(callTimerInterval);
        callStatus.textContent = 'Panggilan berakhir';
        callTimer.style.display = 'none';
        setTimeout(() => {
            showScreen(individualChatScreen, 'left');
        }, 1000);
    });

    // --- Bottom Navigation Logic ---
    bottomNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            bottomNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const targetScreenId = btn.dataset.target;
            const targetScreen = document.getElementById(targetScreenId);
            showScreen(targetScreen);
        });
    });

    // --- Settings Screen Logic ---
    const settingItems = document.querySelectorAll('.setting-item');
    settingItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const targetText = item.querySelector('h3').textContent.toLowerCase();
            if (targetText.includes('akun')) {
                showScreen(profileScreen);
            }
            // Add more conditions for other settings sections if needed
            // else if (targetText.includes('notifikasi')) { /* show notifications screen */ }
        });
    });

    backFromSettingsBtn.addEventListener('click', () => {
        showScreen(mainChatListScreen, 'left');
    });

    logoutBtnSettings.addEventListener('click', () => {
        alert('Anda telah keluar!'); // Simulate logout
        showScreen(authScreen); // Go back to auth screen
    });
     logoutBtnProfile.addEventListener('click', () => {
        alert('Anda telah keluar!'); // Simulate logout
        showScreen(authScreen); // Go back to auth screen
    });

    // --- Profile Screen Logic ---
    backFromProfileBtn.addEventListener('click', () => {
        showScreen(settingsScreen, 'left');
    });

    changeAvatarBtn.addEventListener('click', () => {
        avatarUpload.click(); // Trigger file input click
    });

    avatarUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                userProfileAvatarImg.src = e.target.result;
                userProfileAvatarImg.style.display = 'block';
                userProfileAvatarText.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    // Editable profile details
    document.querySelectorAll('.detail-item .edit-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const valueElement = e.currentTarget.closest('.detail-item').querySelector('.value');
            const originalText = valueElement.textContent;
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = originalText;
            inputField.classList.add('edit-input'); // Add a class for styling if needed

            valueElement.replaceWith(inputField);
            inputField.focus();

            const saveChanges = () => {
                valueElement.textContent = inputField.value;
                inputField.replaceWith(valueElement);
                // Update user profile name/status if changed
                if (valueElement.id === 'editable-name') {
                    userProfileName.textContent = inputField.value;
                } else if (valueElement.id === 'editable-status') {
                    userProfileStatus.textContent = inputField.value;
                }
            };

            inputField.addEventListener('blur', saveChanges); // Save on blur
            inputField.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    inputField.blur(); // Trigger blur to save
                }
            });
        });
    });


    // --- Theme Toggle Logic ---
    const toggleTheme = () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        themeToggleBtn.className = isLight ? 'fas fa-moon' : 'fas fa-sun'; // Change icon based on theme
        localStorage.setItem('theme', isLight ? 'light' : 'dark'); // Save preference
    };

    themeToggleBtn.addEventListener('click', toggleTheme);

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggleBtn.className = 'fas fa-moon';
    } else {
        document.body.classList.remove('light-theme');
        themeToggleBtn.className = 'fas fa-sun';
    }


});