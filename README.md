
# GlowMind - Your Mental Health Companion

GlowMind is a modern, AI-powered mental health support application designed specifically for young adults. It provides personalized guidance, voice chat capabilities, and immediate access to crisis support resources.

## 🌟 Features

### Core Functionality
- **AI-Powered Conversations**: Intelligent chat responses tailored to mental health support
- **Voice Integration**: Speak to the AI and receive voice responses
- **Crisis Detection**: Automatic detection of concerning language with immediate support resources
- **Conversation History**: Keep track of past sessions and progress
- **Beautiful UI**: Modern glassmorphism design with smooth animations

### Authentication & Security
- **Email/Password Authentication**: Secure user registration and login
- **Google OAuth Integration**: Quick social login option
- **Password Strength Validation**: Real-time password requirements checking
- **Form Validation**: Comprehensive client-side validation with accessibility

### Design & Accessibility
- **Responsive Design**: Mobile-first approach that works on all devices
- **WCAG 2.2 AA Compliance**: Full accessibility support with ARIA labels
- **High Contrast Support**: Respects user preferences for better visibility
- **Reduced Motion Support**: Respects user preferences for animations
- **Keyboard Navigation**: Full keyboard accessibility throughout the app

### Crisis Support
- **Keyword Detection**: Identifies concerning language patterns
- **Immediate Resources**: Quick access to crisis hotlines and text services
- **National Suicide Prevention Lifeline**: Direct link to call/text 988
- **Crisis Text Line**: Direct access to text HOME to 741741

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with ES2020 support

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd glowmind-chat-oasis

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration (when connected)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration (when implemented)
VITE_OPENAI_API_KEY=your_openai_api_key
```

**Note**: Never commit API keys to version control. The `.env.local` file is already in `.gitignore`.

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **Routing**: React Router DOM
- **State Management**: React hooks and context
- **Build Tool**: Vite
- **Icons**: Lucide React

### Project Structure
```
src/
├── components/          # Reusable UI components
│   └── ui/             # shadcn/ui components
├── pages/              # Route components
│   ├── Index.tsx       # Landing page
│   ├── Login.tsx       # Authentication
│   ├── Signup.tsx      # User registration
│   └── Chat.tsx        # Main chat interface
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── styles/             # Global styles and Tailwind config
```

### Design System
- **Primary Color**: `#B4FF57` (Bright lime green)
- **Secondary Color**: `#FF6EC7` (Bright pink)
- **Typography**: Inter font family with 600 weight headings
- **Effects**: Glassmorphism with backdrop blur
- **Animations**: Smooth transitions and glowing effects

## 🎨 Key Components

### Landing Page (`/`)
- Hero section with compelling call-to-action
- Feature showcase with icons and descriptions
- Social proof through testimonials
- Crisis support information in footer

### Authentication (`/login`, `/signup`)
- Email/password forms with validation
- Google OAuth integration
- Password strength meter
- Accessible form design with ARIA labels

### Chat Interface (`/chat`)
- Glowing orb AI avatar with animations
- Voice recording and playback
- Message history with timestamps
- Crisis detection and modal alerts
- Conversation sidebar with history
- Text-to-speech for AI responses

## 🛡️ Security Features

### Frontend Security
- Input validation and sanitization
- XSS protection through React's built-in safeguards
- Content Security Policy headers
- Secure authentication flow

### Privacy & Data Protection
- No sensitive data stored in localStorage
- Secure session management (when backend is connected)
- Crisis detection runs client-side
- User conversations encrypted in transit

## ♿ Accessibility

### WCAG 2.2 AA Compliance
- Color contrast ratios meet AA standards
- All interactive elements keyboard accessible
- ARIA labels and roles properly implemented
- Screen reader announcements for dynamic content
- Focus management for modals and navigation

### Responsive Design
- Mobile-first CSS approach
- Touch-friendly interface elements
- Optimized for screens as small as 375px
- Flexible layouts that adapt to any screen size

## 🚨 Crisis Support Integration

### Detection System
The app monitors for concerning language patterns including:
- Suicidal ideation keywords
- Self-harm expressions
- Crisis language indicators

### Immediate Response
When crisis language is detected:
1. Modal appears with emergency resources
2. National Suicide Prevention Lifeline (988)
3. Crisis Text Line (HOME to 741741)
4. Encouraging messaging about getting help

### Always Available
Crisis support information is prominently displayed in:
- Footer of all public pages
- Emergency modal in chat interface
- Header navigation when appropriate

## 🔮 Future Enhancements

### Backend Integration
- Supabase authentication setup
- User data persistence
- Conversation history storage
- Real-time chat synchronization

### AI Integration  
- OpenAI GPT integration for responses
- Sentiment analysis for better support
- Personalized conversation paths
- Crisis escalation protocols

### Advanced Features
- Group therapy sessions
- Professional therapist matching
- Progress tracking and analytics
- Integration with mental health resources

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Maintain accessibility standards
3. Write semantic HTML
4. Use Tailwind classes consistently
5. Comment complex logic thoroughly

### Code Style
- ESLint configuration enforced
- Prettier for code formatting
- Consistent naming conventions
- Component-based architecture

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support & Crisis Resources

### Immediate Help
- **National Suicide Prevention Lifeline**: Call or text 988
- **Crisis Text Line**: Text HOME to 741741
- **Emergency Services**: Call 911

### Additional Resources
- [NAMI (National Alliance on Mental Illness)](https://nami.org)
- [Mental Health America](https://mhanational.org)
- [Anxiety and Depression Association of America](https://adaa.org)

---

**Important**: This application is designed to provide support and resources but is not a replacement for professional mental health care. If you are experiencing a mental health crisis, please reach out to emergency services or crisis hotlines immediately.
