
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Send, 
  Mic, 
  MicOff, 
  Menu, 
  LogOut, 
  Plus, 
  MessageCircle,
  Volume2,
  VolumeX,
  AlertTriangle,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isAudio?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your mental health companion. How are you feeling today? Feel free to talk to me through text or voice - I'm here to listen and support you.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: '1', title: 'Today\'s Session', lastMessage: 'How are you feeling?', timestamp: new Date() },
    { id: '2', title: 'Yesterday - Anxiety Chat', lastMessage: 'Thank you for sharing...', timestamp: new Date(Date.now() - 86400000) },
    { id: '3', title: 'Last Week - Sleep Issues', lastMessage: 'Those tips seem helpful...', timestamp: new Date(Date.now() - 604800000) }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Crisis keywords detection
  const crisisKeywords = [
    'suicide', 'kill myself', 'end my life', 'want to die', 'hurt myself', 
    'self harm', 'cutting', 'overdose', 'jump off', 'hanging myself'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectCrisisLanguage = (message: string) => {
    const lowerMessage = message.toLowerCase();
    return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Check for crisis language
    if (detectCrisisLanguage(inputMessage)) {
      setShowCrisisModal(true);
    }

    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

      // Text-to-speech for AI response
      if (isAudioEnabled) {
        speakText(aiResponse.content);
      }
    }, 1500);
  };

  const generateAIResponse = (userInput: string) => {
    const responses = [
      "I hear you, and I want you to know that your feelings are valid. Can you tell me more about what's been on your mind?",
      "Thank you for sharing that with me. It takes courage to open up about difficult feelings. How has this been affecting your daily life?",
      "I'm here to listen and support you. What would be most helpful for you right now?",
      "That sounds challenging. You're not alone in feeling this way. Have you been able to talk to anyone else about this?",
      "I appreciate you trusting me with this. What are some things that usually help you feel a bit better?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      
      // Simple voice recording simulation
      setTimeout(() => {
        setIsRecording(false);
        const voiceMessage: Message = {
          id: Date.now().toString(),
          content: "I've been feeling really anxious lately about school and work...",
          sender: 'user',
          timestamp: new Date(),
          isAudio: true
        };
        setMessages(prev => [...prev, voiceMessage]);
        
        // Trigger AI response
        setTimeout(() => {
          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            content: "I understand that school and work can create a lot of pressure. It's completely normal to feel anxious about these responsibilities. What specific aspects are causing you the most stress?",
            sender: 'ai',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiResponse]);
          
          if (isAudioEnabled) {
            speakText(aiResponse.content);
          }
        }, 1500);
      }, 3000);
      
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B4FF57] via-purple-200 to-[#FF6EC7]">
      {/* Crisis Support Modal */}
      <Dialog open={showCrisisModal} onOpenChange={setShowCrisisModal}>
        <DialogContent className="backdrop-blur-md bg-white/90 border-white/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Crisis Support Available
            </DialogTitle>
            <DialogDescription className="space-y-4">
              <p>If you're having thoughts of suicide or self-harm, please reach out for immediate help:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                  <Phone className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-semibold text-red-800">National Suicide Prevention Lifeline</p>
                    <p className="text-red-700">Call or text 988</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-800">Crisis Text Line</p>
                    <p className="text-blue-700">Text HOME to 741741</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Remember: You are not alone, and help is always available.
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-900 hover:bg-white/20">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="backdrop-blur-md bg-white/20 border-white/30 w-80">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#B4FF57] to-[#FF6EC7] rounded-full"></div>
                    <span className="text-xl font-bold text-gray-900">GlowMind</span>
                  </div>
                  
                  <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 mb-4">
                    <Plus className="h-4 w-4 mr-2" />
                    New Conversation
                  </Button>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 mb-3">Recent Conversations</h3>
                    {conversations.map((conv) => (
                      <Card key={conv.id} className="backdrop-blur-sm bg-white/20 border-white/30 hover:bg-white/30 cursor-pointer transition-all">
                        <CardContent className="p-3">
                          <h4 className="font-medium text-gray-900 text-sm mb-1">{conv.title}</h4>
                          <p className="text-xs text-gray-700 truncate">{conv.lastMessage}</p>
                          <p className="text-xs text-gray-600 mt-1">{conv.timestamp.toLocaleDateString()}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#B4FF57] to-[#FF6EC7] rounded-full"></div>
              <span className="font-semibold text-gray-900">GlowMind Chat</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className="text-gray-900 hover:bg-white/20"
              aria-label={isAudioEnabled ? "Disable audio" : "Enable audio"}
            >
              {isAudioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>
            
            <Avatar className="h-8 w-8 bg-white/20">
              <AvatarFallback className="text-gray-900 font-semibold">JD</AvatarFallback>
            </Avatar>
            
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-gray-900 hover:bg-white/20">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex flex-col h-[calc(100vh-73px)]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-xs md:max-w-md lg:max-w-lg ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                {message.sender === 'ai' && (
                  <div className="relative">
                    {/* Glowing Orb Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 p-0.5 animate-pulse">
                      <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm"></div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 blur-md opacity-50 animate-pulse"></div>
                  </div>
                )}
                
                {message.sender === 'user' && (
                  <Avatar className="h-10 w-10 bg-white/30">
                    <AvatarFallback className="text-gray-900 font-semibold">You</AvatarFallback>
                  </Avatar>
                )}

                <Card className={`backdrop-blur-md border-white/30 ${
                  message.sender === 'user' 
                    ? 'bg-gray-900/80 text-white' 
                    : 'bg-white/20 text-gray-900'
                }`}>
                  <CardContent className="p-3">
                    {message.isAudio && (
                      <div className="flex items-center gap-2 mb-2 text-sm opacity-75">
                        <Mic className="h-3 w-3" />
                        Voice message
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 opacity-60 ${
                      message.sender === 'user' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 p-0.5 animate-pulse">
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 blur-md opacity-50 animate-pulse"></div>
                </div>
                
                <Card className="backdrop-blur-md bg-white/20 border-white/30">
                  <CardContent className="p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 backdrop-blur-md bg-white/10 border-t border-white/20">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... or use voice"
                className="pr-12 backdrop-blur-sm bg-white/50 border-white/50 focus:bg-white/70 text-gray-900 placeholder:text-gray-600"
                aria-label="Type your message"
              />
            </div>
            
            <Button
              onClick={isRecording ? undefined : startRecording}
              disabled={isRecording}
              className={`p-3 ${isRecording 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-gray-900 hover:bg-gray-800'
              } text-white`}
              aria-label={isRecording ? "Recording..." : "Start voice recording"}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="p-3 bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
