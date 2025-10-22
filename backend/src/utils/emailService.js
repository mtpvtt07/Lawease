import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const transactionalEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * Sends an email using Brevo transactional API.
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} htmlContent - HTML body of the email
 * @param {string} [senderEmail] - Custom sender (optional)
 */
export const sendEmail = async (to, subject, htmlContent, senderEmail = process.env.SENDER_EMAIL) => {
    try {
        const emailData = {
            sender: { name: "LawEase", email: senderEmail },
            to: [{ email: to }],
            subject,
            htmlContent,
        };

        const response = await transactionalEmailApi.sendTransacEmail(emailData);
        console.log("✅ Email sent successfully:", response.messageId);
        return response;
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw new Error("Email sending failed");
    }
};
