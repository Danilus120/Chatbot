export default class ChatbotController {
	public renderLastMessage(
		parentElement: HTMLElement,
		messages: { message: string; state: 'received' | 'sent'}[]
	) {
		const { message, state } = messages[messages.length - 1]

		const messageElement = document.createElement('div')

		messageElement.classList.add('messageBox__message', `messageBox__message--${state}`)
		messageElement.textContent = message

		parentElement.appendChild(messageElement)

		parentElement.scrollTop = parentElement.scrollHeight
	}

	public renderPredefinedOptions(elementWithPredefinedButtons: HTMLElement, parentElement: HTMLElement) {
		parentElement.appendChild(elementWithPredefinedButtons)

		parentElement.scrollTop = parentElement.scrollHeight
	}
}
