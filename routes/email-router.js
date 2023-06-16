const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const email = path.join(__dirname, './views/email_template.html');
router.post("/api/submit", async (req, res, next) => {
    try {
        const {
            fullName,
            emailId,
            phone,
            subject,
            message
        } = req.body
        // mail service

        // Send mail to Terranova 

        var mailTransporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secureConnection: "false",
            tls: {
                rejectUnauthorized: false,
            },
            auth: {
                user: process.env.Email,
                pass: process.env.Password
            }
        });
        var options = {
            from: process.env.Email,
            to: process.env.teeraNovaEmail,
            subject: `Hi Teeranova, Enquiry mail  `,
            html: `Name : ${fullName}, <br>
                emailId: ${emailId}, <br>
                phone: ${phone}, <br>
                subject: ${subject}, <br>
                message: ${message}, <br>`
        };
        await mailTransporter.sendMail(options, async function (error, info) {
            if (error) {
                // console.log(error);
                next(error)
            } else {
                // Acc mail to the Client 

                var emailTemplate = await fs.readFileSync(email, {
                    encoding: 'utf-8'
                });
                if (emailTemplate) {
                    emailTemplate = emailTemplate.replace(new RegExp("(RecipientName)", "g"), fullName);
                }
                var mailTransporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secureConnection: "false",
                    tls: {
                        rejectUnauthorized: false,
                    },
                    auth: {
                        user: process.env.Email,
                        pass: process.env.Password
                    }
                });
                var options = {
                    from: process.env.Email,
                    to: [emailId],
                    subject: `Hi ${fullName}, Thanks for reaching us... `,
                    html: emailTemplate
                };
                await mailTransporter.sendMail(options, async function (error, info) {
                    if (error) {
                        console.log(error);
                        next(error)
                    } else {
                        res.status(200).json({
                            error: false,
                            message: "Email Sent",
                        });
                    }
                })
            }
        })
    } catch (err) {
        console.log("CATCH", err);
        next(err)
    }
});

module.exports = router;
