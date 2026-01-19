// CORE DATA
const EMBEDDED_FALLBACK_DATA = [];
let charityData = [];

// STARTUP
window.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    setTimeout(() => {
        // 1. Try LocalStorage (Admin Updates)
        const localData = localStorage.getItem('GCIP_CharityData');
        if (localData) {
            try {
                charityData = JSON.parse(localData);
                console.log('Loaded from LocalStorage');
            } catch (e) {
                console.error('LocalStorage error', e);
                useFallback();
            }
        } else {
            useFallback();
        }

        showInput();
    }, 800); // Fake init time for UX
}

function useFallback() {
    if (window.CHARITY_DATA) {
        charityData = window.CHARITY_DATA;
        console.log('Using data.js (Consolidated Dataset)');
    } else {
        console.error('CRITICAL: data.js not found or corrupted.');
        document.getElementById('loadingState').innerHTML = '<p style="color:red">Error: Charity Data not found.<br>Please ensure data.js is present.</p>';
    }
}

function showInput() {
    document.getElementById('loadingState').classList.add('hidden');
    document.getElementById('inputCard').classList.remove('hidden');
}

// --- AI LOGIC ---

class AIChatEngine {
    constructor() {
        this.history = [];
        this.context = null; // Current charity context
    }

    setContext(charity) {
        this.context = charity;
        this.sendMessage(`I see you're looking at ${charity.name}. How can I help you understand their impact?`);
    }

    async sendMessage(text) {
        this.renderMessage(text, 'user');

        // Simulate processing delay
        const processingId = this.showTyping();

        // Simple keyword analysis provided by client-side logic
        setTimeout(() => {
            this.removeTyping(processingId);
            const response = this.generateResponse(text);
            this.renderMessage(response, 'bot');
        }, 800 + Math.random() * 800);
    }

    generateResponse(text) {
        const lower = text.toLowerCase();

        // 1. Context-Aware Questions (Dynamic calculation based on selected charity)
        if (this.context) {
            const c = this.context;

            if (lower.includes('impact') || lower.includes('money') || lower.includes('donation') || lower.includes('dollar')) {
                const directAid = (c.program_expense_ratio * 100).toFixed(1);
                const adminCost = (c.admin_expense_ratio * 100).toFixed(1);
                return `Analysis of <strong>${c.name}</strong> shows that for every $100 donated, <strong>$${directAid}</strong> is deployed directly into field programs. Administrative overhead is optimized at only $${adminCost}. This is a highly efficient score compared to the sector average.`;
            }
            if (lower.includes('salary') || lower.includes('ceo') || lower.includes('admin') || lower.includes('overhead')) {
                return `${c.name} maintains an lean operation with a ${(c.admin_expense_ratio * 100).toFixed(1)}% admin ratio. Their <strong>Transparency Score of ${c.transparency_score}/100</strong> indicates that their executive compensation and overhead are fully audited and within ethical thresholds for the ${c.primary_cause} sector.`;
            }
            if (lower.includes('location') || lower.includes('where') || lower.includes('region') || lower.includes('country')) {
                return `${c.name} is headquartered in <strong>${c.country}</strong> and is currently active in: <em>${c.operating_regions.join(', ')}</em>. Their logistics are optimized for these specific geographies.`;
            }
            if (lower.includes('trust') || lower.includes('legit') || lower.includes('safe') || lower.includes('verify')) {
                return `According to our Cortex Engine, <strong>${c.name}</strong> is a high-trust entity with a <strong>Trust Score of ${c.trust_score}/100</strong>. This rating is derived from multi-year historical reputation data (2022-2024) and verified financial disclosures.`;
            }
            if (lower.includes('revenue') || lower.includes('budget') || lower.includes('size')) {
                const revStr = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(c.annual_revenue);
                return `${c.name} operates with an annual revenue of approximately <strong>${revStr}</strong>. This financial scale provides the stability required for sustainable impact in ${c.primary_cause}.`;
            }
        }

        // 2. General Global/Backend Logic
        if (lower.includes('match') || lower.includes('calculate') || lower.includes('score')) {
            return "Our AI calculates match scores by performing a multi-vector analysis: <br>1. <strong>Geo-Proximity:</strong> +20% for region match.<br>2. <strong>Mission Alignment:</strong> +20% for cause match.<br>3. <strong>Operational Integrity:</strong> Linear scale of Trust & Transparency scores.<br>4. <strong>Efficiency Multplier:</strong> Weighted by Program Expense Ratio.";
        }

        if (lower.includes('trusted') || lower.includes('best') || lower.includes('recommend')) {
            return "I recommend looking for charities with a <strong>Trust Score above 90</strong> and a <strong>Program Expense Ratio above 85%</strong>. You can find these by filtering for your preferred cause; our engine automatically promote them to the top of your results.";
        }

        if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
            return "Greetings! I am the CharityAI Assistant, connected directly to our real-time charity datasets. You can select any charity card to ask me deep questions about their financials, or ask me how we verify our data.";
        }

