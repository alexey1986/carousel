(function() {

	var carousel = document.getElementById("carousel"),
		elementList = document.getElementById('carousel_wrapper'),
		btnStartCarousel = document.getElementById('startCarousel'),
		btnStopCarousel = document.getElementById('stopCarousel'),
		carousel_item = document.getElementsByClassName('carousel_item'),
		carousel_container = document.getElementsByClassName('carousel_container'),
		btn_prev = document.getElementById("prev"),
		btn_next = document.getElementById("next"),
		clickEvent = "click",
		mouseOver = 'mouseover',
		mouseLeave = 'mouseleave',
		total_width = 0,
		distance,
		index = 0,
		counter = 0,
		prev = -1,
		next = 1,
		interval = 2000,
		timer = null;

	var carouselIsWorking = false;

	function getCarouselItemsWidth() {
		for (var i = 0; i < carousel_item.length; i++) {
			total_width += carousel_item[i].offsetWidth;
			distance = carousel_item[i].offsetWidth;
		}
	}

	function setCarouserWrapperWidth() {
		elementList.style.width = total_width + "px";
	}

	function resizeCarouserWrapper(index) {
		carousel.style.height = carousel_item[index].offsetHeight + 'px';
	}

	function slideSomething(direction) {
		switch (direction) {
		case prev:

			if (index === 0) {
				cloneLastCarouselItem();
				resetScrollingPosition(direction);
			} else {
				index--;
			}
			break;

		case next:

			if (index === carousel_item.length - 1) {
				cloneFirstCarouselItem();
				resetScrollingPosition(direction);
			} else {
				index++;
			}
			break;
		}
		animateCarousel(carousel_container, direction);
		resizeCarouserWrapper(index);
	}

	function animateCarousel(element, direction) {
		var interval = window.setInterval(function() {
			counter = element[0].scrollLeft += 10 * direction;

			if (element[0].scrollLeft === 0 && direction === prev) {
				clearInterval(interval);
			}
			if (element[0].scrollLeft === (total_width - distance) && direction === next) {
				clearInterval(interval);
			}
			if (counter === distance) {
				clearInterval(interval);
			}
		}, 1);
	}

	function resetScrollingPosition(direction) {
		carousel_container[0].scrollLeft -= distance * direction;
	}

	function cloneFirstCarouselItem() {
		var firstItem = elementList.firstElementChild,
			firstItemClone = firstItem.cloneNode(true);

		elementList.appendChild(firstItemClone);
		elementList.removeChild(firstItem);
	}

	function cloneLastCarouselItem() {
		var lastItem = elementList.lastElementChild,
			lastItemClone = lastItem.cloneNode(true);

		elementList.insertBefore(lastItemClone, elementList.childNodes[0]);
		elementList.removeChild(lastItem);
	}

	function toggleCarousel(condition) {
		if (condition) {
			timer = setInterval(startCarousel, interval);
		} else {
			clearInterval(timer);
			timer = null;
		}
	}

	function startCarousel() {
		slideSomething(next);
	}

	carousel_container[0].addEventListener(mouseOver, function() {
		if (carouselIsWorking && timer !== null) toggleCarousel(false);
	});

	carousel_container[0].addEventListener(mouseLeave, function() {
		if (carouselIsWorking && timer === null) toggleCarousel(true);
	});

	btnStartCarousel.addEventListener(clickEvent, function() {
		carouselIsWorking = true;
		startCarousel();
		toggleCarousel(true);
	});

	btnStopCarousel.addEventListener(clickEvent, function() {
		carouselIsWorking = false;
		toggleCarousel(false);
	});

	btn_prev.addEventListener(clickEvent, function() {
		carouselIsWorking = false;
		if (timer !== null) toggleCarousel(false);
		slideSomething(prev);
	});

	btn_next.addEventListener(clickEvent, function() {
		carouselIsWorking = false;
		if (timer !== null) toggleCarousel(false);
		slideSomething(next);
	});

	window.onload = function() {
		getCarouselItemsWidth();
		setCarouserWrapperWidth();
		resizeCarouserWrapper(index);
	};

})();