import React from "react";
import { Fade } from "react-awesome-reveal";
import { Footer } from "./components/footer";
export function Landing() {
  return (
    <div
      className="leading-normal tracking-normal text-indigo-400 m-6 bg-cover bg-fixed"
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
              <a
                className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                href="https://twitter.com/intent/tweet?url=#"
              >
                <svg
                  className="fill-current h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z"></path>
                </svg>
              </a>
              <a
                className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                href="https://www.facebook.com/sharer/sharer.php?u=#"
              >
                <svg
                  className="fill-current h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z"></path>
                </svg>
              </a>
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
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-500">
                          <i className="fas fa-award"></i>
                        </div>
                        <h6 className="text-xl font-semibold text-white">
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
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-500">
                          <i className="fas fa-fingerprint"></i>
                        </div>
                        <h6 className="text-xl font-semibold text-white">
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
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-500">
                          <i className="fas fa-retweet"></i>
                        </div>
                        <h6 className="text-xl font-semibold text-white">
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
                    <div className="text-red-200 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-900">
                      <i className="fas fa-user-friends text-xl"></i>
                    </div>
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
                    <div className="relative flex flex-col min-w-0 break-words bg-gray-900 w-full mb-6 shadow-lg rounded-lg bg-indigo-600">
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
                    src="https://i.postimg.cc/zDKVqk2P/baby-9304011.jpg"
                  />
                </div>
                <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                  <div className="md:pr-12">
                    <div className="text-indigo-300 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-indigo-700">
                      <i className="fas fa-rocket text-xl"></i>
                    </div>
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
