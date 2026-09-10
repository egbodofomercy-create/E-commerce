import React from "react";
import { Link } from "react-router-dom";
import about from "../assets/about.JPG";

const About = () => {
  return (
    <div className="pt-10 bg-white">

      {/* ================= HERO ================= */}

      <section className="max-w-6xl mx-auto px-5 py-16 sm:py-20">

        <p className="text-xs tracking-[0.3em] text-blue-600 mb-4">
          ABOUT BLUVORY
        </p>

        <h1 className="text-3xl sm:text-5xl font-light leading-tight text-gray-900">
          Jewellery that speaks
          <br />
          <span className="font-medium">
            without saying a word.
          </span>
        </h1>

        <p className="mt-6 text-sm sm:text-base leading-7 text-gray-500 max-w-xl">
          Bluvory is about the details — the pieces you reach
          for every day, the ones that complete an outfit, and
          the ones that become part of your story.
        </p>

      </section>


      {/* ================= OUR STORY ================= */}

      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-20">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Image */}

          <div className="bg-gray-100 overflow-hidden">
            <img
              src={about}
              alt="About Bluvory"
              className="w-full h-full object-cover"
            />
          </div>


          {/* Story */}

          <div>

            <p className="text-xs tracking-[0.3em] text-blue-600 mb-4">
              OUR STORY
            </p>

            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-6">
              Made for every version of you.
            </h2>

            <div className="space-y-5 text-sm leading-7 text-gray-500">

              <p>
                Bluvory was created from a simple love for jewellery
                and the little details that make an outfit feel
                complete.
              </p>

              <p>
                From everyday essentials to statement pieces, our
                collection is designed to give you something you can
                wear your way — whether you're keeping it simple or
                making an entrance.
              </p>

              <p>
                We believe jewellery should feel like an extension
                of your personality, not something you wear just
                because it's trending.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= WHAT WE BELIEVE ================= */}

      <section className="max-w-6xl mx-auto px-5 pb-16 sm:pb-20">

        <div>

          <div className="mb-12">

            <p className="text-xs tracking-[0.3em] text-blue-600 mb-4">
              WHAT WE BELIEVE
            </p>

            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900">
              The Bluvory standard.
            </h2>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

            <div>
              <p className="text-xs text-blue-500 mb-4">
                01
              </p>

              <h3 className="text-base font-medium text-gray-900 mb-3">
                Timeless
              </h3>

              <p className="text-sm leading-7 text-gray-500">
                Pieces that remain beautiful beyond seasons,
                trends and occasions.
              </p>
            </div>


            <div>
              <p className="text-xs text-blue-500 mb-4">
                02
              </p>

              <h3 className="text-base font-medium text-gray-900 mb-3">
                Effortless
              </h3>

              <p className="text-sm leading-7 text-gray-500">
                Jewellery that fits naturally into your everyday
                style and makes getting dressed feel easy.
              </p>
            </div>


            <div>
              <p className="text-xs text-blue-500 mb-4">
                03
              </p>

              <h3 className="text-base font-medium text-gray-900 mb-3">
                Personal
              </h3>

              <p className="text-sm leading-7 text-gray-500">
                Because the best pieces are the ones that feel
                uniquely yours.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="max-w-6xl mx-auto px-5 pb-20">

        <div className="text-center">

          <p className="text-xs tracking-[0.3em] text-blue-600 mb-4">
            FIND YOUR PIECE
          </p>

          <h2 className="text-2xl sm:text-4xl font-light text-gray-900">
            Something for every story.
          </h2>

          <p className="text-sm leading-7 text-gray-500 max-w-md mx-auto mt-5">
            Discover jewellery designed to complement your style,
            your mood and every version of you.
          </p>

          <Link
            to="/collection"
            className="inline-block mt-8 bg-blue-600 text-white text-xs tracking-widest px-8 py-4 hover:bg-blue-700 transition"
          >
            SHOP COLLECTION
          </Link>

        </div>

      </section>

    </div>
  );
};

export default About;