import React, { useState } from "react";

const TestimonialSection = () => {
    const testimonials = [
        {
            name: "Jane Doe",
            role: "Small Business Owner",
            review: "This billing system has completely streamlined my invoicing process. It’s simple, efficient, and saves me so much time!",
            image: "https://via.placeholder.com/80",
        },
        {
            name: "John Smith",
            role: "Freelancer",
            review: "I love how easy it is to track payments and manage my clients. The interface is very user-friendly!",
            image: "https://via.placeholder.com/80",
        },
        {
            name: "Emily Johnson",
            role: "Finance Manager",
            review: "The detailed financial reports give me everything I need to analyze our business performance. Highly recommended!",
            image: "https://via.placeholder.com/80",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    return (
        <section className="bg-gray-50 py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-12">
                    What Our Clients Say
                </h2>
                <div className="relative bg-white rounded-lg shadow-lg p-8">
                    <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-blue-500"
                    />
                    <p className="text-xl text-gray-600 italic mb-6">
                        "{testimonials[currentIndex].review}"
                    </p>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {testimonials[currentIndex].role}
                    </p>

                    {/* Controles para avanzar/retroceder */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={handlePrev}
                            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                        >
                            &larr; Previous
                        </button>
                        <button
                            onClick={handleNext}
                            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                        >
                            Next &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
