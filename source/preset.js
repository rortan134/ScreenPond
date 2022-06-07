import { makeWorld } from "./world.js"
import { makeRectangleCorners } from "./corners.js"
import { addScreen, removeAllScreens } from "./colour.js"
import { makeScreen } from "./screen.js"

//========//
// PRESET //
//========//
const PRESET = {}
export const loadPreset = (global, presetName) => {

	
	const preset = PRESET[presetName]
	if (preset === undefined) {
		throw new Error(`Could not find preset: '${presetName}'`)
	}

	const {colours} = global
	for (const colour of colours) {
		removeAllScreens(colour)
	}

	for (const colourName in preset.colours) {
		const colour = colours[colourName]
		const screenPresets = preset.colours[colourName]
		for (const screenPreset of screenPresets) {
			const screenColour = colours[screenPreset.hex]
			const screen = makeScreen(screenColour, screenPreset.corners)
			addScreen(colour, screen)
		}
	}

	if (preset.world === undefined) {
		preset.world = makeWorld(colours)
	} 
	
	global.world = preset.world

}

const makePreset = ({world, colours = {}} = {}) => {
	const preset = {world, colours}
	return preset
}

//=========//
// PRESETS //
//=========//
PRESET.EMPTY = makePreset()

PRESET.GRID = makePreset({
	colours: {
		[BLACK]: [
			{hex: GREY, corners: makeRectangleCorners(0, 0, 1/3, 1/3)},
			{hex: GREEN, corners: makeRectangleCorners(1/3, 0, 1/3, 1/3)},
			{hex: RED, corners: makeRectangleCorners(2/3, 0, 1/3, 1/3)},
			{hex: BLUE, corners: makeRectangleCorners(0, 1/3, 1/3, 1/3)},
			{hex: YELLOW, corners: makeRectangleCorners(1/3, 1/3, 1/3, 1/3)},
			{hex: ORANGE, corners: makeRectangleCorners(2/3, 1/3, 1/3, 1/3)},
			{hex: ROSE, corners: makeRectangleCorners(0, 2/3, 1/3, 1/3)},
			{hex: CYAN, corners: makeRectangleCorners(1/3, 2/3, 1/3, 1/3)},
			{hex: PURPLE, corners: makeRectangleCorners(2/3, 2/3, 1/3, 1/3)},
		]
	}
})

PRESET.MINI_GRID = makePreset({
	colours: {
		[BLACK]: [
			{hex: GREY, corners: makeRectangleCorners(0, 0, 1/2, 1/2)},
			{hex: GREEN, corners: makeRectangleCorners(1/2, 0, 1/2, 1/2)},
			{hex: RED, corners: makeRectangleCorners(0, 1/2, 1/2, 1/2)},
			{hex: BLUE, corners: makeRectangleCorners(1/2, 1/2, 1/2, 1/2)},
		]
	}
})