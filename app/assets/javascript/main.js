// ES6 or Vanilla JavaScript

const storeName = 'resultsStore';
const store = window.sessionStorage.getItem(storeName)
const path = window.location.pathname.replace('/', '');
const button = document.querySelector('.js-button');

if (button) {
	console.log(button)
	button.addEventListener('click', (e) => {
		console.log(e)
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
	const resultCareCard = document.querySelector('.js-care-card');

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

	if (depressionScore > 66 || anxietyScore > 66) {
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
			<p><a href="https://www.nhs.uk/conditions/stress-anxiety-depression/mental-health-helplines/">See a list of organisations that can help with mental health</a></p>  
		</div>
	  </div>
	  `;
	};

	depressionParagraph.innerHTML = `<ul>
		<li><a href="http://www.nhs.uk/Conditions/online-mental-health-services/Pages/introduction.aspx" target="top">Online mental health services</a></li>
		<li><a href="https://www.nhs.uk/conditions/stress-anxiety-depression/coping-with-financial-worries/" target="top">Coping with financial worries</a></li>
		<li><a href="http://www.nhs.uk/conditions/Anxiety/Pages/Introduction.aspx" target="top">About anxiety and anxiety attacks</a></li>
		<li><a href="https://www.nhs.uk/conditions/generalised-anxiety-disorder/" target="top">About low mood and depression</a></li>
		<li><a href="https://www.nhs.uk/live-well/sleep-and-tiredness/how-to-get-to-sleep/" target="top">How to get to sleep</a></li>
		<li><a href="https://www.nhs.uk/conditions/stress-anxiety-depression/understanding-panic/" target="top">Why do I feel anxious and panicky?</a></li>
		<li><a href="https://www.nhs.uk/conditions/stress-anxiety-depression/ways-relieve-stress/" target="top">Relaxation tips to relieve stress</a></li>
		<li><a href="http://www.anxietyuk.org.uk/" target="top">Anxiety UK</a></li>
		<li><a href="http://www.llttf.com/" target="top">Living Life To The Full website</a></li>
		<li><a href="http://www.mind.org.uk/" target="top">Mind - National Mental Health Charity</a></li>
		<li><a href="http://www.bemindful.co.uk/" target="top">Be Mindful</a></li>
		<li><a href="http://www.rethink.org/" target="top">Money and your mental health</a></li>
		<li><a href="http://www.samaritans.org/" target="top">Samaritans</a></li>
	</ul>`;

	anxietyParagraph.innerHTML = `<ul>
		<li><a href="http://www.nhs.uk/Conditions/online-mental-health-services/Pages/introduction.aspx" target="top">Online mental health services</a></li>
		<li><a href="https://www.nhs.uk/conditions/stress-anxiety-depression/coping-with-financial-worries/" target="top">Coping with financial worries</a></li>
		<li><a href="http://www.nhs.uk/conditions/Anxiety/Pages/Introduction.aspx" target="top">About anxiety and anxiety attacks</a></li>
		<li><a href="https://www.nhs.uk/conditions/generalised-anxiety-disorder/" target="top">About low mood and depression</a></li>
		<li><a href="https://www.nhs.uk/live-well/sleep-and-tiredness/how-to-get-to-sleep/" target="top">How to get to sleep</a></li>
		<li><a href="https://www.nhs.uk/conditions/stress-anxiety-depression/understanding-panic/" target="top">Why do I feel anxious and panicky?</a></li>
		<li><a href="https://www.nhs.uk/conditions/stress-anxiety-depression/ways-relieve-stress/" target="top">Relaxation tips to relieve stress</a></li>
		<li><a href="http://www.anxietyuk.org.uk/" target="top">Anxiety UK</a></li>
		<li><a href="http://www.llttf.com/" target="top">Living Life To The Full website</a></li>
		<li><a href="http://www.mind.org.uk/" target="top">Mind - National Mental Health Charity</a></li>
		<li><a href="http://www.bemindful.co.uk/" target="top">Be Mindful</a></li>
		<li><a href="http://www.rethink.org/" target="top">Money and your mental health</a></li>
		<li><a href="http://www.samaritans.org/" target="top">Samaritans</a></li>
	</ul>`;
}