# MedMap India 🗺️⚕️

## Bridging Healthcare Gaps Across India

An intelligent healthcare mapping platform that identifies medical deserts, connects patients with healthcare facilities, and provides AI-powered insights for healthcare planning in India.

---

## 📋 Project Overview

**MedMap India** is a comprehensive healthcare intelligence platform built with **React and Vite** that maps medical facilities across India. The application helps identify "medical deserts" - areas with inadequate healthcare infrastructure - and provides tools for patients, healthcare workers, and NGO planners to find appropriate medical care.

### Key Features

- 🏥 **Hospital Directory** - Search and filter 1000+ healthcare facilities across India
- 👨‍⚕️ **Doctor Database** - Find specialists by location, specialty, and availability
- 🗺️ **Interactive Map** - Visualize healthcare coverage with Leaflet maps
- 🤖 **AI Agent** - Natural language queries about healthcare facilities and medical deserts
- 📊 **Medical Desert Analysis** - Identify underserved regions with gap analysis
- 📰 **Health News** - Real-time health news from reliable sources

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 19, React Router DOM 7 |
| **Build Tool** | Vite 8 |
| **Styling** | CSS3 with custom design system |
| **Maps** | Leaflet (OpenStreetMap) |
| **Icons** | Lucide React |
| **HTTP Client** | Axios |
| **API Integration** | Anthropic Claude API, NewsAPI |

---

## 📁 Project Structure

```
medical-desert-project/
├── index.html               # Legacy HTML entry point
├── package.json             # NPM dependencies and scripts
├── vite.config.js           # Vite configuration
├── vercel.json              # Vercel deployment config
├── README.md                # Project documentation
│
├── src/                     # React application source
│   ├── main.jsx             # React app entry point
│   ├── App.jsx              # Main app with routing
│   ├── index.css            # Global styles
│   ├── data.js              # Healthcare data (1000+ facilities)
│   │
│   ├── components/          # Reusable React components
│   │   ├── Layout.jsx       # Main layout wrapper
│   │   ├── ChatbotWidget.jsx # AI chatbot interface
│   │   └── NewsTicker.jsx   # Health news ticker
│   │
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx    # Home dashboard with stats
│   │   ├── Hospitals.jsx    # Hospital directory
│   │   ├── Doctors.jsx      # Doctor search & filters
│   │   ├── MapPage.jsx      # Interactive map view
│   │   ├── Agent.jsx        # AI-powered Q&A agent
│   │   └── Deserts.jsx      # Medical desert analysis
│   │
│   └── utils/               # Utility functions
│       └── ai.js            # AI agent integration
│
├── pages/                   # Legacy HTML pages (non-React)
│   ├── hospitals.html
│   ├── doctors.html
│   ├── map.html
│   ├── agent.html
│   └── deserts.html
│
├── css/                     # Legacy CSS files
│   └── style.css
│
├── js/                      # Legacy JavaScript files
│   ├── main.js
│   └── data.js
│
└── data/                    # JSON data files
    ├── india_hospitals.json
    ├── india_doctors.json
    └── india_ngos.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd medical-desert-project

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## 📊 Data Coverage

### Healthcare Facilities

The platform includes data for **1000+ healthcare facilities** across India, including:

| Facility Type | Description |
|---------------|-------------|
| **AIIMS** | Premier government medical institutions |
| **Tata Memorial** | Specialized cancer care |
| **Apollo Hospitals** | Large private hospital chain |
| **CMC Vellore** | Faith-based medical college |
| **District Hospitals** | Government district-level facilities |
| **PHC/CHC** | Primary and Community Health Centres |
| **Private Hospitals** | Multi-specialty private facilities |

### Medical Desert Scoring

Each facility is assigned a **Medical Desert Score** (1-10):

| Score | Classification | Description |
|-------|---------------|-------------|
| 1-3 | ✅ Well-Served | Adequate healthcare infrastructure |
| 4-6 | 🟡 Moderate | Some gaps in services |
| 7-10 | 🔴 Medical Desert | Critical healthcare gaps |

### Identified Medical Deserts

Critical underserved regions identified:

- **Malkangiri, Odisha** - Score: 10/10
- **Kishori, Uttar Pradesh** - Score: 10/10
- **Kishanganj, Bihar** - Score: 9/10
- **Bastar, Chhattisgarh** - Score: 8/10
- **Nandurbar, Maharashtra** - Score: 8/10

---

## 🤖 AI Agent

The AI Agent provides natural language queries about healthcare:

### Capabilities

- **Facility Search** - "Find cardiac hospitals in Delhi"
- **Medical Desert Analysis** - "Which regions have critical healthcare gaps?"
- **Doctor Matching** - "Find pediatricians in rural areas"
- **Capability Queries** - "Which hospitals have MRI facilities?"
- **Patient Routing** - "Where should I go for heart surgery?"

### API Configuration

The agent uses **Anthropic Claude API** for intelligent responses. Set your API key in the environment:

```env
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

### Fallback Mode

If the API is unavailable, the agent uses local logic to answer queries based on the dataset.

---

## 📱 Core Features

### 1. Dashboard
- Real-time health news feed
- Quick stats (hospitals, doctors, NGOs)
- Search functionality
- Location-based services

### 2. Hospital Explorer
- Advanced filtering (state, city, type, specialty)
- Detailed facility information
- Equipment and procedure listings
- Contact information

### 3. Doctor Directory
- Search by specialty, location
- Availability indicators
- Consultation fee ranges
- Transfer availability flag

### 4. Interactive Map
- Leaflet-based map visualization
- Facility markers with popups
- Coverage heatmap
- Region filtering

### 5. Medical Desert Analysis
- Gap analysis visualization
- State-wise desert scores
- Recommendations for improvement
- NGO partnership suggestions

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
VITE_NEWS_API_KEY=your_newsapi_key
```

---

## 📈 Features in Development

- [ ] User authentication
- [ ] Appointment booking
- [ ] Telemedicine integration
- [ ] Emergency services routing
- [ ] Multi-language support
- [ ] Offline mode
- [ ] Mobile app

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

ISC License

---

## 🙏 Acknowledgments

- **Databricks × Accenture Hackathon** - For the IDP Agent challenge
- **Anthropic** - For Claude API access
- **OpenStreetMap** - For map tiles
- **NewsAPI** - For health news data
- **Healthcare facilities** - For providing facility data

---

## 📞 Contact

For questions or contributions, please reach out at: **ranjanhisu@gmail.com**

---

*Built with ❤️ for Healthcare Equity in India*
