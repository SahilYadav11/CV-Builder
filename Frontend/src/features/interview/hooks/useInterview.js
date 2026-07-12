import { generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";
import html2pdf from "html2pdf.js";

export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport } = context

    const generateReport = async ({ jobDescription, selfDescription }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription })
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        return response.interviewReport
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response.interviewReport
    }

    const getResumePdf = async (interviewReportId) => {
    setLoading(true);

    try {
        const response = await generateResumePdf({ interviewReportId });

        // Make text darker before generating the PDF
        let html = response.html;

        html = html
            .replace(/#666/g, "#000")
            .replace(/#555/g, "#000")
            .replace(/#444/g, "#000")
            .replace(/#333/g, "#000");

            const wrapper = document.createElement("div");
                wrapper.innerHTML = `
                <style>
                *{
                    color:#000 !important;
                    background:transparent !important;
                    opacity:1 !important;
                    filter:none !important;
                    text-shadow:none !important;
                    -webkit-text-fill-color:#000 !important;
                }

                body{
                    color:#000 !important;
                    background:#fff !important;
                }

                h1,h2,h3,h4,h5,h6,p,span,li,div,a,strong,b{
                    color:#000 !important;
                    opacity:1 !important;
                }
                </style>

                ${response.html}
                `;

        await html2pdf()
            .from(wrapper)
            .set({
                margin: 10,
                filename: `resume_${interviewReportId}.pdf`,
                image: {
                    type: "jpeg",
                    quality: 1
                },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                    backgroundColor: "#ffffff"
                },
                jsPDF: {
                    unit: "mm",
                    format: "a4",
                    orientation: "portrait",
                    compress: false
                }
            })
            .save();

    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])

    return { loading, report, generateReport, getReportById, getResumePdf }

}