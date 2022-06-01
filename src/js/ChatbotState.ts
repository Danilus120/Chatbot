export default class ChatbotState {
	public isChatbotOpened: boolean
	public messages: { message: string; state: 'received' | 'sent' }[]

	constructor() {
		this.isChatbotOpened = false
		this.messages = []
	}

	public addMessage(message: string, state: 'received' | 'sent') {
		this.messages.push({ message, state })
	}

	public removeLastMessage() {
		this.messages.pop()
	}

	public toggleChatboxOpen() {
		this.isChatbotOpened = !this.isChatbotOpened;
	}
}
