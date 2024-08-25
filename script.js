document.addEventListener('DOMContentLoaded', () => {
    const book = document.getElementById('book');
    const cover = document.getElementById('cover');
    const backCover = document.getElementById('back-cover');
    const pageSpreads = document.querySelectorAll('.page-spread');
    let currentSpread = 0;

    function showSpread(index) {
        pageSpreads.forEach((spread, i) => {
            if (i === index) {
                spread.classList.add('visible');
                spread.classList.remove('hidden');
                spread.style.zIndex = pageSpreads.length - i; // Higher z-index for visible spread
            } else {
                spread.classList.remove('visible');
                spread.classList.add('hidden');
                spread.style.zIndex = pageSpreads.length - i - 1; // Lower z-index for hidden spreads
            }
        });
    }

    function nextSpread() {
        if (currentSpread < pageSpreads.length - 1) {
            const currentPage = pageSpreads[currentSpread];
            const nextPage = pageSpreads[currentSpread + 1];
            
            currentPage.style.transition = 'transform 0.5s';
            nextPage.style.transition = 'transform 0.5s';
            
            currentPage.style.transform = 'rotateY(-180deg)';
            nextPage.classList.remove('hidden');
            nextPage.style.transform = 'rotateY(0deg)';
            
            currentSpread++;
            showSpread(currentSpread);
        }
    }

    function previousSpread() {
        if (currentSpread > 0) {
            const currentPage = pageSpreads[currentSpread];
            const prevPage = pageSpreads[currentSpread - 1];
            
            currentPage.style.transition = 'transform 0.5s';
            prevPage.style.transition = 'transform 0.5s';
            
            currentPage.style.transform = 'rotateY(180deg)';
            prevPage.classList.remove('hidden');
            prevPage.style.transform = 'rotateY(0deg)';
            
            currentSpread--;
            showSpread(currentSpread);
        }
    }

    cover.addEventListener('click', () => {
        nextSpread();
    });

    backCover.addEventListener('click', () => {
        previousSpread();
    });

    book.addEventListener('click', (e) => {
        if (e.target === cover || e.target === backCover) return;
        
        const bookRect = book.getBoundingClientRect();
        const clickX = e.clientX - bookRect.left;
        
        if (clickX < bookRect.width / 2) {
            previousSpread();
        } else {
            nextSpread();
        }
    });

    // Modify the keyboard event listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            previousSpread();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            nextSpread();
        }
    });

    // Update the page content initialization
    pageSpreads.forEach((spread, index) => {
        if (index > 0 && index < pageSpreads.length - 1) { // Skip cover and back cover
            const leftPage = spread.children[0];
            const rightPage = spread.children[1];
            
            const leftPageNum = index * 2 - 1;
            const rightPageNum = index * 2;
            
            if (leftPageNum <= 19) { // Ensure we don't exceed 20 pages (10 spreads)
                leftPage.innerHTML = `
                    <img src="img/${leftPageNum}.png" alt="Page ${leftPageNum} Image">
                    ${leftPage.innerHTML}
                `;
                leftPage.setAttribute('data-page', leftPageNum);
            }
            
            if (rightPageNum <= 20) { // Ensure we don't exceed 20 pages (10 spreads)
                rightPage.innerHTML = `
                    <img src="img/${rightPageNum}.png" alt="Page ${rightPageNum} Image">
                    ${rightPage.innerHTML}
                `;
                rightPage.setAttribute('data-page', rightPageNum);
            }
        }
    });

    // Show the first spread (cover) initially
    showSpread(0);
});