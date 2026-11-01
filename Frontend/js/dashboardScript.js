// Sidebar Toggle Functionality
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        let sidebarCollapsed = false;

        sidebarToggle.addEventListener('click', () => {
            sidebarCollapsed = !sidebarCollapsed;
            sidebar.classList.toggle('collapsed', sidebarCollapsed);
            mainContent.classList.toggle('sidebar-collapsed', sidebarCollapsed);
            sidebarToggle.textContent = sidebarCollapsed ? '›' : '‹';
        });

        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');

        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('mobile-open');
                }
            }
        });

        // Steps Chart
        const ctx = document.getElementById('stepsChart').getContext('2d');
        let stepsChart;

        const chartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Steps',
                data: [8500, 9200, 8800, 10500, 11200, 12000, 11800, 12500, 12847, 11900, 10800, 9500],
                borderColor: '#8B5CF6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#F59E0B',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
            }]
        };

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            },
            elements: {
                point: {
                    hoverBackgroundColor: '#F59E0B'
                }
            }
        };

        function createChart() {
            stepsChart = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: chartOptions
            });
        }

        // Initialize chart when page loads
        window.addEventListener('load', () => {
            createChart();
            animateCounter();
        });

        // Animate step counter
        function animateCounter() {
            const counter = document.getElementById('stepCount');
            const target = 12847;
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toLocaleString();
            }, 20);
        }

        // Add fade-in animation to elements as they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all workout cards
        document.querySelectorAll('.workout-card').forEach(card => {
            observer.observe(card);
        });

        // Add click handlers for workout cards
        document.querySelectorAll('.start-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.workout-card');
                const title = card.querySelector('.workout-title').textContent;
                
                // Add a subtle animation
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 150);
                
                console.log(`Starting workout: ${title}`);
            });
        });

        // Add hover effects for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
            });
        });

        // Responsive handling
        function handleResize() {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('mobile-open');
            }
        }

        window.addEventListener('resize', handleResize);

        // --- Food Recognition Logic ---
        const foodImageInput = document.getElementById('foodImageInput');
        const analyzeFoodBtn = document.getElementById('analyzeFoodBtn');
        const imagePreviewContainer = document.getElementById('imagePreviewContainer');
        const imagePreview = document.getElementById('imagePreview');
        const nutritionResult = document.getElementById('nutritionResult');

        let selectedFile = null;

        foodImageInput.addEventListener('change', () => {
            selectedFile = foodImageInput.files[0];
            if (selectedFile) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreview.src = e.target.result;
                    imagePreviewContainer.style.display = 'block';
                };
                reader.readAsDataURL(selectedFile);
                analyzeFoodBtn.disabled = false;
                nutritionResult.innerHTML = ''; // Clear previous results
            }
        });

        analyzeFoodBtn.addEventListener('click', async () => {
            if (!selectedFile) {
                alert('Please select an image first.');
                return;
            }

            // Show loading spinner
            nutritionResult.innerHTML = '<div class="loading-spinner"></div>';

            const formData = new FormData();
            formData.append('foodImage', selectedFile);

            try {
                const response = await fetch('http://localhost:3000/api/recognize', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                // Display the results
                if (data.nutrition && data.nutrition.message) {
                    nutritionResult.innerHTML = `<p class="error">${data.nutrition.message}</p>`;
                } else if (data.nutrition) {
                    nutritionResult.innerHTML = `
                        <h3>${data.recognizedFood}</h3>
                        <p><strong>Calories:</strong> ${data.nutrition.calories} kcal</p>
                        <p><strong>Protein:</strong> ${data.nutrition.protein} g</p>
                        <p><strong>Carbs:</strong> ${data.nutrition.carbs} g</p>
                        <p><strong>Fats:</strong> ${data.nutrition.fats} g</p>
                        <p><small>Based on approx. ${data.nutrition.unit}</small></p>
                    `;
                } else {
                     nutritionResult.innerHTML = '<p class="error">Could not analyze the food item.</p>';
                }

            } catch (error) {
                console.error('Error analyzing food:', error);
                nutritionResult.innerHTML = '<p class="error">An error occurred. Please try again.</p>';
            }
        });

// --- Chatbot Logic ---
const chatbotIcon = document.getElementById('chatbotIcon');
const chatbotWindow = document.getElementById('chatbotWindow');
const closeChatbot = document.getElementById('closeChatbot');
const chatbotBody = document.getElementById('chatbotBody');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

chatbotIcon.addEventListener('click', () => {
    chatbotWindow.style.display = 'flex';
});

closeChatbot.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
});

chatbotSend.addEventListener('click', () => {
    const userMessage = chatbotInput.value;
    if (userMessage.trim() !== '') {
        appendMessage(userMessage, 'user');
        chatbotInput.value = '';
        generateBotResponse(userMessage);
    }
});

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        chatbotSend.click();
    }
});

function appendMessage(message, sender) {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('chat-message', `${sender}-message`);

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;

    messageWrapper.appendChild(messageContent);
    chatbotBody.appendChild(messageWrapper);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function generateBotResponse(userMessage) {
    const apiKey = '';
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

    const data = {
        contents: [
            {
                parts: [
                    {
                        text: userMessage
                    }
                ]
            }
        ]
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Gemini API Response:', data);
        if (data.candidates && data.candidates.length > 0) {
            const botResponse = data.candidates[0].content.parts[0].text;
            appendMessage(botResponse, 'bot');
        } else {
            appendMessage('Sorry, I could not get a response. Please try again.', 'bot');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage('Sorry, something went wrong. Please try again.', 'bot');
    });
}