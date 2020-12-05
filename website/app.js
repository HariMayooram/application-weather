// /* Global Variables */

const zipCode = document.getElementById('zip');
const content = document.getElementById('content');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const feelingsText = document.getElementById('feelings');
const generateButton = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let zipVal = zip.value;
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'e8dcbc43057b2319bf6b7b16453debc9';
const weatherData = async (baseURL, zipCode, apiKey) => {
	try {
		const req = await fetch(`${baseURL}?zip=${zipCode},us&units=metric&APPID=${apiKey}`);
		const res = await req.json();
		const { main: { temp } } = res;
		return temp;
	} catch (err) {
		console.log('error', err);
	}
};

const dataStore = async (link, data) => {
	try {
		await fetch(link, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data, temp, content)
		});
	} catch (err) {
		console.log('error', err);
	}
};

generateButton.addEventListener('click', () => {
	let zipVal = zipCode.value;
	weatherData(url, zipVal, apiKey)
		.then((temp) => {
			return { date: newDate, temp, content: feelingsText.value };
		})
		.then((data) => {
			dataStore('/api/projectdata', data);
			return data;
		})
		.then(({ temp, date, content }) => dataUpdate(temp, date, content))
		.catch((err) => {
			console.error(err);
		});
});
const dataUpdate = async (temptr, newDate, feelingsText) => {
	date.innerHTML = newDate;
	temp.innerHTML = `${temptr} degree`;
	content.innerHTML = feelingsText;
};
function is_server() {
	return !(typeof window != 'undefined' && window.document);
}
is_server();
