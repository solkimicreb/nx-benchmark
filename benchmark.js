'use strict'

const TODO_NUM = 40
const NAVIGATION_NUM = 5
const TOGGLE_NUM = 40

const eventConfig = {
  bubbles: true,
  cancelable: true
}

let stepTime = 0
let startTime = 0

const steps = createSteps()
window.addEventListener('load', () => setTimeout(runSteps, 1000))

function runSteps () {
  startTime = performance.now()
  requestAnimationFrame(runStep)
}

function runStep () {
  const stepStart = performance.now()
  const step = steps.shift()
  step(stepStart)
  if (steps.length) {
    requestAnimationFrame(runStep)
  } else {
    window.opener.console.log('total time: ', performance.now() - startTime, 'step time: ', stepTime)
    const totalTime = Math.round(performance.now() - startTime - stepTime)
    const resultEvent = new CustomEvent('benchmark-result', {detail: totalTime})
    window.dispatchEvent(resultEvent)
  }
}

function createSteps () {
  const steps = []

  let i = 0
  let j = 2

	for (i = 0; i < TODO_NUM; i++) {
		steps.push(click('.new-todo, #new-todo'))
		steps.push(setValue('.new-todo, #new-todo', 'value' + i))
    steps.push(press('.new-todo, #new-todo', 13))
	}

  for (i = 0; i < TODO_NUM; i++) {
    steps.push(dblclick('.view label, .todo-label', i))
    steps.push(setValue('.edit', 'new value' + i, i))
    steps.push(press('.edit', 13, i))
  }

	for (i = 0; i < TODO_NUM; i++) {
		steps.push(click('.toggle', i))
	}

  for (i = 0; i < TODO_NUM; i+=2) {
    steps.push(click('.toggle', i))
  }

  for (i = 0; i < NAVIGATION_NUM; i++) {
    for (j = 2; j >= 0; j--) {
      steps.push(click('.filters a, #filters a', j))
    }
  }

	for (i = 0; i < TOGGLE_NUM; i++) {
		steps.push(click('.toggle-all, #toggle-all'))
	}

	for (i = 0; i < (TODO_NUM / 2); i++) {
		steps.push(click('.destroy', 0))
	}

  steps.push(click('.toggle-all, #toggle-all'))
  steps.push(click('.clear-completed, #clear-completed'))
	return steps
}

function setValue (selector, value, index) {
  return function (stepStart) {
    index = index || 0
    const elem = document.querySelectorAll(selector)[index]

    const inputEvent = new Event('input', eventConfig)
    const changeEvent = new Event('change', eventConfig)
    const submitEvent = new Event('submit', eventConfig)

    elem.value = value
    stepTime += (performance.now() - stepStart)

    elem.dispatchEvent(inputEvent)
    elem.dispatchEvent(changeEvent)
    if (elem.form) {
      elem.form.dispatchEvent(submitEvent)
    }
  }
}

function press (selector, keyCode, index) {
  return function (stepStart) {
    index = index || 0
    const elem = document.querySelectorAll(selector)[index]

    const keyDownEvent = new Event('keydown', eventConfig)
    keyDownEvent.keyCode = keyCode
    keyDownEvent.which = keyCode

    const keyPressEvent = new Event('keypress', eventConfig)
    keyPressEvent.keyCode = keyCode
    keyPressEvent.which = keyCode

    const keyUpEvent = new Event('keyup', eventConfig)
    keyUpEvent.keyCode = keyCode
    keyUpEvent.which = keyCode

    stepTime += (performance.now() - stepStart)

    elem.dispatchEvent(keyDownEvent)
    elem.dispatchEvent(keyPressEvent)
    elem.dispatchEvent(keyUpEvent)
  }
}

function click(selector, index) {
  return function (stepStart) {
    const selectorStart = performance.now()

    index = index || 0
    const elem = document.querySelectorAll(selector)[index]

    stepTime += (performance.now() - stepStart)

    elem.click()
  }
}

function dblclick(selector, index) {
  return function (stepStart) {
    index = index || 0
    const elem = document.querySelectorAll(selector)[index]
    const dblclickEvent = new Event('dblclick', eventConfig)

    stepTime += (performance.now() - stepStart)

    elem.dispatchEvent(dblclickEvent)
  }
}
