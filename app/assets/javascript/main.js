// ES6 or Vanilla JavaScript

const storeName = 'resultsStore';
const store = window.sessionStorage.getItem(storeName)
const path = window.location.pathname.replace('/', '');
const button = document.querySelector('.js-button');

if (button) {
	if (path === '17') {
		button.addEventListener('click', () => {
			const checkedRadios = [...document.querySelectorAll('input[name="q17"]:checked')].map(input => input.value);
			const storeObj = store ? JSON.parse(store) : {};
			window.sessionStorage.setItem(storeName, JSON.stringify({
				...storeObj,
				[path]: checkedRadios
			}));
		});
	} else {
		button.addEventListener('click', () => {
			const storeObj = store ? JSON.parse(store) : {};
			window.sessionStorage.setItem(storeName, JSON.stringify({
				...storeObj,
				[path]: document.querySelector('input[name="example"]:checked').value*1
			}));
		});
	}
}

if (path === 'results') {
	const depressionHeader = document.querySelector('.depression-header > span');
	const anxietyHeader = document.querySelector('.anxiety-header > span');
	const depressionParagraph = document.querySelector('.depression-content .nhsuk-details__text');
	const anxietyParagraph = document.querySelector('.anxiety-content .nhsuk-details__text');
	const resultCareCard = document.querySelector('.js-care-card');

	const depressionKeys = [1,2,3,4,5,6,7,8];
	let depressionAnswers = 0;

	const anxietyKeys = [10,11,12,13,14,15,16];
	let anxietyAnswers = 0;

	const storeObj = store ? JSON.parse(store) : {};

	const depressionScore = depressionKeys.reduce((score, key) => {
		if(storeObj[key]) {
			depressionAnswers++;
			return score + storeObj[key];
		}
		return score;
	}, 0);

	const anxietyScore = anxietyKeys.reduce((score, key) => {
		if(typeof storeObj[key]) {
			anxietyAnswers++;
			return score + storeObj[key];
		}
		return score;
	}, 0);

	const content = {
		'highDepression': `
			<p>Based on your answers, you often experience symptoms of low mood and depression.</p>
			<p>It's important that you speak to someone about your symptoms as soon as possible so they can offer support and advise you about the best treatment.</p>	
			<p>There are also things you can try yourself that may help improve your symptoms in the meantime.</p>`,
		'mediumDepression': `
			<p>Based on your answers, you sometimes experience symptoms of low mood and depression.</p>
			<p>There are things you can try yourself that may help improve your symptoms. </p>
			<p>Support is also available if self-help techniques are not working and you’re finding it hard to cope.</p>`,
		'lowDepression': `
			<p>Based on your answers, you don't often experience symptoms of low mood and depression.</p>
			<p>There are still things you can try yourself that may help if you do experience symptoms.</p>
			<p>Support is also available if self-help techniques are not working and you’re finding it hard to cope.</p>`,
		'highAnxiety': `
			<p>Based on your answers, you often experience symptoms of anxiety.</p>
			<p>It's important that you speak to someone about your symptoms as soon as possible so they can offer support and advise you about the best treatment.</p>
			<p>There are also things you can try yourself that may help improve your symptoms in the meantime.</p>`,
		'mediumAnxiety': `
			<p>Based on your answers, you sometimes experience symptoms of anxiety.</p>
			<p>There are things you can try yourself that may help improve you symptoms. </p>	
			<p>Support is also available if self-help techniques are not working and you’re finding it hard to cope.</p>`,
		'lowAnxiety': `
			<p>Based on your answers, you don't often experience symptoms of anxiety.</p>
			<p>There are still things you can try yourself that may help if you do experience symptoms.</p>
			<p>Support is also available if self-help techniques are not working and you’re finding it hard to cope.</p>`
	};

	let depressionContent = content['lowDepression'];

	if (depressionScore > 16) {
		depressionContent = content['highDepression'];
	} else if (depressionScore > 8) {
		depressionContent = content['mediumDepression'];
	}

	let anxietyContent = content['lowAnxiety'];

	if (anxietyScore > 14) {
		anxietyContent = content['highAnxiety'];
	} else if (anxietyScore > 7) {
		anxietyContent = content['mediumAnxiety'];
	}

	depressionHeader.innerHTML = `${depressionScore} out of ${depressionAnswers*3}`;
	anxietyHeader.innerHTML = `${anxietyScore} out of ${anxietyAnswers*3}`;
	
	if (depressionScore > 8 || anxietyScore > 7) {
		resultCareCard.innerHTML = `<div class="nhsuk-care-card nhsuk-care-card--urgent">
		<div class="nhsuk-care-card__heading-container">
		  <h3 class="nhsuk-care-card__heading"><span role="text"><span class="nhsuk-u-visually-hidden">Urgent advice: </span>Call 111 or ask for an urgent GP appointment if:</span></h3>
		  <span class="nhsuk-care-card__arrow" aria-hidden="true"></span>
		</div>
		<div class="nhsuk-care-card__content">
		  <ul>
	  		<li>you need help urgently</li>
	  		</ul>
			<p>111 can tell you the right place to get help if you need to see someone. Go to <a href="111.nhs.uk">111.nhs.uk</a> or <a href="call:111">call 111</a>.</p>
			<p>You can also call Samaritans free on <a href="call:116123">116 123</a> to talk to someone.</p> 
		</div>
	  </div>
	  `;
	};

	depressionParagraph.innerHTML = depressionContent;
	anxietyParagraph.innerHTML = anxietyContent;

	const linksList = storeObj[17];

	if (linksList.length) {

		const links = [
			'<li><a href="https://www.nhs.uk/conditions/health-anxiety/">health anxiety</a></li>',
			'<li><a href="https://www.nhs.uk/live-well/healthy-weight/">how to maintain a healthy weight</a></li>',
			'<li><a href="https://www.nhs.uk/conditions/loss-of-libido/">loss of libido (reduced sex drive)</a></li>',
			'<li><a href="https://www.relate.org.uk/">Relate</a> – a relationship support service that has online advice about sex and relationships, telephone and online counselling and local support services, as well as therapists you can pay to see</li>',
			'<li><a href="https://www.nhs.uk/conditions/social-care-and-support-guide/support-and-benefits-for-carers/">support and benefits for carers</a></li>',
			'<li><a href="https://www.nhs.uk/conditions/stress-anxiety-depression/understanding-stress/">stress</a></li>',
			'<li><a href="https://www.nhs.uk/conditions/stress-anxiety-depression/coping-with-financial-worries/">how to cope with money worries</a></li>',
			'<li><a href="https://www.nhs.uk/conditions/stress-anxiety-depression/loneliness/">loneliness</a></li>',
			'<li><a href="https://www.nhs.uk/conditions/stress-anxiety-depression/improve-mental-wellbeing/">the 5 steps to mental wellbeing</a></li>'
		];

		const listContent = `<div class="nhsuk-inset-text">
			<span class="nhsuk-u-visually-hidden">Information: </span>
			<p>Based on your selections for question 17, you may find the following helpful:</p>
			<ul>
				${linksList.map(link => links[link]).join(',').replace(/<\/li>./g, '</li>')}
			</ul>
			${ storeObj[9] === 0 ? '<p>You also said you experience panic attacks sometimes. Read more about <a href="https://nhsuk-live-review-experimental-moodzone.nhswebsite-integration.nhs.uk/conditions/improve-your-mental-health-and-wellbeing/i-feel-anxious-and-panicky/">anxiety, fear and panic</a>.</p>' : ''}
		</div>`

		document.querySelector('.js-links').innerHTML = listContent;
	}
}