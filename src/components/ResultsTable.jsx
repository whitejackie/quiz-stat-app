function Results({ userResponses }) {
  return (
    <table className="border-collapse border border-gray-400">
      <thead>
        <tr className="bg-[#F8F8F8]">
          <th className="border border-gray-300 py-1.5 px-3">Küsimus</th>
          <th className="border border-gray-300 py-1.5 px-3">Valitud vastus</th>
          <th className="border border-gray-300 py-1.5 px-3">Tulemus</th>
        </tr>
      </thead>
      <tbody>
        {userResponses.map((response, index) => (
          <tr key={index} className="odd:bg-white even:bg-[#F8F8F8]">
            <td className="border border-gray-300 py-1.5 px-3">
              {response.question}
            </td>
            <td className="border border-gray-300 py-1.5 px-3">
              {response.selectedOption}
            </td>
            <td className="border border-gray-300 py-1.5 px-3">
              {response.correctAnswer ? (
                <div className="flex">
                  <svg className="w-5 h-5 m-0.5">
                    <use href="/icons.svg#success"></use>
                  </svg>
                  <p>Õige</p>
                </div>
              ) : (
                <div className="flex">
                  <svg className="w-5 h-5 m-0.5">
                    <use href="/icons.svg#error"></use>
                  </svg>
                  <p>Vale</p>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Results;
