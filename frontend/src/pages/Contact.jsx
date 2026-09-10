import React from "react";

const Contact = () => {
  return (
    <div className="pt-10 bg-white">

      {/* ================= HERO ================= */}

      <section className="text-center max-w-3xl mx-auto px-5 py-16 sm:py-20">

        <p className="text-xs tracking-[0.3em] text-blue-600 mb-4">
          CONTACT BLUVORY
        </p>

        <h1 className="text-3xl sm:text-5xl font-light tracking-wide text-gray-900">
          We’d love to
          <br />
          <span className="font-medium">hear from you.</span>
        </h1>

        <p className="mt-6 text-sm sm:text-base leading-7 text-gray-500 max-w-xl mx-auto">
          Have a question about an order, a product, or anything
          else? Send us a message and we’ll be happy to help.
        </p>

      </section>


      {/* ================= CONTACT CONTENT ================= */}

      <section className="max-w-6xl mx-auto px-5 pb-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24">

          {/* ================= CONTACT DETAILS ================= */}

          <div className="flex flex-col justify-center">

            <p className="text-xs tracking-[0.25em] text-blue-600 mb-4">
              GET IN TOUCH
            </p>

            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-6">
              Let’s talk.
            </h2>

            <p className="text-sm leading-7 text-gray-500 max-w-md mb-10">
              Whether you need help choosing a piece, have a
              question about your order, or simply want to say hello,
              we're here for you.
            </p>

            <div className="space-y-7">

              {/* Email */}

              <div>
                <p className="text-xs tracking-widest text-gray-400 mb-2">
                  EMAIL
                </p>

                <p className="text-sm text-gray-800">
                  bluvoryaccessories@gmail.com
                </p>
              </div>


              {/* Phone */}

              <div>
                <p className="text-xs tracking-widest text-gray-400 mb-2">
                  PHONE
                </p>

                <p className="text-sm text-gray-800">
                  +234 816 953 8247
                </p>
              </div>


              {/* Hours */}

              <div>
                <p className="text-xs tracking-widest text-gray-400 mb-2">
                  HOURS
                </p>

                <p className="text-sm text-gray-800">
                  Monday – Friday
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  9:00 AM – 5:00 PM
                </p>
              </div>

            </div>

          </div>


          {/* ================= CONTACT FORM ================= */}

          <div className="bg-gray-50 p-7 sm:p-10">

            <h2 className="text-xl font-medium text-gray-900 mb-8">
              Send us a message
            </h2>

            <form className="space-y-6">

              {/* Name */}

              <div>
                <label className="block text-xs tracking-wide text-gray-500 mb-2">
                  NAME
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 transition"
                />
              </div>


              {/* Email */}

              <div>
                <label className="block text-xs tracking-wide text-gray-500 mb-2">
                  EMAIL
                </label>

                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 transition"
                />
              </div>


              {/* Subject */}

              <div>
                <label className="block text-xs tracking-wide text-gray-500 mb-2">
                  SUBJECT
                </label>

                <input
                  type="text"
                  placeholder="What can we help with?"
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 transition"
                />
              </div>


              {/* Message */}

              <div>
                <label className="block text-xs tracking-wide text-gray-500 mb-2">
                  MESSAGE
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none resize-none focus:border-blue-500 transition"
                ></textarea>
              </div>


              {/* Button */}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white text-xs tracking-widest py-4 mt-2 hover:bg-blue-700 transition"
              >
                SEND MESSAGE
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* ================= BOTTOM MESSAGE ================= */}

      <section className="bg-gray-50 text-center px-5 py-16">

        <p className="text-xs tracking-[0.25em] text-blue-600 mb-4">
          BLUVORY
        </p>

        <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-4">
          Your style. Your story. Your piece.
        </h2>

        <p className="text-sm text-gray-500 max-w-md mx-auto">
          We’re always happy to help you find something that feels
          just right.
        </p>

      </section>

    </div>
  );
};

export default Contact;
