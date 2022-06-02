import ChatbotUtils from './ChatbotUtils'
import ChatbotController from './ChatbotController'
import ChatbotState from './ChatbotState'
import ChatbotElementsCreator from './ChatbotElementsCreator' 

class Chatbot {
	private chatbotController: ChatbotController
	private chatbotState: ChatbotState

	private chatbotContainer: HTMLElement

	private chatbotBackground: HTMLElement

	private chatbotButton: HTMLElement
	private chatbotTitle: HTMLElement
	private chatbotMessagebox: HTMLElement
	private chatbotInput: HTMLElement

	constructor() {
		this.chatbotController = new ChatbotController()
		this.chatbotState = new ChatbotState()
		this.init()
	}

	public init() {
		this.createChatbotFromElements()
		this.setEventListeners()
		this.sendInitMessages()
	}

	private sendInitMessages() {
		this.sendBotMessage("Hi! I'm Chatbot 😎 Nice to meet you! 👋")
		this.sendBotMessage("What do you want to know?")
		this.generateElementWithPredefinedOptions(2)
	}

	private generateElementWithPredefinedOptions(howManyPredefinedOptions: number) {
		const predefinedOptions = ChatbotUtils.generatePredefinedOptions(howManyPredefinedOptions);

		const elementWithPredefinedButtons = ChatbotUtils.createElementWithClass('div', ['predefinedOptions'])
		
		predefinedOptions.forEach(message => {
			const btn = ChatbotUtils.createElementWithClass('button', ['predefinedOptions__buttonMessage'])
			btn.textContent = message;

			btn.addEventListener('click', () => {
				this.sendMessage(message)
				elementWithPredefinedButtons.remove()
			})

			ChatbotUtils.addElementsToParent(elementWithPredefinedButtons, [btn]);
		})

		this.chatbotController.renderPredefinedOptions(elementWithPredefinedButtons, this.chatbotMessagebox)
	}

	private setEventListeners() {
		this.setEventListenerForOpeningAndClosing()
		this.setEventListenerForSendMessage()
	}

	private setEventListenerForSendMessage() {
		const inputForm = document.querySelector('.chatbot__input');
		const inputMessage = document.querySelector('.input__message') as HTMLInputElement

		inputForm.addEventListener('submit', (e) => {
			e.preventDefault()
			if (!this.chatbotState.isChatbotOpened) return;
			const inputMessageValue = inputMessage.value;
			this.sendMessage(inputMessageValue)
			inputMessage.value = ''
		})
	}

	private sendBotMessage(text: string) {
		this.chatbotState.addMessage(text, 'received')
		this.chatbotController.renderLastMessage(this.chatbotMessagebox, this.chatbotState.messages)
	}

	private sendMessage(inputMessageValue: string) {
		if(inputMessageValue === '') return;
		this.chatbotState.addMessage(inputMessageValue, 'sent')
		this.chatbotController.renderLastMessage(this.chatbotMessagebox, this.chatbotState.messages)

		setTimeout(() => {
			const botAnswer = ChatbotUtils.returnBotAnswer(inputMessageValue);
			this.chatbotState.addMessage(botAnswer, 'received')
			this.chatbotController.renderLastMessage(this.chatbotMessagebox, this.chatbotState.messages)
			this.generateElementWithPredefinedOptions(0)
		}, 1000)
	}

	private setEventListenerForOpeningAndClosing() {
		const chatModal = document.querySelector('.chatbot') as HTMLElement
		const inputMessage = document.querySelector('.input__message') as HTMLInputElement

		[this.chatbotButton, this.chatbotBackground].forEach(element => {
			element.addEventListener('click', () => {
				this.openAndCloseChatbot(chatModal, inputMessage)
			})
		})
	}

	private openAndCloseChatbot(chatModal: HTMLElement, inputMessage: HTMLElement) {
		const chatIcon = document.querySelector('.chat-icon') as HTMLElement
		const closeIcon = document.querySelector('.close-icon') as HTMLElement

		chatModal.classList.toggle('collapse')
		chatIcon.classList.toggle('hidden')
		closeIcon.classList.toggle('hidden')
		this.chatbotBackground.classList.toggle('hidden')

		this.chatbotState.toggleChatboxOpen();

		if(this.chatbotState.isChatbotOpened) {
			inputMessage.focus()
		} else {
			ChatbotUtils.unblurElement()
		}
	}


	private createChatbotFromElements() {
		this.initElements()

		ChatbotUtils.addElementsToParent(this.chatbotContainer, [this.chatbotTitle, this.chatbotMessagebox, this.chatbotInput, this.chatbotButton])
		
		document.body.append(this.chatbotBackground);
		document.body.append(this.chatbotContainer);

	}

	private initElements() {
		this.chatbotContainer = ChatbotElementsCreator.createChatbotContainer();
		this.chatbotBackground = ChatbotElementsCreator.createBackgroundBeforeChatbot();
		this.chatbotTitle = ChatbotElementsCreator.createTitleElement();
		this.chatbotMessagebox = ChatbotElementsCreator.createMessageBoxElement();
		this.chatbotInput = ChatbotElementsCreator.createInputElement();
		this.chatbotButton = ChatbotElementsCreator.createButtonWithIconsElement();
	}
}

const chatbot = new Chatbot()
