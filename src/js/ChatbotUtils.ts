const botAnswers: {messages: string[], answer: string}[] = [
    {messages: ["How's the weather?", 'What is weather today?'], answer: `Today is windy 💨, but sunny 🌞`},
    {messages: ['What do you call a pirate droid?'], answer: 'Arrrrr-2D2'},
    {messages: ['In Star Wars, what language is used to program droids?'], answer: 'JawaScript'},
    {messages: ['Why is the BB unit droid not hungry?'], answer: "Because BB-8"},
]

export default class ChatbotUtils {
    public static returnBotAnswer(messageFromUser: string): string {
        for(let i = 0; i < botAnswers.length; i++) {
            const {messages, answer} = botAnswers[i];
            const messageArray = messages.map(el => el.toLowerCase());
            if(messageArray.includes(messageFromUser.toLowerCase())) {
                return answer
            }
        }

        return "None of our consultants are online. I cannot answer this question";
    }

    public static generatePredefinedOptions(howManyPredefinedOptions: number) {
        const numberOfPredefinedOptions = howManyPredefinedOptions === 0 || howManyPredefinedOptions > botAnswers.length ? botAnswers.length : howManyPredefinedOptions

        const arrayWithPredefinedOptions = new Array(numberOfPredefinedOptions).fill("").map((option, index) => {
            const botAnswer = botAnswers[index];
            const [message] = botAnswer.messages;
            return message;
        })
        
        return arrayWithPredefinedOptions;
    }

    public static createElementWithClass(elementName: string, classes: string[]) {
        const element = document.createElement(elementName);
        element.classList.add(...classes);

        return element;
    }

	public static addElementsToParent(mainElement: HTMLElement, elements: HTMLElement[]) {
        elements.forEach(element => {
            mainElement.appendChild(element)
        })
	}

	public static addElementBeforeParent(parentElement: HTMLElement, element: HTMLElement): void {
		parentElement.appendChild(element)
	}

    public static unblurElement() {
        const tmp = document.createElement("input");
        document.body.appendChild(tmp);
        tmp.focus();
        document.body.removeChild(tmp);
    }

    public static addAttributesToElement(element: HTMLElement, attributes: [string, string][]) {
        attributes.forEach(attribute => {
            const [attributeName, attributeValue] = attribute;
            element.setAttribute(attributeName, attributeValue);
        })
    }
}
