import axios from "@/lib/axios";
import { useTranslation } from 'react-i18next';

const ReportButton = ({ companyId }: { companyId: number }) => {
  const { t } = useTranslation();

  const handleExportButtonClick = () => {
    axios.get(`/api/reports/${companyId}/excel`, { 
      responseType: 'blob' 
    })
    .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data])); 
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
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
      {t('export_all_data')}
    </button>
  );
};

export default ReportButton;
