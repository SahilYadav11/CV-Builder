const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")




/**
 * @description Controller to generate interview report based on user self description and job description.
 */
async function generateInterViewReportController(req, res) {
    try {
        console.log("====== Interview endpoint hit ======");
        console.log("User:", req.user);
        console.log("Body:", req.body);
        const { selfDescription, jobDescription } = req.body

        if (!jobDescription) {
            return res.status(400).json({ message: "Job description is required." })
        }
        if (!selfDescription || !selfDescription.trim()) {
            return res.status(400).json({ message: "Self description is required." })
        }

        const interViewReportByAi = await generateInterviewReport({
            resume: "",
            selfDescription: selfDescription.trim(),
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: "",
            selfDescription: selfDescription.trim(),
            jobDescription,
            ...interViewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
    } catch (err) {
        console.error("Error generating report:", err)
        res.status(500).json({ message: err.message || "Failed to generate interview report." })
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/**
 * @description Controller to generate resume PDF based on user self description and job description.
 */
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params;

    const interviewReport = await interviewReportModel.findById(interviewReportId);

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        });
    }

    const { resume, jobDescription, selfDescription } = interviewReport;

    const html = await generateResumePdf({
        resume,
        jobDescription,
        selfDescription
    });

    res.status(200).json({
        html
    });
}
module.exports = { generateInterViewReportController, getInterviewReportByIdController, generateResumePdfController }
