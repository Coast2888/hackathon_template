let bountyData = [];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-question')?.addEventListener('click', addQuestion);
    document.getElementById('bounty-form')?.addEventListener('submit', submitbounty);
    document.getElementById('bounty-target')?.addEventListener('change', updateTargetSpecific);
});

function addQuestion() {
    const questionCount = document.querySelectorAll('.question').length + 1;
    const bountyQuestions = document.getElementById('bounty-questions');
    if (!bountyQuestions) return;

    const questionHtml = `
        <div class="question">
            <input type="text" placeholder="Question ${questionCount}" required>
            <select class="question-type">
                <option value="text">Text</option>
                <option value="multiple">Multiple Choice</option>
                <option value="true-false">True/False</option>
            </select>
            <div class="question-options" style="display: none;">
                <input type="text" placeholder="Option 1" class="option-input">
                <input type="text" placeholder="Option 2" class="option-input">
                <button type="button" class="add-option">Add Option</button>
            </div>
        </div>
    `;
    
    bountyQuestions.insertAdjacentHTML('beforeend', questionHtml);
}

function submitbounty(e) {
    e.preventDefault();
    const bounty = {
        name: document.getElementById('bounty-name')?.value || '',
        description: document.getElementById('bounty-description')?.value || '',
        target: document.getElementById('bounty-target')?.value || '',
        targetSpecific: document.getElementById('bounty-target-specific')?.value || '',
        dueDate: document.getElementById('bounty-due-date')?.value || '',
        questions: []
    };

    document.querySelectorAll('.question').forEach(questionElement => {
        const question = {
            text: questionElement.querySelector('input')?.value || '',
            type: questionElement.querySelector('.question-type')?.value || '',
            options: []
        };

        if (question.type === 'multiple' || question.type === 'true-false') {
            questionElement.querySelectorAll('.option-input').forEach(optionInput => {
                if (optionInput.value) {
                    question.options.push(optionInput.value);
                }
            });
        }

        bounty.questions.push(question);
    });

    bountyData.push(bounty);
    sessionStorage.setItem('bountyData', JSON.stringify(bountyData));
    console.log("bounty created:", bounty);

    // Reset form
    const form = document.getElementById('bounty-form');
    if (form) {
        form.reset();
    }
    
    const bountyQuestions = document.getElementById('bounty-questions');
    if (bountyQuestions) {
        bountyQuestions.innerHTML = '';
    }
}

function updateTargetSpecific() {
    const target = document.getElementById('bounty-target')?.value;
    const specificSelect = document.getElementById('bounty-target-specific');
    if (!specificSelect) return;

    // Clear existing options
    specificSelect.innerHTML = '';

    if (target !== 'all') {
        specificSelect.style.display = 'block';
        let options = [];
        
        switch(target) {
            case 'workspace':
                options = JSON.parse(sessionStorage.getItem('workspaces')) || [];
                break;
            case 'team':
                options = JSON.parse(sessionStorage.getItem('teams')) || [];
                break;
            case 'individual':
                options = JSON.parse(sessionStorage.getItem('personnelList')) || [];
                break;
        }

        options.forEach(option => {
            const optionHtml = `<option value="${option.name}">${option.name}</option>`;
            specificSelect.insertAdjacentHTML('beforeend', optionHtml);
        });
    } else {
        specificSelect.style.display = 'none';
    }
}

function getbountyData() {
    return JSON.parse(sessionStorage.getItem('bountyData')) || [];
}

// Export for global access
window.getbountyData = getbountyData;
