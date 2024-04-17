import axios from "@/lib/axios";
import { useTranslation } from 'react-i18next';

const ReportButton = ({ companyId }: { companyId: number }) => {
  const { t } = useTranslation();

  function getFormattedTimestamp() {
    const date = new Date();
    const year = date.getFullYear().toString().substring(2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  const handleExportButtonClick = () => {
    axios.get(`/api/reports/${companyId}/excel`, { 
      responseType: 'blob' 
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data])); 
        const link = document.createElement('a');

        const timestamp = getFormattedTimestamp();

        //const currentCompanyName = useAppSelector(selectCompanyName);

        const filename = `innoduel_dashboard_${timestamp}.xlsx`;


        link.href = url;
        link.setAttribute('download', filename);
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
