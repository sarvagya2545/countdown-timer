const launchDate = new Date('April 29, 2021, 0:00:00')
const timecards = document.querySelectorAll('.time-card')
const secondsTimeCard = document.querySelector('.time-card[data-type="seconds"]')
const minutesTimeCard = document.querySelector('.time-card[data-type="minutes"]')
const hoursTimeCard = document.querySelector('.time-card[data-type="hours"]')
const daysTimeCard = document.querySelector('.time-card[data-type="days"]')

let secondsbetween
let minutesbetween
let hoursbetween
let daysbetween
let interval

function initDate(date) {
	const currentDate = new Date()
	const launchDate = new Date(date)

	if (launchDate < currentDate) return alert('Over')

	let timediff = launchDate.getTime() - currentDate.getTime()
	daysbetween = Math.floor(timediff / 1000 / 3600 / 24)
	hoursbetween = Math.floor((timediff / 1000 / 3600) % 24)
	minutesbetween = Math.floor((timediff / 1000 / 60) % 60)
	secondsbetween = Math.floor((timediff / 1000) % 60)

	changeTime(daysbetween, hoursbetween, minutesbetween, secondsbetween)
	interval = setInterval(updateUI, 1000)
}

function updateUI() {
	secondsbetween--
	if (secondsbetween == -1) {
		minutesbetween--
		secondsbetween = 59
	}
	if (minutesbetween == -1) {
		hoursbetween--
		minutesbetween = 59
	}
	if (hoursbetween == -1) {
		daysbetween--
		hoursbetween = 23
	}

	if (daysbetween == -1) {
		clearInterval(interval)
		alert('OVER!')
		return
	}

	changeTime(daysbetween, hoursbetween, minutesbetween, secondsbetween)
}

function changeTime() {
	let args = arguments

	if (args.length > 1) {
		Array.from(timecards).forEach(function (card, index) {
			card.textContent = `${Math.floor(args[index])}`
		})
	}
}

initDate(launchDate)
