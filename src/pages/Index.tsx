
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Shield, Heart, Star, Users, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
      title: "AI-Powered Conversations",
      description: "Get personalized support through intelligent conversations tailored to your needs."
    },
    {
      icon: <Headphones className="h-8 w-8 text-primary" />,
      title: "Voice & Chat Support",
      description: "Communicate your way - through voice messages or traditional text chat."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Safe & Secure",
      description: "Your privacy is our priority with end-to-end encryption and secure data handling."
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Crisis Support",
      description: "Immediate access to crisis resources and professional help when you need it most."
    }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      age: "19",
      text: "GlowMind helped me through my toughest semester. The AI really understands what I'm going through.",
      rating: 5
    },
    {
      name: "Jordan Smith",
      age: "22",
      text: "Having someone to talk to anytime, anywhere has been life-changing. The voice feature feels so natural.",
      rating: 5
    },
    {
      name: "Taylor Rodriguez",
      age: "20",
      text: "Finally, mental health support that speaks my language. The interface is beautiful and easy to use.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B4FF57] via-purple-200 to-[#FF6EC7]">
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#B4FF57] to-[#FF6EC7] rounded-full"></div>
              <span className="text-xl font-bold text-gray-900">GlowMind</span>
            </div>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-900 hover:bg-white/20">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gray-900 text-white hover:bg-gray-800">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your Mental Health
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Companion
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            Connect with an AI-powered mental health assistant designed specifically for young adults. 
            Get support, guidance, and resources whenever you need them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 text-lg px-8 py-4">
                Start Your Journey
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white text-lg px-8 py-4">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Why Choose GlowMind?
          </h2>
          <p className="text-xl text-center text-gray-700 mb-16 max-w-3xl mx-auto">
            Experience mental health support designed for the digital generation with cutting-edge AI technology.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="backdrop-blur-md bg-white/20 border-white/30 hover:bg-white/30 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-white/20">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-gray-900 text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Real Stories, Real Impact
          </h2>
          <p className="text-xl text-center text-gray-700 mb-16">
            See how GlowMind has helped young adults navigate their mental health journey.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="backdrop-blur-md bg-white/20 border-white/30">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-gray-900">{testimonial.name}, {testimonial.age}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="backdrop-blur-md bg-white/20 border-white/30 p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Join thousands of young adults who have found support and guidance through GlowMind.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 text-lg px-12 py-4">
                Get Started Free
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="backdrop-blur-md bg-white/10 border-t border-white/20 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#B4FF57] to-[#FF6EC7] rounded-full"></div>
                <span className="text-xl font-bold text-gray-900">GlowMind</span>
              </div>
              <p className="text-gray-700">Supporting young adults on their mental health journey.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-700">
                <li><a href="#" className="hover:text-gray-900">Crisis Support</a></li>
                <li><a href="#" className="hover:text-gray-900">Mental Health Tips</a></li>
                <li><a href="#" className="hover:text-gray-900">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-gray-700">
                <li><a href="#" className="hover:text-gray-900">About Us</a></li>
                <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Emergency</h3>
              <p className="text-gray-700 mb-2">Crisis Text Line:</p>
              <p className="font-bold text-gray-900">Text HOME to 741741</p>
              <p className="text-gray-700 mb-2 mt-4">Suicide Prevention:</p>
              <p className="font-bold text-gray-900">Call 988</p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-gray-700">
            <p>&copy; 2024 GlowMind. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
