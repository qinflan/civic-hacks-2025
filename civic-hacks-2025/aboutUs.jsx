import { FaLinkedin } from "react-icons/fa"; // Import LinkedIn icon

export default function AboutUs() {
  // Website Description
  const websiteDescription = `
    Our platform provides a comprehensive tool for analyzing biodiversity and its economic impact.
    Users can input data such as latitude or species ID to retrieve detailed information on the biodiversity
    in that region and how it affects the local economy. We aim to raise awareness and support sustainable development
    through accessible, data-driven insights.
  `;

  // Author Details
  const authors = [
    { 
      name: "Lingjie Su", 
      major: "Econ & CS", 
      linkedin: "https://www.linkedin.com/in/lingjie-su-74267734b/" 
    }
  ];

  return (
    <>
      <main className="p-6 max-w-3xl mx-auto text-center flex flex-col items-center bg-gradient-to-b from-green-100 to-white min-h-screen">
        {/* Mission Statement */}
        <section className="text-2xl font-semibold leading-relaxed p-6 text-center">
          Our mission is to{" "}
          <span className="text-blue-500 font-bold">organize</span> the world’s{" "}
          <span className="text-red-500 font-bold">information</span> and make it{" "}
          <br />
          <span className="text-green-600 font-bold">universally accessible</span> and{" "}
          <span className="text-orange-500 font-bold">useful</span>.
        </section>

        <h1 className="text-4xl font-extrabold text-green-700 drop-shadow-lg">
          About Us
        </h1>

        {/* Website Description */}
        <section className="mt-6 text-lg text-gray-700 max-w-xl bg-white p-6 rounded-xl shadow-lg border">
          <p className="leading-relaxed">{websiteDescription}</p>
        </section>

        {/* Authors Section */}
        <section className="mt-10 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-green-700">Meet the Author</h2>
          <div className="mt-6 space-y-6">
            {authors.map((author, index) => (
              <div
                key={index}
                className="p-6 bg-white border rounded-lg shadow-md text-center flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-800">{author.name}</h3>
                <p className="text-gray-600">{author.major}</p>
                
                {/* LinkedIn Profile */}
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-blue-600 flex items-center gap-2 hover:underline"
                >
                  <FaLinkedin size={20} className="text-blue-600" />
                  Connect on LinkedIn
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* API Citation Section */}
        <section className="mt-10 w-full max-w-lg text-center">
          <h2 className="text-2xl font-semibold text-green-700">Citations</h2>
          <p className="text-gray-700 mt-4">
            Our Application uses the{" "}
            <a
              href="https://react-leaflet.js.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-semibold"
            >
              React-Leaflet API
            </a>{" "}
            for mapping and geospatial analysis.
          </p>
          <p className="text-gray-700 mt-4">
            As well as {" "}
            <a
              href="https://data.huh.harvard.edu/databases/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-semibold"
            >
              Harvard University Herbaria & Libraries
            </a>{" "}
            for database and specimen.
          </p>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="mt-10 text-center text-sm text-gray-500 bg-gray-100 py-4 w-full shadow-inner">
        <p>© {new Date().getFullYear()} Biodiversity Awareness. All rights reserved.</p>
      </footer>
    </>
  );
}
