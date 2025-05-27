import React from "react";
import { Fade } from "react-awesome-reveal";
import { Footer } from "../../components/managerComponents/footer";
import { Button } from "../../components/managerComponents/button";
import '../../landing.css';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('header.png')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <nav className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <a href="#" className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-white">Flow</span>
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Space</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Button name="Login" link="/login" className="px-6 py-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 transition-colors duration-300" />
              <Button name="Register" link="/register" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300" />
            </div>
          </nav>

          {/* Hero Content */}
          <div className="py-20 md:py-32">
            <Fade direction="up" triggerOnce>
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Transform Your
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    {" "}Workspace Experience
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                  Discover the perfect workspace solution for your business. Flexible, modern, and designed for productivity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button name="Get Started" link="/register" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300" />
                  <Button name="Learn More" link="#features" className="px-8 py-3 bg-white text-slate-900 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300" />
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Fade direction="up" triggerOnce>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Us</h2>
              <p className="text-xl text-gray-300">Everything you need to succeed in one place</p>
            </div>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Fade direction="up" delay={200} triggerOnce>
              <div className="bg-slate-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Flexible Workspaces</h3>
                <p className="text-gray-400">
                  Choose from a variety of workspaces designed to match your needs. From private offices to shared desks, we have the perfect spot for you.
                </p>
              </div>
            </Fade>

            <Fade direction="up" delay={400} triggerOnce>
              <div className="bg-slate-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Vibrant Community</h3>
                <p className="text-gray-400">
                  Join a network of professionals and entrepreneurs. Collaborate, network, and grow your business in a supportive environment.
                </p>
              </div>
            </Fade>

            <Fade direction="up" delay={600} triggerOnce>
              <div className="bg-slate-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Premium Amenities</h3>
                <p className="text-gray-400">
                  Enjoy high-speed internet, meeting rooms, and 24/7 access. We provide everything you need to focus on what matters most.
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <Fade direction="left" triggerOnce>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Join Our Growing Community
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Experience the perfect blend of productivity and comfort in our modern workspaces. Join hundreds of satisfied members who have found their ideal work environment with us.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/150?img=${i}`}
                        alt="Member"
                        className="w-10 h-10 rounded-full border-2 border-slate-900"
                      />
                    ))}
                  </div>
                  <span className="text-gray-400">+100 members and growing</span>
                </div>
              </div>
            </Fade>

            <Fade direction="right" triggerOnce>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl transform rotate-3"></div>
                <img
                  src="https://i.postimg.cc/tTLtNPGf/coworking-wep.webp"
                  alt="Workspace"
                  className="relative rounded-2xl shadow-2xl transform -rotate-3"
                />
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Fade direction="up" triggerOnce>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Workspace?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join us today and experience the future of work
            </p>
            <Button
              name="Get Started Now"
              link="/register"
              className="px-8 py-3 bg-white text-slate-900 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
            />
          </Fade>
        </div>
      </section>

      <Footer />
    </div>
  );
}
