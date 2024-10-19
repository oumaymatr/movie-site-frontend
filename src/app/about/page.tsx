import React from "react";

const About = () => {
  return (
    <div className="container mx-auto p-6 min-h-screen flex flex-col items-center justify-start mt-10 mb-10">
      <div className="mt-10">
        <h1 className="text-3xl md:text-4xl mb-4 font-bold text-center">
          About The Site
        </h1>
        <p className="text-base md:text-lg mb-8 text-center">
          BookmarkMyMovies is an innovative web application designed for movie
          enthusiasts. <br />
          This platform allows users to discover, bookmark, and share their
          favorite films all in one place.
        </p>
      </div>

      <div className="mb-20 mt-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Project Overview
        </h2>
        <p className="text-base md:text-lg mb-10">
          In a world overflowing with movie options, BookmarkMyMovies helps you
          keep track of what to watch and share your favorites with friends. <br/>
          Whether you&apos;re looking for the latest blockbusters or hidden
          gems, this app makes it easy to explore and save movies you love.
        </p>
      </div>

      <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { icon: "🌟", title: "Discover trending movies" },
          { icon: "📚", title: "Bookmark your favorites" },
          { icon: "🗂️", title: "User profiles" },
          { icon: "🔍", title: "Detailed movie info" },
          { icon: "🌙", title: "Dark/light mode" },
          { icon: "💬", title: "User reviews" },
        ].map((feature, index) => (
          <div
            key={index}
            className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
          >
            <div className="text-3xl mb-2 text-center">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-center">
              {feature.title}
            </h3>
          </div>
        ))}
      </div>

      <div className="mb-15 mt-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Technologies Used
        </h2>
        <p className="text-base md:text-lg mb-4">
          BookmarkMyMovies is built using modern web technologies, including:
        </p>
        <ul className="list-disc list-inside mb-4 mx-auto text-left px-4">
          <li className="text-base md:text-lg mb-2">
            🌐 Next.js for server-side rendering and static site generation
          </li>
          <li className="text-base md:text-lg mb-2">
            🎨 Tailwind CSS for a responsive design
          </li>
          <li className="text-base md:text-lg mb-2">
            📦 NestJS for the backend API
          </li>
          <li className="text-base md:text-lg mb-2">
            🐱 MongoDB for data storage
          </li>
          <li className="text-base md:text-lg mb-2">
            🔑 JSON Web Tokens (JWT) for secure authentication
          </li>
        </ul>
      </div>

      <h2 className="text-2xl md:text-3xl font-semibold mb-15 mt-20 text-center">
        Contact Me
      </h2>
      <p className="text-base md:text-lg text-center mb-4 mt-4">
        I would love to hear from you! If you have any questions, suggestions,
        or feedback, feel free to reach out at:
      </p>
      <p className="text-base md:text-lg text-center mb-15">
        📧{" "}
        <a
          href="mailto:youremail@example.com"
          className="text-blue-500 hover:underline"
        >
          oumayma.trabelsi@etudiant-enit.utm.tn
        </a>
      </p>
    </div>
  );
};

export default About;
