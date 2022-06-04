const confirmEmailHTML = (username, email, token, domain) => {
const lang = 'es';
const logo = 'https://tusitioweb/public/logo.png'

const MSG001 = 'NombreApp: Verificar cuenta nueva';
const MSG002 = 'LogoApp';
const MSG003 = 'Slogan de la App';
const MSG004 = 'Se ha creado una cuenta nueva en ';
const MSG005 = 'https://tusitioweb'
const MSG006 = 'tusitioweb';
const MSG007 = 'Usuario/a';
const MSG008 = 'Email';
const MSG009 = 'Para activarla, es necesario verificar esta dirección email.';
const MSG010 = 'https://tusitioweb/endpoint/para/confirmar/email/' + token
const MSG011 = 'Verificar';
const MSG012 = 'Si el enlace no funciona, puedes visitar la página';
const MSG013 = 'Si no has creado la nueva cuenta, por favor, ignora este email.';
const MSG014 = 'NombreApp';
const MSG015 = 'https://pilgrimtests.000webhostapp.com/phoibeapp/img/web.png';
const MSG016 = 'email@de_la_app.com';
const MSG017 = 'https://pilgrimtests.000webhostapp.com/phoibeapp/img/email.png';
const MSG018 = 'https://discord.gg/de_la_app';
const MSG019 = 'https://pilgrimtests.000webhostapp.com/phoibeapp/img/discord.png';
const MSG020 = 'https://www.facebook.com/de_la_app';
const MSG021 = 'https://pilgrimtests.000webhostapp.com/phoibeapp/img/fb.png';
const MSG022 = 'https://www.twitter.com/de_la_app';
const MSG023 = 'https://pilgrimtests.000webhostapp.com/phoibeapp/img/tw.png';
const MSG024 = 'https://www.youtube.com/channel/de_la_app';
const MSG025 = 'https://pilgrimtests.000webhostapp.com/phoibeapp/img/yt.png';

const emailContent  = `
<!DOCTYPE html><html lang="${lang}"><head><meta charset="utf-8">
<title>${MSG001}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>
<body style="margin: 0; padding: 0;">
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
<td style="padding: 20px 0 30px 0;">
<table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;"><tr>
<td align="center" bgcolor="#70bbd9" style="padding: 40px 0 30px 0;">
<img src="${logo}" alt="${MSG002}" width="230" height="230" style="display: block;" />
</td></tr><tr><td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
<td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;">
<b>${MSG003}</b></td></tr>
<tr><td style="padding: 20px 0 20px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">${MSG004}<strong><a href="${MSG005}">${MSG006}</a></strong>:<br><ul><li>${MSG007}: <strong>${username}</strong></li><li>${MSG008}: <strong>${email}</strong></li></ul>
${MSG009}</td></tr><tr><tr><td>
<table border="0" align="center"><tr>
<td align="center" bgcolor="#ee4c50" style="padding: 20px 20px 20px 20px; color: #ffffff; font-family: Arial, sans-serif; font-size: 24px;"><b>
<a href="${MSG010}" style="color: #ffffff;">
<font color="#ffffff">${MSG011}</font></a></b></td></tr></table></td></tr>
<tr><td style="padding: 30px 0 10px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
${MSG012}:<br>
<a href="${MSG010}">${MSG010}</a>
<br><br>${MSG013}
</td></tr></table></tr><tr><td bgcolor="#ee4c50" style="padding: 30px 30px 30px 30px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>
<td width="75%" style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;">
&copy; <a href="${MSG005}" style="color: #ffffff;"><font color="#ffffff">${MSG014}</font></a> 2017-2023</td><td align="right" width="25%">
<table border="0" cellpadding="0" cellspacing="0"><tr><td><a href="${MSG005}">
<img src="${MSG015}" alt="Web" width="38" height="38" style="display: block;" border="0" />
</a></td><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td><td>
<a href="mailto:${MSG016}">
<img src="${MSG017}" alt="Email" width="38" height="38" style="display: block;" border="0" />
</a></td><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td><td>
<a href="${MSG018}">
<img src="${MSG019}" alt="Chat Discord" width="38" height="38" style="display: block;" border="0" /></a>
</td><tr><td style="font-size: 0; line-height: 0;" height="10">&nbsp;</td>
</tr><tr><td><a href="${MSG020}">
<img src="${MSG021}" alt="Facebook" width="38" height="38" style="display: block;" border="0" />
</a></td><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td><td>
<a href="${MSG022}">
<img src="${MSG023}" alt="Twitter" width="38" height="38" style="display: block;" border="0" />
</a></td><td style="font-size: 0; line-height: 0;" width="20">&nbsp;</td><td>
<a href="${MSG024}">
<img src="${MSG025}" alt="Youtube" width="38" height="38" style="display: block;" border="0" />
</a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></body></html>`
}

module.exports = confirmEmailHTML;