//background

window.addEventListener('scroll', () => {
	const scroll = window.scrollY;
	const moveX = scroll * -0.03;
	const moveY = scroll * -0.07;
	document.querySelector('.bg').style.transform = `translate(${moveX}px,${moveY}px)`;
});

// Burger Menu

const burgerBtn = document.querySelector('.burger');
const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.querySelectorAll('.burger-menu a');

burgerBtn?.addEventListener('click', () => {
	if (!burgerMenu.classList.contains('visible')) {
		burgerMenu.classList.add('visible');
		burgerBtn.classList.add('active');
		document.body.style.overflow = 'hidden';
	} else {
		burgerMenu.classList.remove('visible');
		burgerBtn.classList.remove('active');
		document.body.style.overflow = 'visible';
	}
});

navLinks.forEach(link => {
	link.addEventListener('click', () => {
		burgerBtn.classList.remove('active');
		burgerMenu.classList.remove('visible');
		document.body.style.overflow = 'visible';
	});
});

// Products

const section = document.querySelector('.prods');
const blocks = document.querySelectorAll('.block');

function prodsReveal() {
	blocks.forEach(prod => {
		const winCenter = window.innerHeight / 2;
		const rect = prod.getBoundingClientRect();
		const prodCenter = rect.top + rect.height / 2;
		const blockBtn = prod.parentElement.querySelector('.blBtn')
		if (prodCenter <= winCenter * 1.9 && prodCenter * 1.3 > winCenter * 0.4) {
			prod.classList.add('show');
			blockBtn.classList.add('show');
		} else {
			prod.classList.remove('show');
			blockBtn.classList.remove('show');
		}

	});
};

window.addEventListener('load', prodsReveal);
window.addEventListener('scroll', prodsReveal);

//About us

const about = document.querySelectorAll('.about');

window.addEventListener('scroll', () => {
	about.forEach((block, i) => {
		const rect = block.getBoundingClientRect();
		const next = about[i + 1];
		if (next) {
			const rectNext = next.getBoundingClientRect();
			const overlap = 120 + rect.height * 0.65 - rectNext.top;
			if (overlap > 0) {
				block.style.opacity = Math.max(1 - overlap / 300, 0);
			} else {
				block.style.opacity = 1;
			}
		}
	});
});

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		const block = entry.target;
		if (entry.boundingClientRect.top > 120 && entry.isIntersecting) {
			block.classList.add('sticky-about');
		} else if (entry.boundingClientRect.top >= 120) {
			block.classList.remove('sticky-about');
		}
	});
}, {
	threshold: [0],
	rootMargin: '-105px 0px 0px 0px'
});

about.forEach(block => observer.observe(block));
