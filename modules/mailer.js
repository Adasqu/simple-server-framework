import { addNew } from "../views/mailTemplates/addNew.js";

/// Mail function
export default async function mail(fastify, to, subject, template, params) {
  const { mailer } = fastify;
  const templateEmail = findTemplate(template, params);
  try {
    await mailer.sendMail(
      {
        to: to,
        subject: subject,
        text: "Nowa wiadomość",
        html: templateEmail,
      },
      (errors) => {
        if (errors) {
          fastify.log.error(errors);
        }
      }
    );
  } catch (error) {
    throw "error" + errors;
  }
}

//* search template to fill with args and return text message
function findTemplate(templateName, args) {
  switch (templateName) {
    case "addNew":
      return addNew(args.token);

    default:
      break;
  }
}
