module.exports = (link) => {
    return `
        <h3>Здарваствуйте, вас добавили к Аватрейд CRM перейдите по ссылке для активации аккаунта:</h3>
        
        <a href="${link}">${link}</a>
    `;
};