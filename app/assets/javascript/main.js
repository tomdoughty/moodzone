// ES6 or Vanilla JavaScript

const storeName = 'resultsStore';
const store = window.sessionStorage.getItem(storeName)
const path = window.location.pathname.replace('/', '');
const button = document.querySelector('.nhsuk-button');

if (button) {
	button.addEventListener('click', () => {
		const storeObj = store ? JSON.parse(store) : {};
		window.sessionStorage.setItem(storeName, JSON.stringify({
			...storeObj,
			[path]: document.querySelector('input[name="example"]:checked').value*1
		}));
	});
}

if (path === 'results') {

	const depressionHeader = document.querySelector('.depression-header > span');
	const anxietyHeader = document.querySelector('.anxiety-header > span');
	const depressionParagraph = document.querySelector('.depression-content');
	const anxietyParagraph = document.querySelector('.anxiety-content');

	const depressionKeys = [1,2,3,4,5,6,7,8];
	let depressionAnswers = 0;

	const anxietyKeys = [9,10,11,12,13,14,15,16,18];
	let anxietyAnswers = 0;

	const storeObj = store ? JSON.parse(store) : {};
	
	const depressionScore = (depressionKeys.reduce((score, key) => {
		if(storeObj[key]) {
			depressionAnswers++;
			return score + storeObj[key];
		}
		return score;
	}, 0) / (depressionAnswers*3))*100;

	const anxietyScore = (anxietyKeys.reduce((score, key) => {
		if(typeof storeObj[key] !== 'string') {
			anxietyAnswers++;
			return score + storeObj[key];
		}
		return score;
	}, 0) / (anxietyAnswers*3))*100;

	const content = {
		'high': 'High percentage show applicable links',
		'medium': 'Medium percentage show applicable links',
		'low': 'Low percentage show applicable links'
	};

	let depressionContent = content['low'];

	if (depressionScore > 66) {
		depressionContent = content['high'];
	} else if (depressionScore > 33) {
		depressionContent = content['medium'];
	}

	let anxietyContent = content['low'];

	if (anxietyScore > 66) {
		anxietyContent = content['high'];
	} else if (anxietyScore > 33) {
		anxietyContent = content['medium'];
	}

	depressionHeader.innerHTML = Math.round(depressionScore) || 0;
	anxietyHeader.innerHTML = Math.round(anxietyScore) || 0;

	depressionParagraph.innerHTML = depressionContent;
	anxietyParagraph.innerHTML = anxietyContent;
}