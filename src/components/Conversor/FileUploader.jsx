import { useState } from 'react';
import FileReader from 'react-file-reader';
import { convertJSONtoXLSX } from './jsonToXlsxConverter';
import { saveAs } from 'file-saver';

const FileUploader = () => {
  const [fileContent, setFileContent] = useState('');
  const [jsonData, setJsonData] = useState([]);

  const handleFiles = (files) => {
    const reader = new window.FileReader();
    reader.onload = () => {
      const content = reader.result;
      setFileContent(content);

      try {
        const json = JSON.parse(content);
        setJsonData(json);
      } catch (error) {
        console.error('Error al parsear el archivo JSON:', error);
      }
    };
    reader.readAsText(files[0]);
  };

  const handleDownload = () => {
    const xlsxFile = convertJSONtoXLSX(jsonData);
    saveAs(xlsxFile, 'data.xlsx');
  };

  return (
    <div>
      <FileReader handleFiles={handleFiles} fileTypes={['.json']} multipleFiles={false}>
        <button>Seleccionar archivo JSON</button>
      </FileReader>
      {jsonData.length > 0 && (
        <div>
          <h2>Primeras 5 filas del archivo JSON:</h2>
          <table>
            <thead>
              <tr>
                {Object.keys(jsonData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jsonData.slice(0, 5).map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleDownload}>Descargar archivo XLSX</button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
