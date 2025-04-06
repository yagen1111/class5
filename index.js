document.addEventListener('DOMContentLoaded', function() {
    // תפריט נייד
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // סגירת התפריט הנייד בעת לחיצה על קישור
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
    
    // אקורדיון
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // סגירת כל הפריטים האחרים
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // פתיחה/סגירה של הפריט הנוכחי
            item.classList.toggle('active');
        });
    });
    
    // קרוסלה
    const carousel = document.querySelector('.carousel');
    
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        const indicators = carousel.querySelectorAll('.indicator');
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        
        // עדכון האינדיקטורים כדי שיתאים למספר השקופיות
        const indicatorsContainer = carousel.querySelector('.carousel-indicators');
        if (indicatorsContainer) {
            // ניקוי אינדיקטורים קיימים
            indicatorsContainer.innerHTML = '';
            
            // יצירת אינדיקטורים חדשים לפי מספר השקופיות
            for (let i = 0; i < totalSlides; i++) {
                const indicator = document.createElement('span');
                indicator.classList.add('indicator');
                if (i === 0) indicator.classList.add('active');
                indicator.dataset.index = i;
                indicatorsContainer.appendChild(indicator);
            }
        }
        
        // אינדיקטורים מעודכנים
        const updatedIndicators = carousel.querySelectorAll('.indicator');
        
        // פונקציה להצגת שקופית מסוימת
        const showSlide = (index) => {
            // הסתרת כל השקופיות
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // הסרת הסימון מכל האינדיקטורים
            updatedIndicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
            
            // עדכון האינדקס הנוכחי
            currentIndex = index;
            
            // הצגת השקופית הנוכחית
            slides[currentIndex].classList.add('active');
            updatedIndicators[currentIndex].classList.add('active');
        };
        
        // מעבר לשקופית הבאה
        const nextSlide = () => {
            let newIndex = (currentIndex + 1) % totalSlides;
            showSlide(newIndex);
        };
        
        // מעבר לשקופית הקודמת
        const prevSlide = () => {
            let newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            showSlide(newIndex);
        };
        
        // הוספת אירועי לחיצה לכפתורים
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // הוספת אירועי לחיצה לאינדיקטורים
        updatedIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // אוטומטי החלפת שקופיות כל 5 שניות
        setInterval(nextSlide, 3000);
    }
});