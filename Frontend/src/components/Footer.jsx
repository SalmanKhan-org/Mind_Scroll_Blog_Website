import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white md:px-6 px-3 py-5 md:py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
                {/* Logo and Description */}
                <div>
                    <h2 className="md:text-2xl text-xl md:font-bold font-semibold mb-3">MindScroll</h2>
                    <p className="text-sm text-gray-400">
                        Where ideas meet expression. Discover insightful blogs on tech, life, and learning.
                    </p>
                </div>

                <div className="flex justify-between">
                    {/* Quick Links */}
                    <div>
                        <h3 className="md:text-lg text-base font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="/" className="hover:text-white transition">Home</a></li>
                            <li><a href="/blogs/details" className="hover:text-white transition">Blogs</a></li>
                            <li><a href="/" className="hover:text-white transition">About</a></li>
                            <li><a href="/" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="md:text-lg text-base font-semibold mb-3">Categories</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><p className="hover:text-white transition">Technology</p></li>
                            <li><p className="hover:text-white transition">Fashion & Beauty</p></li>
                            <li><p className="hover:text-white transition">Lifestyle</p></li>
                            <li><p className="hover:text-white transition">Entertainment</p></li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter & Social */}
                <div>
                    <h3 className="md:text-lg text-base font-semibold mb-3">Stay Connected</h3>
                    <form className="mb-4">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full px-3 py-2 rounded bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            disabled
                            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded text-sm"
                        >
                            Subscribe
                        </button>
                    </form>
                    <div className="flex items-center justify-center">
                        <div className="flex  space-x-4 text-gray-400 text-xl">
                            <p className="hover:text-white"><FaFacebookF /></p>
                            <p className="hover:text-white"><FaTwitter /></p>
                            <p className="hover:text-white"><FaInstagram /></p>
                            <p className="hover:text-white"><FaLinkedinIn /></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} MindScroll. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
