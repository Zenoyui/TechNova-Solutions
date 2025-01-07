document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const openModalButtons = document.querySelectorAll('[data-modal]');
    const closeModalButtons = document.querySelectorAll('.modal-close');

    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    };

    const closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    };

    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-close');
            closeModal(modalId);
        });
    });

    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });

    const initializeCharts = () => {
        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                },
                tooltip: {
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        };

        const ctxClients = document.getElementById('clientsChart').getContext('2d');
        new Chart(ctxClients, {
            type: 'bar',
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
                datasets: [{
                    label: 'Количество Клиентов',
                    data: [50, 75, 100, 150, 200, 250],
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: commonOptions
        });

        const ctxProjects = document.getElementById('projectsChart').getContext('2d');
        new Chart(ctxProjects, {
            type: 'line',
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
                datasets: [{
                    label: 'Количество Проектов',
                    data: [20, 35, 50, 80, 120, 160],
                    fill: false,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    tension: 0.1
                }]
            },
            options: commonOptions
        });

        const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
        new Chart(ctxRevenue, {
            type: 'pie',
            data: {
                labels: ['Веб-разработка', 'Графический дизайн', 'SEO', 'Маркетинг'],
                datasets: [{
                    label: 'Доходы',
                    data: [40, 25, 20, 15],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    ...commonOptions.plugins,
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                }
            }
        });
    };

    initializeCharts();

    const carousel = document.querySelector('.carousel');
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    const slideWidth = slides[0].getBoundingClientRect().width;

    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };

    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    slides[0].classList.add('current-slide');

    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;

        if (prevSlide) {
            moveToSlide(track, currentSlide, prevSlide);
        } else {
            moveToSlide(track, currentSlide, slides[slides.length - 1]);
        }
    });

    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;

        if (nextSlide) {
            moveToSlide(track, currentSlide, nextSlide);
        } else {
            moveToSlide(track, currentSlide, slides[0]);
        }
    });

    setInterval(() => {
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        if (!nextSlide) {
            nextSlide = slides[0];
        }
        moveToSlide(track, currentSlide, nextSlide);
    }, 5000);

});
