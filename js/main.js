// ===== MAIN APPLICATION CLASS =====
class AccesoDigitalApp {
    constructor() {
        this.init();
        this.bindEvents();
        this.initComponents();
    }

    init() {
        // Initialize loading screen
        this.showLoading();
        
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100
            });
        }

        // Initialize particles
        this.initParticles();
        
        // Initialize charts
        this.initCharts();
        
        // Hide loading screen after everything is loaded
        setTimeout(() => {
            this.hideLoading();
        }, 2000);
    }

    showLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    bindEvents() {
        // Navigation events
        this.initNavigation();
        
        // Calculator events
        this.initCalculator();
        
        // Gallery events
        this.initGallery();
        
        // Contact form events
        this.initContactForm();
        
        // Scroll events
        this.initScrollEffects();
        
        // Keyboard navigation
        this.initKeyboardNavigation();
    }

    initComponents() {
        // Tab functionality
        this.initTabs();
        
        // Preset cards
        this.initPresetCards();
        
        // Export/Share functionality
        this.initExportShare();
    }

    // ===== PARTICLES BACKGROUND =====
    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: ['#2E7D32', '#1976D2', '#4CAF50', '#42A5F5']
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#2E7D32',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 6,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'repulse'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }
    }

    // ===== NAVIGATION =====
    initNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const header = document.querySelector('.header');

        // Mobile menu toggle
        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
                
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
            });
        });

        // Header scroll effects
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class
            if (currentScrollY > 50) {
                header?.classList.add('scrolled');
            } else {
                header?.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
            
            // Update active navigation link
            this.updateActiveNavLink();
        });
    }

    scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ===== CALCULATOR =====
    initCalculator() {
        const calculatorForm = document.getElementById('calculatorForm');
        const resultsContainer = document.getElementById('results');
        
        calculatorForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleCalculation();
        });
    }

    async handleCalculation() {
        const btnText = document.querySelector('.btn-text');
        const btnLoading = document.querySelector('.btn-loading');
        const calculateBtn = document.querySelector('.calculate-btn');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        calculateBtn.disabled = true;
        
        try {
            const formData = this.collectFormData();
            let data;
            
            try {
                // Try API call first
                const response = await fetch('/api/calculos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    const apiResponse = await response.json();
                    data = apiResponse.data;
                } else {
                    throw new Error('API not available');
                }
            } catch (error) {
                // Fallback to local calculation
                console.log('Using local calculations...');
                data = this.calculateMetricsLocally(formData);
            }
            
            this.displayResults(data, formData);
            this.animateResults();
            
        } catch (error) {
            console.error('Calculation error:', error);
            this.showErrorMessage('Error en el cálculo. Por favor, verifique los datos.');
        } finally {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            calculateBtn.disabled = false;
        }
    }

    collectFormData() {
        return {
            region: document.getElementById('region')?.value || '',
            poblacion: parseInt(document.getElementById('poblacion')?.value) || 0,
            computadores: parseInt(document.getElementById('computadores')?.value) || 0,
            celulares: parseInt(document.getElementById('celulares')?.value) || 0,
            tabletas: parseInt(document.getElementById('tabletas')?.value) || 0,
            internet: parseInt(document.getElementById('internet')?.value) || 0
        };
    }

    calculateMetricsLocally(data) {
        const { poblacion, computadores, celulares, tabletas, internet } = data;
        
        if (poblacion === 0) {
            throw new Error('La población no puede ser cero');
        }
        
        return {
            computadores_per_capita: ((computadores / poblacion) * 100).toFixed(1),
            celulares_per_capita: ((celulares / poblacion) * 100).toFixed(1),
            tabletas_per_capita: ((tabletas / poblacion) * 100).toFixed(1),
            internet_penetration: ((internet / poblacion) * 100).toFixed(1),
            dispositivos_total: computadores + celulares + tabletas,
            brecha_digital: (100 - ((internet / poblacion) * 100)).toFixed(1),
            indice_conectividad: this.calculateConnectivityIndex(computadores, celulares, tabletas, internet, poblacion),
            ratio_dispositivos_internet: internet > 0 ? ((computadores + celulares + tabletas) / internet).toFixed(2) : '0'
        };
    }

    calculateConnectivityIndex(computadores, celulares, tabletas, internet, poblacion) {
        if (poblacion === 0) return 0;
        
        const weights = {
            computadores: 0.3,
            celulares: 0.25,
            tabletas: 0.15,
            internet: 0.3
        };
        
        const index = (
            (computadores / poblacion) * weights.computadores +
            (celulares / poblacion) * weights.celulares +
            (tabletas / poblacion) * weights.tabletas +
            (internet / poblacion) * weights.internet
        ) * 100;
        
        return index.toFixed(1);
    }

    displayResults(data, originalData) {
        const resultsGrid = document.getElementById('resultsGrid');
        const resultsContainer = document.getElementById('results');
        const resultsSummary = document.getElementById('resultsSummary');
        
        const metrics = [
            { 
                label: 'Computadores por cada 100 hab.', 
                value: data.computadores_per_capita + '%', 
                icon: '💻',
                color: 'linear-gradient(135deg, #2E7D32, #4CAF50)'
            },
            { 
                label: 'Celulares por cada 100 hab.', 
                value: data.celulares_per_capita + '%', 
                icon: '📱',
                color: 'linear-gradient(135deg, #1976D2, #42A5F5)'
            },
            { 
                label: 'Tabletas por cada 100 hab.', 
                value: data.tabletas_per_capita + '%', 
                icon: '📱',
                color: 'linear-gradient(135deg, #9C27B0, #E1BEE7)'
            },
            { 
                label: 'Penetración de Internet', 
                value: data.internet_penetration + '%', 
                icon: '🌐',
                color: 'linear-gradient(135deg, #FF9800, #FFE0B2)'
            },
            { 
                label: 'Total de Dispositivos', 
                value: data.dispositivos_total.toLocaleString(), 
                icon: '📊',
                color: 'linear-gradient(135deg, #607D8B, #B0BEC5)'
            },
            { 
                label: 'Brecha Digital', 
                value: data.brecha_digital + '%', 
                icon: '📉',
                color: 'linear-gradient(135deg, #F44336, #FFCDD2)'
            },
            { 
                label: 'Índice de Conectividad', 
                value: data.indice_conectividad + '%', 
                icon: '🔗',
                color: 'linear-gradient(135deg, #4CAF50, #C8E6C9)'
            },
            { 
                label: 'Ratio Dispositivos/Internet', 
                value: data.ratio_dispositivos_internet, 
                icon: '⚖️',
                color: 'linear-gradient(135deg, #3F51B5, #C5CAE9)'
            }
        ];
        
        resultsGrid.innerHTML = metrics.map(metric => `
            <div class="metric-card" style="background: ${metric.color};">
                <div class="metric-icon">${metric.icon}</div>
                <div class="metric-value">${metric.value}</div>
                <div class="metric-label">${metric.label}</div>
            </div>
        `).join('');
        
        // Create summary
        const summary = this.generateSummary(data, originalData);
        resultsSummary.innerHTML = `
            <div class="summary-card">
                <h4>📋 Resumen del Análisis</h4>
                <p>${summary}</p>
                <div class="summary-recommendations">
                    ${this.generateRecommendations(data)}
                </div>
            </div>
        `;
        
        resultsContainer.classList.add('show');
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    generateSummary(data, originalData) {
        const region = originalData.region ? this.getRegionName(originalData.region) : 'la región seleccionada';
        const connectivityLevel = parseFloat(data.indice_conectividad);
        
        let connectivityStatus = '';
        if (connectivityLevel >= 80) connectivityStatus = 'excelente';
        else if (connectivityLevel >= 60) connectivityStatus = 'buena';
        else if (connectivityLevel >= 40) connectivityStatus = 'regular';
        else connectivityStatus = 'baja';
        
        return `En ${region}, el índice de conectividad digital es ${connectivityStatus} (${data.indice_conectividad}%). 
                La penetración de internet alcanza el ${data.internet_penetration}%, mientras que la brecha digital 
                afecta al ${data.brecha_digital}% de la población. Los dispositivos móviles tienen una penetración 
                del ${data.celulares_per_capita}%, superando significativamente a los computadores (${data.computadores_per_capita}%).`;
    }

    generateRecommendations(data) {
        const recommendations = [];
        
        if (parseFloat(data.brecha_digital) > 30) {
            recommendations.push(`
                <div class="recommendation high-priority">
                    <span class="rec-icon">🚨</span>
                    <span>Prioridad Alta: Ampliar cobertura de internet (brecha del ${data.brecha_digital}%)</span>
                </div>
            `);
        }
        
        if (parseFloat(data.computadores_per_capita) < 40) {
            recommendations.push(`
                <div class="recommendation medium-priority">
                    <span class="rec-icon">💻</span>
                    <span>Implementar programas de acceso a computadores</span>
                </div>
            `);
        }
        
        if (parseFloat(data.indice_conectividad) < 60) {
            recommendations.push(`
                <div class="recommendation medium-priority">
                    <span class="rec-icon">📈</span>
                    <span>Desarrollar estrategias integrales de digitalización</span>
                </div>
            `);
        }
        
        return recommendations.join('') || '<p class="no-recommendations">✅ Los indicadores están en niveles aceptables</p>';
    }

    getRegionName(regionCode) {
        const regions = {
            'antioquia': 'Antioquia',
            'bogota': 'Bogotá D.C.',
            'valle': 'Valle del Cauca',
            'cundinamarca': 'Cundinamarca',
            'atlantico': 'Atlántico',
            'santander': 'Santander'
        };
        return regions[regionCode] || regionCode;
    }

    animateResults() {
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.5s ease';
                
                requestAnimationFrame(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }, index * 100);
        });
    }

    showErrorMessage(message) {
        // Create or update error message
        let errorDiv = document.querySelector('.calculator-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'calculator-error';
            document.querySelector('.calculator-container').appendChild(errorDiv);
        }
        
        errorDiv.innerHTML = `
            <div class="error-content">
                <span class="error-icon">⚠️</span>
                <span class="error-text">${message}</span>
            </div>
        `;
        
        setTimeout(() => {
            errorDiv.style.opacity = '0';
            setTimeout(() => errorDiv.remove(), 300);
        }, 5000);
    }

    // ===== TABS FUNCTIONALITY =====
    initTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update active tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === targetTab + '-tab') {
                        content.classList.add('active');
                    }
                });
            });
        });
    }

    // ===== PRESET CARDS =====
    initPresetCards() {
        const presetCards = document.querySelectorAll('.preset-card');
        
        const presetData = {
            'bogota': {
                poblacion: 8200000,
                computadores: 4264000,
                celulares: 7790000,
                tabletas: 1476000,
                internet: 6396000
            },
            'antioquia': {
                poblacion: 6500000,
                computadores: 2470000,
                celulares: 5785000,
                tabletas: 780000,
                internet: 4225000
            },
            'valle': {
                poblacion: 4700000,
                computadores: 1927000,
                celulares: 4089000,
                tabletas: 658000,
                internet: 3243000
            }
        };
        
        presetCards.forEach(card => {
            card.addEventListener('click', () => {
                const region = card.getAttribute('data-region');
                const data = presetData[region];
                
                if (data) {
                    // Update form fields
                    document.getElementById('region').value = region;
                    document.getElementById('poblacion').value = data.poblacion;
                    document.getElementById('computadores').value = data.computadores;
                    document.getElementById('celulares').value = data.celulares;
                    document.getElementById('tabletas').value = data.tabletas;
                    document.getElementById('internet').value = data.internet;
                    
                    // Update card selection
                    presetCards.forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    
                    // Switch to manual tab
                    document.querySelector('.tab-btn[data-tab="manual"]').click();
                }
            });
        });
    }

    // ===== CHARTS =====
    initCharts() {
        if (typeof Chart === 'undefined') return;
        
        // Chart.js global configuration
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.color = '#666';
        
        this.initPenetrationChart();
        this.initRegionalChart();
        this.initTimelineChart();
    }

    initPenetrationChart() {
        const ctx = document.getElementById('penetrationChart');
        if (!ctx) return;
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Computadores', 'Celulares', 'Tabletas', 'Sin dispositivo'],
                datasets: [{
                    data: [38, 89, 12, 15],
                    backgroundColor: [
                        '#2E7D32',
                        '#1976D2',
                        '#9C27B0',
                        '#E0E0E0'
                    ],
                    borderWidth: 0,
                    cutout: '60%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }

    initRegionalChart() {
        const ctx = document.getElementById('regionalChart');
        if (!ctx) return;
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Bogotá', 'Antioquia', 'Valle', 'Cundinamarca', 'Atlántico', 'Santander'],
                datasets: [
                    {
                        label: 'Computadores (%)',
                        data: [52, 38, 41, 35, 33, 36],
                        backgroundColor: '#2E7D32',
                        borderRadius: 4
                    },
                    {
                        label: 'Internet (%)',
                        data: [78, 65, 69, 61, 58, 63],
                        backgroundColor: '#1976D2',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }

    initTimelineChart() {
        const ctx = document.getElementById('timelineChart');
        if (!ctx) return;
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
                datasets: [
                    {
                        label: 'Penetración Internet',
                        data: [45, 52, 58, 62, 67, 71, 75],
                        borderColor: '#1976D2',
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Dispositivos Móviles',
                        data: [65, 70, 75, 80, 85, 88, 91],
                        borderColor: '#2E7D32',
                        backgroundColor: 'rgba(46, 125, 50, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    // ===== GALLERY =====
    initGallery() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('mainImage');
        const imageTitle = document.getElementById('imageTitle');
        const imageDescription = document.getElementById('imageDescription');
        
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const src = thumbnail.getAttribute('data-src');
                const title = thumbnail.getAttribute('data-title');
                const desc = thumbnail.getAttribute('data-desc');
                
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
                
                // Update main image with fade effect
                mainImage.style.opacity = '0';
                
                setTimeout(() => {
                    mainImage.src = src;
                    mainImage.alt = title;
                    imageTitle.textContent = title;
                    imageDescription.textContent = desc;
                    mainImage.style.opacity = '1';
                }, 300);
            });
        });
    }

    // ===== CONTACT FORM =====
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        contactForm?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.contact-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Enviando...';
            submitBtn.disabled = true;
            
            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                this.showNotification('¡Mensaje enviado correctamente!', 'success');
                contactForm.reset();
                
            } catch (error) {
                this.showNotification('Error al enviar el mensaje', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // ===== EXPORT/SHARE FUNCTIONALITY =====
    initExportShare() {
        const exportBtn = document.getElementById('exportResults');
        const shareBtn = document.getElementById('shareResults');
        
        exportBtn?.addEventListener('click', () => this.exportResults());
        shareBtn?.addEventListener('click', () => this.shareResults());
    }

    exportResults() {
        const resultsData = this.getResultsData();
        if (!resultsData) {
            this.showNotification('No hay resultados para exportar', 'error');
            return;
        }
        
        // Create CSV content
        const csv = this.generateCSV(resultsData);
        
        // Download file
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `acceso-digital-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        
        this.showNotification('Resultados exportados correctamente', 'success');
    }

    shareResults() {
        const resultsData = this.getResultsData();
        if (!resultsData) {
            this.showNotification('No hay resultados para compartir', 'error');
            return;
        }
        
        const shareText = `Análisis de Acceso Digital en Colombia:\n` +
                         `• Penetración Internet: ${resultsData.internet_penetration}%\n` +
                         `• Índice Conectividad: ${resultsData.indice_conectividad}%\n` +
                         `• Brecha Digital: ${resultsData.brecha_digital}%\n\n` +
                         `Ver más en: ${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Acceso Digital Colombia',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                this.showNotification('Resultados copiados al portapapeles', 'success');
            });
        }
    }

    getResultsData() {
        const resultsGrid = document.getElementById('resultsGrid');
        if (!resultsGrid || !resultsGrid.children.length) return null;
        
        // Extract data from displayed results
        const metricCards = resultsGrid.querySelectorAll('.metric-card');
        const results = {};
        
        metricCards.forEach(card => {
            const label = card.querySelector('.metric-label')?.textContent;
            const value = card.querySelector('.metric-value')?.textContent;
            
            if (label && value) {
                const key = label.toLowerCase().replace(/[^a-z]/g, '_');
                results[key] = value;
            }
        });
        
        return results;
    }

    generateCSV(data) {
        const headers = ['Métrica', 'Valor'];
        const rows = Object.entries(data).map(([key, value]) => [
            key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            value
        ]);
        
        const csvContent = [headers, ...rows]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');
        
        return csvContent;
    }

    // ===== SCROLL EFFECTS =====
    initScrollEffects() {
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroVideo = document.querySelector('.hero-video');
            
            if (heroVideo) {
                const speed = scrolled * 0.5;
                heroVideo.style.transform = `translateY(${speed}px)`;
            }
        });
        
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger counter animations
                    if (entry.target.classList.contains('metric-card')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements for animations
        document.querySelectorAll('.fade-in, .metric-card, .team-card, .chart-card').forEach(el => {
            observer.observe(el);
        });
    }

    animateCounter(element) {
        const valueElement = element.querySelector('.metric-value');
        if (!valueElement) return;
        
        const finalValue = valueElement.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        
        if (isNaN(numericValue)) return;
        
        let currentValue = 0;
        const increment = numericValue / 50;
        const suffix = finalValue.replace(/[\d.]/g, '');
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(timer);
            }
            
            valueElement.textContent = Math.round(currentValue) + suffix;
        }, 30);
    }

    // ===== KEYBOARD NAVIGATION =====
    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key closes mobile menu
            if (e.key === 'Escape') {
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            }
            
            // Arrow keys for gallery navigation
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const activeThumb = document.querySelector('.thumbnail.active');
                const thumbnails = Array.from(document.querySelectorAll('.thumbnail'));
                const currentIndex = thumbnails.indexOf(activeThumb);
                
                if (currentIndex !== -1) {
                    let newIndex;
                    if (e.key === 'ArrowLeft') {
                        newIndex = currentIndex > 0 ? currentIndex - 1 : thumbnails.length - 1;
                    } else {
                        newIndex = currentIndex < thumbnails.length - 1 ? currentIndex + 1 : 0;
                    }
                    
                    thumbnails[newIndex].click();
                    e.preventDefault();
                }
            }
        });
    }

    // ===== UTILITY METHODS =====
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    formatNumber(num) {
        return new Intl.NumberFormat('es-CO').format(num);
    }

    // ===== ERROR HANDLING =====
    handleError(error, context = 'General') {
        console.error(`Error in ${context}:`, error);
        this.showNotification(`Error: ${error.message}`, 'error');
    }
}

