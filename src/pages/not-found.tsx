const NotFoundPage = () => (
  <div className="min-h-screen bg-white flex flex-col">
    {/* Top Bar */}
    <header className="flex items-center px-8 py-6">
      <img src={"logo-final.svg"} alt="NestFlow" className="h-12 mr-4" />
      <span className="text-2xl font-semibold text-gray-900">NestFlow</span>
    </header>
    {/* Centered 404 Content */}
    <main className="flex flex-1 flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-extrabold text-gray-900 mb-2">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-500 text-base max-w-md mb-6">
        Sorry, we couldn’t find the page you’re looking for. It may have been moved, deleted, or never existed.
      </p>
      <a
        href="/"
        className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg px-8 py-3 font-semibold shadow hover:opacity-90 transition"
      >
        Go Home
      </a>
    </main>
  </div>
);

export default NotFoundPage;
