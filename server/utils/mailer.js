import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let transporter = null;

function getTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    return transporter;
}

export async function sendAdminNotification(type, data) {
    const mail = getTransporter();
    const isEnquiry = type === 'enquiry';

    const subject = isEnquiry
        ? `🔔 New Enquiry from ${data.name}`
        : `📋 New Registration: ${data.studentName}`;

    const html = isEnquiry
        ? `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
            <div style="background:#0A1628;padding:24px 32px;text-align:center;">
                <h1 style="color:#C9A84C;margin:0;font-size:24px;letter-spacing:2px;">NEEV</h1>
                <p style="color:#8899AA;margin:4px 0 0;font-size:11px;letter-spacing:3px;">THREAD OF WISDOM</p>
            </div>
            <div style="padding:32px;">
                <h2 style="color:#1A3A7A;margin:0 0 20px;font-size:20px;">New Enquiry Received</h2>
                <table style="width:100%;border-collapse:collapse;">
                    <tr><td style="padding:8px 0;color:#6B7B8D;font-size:13px;">Name</td><td style="padding:8px 0;font-weight:600;">${data.name}</td></tr>
                    <tr><td style="padding:8px 0;color:#6B7B8D;font-size:13px;">Phone</td><td style="padding:8px 0;font-weight:600;">${data.phone}</td></tr>
                    ${data.email ? `<tr><td style="padding:8px 0;color:#6B7B8D;font-size:13px;">Email</td><td style="padding:8px 0;font-weight:600;">${data.email}</td></tr>` : ''}
                    <tr><td style="padding:8px 0;color:#6B7B8D;font-size:13px;">Exam</td><td style="padding:8px 0;font-weight:600;">${data.exam || 'N/A'}</td></tr>
                    <tr><td style="padding:8px 0;color:#6B7B8D;font-size:13px;">Message</td><td style="padding:8px 0;">${data.message || 'No message'}</td></tr>
                </table>
                <p style="color:#8899AA;font-size:12px;margin-top:24px;">Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
        </div>`
        : `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
            <div style="background:#0A1628;padding:24px 32px;text-align:center;">
                <h1 style="color:#C9A84C;margin:0;font-size:24px;letter-spacing:2px;">NEEV</h1>
                <p style="color:#8899AA;margin:4px 0 0;font-size:11px;letter-spacing:3px;">THREAD OF WISDOM</p>
            </div>
            <div style="padding:32px;">
                <h2 style="color:#1A3A7A;margin:0 0 20px;font-size:20px;">New Student Registration</h2>
                <table style="width:100%;border-collapse:collapse;">
                    <tr><td style="padding:8px 0;color:#6B7B8D;font-size:13px;">Student Name</td><td style="padding:8px 0;font-weight:600;">${data.studentName}</td></tr>
                    <tr><td style="padding:8px 0;color:#6B7B8D;font-size:13px;">Father's Name</td><td style="padding:8px 0;font-weight:600;">${data.fathersName}</td></tr>
                    <tr><td style="padding:8px 0;color:#6B7B8D;font-size:13px;">Father's Contact</td><td style="padding:8px 0;font-weight:600;">${data.fathersContact}</td></tr>
                    <tr><td style="padding:8px 0;color:#6B7B8D;font-size:13px;">Class</td><td style="padding:8px 0;font-weight:600;">${data.studentClass || 'N/A'}</td></tr>
                    <tr><td style="padding:8px 0;color:#6B7B8D;font-size:13px;">School</td><td style="padding:8px 0;font-weight:600;">${data.schoolName || 'N/A'}</td></tr>
                    <tr><td style="padding:8px 0;color:#6B7B8D;font-size:13px;">Board</td><td style="padding:8px 0;font-weight:600;">${data.board || 'N/A'}</td></tr>
                    <tr><td style="padding:8px 0;color:#6B7B8D;font-size:13px;">Medium</td><td style="padding:8px 0;font-weight:600;">${data.medium || 'N/A'}</td></tr>
                    <tr><td style="padding:8px 0;color:#6B7B8D;font-size:13px;">Stream (11-12)</td><td style="padding:8px 0;font-weight:600;">${data.stream11_12 || 'N/A'}</td></tr>
                    <tr><td style="padding:8px 0;color:#6B7B8D;font-size:13px;">Fee Package</td><td style="padding:8px 0;font-weight:600;">${data.feePackage || 'N/A'}</td></tr>
                </table>
                <p style="color:#8899AA;font-size:12px;margin-top:24px;">Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
        </div>`;

    try {
        await mail.sendMail({
            from: `"NEEV Academy" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject,
            html,
        });
        console.log(`✅ Admin notification email sent for ${type}`);
    } catch (err) {
        console.error('❌ Email send failed:', err.message);
    }
}
