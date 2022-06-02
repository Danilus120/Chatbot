import ChatbotUtils from "./ChatbotUtils"
import chatDotsIcon from "../images/chatbotChatImage.svg";
import chatCloseIcon from "../images/closeButtonImage.svg";
import inputSendIcon from "../images/sendButtonImage.svg";

export default class ChatbotElementsCreator {
	public static createChatbotContainer() {
		return ChatbotUtils.createElementWithClass('div', ['chatbot', 'collapse'])
	}

	public static createBackgroundBeforeChatbot() {
		return ChatbotUtils.createElementWithClass('div', ['backgroundChatbot', 'hidden'])
	}

	public static createButtonWithIconsElement() {
		const buttonElement = ChatbotUtils.createElementWithClass('button', ['chatbot__button'])

		const chatIcon = ChatbotUtils.createElementWithClass('img', ['chat-icon']) as HTMLImageElement;
		chatIcon.src = chatDotsIcon;
		
		const closeIcon = ChatbotUtils.createElementWithClass('img', ['close-icon', 'hidden']) as HTMLImageElement;
		closeIcon.src = chatCloseIcon;

		ChatbotUtils.addElementsToParent(buttonElement, [chatIcon, closeIcon]);

		return buttonElement;
	}

	public static createTitleElement() {
		const titleContainer = ChatbotUtils.createElementWithClass('div', ['chatbot__title'])
		titleContainer.innerHTML = `<h2>Chatbot</h2>`

		return titleContainer;
	}

	public static createMessageBoxElement() {
		return ChatbotUtils.createElementWithClass('div', ['chatbot__messageBox', 'messageBox']);
	}

	public static createInputElement() {
		const inputContainer = ChatbotUtils.createElementWithClass('form', ['chatbot__input', 'input'])

		const input = ChatbotUtils.createElementWithClass('input', ['input__message']);
		ChatbotUtils.addAttributesToElement(input, [['type', 'text'], ['autocomplete', 'off'], ['name', 'message'], ['placeholder', 'Type your message ...']])

		const btn = ChatbotUtils.createElementWithClass('button', ['input__send']) as HTMLButtonElement;
		ChatbotUtils.addAttributesToElement(btn, [['type', 'submit']])
		const btnImg = ChatbotUtils.createElementWithClass('img', ['input__send--icon']) as HTMLImageElement
		btnImg.src = inputSendIcon;

		btn.appendChild(btnImg);

		ChatbotUtils.addElementsToParent(inputContainer, [input, btn]);

		return inputContainer;
	}
}