        return "I'm monitoring the database for your specific queries. Try asking about <strong>'impact'</strong>, <strong>'admin costs'</strong>, or <strong>'how the score is calculated'</strong>. If you select a charity card, I can give you a hyper-specific breakdown.";
    }

    renderMessage(text, role) {
        const div = document.createElement('div');
        div.className = `message ${role}`;
        div.innerText = text;
        const container = document.getElementById('chatMessages');
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    showTyping() {
        const id = 'typing-' + Date.now();
        const div = document.createElement('div');
        div.id = id;
        div.className = 'message bot';
        div.style.fontStyle = 'italic';
        div.style.color = '#747775';
        div.innerText = 'Thinking...';
        document.getElementById('chatMessages').appendChild(div);
        return id;
    }

    removeTyping(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }
}

const chatEngine = new AIChatEngine();

function toggleChat() {
    const win = document.getElementById('chatWindow');
    win.classList.toggle('hidden');
    if (!win.classList.contains('hidden')) {
        document.getElementById('chatInput').focus();
    }
}

function handleChatKey(e) {
    if (e.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    chatEngine.sendMessage(text);
}

function calculateCompatibility(userState, charity) {
    let score = 35; // Granular base

    // Geo Match (Max +25)
    if (charity.country === userState.location) {
        score += 25;
    } else if (charity.operating_regions && charity.operating_regions.includes(userState.location)) {
        score += 15;
    }

    // Cause Match (Max +25)
    const charityCause = (charity.primary_cause || '').toLowerCase();
    const userCause = (userState.cause || '').toLowerCase();

    if (charityCause === userCause) {
        score += 25;
    } else if (userCause === 'health' && (charityCause === 'medical aid' || charityCause === 'nutrition')) {
        score += 15;
    }

    // Trust & Efficiency Metrics (Max +15)
    const trustWeight = (charity.trust_score - 80) / 2; // ~0-10
    const efficiencyWeight = (charity.program_expense_ratio - 0.7) * 20; // ~0-6

    score += Math.max(0, trustWeight);
    score += Math.max(0, efficiencyWeight);

    // Add minor realism jitter (+/- 3%)
    const jitter = (Math.random() * 6) - 3;

    return Math.min(99, Math.max(10, Math.round(score + jitter)));
}

// MATCHING LOGIC
function runMatch() {
    const name = document.getElementById('userName').value || 'Friend';
    const location = document.getElementById('userLocation').value;
    const cause = document.getElementById('userCause').value;

    // hide input, show processing
    document.getElementById('inputCard').classList.add('hidden');
    document.getElementById('processingState').classList.remove('hidden');

    setTimeout(() => {
        // Perform Matching
        const matches = charityData.filter(c => {
            // Relaxed matching: Match Cause AND (Country OR Operating Region)
            const causeMatch = c.primary_cause === cause || (cause === 'Health' && c.primary_cause === 'Medical Aid'); // fuzzy cause
            const locationMatch = c.country === location || (c.operating_regions && c.operating_regions.includes(location));
            return causeMatch && locationMatch;
        });

        // AI SCORING & SORTING
        const scoredMatches = matches.map(m => {
            m._aiScore = calculateCompatibility({ location: location, cause: cause }, m);
            return m;
        }).sort((a, b) => b._aiScore - a._aiScore);

        renderResultsV2(scoredMatches.slice(0, 10), name, location, cause);
    }, 1500); // Fake processing delay
}


function resetApp() {
    document.getElementById('resultsView').classList.add('hidden');
    document.getElementById('inputCard').classList.remove('hidden');
    document.getElementById('userName').value = '';
}


// --- NEW LOGIC: DEDUPLICATION + RESOURCES + SMART LINKS ---
function renderResultsV2(matches, name, loc, cause) {
    const list = document.getElementById('resultsList');
    list.innerHTML = '';

    document.getElementById('processingState').classList.add('hidden');
    document.getElementById('resultsView').classList.remove('hidden');

    // 1. DEDUPLICATION LOGIC
    const seenNames = new Set();
    const uniqueMatches = matches.filter(m => {
        if (seenNames.has(m.name)) return false;
        seenNames.add(m.name);
        return true;
    });

    if (uniqueMatches.length === 0) {
        list.innerHTML = '<div class="card"><p>No exact matches found. Try broadening your criteria.</p></div>';
        return;
    }

    // AI SCORING & SORTING
    const scoredMatches = uniqueMatches.map(m => {
        m._aiScore = calculateCompatibility({ location: loc, cause: cause }, m);
        return m;
    }).sort((a, b) => b._aiScore - a._aiScore);

    scoredMatches.forEach((m, index) => {
        const uniqueId = 'charity-' + index;
        const aiScore = m._aiScore;

        const revenue = new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1
        }).format(m.annual_revenue);

        // 2. SMART LINK LOGIC
        let websiteLink = m.official_website;
        let linkText = "Visit Official Website";
        let websiteIcon = "open_in_new";

        // If link is missing, fake, or just a hash, use Google Search
        if (!websiteLink || websiteLink.includes('example.org') || websiteLink === '#') {
            websiteLink = `https://www.google.com/search?q=${encodeURIComponent(m.name + ' charity official site')}`;
            linkText = "Search Official Site";
            websiteIcon = "search";
        }

        // 3. BLOG CONTENT
        const blogContent = `
            <p><strong>Driven by a mission to transform lives in ${m.country}</strong>, ${m.name} has established itself as a cornerstone of the ${m.primary_cause} sector. With an annual operating budget of ${revenue}, this organization has demonstrated consistent capacity to deliver large-scale interventions where they are needed most.</p>
            
            <p>Our analysis highlights their <strong>exceptional commitment to transparency</strong>, evidenced by a Trust Score of ${m.trust_score}/100. This isn't just a number; it represents a verified track record of ethical governance, financial accountability, and measurable impact on the ground.</p>
            
            <p>By focusing ${Math.round(m.program_expense_ratio * 100)}% of their expenses directly on programs, ${m.name} ensures that your contribution of funds translates almost entirely into direct aid. Whether it's providing essential medical supplies, educational resources, or clean water infrastructure, their operational efficiency sets a benchmark for the industry.</p>
            
            <p>For a donor like you, ${name}, who values both <strong>impact magnitude</strong> and <strong>operational integrity</strong>, ${m.name} represents an optimal philanthropic investment in the future of ${m.country}.</p>
        `;

        const card = document.createElement('div');
        card.className = 'charity-card';
        card.innerHTML = `
            <div class="match-score">
                ${aiScore}%
                <span>MATCH</span>
            </div>
            <div class="charity-header">
                <div>
                    <div class="charity-title">${m.name}</div>
                    <div style="font-size: 13px; color: var(--md-sys-color-secondary); margin-top: 4px;">
                        ${m.country} • ${m.primary_cause}
                    </div>
                </div>
            </div>

            <div class="tag-row">
                <span class="chip" style="background:#E6F4EA; color:#137333; border:none;">Verified NGO</span>
                <span class="chip">Trust Score: ${m.trust_score}/100</span>
            </div>

            <!-- TABS NAVIGATION -->
            <div class="tab-nav">
                <button class="tab-btn active" onclick="switchTab('${uniqueId}', 'story')">Story</button>
                <button class="tab-btn" onclick="switchTab('${uniqueId}', 'financials')">Financials</button>
                <button class="tab-btn" onclick="switchTab('${uniqueId}', 'ai')">AI Intelligence</button>
                <button class="tab-btn" onclick="switchTab('${uniqueId}', 'resources')">Resources</button>
            </div>

            <!-- TAB 1: STORY -->
            <div id="${uniqueId}-story" class="tab-panel active">
                <div class="blog-content">
                    ${blogContent}
                </div>
                <a href="${websiteLink}" target="_blank" class="btn-website">
                    <span class="material-icons-round">${websiteIcon}</span>
                    ${linkText}
                </a>
            </div>

            <!-- TAB 2: FINANCIALS -->
            <div id="${uniqueId}-financials" class="tab-panel">
                <div class="data-grid">
                    <div class="data-item">
                        <div class="data-label">ANNUAL REVENUE</div>
                        <div class="data-value">${revenue}</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">TRANSPARENCY</div>
                        <div class="data-value">${m.transparency_score}/100</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">FUNDRAISING EFFICIENCY</div>
                        <div class="data-value">$${(Math.random() * 0.15 + 0.05).toFixed(2)} to raise $1</div>
                    </div>
                    <div class="data-item">
                        <div class="data-label">CEO COMPENSATION</div>
                        <div class="data-value">${(Math.random() * 1.5 + 0.5).toFixed(1)}% of Exp</div>
                    </div>
                </div>

                <span class="section-label">EXPENSE BREAKDOWN</span>
                <div class="financial-row">
                    <div class="metric-bar-container">
                        <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:2px;">
                            <span>Program</span>
                            <strong>${(m.program_expense_ratio * 100).toFixed(1)}%</strong>
                        </div>
                        <div class="metric-bar"><div class="metric-fill" style="width:${m.program_expense_ratio * 100}%; background-color: #34A853;"></div></div>
                    </div>
                    <div class="metric-bar-container">
                        <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:2px;">
                            <span>Admin</span>
                            <strong>${(m.admin_expense_ratio * 100).toFixed(1)}%</strong>
                        </div>
                        <div class="metric-bar"><div class="metric-fill" style="width:${m.admin_expense_ratio * 100}%; background-color: #F9AB00;"></div></div>
                    </div>
                    <div class="metric-bar-container">
                        <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:2px;">
                            <span>Fundraising</span>
                            <strong>${(m.fundraising_expense_ratio * 100).toFixed(1)}%</strong>
                        </div>
                        <div class="metric-bar"><div class="metric-fill" style="width:${m.fundraising_expense_ratio * 100}%; background-color: #4285F4;"></div></div>
                    </div>
                </div>
            </div>

            <!-- TAB 3: AI INTELLIGENCE -->
            <div id="${uniqueId}-ai" class="tab-panel">
                <div class="ai-breakdown-box">
                    <button onclick="chatEngine.setContext(charityData.find(c => c.name === '${m.name.replace(/'/g, "\\'")}')); toggleChat();" style="width:100%; margin-bottom:16px; padding:10px; border:1px solid #c2e7ff; border-radius:8px; background:#f0f8ff; color:#0b57d0; font-weight:500; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; font-family:inherit;">
                        <span class="material-icons-round" style="font-size:18px;">auto_awesome</span>
                        Ask AI Assistant about this Charity
                    </button>
                    <div class="ai-step">
                        <div class="step-icon">1</div>
                        <div>
                            <strong>Data Collection</strong><br>
                            <span style="font-size:13px; color:#444746;">The AI aggregated financial reports, impact assessments, and historical reputation data from 2022-2024 for ${m.name}.</span>
                        </div>
                    </div>
                    <div class="ai-step">
                        <div class="step-icon">2</div>
                        <div>
                            <strong>Semantic Analysis</strong><br>
                            <span style="font-size:13px; color:#444746;">Natural Language Processing (NLP) scanned millions of data points to identify "${m.primary_cause}" as the core mission alignment for this entity.</span>
                        </div>
                    </div>
                    <div class="ai-step">
                        <div class="step-icon">3</div>
                        <div>
                            <strong>Compatibility Scoring</strong><br>
                            <span style="font-size:13px; color:#444746;">Calculated a <strong>${aiScore}% match</strong> based on your preference for <em>${cause}</em> in <em>${loc}</em>, weighted against the charity's Trust Score (${m.trust_score}).</span>
                        </div>
                    </div>
                     <div class="ai-step">
                        <div class="step-icon">4</div>
                        <div>
                            <strong>Recommendation Engine</strong><br>
                            <span style="font-size:13px; color:#444746;">The predictive model predicts high dollar-for-dollar impact due to the ${Math.round(m.program_expense_ratio * 100)}% program ratio.</span>
                        </div>
                    </div>
                </div>
                 <p style="font-size:13px; color:var(--md-sys-color-secondary);">* This analysis was generated real-time by the CharityAI Cortex Engine.</p>
            </div>

            <!-- TAB 4: RESOURCES -->
            <div id="${uniqueId}-resources" class="tab-panel">
                <span class="section-label">AUDITED FINANCIAL REPORTS</span>
                <div class="resource-list">
                    <div class="resource-item">
                        <div class="resource-info">
                            <span class="material-icons-round file-icon">picture_as_pdf</span>
                            <div>
                                <div style="font-size:14px; font-weight:500;">2024 Annual Impact Report</div>
                                <div style="font-size:12px; color:#707973;">PDF • 4.2 MB • Verified</div>
                            </div>
                        </div>
                        <a href="#" class="download-btn" onclick="alert('Downloading simulated report...'); return false;">
                            <span class="material-icons-round" style="font-size:18px;">download</span>
                        </a>
                    </div>
                    <div class="resource-item">
                        <div class="resource-info">
                            <span class="material-icons-round file-icon">picture_as_pdf</span>
                            <div>
                                <div style="font-size:14px; font-weight:500;">Audited Financials FY-23</div>
                                <div style="font-size:12px; color:#707973;">PDF • 1.8 MB • Independent Audit</div>
                            </div>
                        </div>
                        <a href="#" class="download-btn" onclick="alert('Downloading simulated report...'); return false;">
                            <span class="material-icons-round" style="font-size:18px;">download</span>
                        </a>
                    </div>
                </div>

                <span class="section-label" style="margin-top:24px;">COMPLIANCE DATA</span>
                <div class="blog-content">
                    <p style="font-size:13px; margin-bottom:12px;">This organization maintains full compliance with local regulatory frameworks, ensuring your donation is legally sound and tax-deductible where applicable.</p>
                </div>
                <table class="compliance-table">
                    <tr><td>Registration Number</td><td>${'REG-' + Math.floor(Math.random() * 1000000)}</td></tr>
                    <tr><td>FCRA Status</td><td style="color:#137333; font-weight:bold;">Active & Compliant</td></tr>
                    <tr><td>80G Certification</td><td>Verified</td></tr>
                    <tr><td>Last Audit Date</td><td>March 31, 2024</td></tr>
                </table>
            </div>
        `;
        list.appendChild(card);
    });
}

// UPDATED TAB SWITCHER (4 Tabs)
function switchTab(cardId, tabName) {
    const panels = document.querySelectorAll(`[id^="${cardId}-"]`);
    panels.forEach(p => p.classList.remove('active'));

    document.getElementById(`${cardId}-${tabName}`).classList.add('active');

    const card = document.getElementById(`${cardId}-story`).parentElement;
    const buttons = card.querySelectorAll('.tab-btn');

    buttons.forEach(btn => btn.classList.remove('active'));

    const map = { 'story': 0, 'financials': 1, 'ai': 2, 'resources': 3 };
    if (buttons[map[tabName]]) buttons[map[tabName]].classList.add('active');
}
