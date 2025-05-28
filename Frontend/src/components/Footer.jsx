import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 px-6 py-8 mt-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Brand */}
                <div>
                    <h2 className="md:text-2xl text-xl md:font-bold font-semibold text-white">MindScroll</h2>
                    <p className="mt-2 md:text-sm text-xs text-gray-400">
                        Dive into curated content, ideas, and inspiration.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="md:text-lg text-base font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-white transition">Home</a></li>
                        <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
                        <li><a href="/about" className="hover:text-white transition">About</a></li>
                        <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                    </ul>
                </div>

                
            </div>

            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} MindScroll. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

