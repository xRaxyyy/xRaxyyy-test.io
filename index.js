const cards = document.querySelectorAll('.card-container')

cards.forEach((card) => {
	let value = card.children[0].children[0].alt

	card.addEventListener('click', () => {
		window.ShowDropdownPage(value)
	})
})
