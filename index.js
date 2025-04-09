// אימות גיל
function verifyAge(isAdult) {
    const verificationElement = document.getElementById('age-verification');
    if (!verificationElement) return;
    
    if (isAdult) {
        // המשתמש אישר שהוא מעל גיל 18
        verificationElement.style.opacity = '0';
        setTimeout(() => {
            verificationElement.style.display = 'none';
            document.body.style.overflow = 'visible';
            // אנימציה להופעת התוכן
            animateContent();
        }, 600);
    } else {
        // המשתמש מתחת לגיל 18
        alert('מצטערים, אתר זה מיועד למשתמשים מעל גיל 18 בלבד.');
        // הפניה לאתר חיצוני אחר לאחר העברה
        setTimeout(() => {
            window.location.href = "https://www.google.com";
        }, 2000);
    }
}

// אנימציה להופעת תוכן בטעינה
function animateContent() {
    const elements = document.querySelectorAll('.header-content, .marquee-content, section');
    if (!elements.length) return;
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, index * 200);
    });
}

// טיפול בתפריט נייד
document.addEventListener('DOMContentLoaded', function() {
    // וודא שהסקריפט טוען רק לאחר טעינת העמוד
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // פתיחה וסגירה של התפריט הנייד
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            // וודא שיש אייקון לפני שמנסים לשנות אותו
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('bi-list');
                icon.classList.toggle('bi-x-lg');
            }
        });
    }
    
    // סגירת התפריט בלחיצה על לינק
    if (navLinks.length && nav && menuBtn) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    const icon = menuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.add('bi-list');
                        icon.classList.remove('bi-x-lg');
                    }
                }
            });
        });
    }

    // הוספת אפקט אקורדיון לשאלות נפוצות
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            if (!header) return;
            
            header.addEventListener('click', function() {
                // סגירת כל האיטמים הפתוחים
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // פתיחה או סגירה של האיטם הנוכחי
                item.classList.toggle('active');
            });
        });
    }

    // טיפול בקרוסלה
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    // אם אין שקופיות, אין צורך להמשיך עם הקרוסלה
    if (!slides.length) return;
    
    let currentSlide = 0;
    
    // וודא שלפחות שקופית אחת פעילה
    let hasActiveSlide = false;
    slides.forEach(slide => {
        if (slide.classList.contains('active')) {
            hasActiveSlide = true;
        }
    });
    
    // אם אין שקופית פעילה, הפעל את הראשונה
    if (!hasActiveSlide && slides.length > 0) {
        slides[0].classList.add('active');
        if (indicators.length > 0) {
            indicators[0].classList.add('active');
        }
    }
    
    // פונקציה להצגת שקופית
    function showSlide(n) {
        if (!slides.length) return;
        
        // מסירה את הקלאס אקטיב מכל השקופיות
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        if (indicators.length) {
            indicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
        }
        
        // עדכון האינדקס הנוכחי בהתאם לגבולות המערך
        currentSlide = (n + slides.length) % slides.length;
        
        // הוספת קלאס אקטיב לשקופית הנוכחית
        slides[currentSlide].classList.add('active');
        
        // בדיקה שיש מספיק אינדיקטורים
        if (indicators.length > currentSlide) {
            indicators[currentSlide].classList.add('active');
        }
    }
    
    // מעבר לשקופית הבאה
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // מעבר לשקופית הקודמת
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // אירועי לחיצה על כפתורי ניווט
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // אירועי לחיצה על האינדיקטורים
    if (indicators.length) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
            });
        });
    }
    
    // מעבר אוטומטי של שקופיות אם יש לפחות שתי שקופיות
    if (slides.length > 1) {
        setInterval(nextSlide, 5000);
    }
    
    // הוספת אירועי גלילה חלקה
    if (navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (!targetId || targetId.charAt(0) !== '#') return;
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // אפקט הופעה בגלילה לסקשנים
    const animatedElements = document.querySelectorAll('.section-title, .about-content, .service-card, .accordion-item, .map-container, .contact-container');
    
    if (animatedElements.length) {
        // פונקציה לבדיקת אם אלמנט נראה במסך
        function checkIfInView() {
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('animate');
                }
            });
        }
        
        // בדיקה ראשונית בטעינת העמוד
        checkIfInView();
        
        // בדיקה בגלילה
        window.addEventListener('scroll', checkIfInView);
    }

    // אנימציה לכרטיסי הבירה
    const beerCards = document.querySelectorAll('.service-card');
    
    if (beerCards.length) {
        beerCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const img = this.querySelector('img');
                if (img) img.classList.add('shake');
            });
            
            card.addEventListener('mouseleave', function() {
                const img = this.querySelector('img');
                if (img) img.classList.remove('shake');
            });
        });
    }

    // אפקט פרללקס לרקע
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // הזזת הרקע בקצב שונה מהגלילה
        document.body.style.backgroundPosition = `0px ${scrollPosition * 0.05}px`;
    });

    // טיפול בטופס צור קשר
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('#name');
            const emailInput = this.querySelector('#email');
            const messageInput = this.querySelector('#message');
            
            // וידוא פשוט של השדות
            let isValid = true;
            
            if (nameInput && !nameInput.value.trim()) {
                markInvalid(nameInput);
                isValid = false;
            } else if (nameInput) {
                markValid(nameInput);
            }
            
            if (emailInput && (!emailInput.value.trim() || !validateEmail(emailInput.value))) {
                markInvalid(emailInput);
                isValid = false;
            } else if (emailInput) {
                markValid(emailInput);
            }
            
            if (messageInput && !messageInput.value.trim()) {
                markInvalid(messageInput);
                isValid = false;
            } else if (messageInput) {
                markValid(messageInput);
            }
            
            if (isValid) {
                // כאן היה מתחבר לשרת לשליחת הטופס
                // במקום זה נציג הודעת הצלחה
                showSuccessMessage();
                this.reset();
            }
        });
        
        // פונקציה לבדיקת תקינות אימייל
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // פונקציה לסימון שדה כשגוי
        function markInvalid(input) {
            if (!input) return;
            input.classList.add('invalid');
            input.classList.remove('valid');
        }
        
        // פונקציה לסימון שדה כתקין
        function markValid(input) {
            if (!input) return;
            input.classList.remove('invalid');
            input.classList.add('valid');
        }
        
        // פונקציה להצגת הודעת הצלחה
        function showSuccessMessage() {
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.';
            
            contactForm.insertAdjacentElement('afterend', successMessage);
            
            setTimeout(() => {
                successMessage.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                successMessage.classList.remove('show');
                
                setTimeout(() => {
                    successMessage.remove();
                }, 300);
            }, 3000);
        }
    }

    // אפקט צף ללוגו
    const logo = document.querySelector('.logo-container img');
    
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'shake 0.5s ease-in-out infinite';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.animation = 'float 3s ease-in-out infinite';
        });
    }

    // הוספת CSS באופן דינמי
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes shake {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(5deg); }
            50% { transform: rotate(0deg); } /* תיקון: היה 0eg */
            75% { transform: rotate(-5deg); }
            100% { transform: rotate(0deg); }
        }
        
        .fade-in {
            animation: fadeIn 0.8s ease-in-out forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .animate {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .shake {
            animation: shakeImage 0.8s ease-in-out;
        }
        
        @keyframes shakeImage {
            0% { transform: rotate(0deg); }
            20% { transform: rotate(10deg); }
            40% { transform: rotate(-10deg); }
            60% { transform: rotate(5deg); }
            80% { transform: rotate(-5deg); }
            100% { transform: rotate(0deg); }
        }
        
        .success-message {
            background-color: rgba(39, 174, 96, 0.9);
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            margin-top: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
        
        .success-message.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .invalid {
            border-color: #e74c3c !important;
            box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
        }
        
        .valid {
            border-color: #27ae60 !important;
            box-shadow: 0 0 0 2px rgba(39, 174, 96, 0.2) !important;
        }
        
        body {
            overflow: hidden;
        }
        
        #age-verification {
            transition: opacity 0.6s ease;
        }
        
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
    `;
    
    document.head.appendChild(styleElement);
});