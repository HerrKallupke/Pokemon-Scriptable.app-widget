//Colors
const backgroundColor = '#1C1C1E'
const nameColor = '#ffffff'
const descriptionColor = '#ffffff'

//Fonts
const nameFont = Font.boldMonospacedSystemFont(30)
const descriptionFont = Font.lightMonospacedSystemFont(16)
const descriptionTitle = Font.boldMonospacedSystemFont(16)

//Other
const pokemonLogoSize = 200
const space = 15

const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=200'
const pokemonLogoUrl = 'https://www.freepnglogos.com/uploads/pokemon-logo-transparent-png-2.png'

async function buildWidget(){
	const pokemonLogo = await loadImage(pokemonLogoUrl)
	const pokemon = await getPokemon()
	
	const listwidget = new ListWidget()
	listwidget.backgroundColor = new Color(backgroundColor)
	
	//Adds the Pokémon logo
	const title = listwidget.addImage(pokemonLogo)
	title.centerAlignImage()
	title.imageSize = new Size(pokemonLogoSize, pokemonLogoSize / 2)
	title.url = 'https://pokemon.com'
	
	//Adds some space between the Pokémon logo and the name of the Pokémon
	listwidget.addSpacer(space)
	
	const name = listwidget.addText(toUpperCase(pokemon.forms[0].name))
	name.centerAlignText()
	name.font = nameFont
	name.textColor = new Color(nameColor)
	
	listwidget.addSpacer(space)
	
	const formsStack = listwidget.addStack()
	formsStack.layoutVertically()
	formsStack.centerAlignContent()
	
	const formsTitle = formsStack.addText("Forms: ")
	formsTitle.centerAlignText()
	formsTitle.font = descriptionTitle
	formsTitle.textColor = new Color(descriptionColor)
	
	const forms = formsStack.addText(convertForms(pokemon))
	forms.centerAlignText()
	forms.font = descriptionFont
	forms.textColor = new Color(descriptionColor)
	
	listwidget.addSpacer(space)
	
	const abilitiesStack = listwidget.addStack()
	abilitiesStack.layoutVertically()
	abilitiesStack.centerAlignContent()
	
	const abilitiesTitle = abilitiesStack.addText("Abilities: ")
	abilitiesTitle.centerAlignText()
	abilitiesTitle.font = descriptionTitle
	abilitiesTitle.textColor = new Color(descriptionColor)
	
	const abilities = abilitiesStack.addText("Abilities: " + convertAbilities(pokemon))
	abilities.centerAlignText()
	abilities.font = descriptionFont
	abilities.textColor = new Color(descriptionColor)
	
	return listwidget
}

const widget = await buildWidget()
presentWidget(widget)

function presentWidget(widget){
	if (Script.runsInWidget){
		Script.setWidget(widget)
	}else {
		widget.presentLarge()
	}
	Script.complete()
}

function convertForms(pokemon){
	if (pokemon.forms.length > 1){
		var forms = ""
		pokemon.forms.forEach((f) => {
			forms = forms + ", " + f.name
		})
		forms = forms.slice(2)
		forms = form[0].toUpperCase() + forms.slice(1)
		return string
	}else {
		return pokemon.forms[0].name[0].toUpperCase() + pokemon.forms[0].name.slice(1)
	}
}

function convertAbilities(pokemon){
	if (pokemon.abilities.length > 1){
		var abilities = ""
		pokemon.abilities.forEach((f) => {
			abilities = abilities + ", " + f.ability.name
			
		})
		abilities = abilities.slice(2)
		abilities = abilities.replace("-", " ")
		return abilities
	}else {
		return pokemon.abilities[0].ability.name.replace("-", " ")
	}
}

async function getPokemon(){
	const pokemons = new Request(url)
	const pokemonsResponse = await pokemons.loadJSON()
	
	const pokemon = new Request(pokemonsResponse.results[randomInt(pokemonsResponse.results.length - 1)].url)
	const pokemonResponse = await pokemon.loadJSON()
	
	return pokemonResponse
}

async function loadImage(url){
	const request = new Request(url)
	return await request.loadImage()
}

function randomInt(max){
	return Math.round(Math.random() * max)
}

function toUpperCase(string){
	return string[0].toUpperCase() + string.slice(1)
}
