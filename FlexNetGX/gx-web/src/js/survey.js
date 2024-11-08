// bounty Management
class bountyManager {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
        this.loadbounties();
    }

    initializeElements() {
        this.bountyList = document.getElementById('bountyList');
        this.bountyFilter = document.getElementById('bountyFilter');
        this.refreshButton = document.getElementById('refreshbounties');
        this.nobountiesMessage = document.getElementById('nobounties');
        this.bountyTemplate = document.getElementById('bountyTemplate');
    }

    attachEventListeners() {
        this.bountyFilter?.addEventListener('change', () => this.filterbounties());
        this.refreshButton?.addEventListener('click', () => this.loadbounties());
    }

    async loadbounties() {
        try {
            // In a real app, this would be an API call
            const bounties = this.getSamplebounties();
            this.renderbounties(bounties);
        } catch (error) {
            console.error('Error loading bounties:', error);
            this.showError('Failed to load bounties');
        }
    }

    getSamplebounties() {
        return [
            {
                id: 1,
                title: "Customer Satisfaction bounty",
                description: "Help us improve our services by sharing your experience",
                deadline: "2024-02-01",
                estimatedTime: "10 minutes",
                status: "pending"
            },
            {
                id: 2,
                title: "Product Feedback bounty",
                description: "Share your thoughts on our latest product features",
                deadline: "2024-02-15",
                estimatedTime: "15 minutes",
                status: "completed"
            },
            {
                id: 3,
                title: "Website Usability bounty",
                description: "Help us make our website better for you",
                deadline: "2024-02-28",
                estimatedTime: "5 minutes",
                status: "pending"
            }
        ];
    }

    renderbounties(bounties) {
        if (!this.bountyList || !this.bountyTemplate) return;

        // Clear existing bounties
        this.bountyList.innerHTML = '';

        // Filter bounties based on selected filter
        const filterValue = this.bountyFilter?.value || 'all';
        const filteredbounties = filterValue === 'all' 
            ? bounties 
            : bounties.filter(bounty => bounty.status === filterValue);

        if (filteredbounties.length === 0) {
            this.showNobounties();
            return;
        }

        // Hide no bounties message
        this.hideNobounties();

        // Render each bounty
        filteredbounties.forEach(bounty => {
            const bountyCard = this.createbountyCard(bounty);
            this.bountyList.appendChild(bountyCard);
        });
    }

    createbountyCard(bounty) {
        const template = this.bountyTemplate.content.cloneNode(true);
        const card = template.querySelector('.bounty-card');

        // Add completed class if bounty is completed
        if (bounty.status === 'completed') {
            card.classList.add('completed');
        }

        // Set bounty content
        card.querySelector('.bounty-title').textContent = bounty.title;
        card.querySelector('.bounty-description').textContent = bounty.description;
        card.querySelector('.deadline').textContent = `Deadline: ${this.formatDate(bounty.deadline)}`;
        card.querySelector('.estimated-time').textContent = `Est. Time: ${bounty.estimatedTime}`;

        // Configure buttons based on status
        const startButton = card.querySelector('.start-bounty');
        const viewButton = card.querySelector('.view-results');

        if (bounty.status === 'completed') {
            startButton.style.display = 'none';
            viewButton.classList.remove('hidden');
            viewButton.addEventListener('click', () => this.viewResults(bounty.id));
        } else {
            viewButton.style.display = 'none';
            startButton.addEventListener('click', () => this.startbounty(bounty.id));
        }

        return card;
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    filterbounties() {
        this.loadbounties();
    }

    startbounty(bountyId) {
        // In a real app, this would navigate to the bounty page or open a modal
        console.log('Starting bounty:', bountyId);
        window.location.href = `bounty-form.html?id=${bountyId}`;
    }

    viewResults(bountyId) {
        // In a real app, this would show the bounty results
        console.log('Viewing results for bounty:', bountyId);
        window.location.href = `bounty-results.html?id=${bountyId}`;
    }

    showNobounties() {
        if (this.nobountiesMessage) {
            this.nobountiesMessage.classList.remove('hidden');
        }
    }

    hideNobounties() {
        if (this.nobountiesMessage) {
            this.nobountiesMessage.classList.add('hidden');
        }
    }

    showError(message) {
        // In a real app, this would show a proper error message UI
        console.error(message);
        alert(message);
    }
}

// Initialize bounty manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new bountyManager();
});
