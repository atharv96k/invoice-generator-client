import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { templates } from "../assets/assets";
import InvoicePreview from "../components/invoicePreview";
import { deleteInvoice, saveInvoice, sendInvoice } from "../service/invoiceService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import { uploadInvoiceThumbnail } from "../service/cloudinaryService";
import { generatePdfFromElement } from "../utils/pdfUtils";

const PreviewPage = () => {
  const previewRef = useRef();
  const { invoiceData, selectedTemplate, setSelectedTemplate, baseURL } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [emailing, setEmailing]=useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!invoiceData || !invoiceData.items?.length) {
      toast.error("Invoice data is missing.");
      navigate("/");
    }
  }, [invoiceData, navigate]);

  const handleSaveAndExit = async () => {
    try {
      setLoading(true);

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fff",
        scrollY: -window.scrollY,
      });

      const imageData = canvas.toDataURL("image/png");
      const thumbnailUrl = await uploadInvoiceThumbnail(imageData);
      const payload = {
        ...invoiceData,
        thumbnailUrl,
        template: selectedTemplate,
      };
      const response = await saveInvoice(baseURL, payload);
      if (response.status == 200) {
        toast.success("Invoice saved successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed To save invoice ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!invoiceData.id) {
      toast.success("Invoice deleted successfully.");
      navigate("/dashboard");
    }

    try {
      const response = await deleteInvoice(baseURL, invoiceData.id);
      if (response.status == 204) {
        toast.success("Invoice deleted successfully.");
        navigate("/dashboard");
      } else {
        toast.error("Unable to delete invoice.");
      }
    } catch (error) {
      toast.error("Failed to delete invoice", error.message);
    }
  };

  const handleDownloadPdf = async () => {
    if (!previewRef.current) {
      return;
    }
    try {
      setDownloading(true);
      await generatePdfFromElement(
        previewRef.current,
        `invoice_${Date.now()}.pdf`,
      );
    } catch (error) {
      toast.error("Failed to generate invoice", error.message);
    } finally {
      setDownloading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!previewRef.current || !customerEmail) {
      return toast.error("Please enter a valid email and try again.");
    }
     try {
        setEmailing(true);
        const pdfBlob =await generatePdfFromElement(previewRef.current, `invoice_${Date.now()}.pdf`,true);
        const formData = new FormData();
        formData.append("file", pdfBlob);
        formData.append("email", customerEmail);

        const response=await sendInvoice(baseURL, formData);
        if (response.status == 200) {
          toast.success("Email sent successfully.");
          setShowModal(false);
          setCustomerEmail("");          
        }else{
          toast.error("Failed to send email.");
        }
      }catch(error){
        toast.error("Failed to send email.", error.message);
      }finally{
        setEmailing(false);
      }
  }
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
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            onClick={handleSaveAndExit}
            disabled={loading}
          >
            {loading && <Loader2 className="me-2 spin-animation" size={18} />}
            {loading ? "Saving..." : "Save And Exit"}
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Invoice
          </button>
          <button className="btn btn-secondary">Back to Dashboard</button>
          <button className="btn btn-info" onClick={() => setShowModal(true)}>
            Send Email
          </button>
          <button
            className="btn btn-success d-flex align-items-center justify-content-center"
            disabled={loading}
            onClick={handleDownloadPdf}
          >
            {downloading && (
              <Loader className="me-2 spin-animation" size={18} />
            )}
            {downloading ? "Downloading..." : "Download PDF"}
          </button>
        </div>
      </div>
      <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light py-3">
        <div
          ref={previewRef}
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

      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Send Invoice</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="email"
                  name=""
                  id=""
                  className="form-control"
                  placeholder="Customer Email"
                  onChange={(e) => setCustomerEmail(e.target.value)} value={customerEmail}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleSendEmail} disabled={emailing}>
                  {emailing?"Sending...":"Send"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PreviewPage;
