export default function ChooseFromList({ title, data, onClick }) {
  return (
    <div className="container mx-auto items-center justify-center h-screen mt-4">
      <div className="w-full">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
          {title}
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {data.map((d) => (
            <div
              key={d}
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
            >
              <div className="min-w-0 flex-1">
                <span
                  onClick={() => onClick(d)}
                  className="focus:outline-none hover:cursor-pointer"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="truncate text-sm text-gray-500">{d}</p>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
