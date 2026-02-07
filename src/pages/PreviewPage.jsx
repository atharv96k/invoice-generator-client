import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { templates } from "../assets/assets";
import InvoicePreview from "../components/invoicePreview";

const PreviewPage = () => {
  const {invoiceData, selectedTemplate, setSelectedTemplate } = useContext(AppContext);
  return (
    <div
      className="container-fluid d-flex flex-column p-3"
      style={{ minHeight: "100vh" }}
    >
      <div className="d-flex flex-column align-items-center mb-4 gap-3">
        <div className="d-flex gap-2 flex-wrap justify-content-center">
          {templates.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSelectedTemplate(id)}
              className={`btn btn-sm rounded-pill p-2 ${
                selectedTemplate === id
                  ? "btn-warning"
                  : "btn-outline-secondary"
              }`}
              style={{ height: "38px", minWidth: "100px" }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-2">
          <button className="btn btn-primary d-flex align-items-center justify-content-center">
            {" "}
            Save & Exit
          </button>
          <button className="btn btn-danger">Delete invoice</button>
          <button className="btn btn-secondary">Back to Dashboard</button>
          <button className="btn btn-info">Send Email</button>
          <button className="btn btn-success d-flex align-items-center justify-content-center">Download PDF</button>
        </div>
      </div>
      <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light py-3">
        <div 
          style={{
            width: "794px",
            minHeight: "1123px",
            backgroundColor: "#fff",
            boxShadow: "0 0 8px rgba(0,0,0,0.15)",
            margin: 0,
            padding: 0,
            overflow: "hidden",
          }}
        >
          <InvoicePreview 
            invoiceData={invoiceData}
            template={selectedTemplate}
          />
        </div>
      </div>
    </div>
  );
};
export default PreviewPage;