// ===== ADDITIONAL STYLES FOR DYNAMIC ELEMENTS =====
const additionalStyles = `
    .calculator-error {
        background: #ffebee;
        border: 1px solid #f44336;
        border-radius: 8px;
        padding: 1rem;
        margin-top: 1rem;
        animation: slideIn 0.3s ease;
    }
    
    .error-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #d32f2f;
    }
    
    .summary-card {
        background: #f8f9fa;
        border-radius: 12px;
        padding: 2rem;
        margin-top: 2rem;
    }
    
    .summary-card h4 {
        color: #2e7d32;
        margin-bottom: 1rem;
        font-size: 1.3rem;
    }
    
    .summary-recommendations {
        margin-top: 1.5rem;
    }
    
    .recommendation {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        margin-bottom: 0.5rem;
        border-radius: 8px;
        font-weight: 500;
    }
    
    .recommendation.high-priority {
        background: #ffebee;
        border-left: 4px solid #f44336;
        color: #d32f2f;
    }
    
    .recommendation.medium-priority {
        background: #fff3e0;
        border-left: 4px solid #ff9800;
        color: #f57c00;
    }
    
    .no-recommendations {
        color: #2e7d32;
        font-weight: 500;
        text-align: center;
        padding: 1rem;
    }
    
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        padding: 1rem 1.5rem;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left: 4px solid #4caf50;
    }
    
    .notification-error {
        border-left: 4px solid #f44336;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ===== INITIALIZE APPLICATION =====
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AccesoDigitalApp();
});

// ===== SERVICE WORKER REGISTRATION (OPTIONAL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`🚀 Página cargada en ${loadTime}ms`);
        
        // Track Core Web Vitals if available
        if ('web-vitals' in window) {
            // Implementation would go here
        }
    }
});

// ===== ANALYTICS INTEGRATION (PLACEHOLDER) =====
function trackEvent(category, action, label, value) {
    // Google Analytics 4 or other analytics integration
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
    console.log(`📊 Event: ${category}/${action}/${label}`);
}