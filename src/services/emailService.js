import emailjs from "emailjs-com";
import alertService from "./alertService";

export const sendEmail = async (templateParams, templateId) => {
    try {
        await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            templateId,
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        alertService.success("Enquiry sent successfully!");
    } catch (error) {
        console.error("EmailJS Error:", error);
        alertService.error("Failed to send enquiry.");
    }
};