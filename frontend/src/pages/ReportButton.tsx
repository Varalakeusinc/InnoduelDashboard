const ReportButton = ({ companyId }: { companyId: string }) => {
  const handleExportButtonClick = () => {
    fetch(`/api/reports/${companyId}/excel`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading Excel file:", error);
      });
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded min-w-[200px]"
      style={{ width: "200px" }} 
      onClick={handleExportButtonClick}
    >
      Export all data
    </button>
  );
};

export default ReportButton;
