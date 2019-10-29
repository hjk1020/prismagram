import { adjectives,nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport  from "nodemailer-sendgrid-transport";
import jsonwebtoken from "jsonwebtoken";
import "./env"

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};



export const sendMail = email => { 
    const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD,
      
    }
  }
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);

}

export const sendSecretMail =(adress, secret) => {
    const email = {
        from: "hjk1020@naver.com",
        to: adress,
        subject: "Login Secret for Prismagram",
        html: `Hello! Your login secret it<b> ${secret}</b>.<br/>Copy paste on the app/web to log in`
    }
    return sendMail(email);
}

export const generateToken = id => jsonwebtoken.sign({ id }, process.env.JWT_SECRET)