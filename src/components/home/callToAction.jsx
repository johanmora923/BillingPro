import React from "react";

const CallToAction = () => {
    return (
        <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 py-20 overflow-hidden">
            <div className="relative max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center">
                {/* Texto principal */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <h2 className="text-5xl font-extrabold text-white mb-6">
                        Transform Your Billing Experience
                    </h2>
                    <p className="text-xl text-white mb-8">
                        Take control of your business with effortless invoicing and payment management. Start your 1-month free trial today!
                    </p>
                    <a
                        href="#signup"
                        className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
                    >
                        Start Free Trial
                    </a>
                </div>

                {/* Imagen o ilustración */}
                <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
                    <img
                        src="mockups3.png"
                        alt="Simplify billing illustration"
                        className="w-full max-w-md rounded-lg"
                    />
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
