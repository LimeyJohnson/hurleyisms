//Info for mail

var sg = require('@sendgrid/mail');
sg.setApiKey(process.env.SENDGRID_API_KEY)
sg.setSubstitutionWrappers('','');

var getBaseRequest = function (user) {
    
    var imageUrl = process.env.BASE_URL + "/images/hurleyisms-xsm.png";
    var proUrl = process.env.BASE_URL + "/pro";
    msg = {
        to: user.email,
        from: {
            email: "email@hurleyisms.com",
            name: "Hurleyisms"
        },
        html: "<html><p>Hello, world!</p><img src=[CID GOES HERE]></img></html>",
        substitutions:{
            email: user.email,
            name: user.name,
            customer_name: user.name,
            image_url: imageUrl,
            pro_url: proUrl
        }
    }
    return msg;
    
}
var sendInitialEmail = function (user, callback) {
    var email_url = process.env.BASE_URL + "/email/email/" + user.verificationCode();
    msg = getBaseRequest(user);
    msg.substitutions.email_url = email_url;
    msg.templateId = "eab8ce54-c3d1-4a5a-a470-7fe9acdf0730";
    msg.subject = "Welcome to Hurleyisms";
    sg.send(msg, function (response) {
        console.log(response);
        console.log("Initial Mail Sent");
        callback();
    });
}
var sendVerifyEmail = function (user, callback) {
    var email_url = process.env.BASE_URL + "/email/email/" + user.verificationCode();
    msg = getBaseRequest(user);
    msg.substitutions.email_url = email_url;
    msg.templateId = "66a2a8dd-7867-4cc5-9398-2fc24bd564c2";
    msg.subject = "Verify your email Address";
    sg.send(msg, function (response) {
        console.log(response);
        console.log("Verify Mail Sent");
        callback();
    });
}
var sendPasswordEmail = function (user, callback) {
    var email_url = process.env.BASE_URL + "/email/password/" + user.verificationCode();
    msg = getBaseRequest(user);
    msg.substitutions.email_url = email_url;
    msg.templateId = "fd16d99c-27c4-4088-af12-fdb1a9b4d013";
    msg.subject = "Reset your password";
    sg.send(msg, function (response) {
        console.log(response);
        console.log("Mail Sent");
        callback();
    });
}
var sendCancellationEmail = function (user, callback) {
    msg = getBaseRequest(user);
    msg.templateId = "a5c2361e-352e-4522-8b70-46602a260e1d";
    msg.subject = "Cancel Hurleyisms";
    sg.send(msg, function (response) {
        console.log(response);
        console.log("Cancellation Mail Sent");
        callback();
    });
}
var sendUpgradeEmail = function (user, callback) {
    msg = getBaseRequest(user);
    msg.templateId = "7591524c-3ea0-4eb6-8aa2-1d402c63c840";
    msg.subject = "Upgrade to Hurleyisms Lifetime Access";
    const {
        classes: {
          Mail,
        },
      } = require('@sendgrid/helpers');
    const mail = Mail.create(msg);
    const body = mail.toJSON();
    console.log(body);
    sg.send(msg, function (response) {
        console.log(response);
        console.log("Upgrade Mail Sent");
        callback();
    });
}
var sendVIPEmail = function (user, callback) {
    msg = getBaseRequest(user);
    msg.templateId = "6f31cb12-df6f-47e7-bbbf-c0d9a673f481";
    msg.subject = "Welcome to Hurleyisms";
    sg.send(msg, function (response) {
        console.log(response);
        console.log("VIP Mail Sent");
        callback();
    });
}
module.exports = {
    sendInitialEmail: sendInitialEmail,
    sendVerifyEmail: sendVerifyEmail,
    sendPasswordEmail: sendPasswordEmail,
    sendCancellationEmail: sendCancellationEmail,
    sendUpgradeEmail: sendUpgradeEmail,
    sendVIPEmail:sendVIPEmail
};