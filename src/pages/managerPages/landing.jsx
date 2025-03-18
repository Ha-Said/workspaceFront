import React from "react";
import { Fade } from "react-awesome-reveal";
import { Footer } from "../../components/managerComponents/footer";
import {Button} from "../../components/managerComponents/button"
import '../../landing.css'
export  default function Landing() {
  return (
    <div
      className="leading-normal tracking-normal text-indigo-400 m-6 bg-cover bg-fixed bg-gradient-to-r from-slate-900 to-slate-700"
      style={{ backgroundImage: "url('header.png')" }}
    >
      <div className="h-full mb-20">
        {/* Nav */}
        <div className="w-full container mx-auto">
          <div className="w-full flex items-center justify-between">
            <a
              className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
              href="#"
            >
              Rain
              <span className="bg-clip-text text-transparent bg-white">
                blur
              </span>
            </a>
            <div className="flex w-1/2 justify-end content-center">
              <Button
              name={"login"}
              link={"/login"}
              />
              <Button
              name={"register"}
              link={"/register"}
              />
            </div>
          </div>
        </div>
        {/* Main */}
        <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          {/* Left Col */}
          <Fade>
            <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
              <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
                Main
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                  Hero Message
                </span>
                to sell yourself!
              </h1>
              <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
                Sub-hero message, not too long and not too short. Make it just
                right!
              </p>
            </div>
          </Fade>
          
            <section className="pb-20 mt-24">
              <Fade>
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap">
                  <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                    <div className="relative flex flex-col min-w-0 break-words bg-gray-900 w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                       
                        <h6 className="text-xl font-semibold text-white mb-7">
                          Flexible Workspaces
                        </h6>
                        <p className="mt-2 mb-4 text-gray-400">
                          Discover a variety of workspaces tailored to your
                          needs. From private offices to shared desks, we have
                          the perfect spot for you.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-4/12 px-4 text-center">
                    <div className="relative flex flex-col min-w-0 break-words bg-gray-900 w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                       
                        <h6 className="text-xl font-semibold text-white mb-7">
                          Community and Networking
                        </h6>
                        <p className="mt-2 mb-4 text-gray-400">
                          Join a vibrant community of professionals and
                          entrepreneurs. Network, collaborate, and grow your
                          business with us.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                    <div className="relative flex flex-col min-w-0 break-words bg-gray-900 w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                        
                        <h6 className="text-xl font-semibold text-white mb-7">
                          Amenities and Services
                        </h6>
                        <p className="mt-2 mb-4 text-gray-400">
                          Enjoy top-notch amenities including high-speed
                          internet, meeting rooms, and 24/7 access. We provide
                          everything you need to succeed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center mt-32">
                  <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                    
                    <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">
                      Working with us is a pleasure
                    </h3>
                    <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-400">
                      Our coworking spaces are designed to foster productivity
                      and creativity. With flexible membership options and a
                      supportive community, you'll find the perfect environment
                      to grow your business.
                    </p>
                  </div>
                  <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-gray-900 w-full mb-6 shadow-lg rounded-lg">
                      <img
                        alt="..."
                        src="https://i.postimg.cc/903qXgjJ/pcBaby.jpg"
                        className="w-full align-middle rounded-t-lg"
                      />
                      <blockquote className="relative p-8 mb-4">
                        <svg
                          preserveAspectRatio="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 583 95"
                          className="absolute left-0 w-full block h-95-px -top-94-px"
                        >
                          
                        </svg>
                        <h4 className="text-xl font-bold text-white">
                          Top Notch Services
                        </h4>
                        <p className="text-md font-light mt-2 text-gray-300">
                          Our coworking spaces provide everything you need to
                          succeed. From high-speed internet to meeting rooms, we
                          have you covered.
                        </p>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
              </Fade>
            </section>
          
          <section className=" ">
            <Fade>
            <div
              className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
               
              </svg> 
            </div>

            <div className="container mx-auto px-4">
              <div className="items-center flex flex-wrap">
                <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                  <img
                    alt="..."
                    className="max-w-full rounded-lg shadow-lg"
                    src="https://i.postimg.cc/tTLtNPGf/coworking-wep.webp"
                  />
                </div>
                <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                  <div className="md:pr-12">
                    <h3 className="text-3xl font-semibold text-white">
                      A growing platform
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-gray-400">
                      CareBridge offers a seamless start with an intuitive
                      design. Customize profiles and explore trusted babysitter
                      options effortlessly to meet your needs.
                    </p>
                    <ul className="list-none mt-6"></ul>
                  </div>
                </div>
              </div>
            </div>
            </Fade>
          </section>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
