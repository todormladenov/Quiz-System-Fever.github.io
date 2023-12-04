import { html, nothing, render } from "../../lib/lit-html.js";
import { createAnswers, viewAnswerTemplate } from "./answers.js";

const editorTemplate = (question, questionIndex, onCancel) => html`   
    <div class="layout">
        <div class="question-control">
            <button class="input submit action"><i class="fas fa-check-double"></i> Save</button>
            <button @click=${onCancel} class="input submit action"><i class="fas fa-times"></i> Cancel</button>
        </div>
        <h3>Question ${questionIndex + 1}</h3>
    </div>
    <form>
        <textarea class="input editor-input editor-text" name="text" placeholder="Enter question">${question ? question.text : nothing}</textarea>
        ${createAnswers(question.answers, questionIndex, question.correctIndex)}
    </form>`;

const viewTemplate = (question, questionIndex, onEdit) => html`
<div class="layout">
    <div class="question-control">
        <button @click=${onEdit} class="input submit action"><i class="fas fa-edit"></i> Edit</button>
        <button class="input submit action"><i class="fas fa-trash-alt"></i> Delete</button>
    </div>
    <h3>Question ${questionIndex + 1}</h3>
</div>
<form>
    <p class="editor-input">${question.text}</p>
    ${question.answers.map((a, answerIndex) =>
    viewAnswerTemplate(a, answerIndex, questionIndex, question.correctIndex == answerIndex))}
</form>`;

// <div class="pad-large alt-page"></div>

export function createQuestionView(question, questionIndex) {
    const element = document.createElement('article');
    element.className = 'editor-question';

    render(viewTemplate(question, questionIndex, onEdit), element);
    return element;

    function onCancel() {
        render(viewTemplate(question, questionIndex, onEdit), element);
    }

    function onEdit() {
        render(editorTemplate(question, questionIndex, onCancel), element);
    }

    async function onDelete() {
    }
}