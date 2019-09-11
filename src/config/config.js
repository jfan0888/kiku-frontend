/**
 * Config file of the app
 */

const global = {
    storage: 'song', // storage name for local storage
    domain: 'http://localhost:8888/UNA/' // use this domain for ajax requests
};

const services = {
    service: `${global.domain}m/messenger`, // Messenger module (Collaboration Tool) link to send requests
    me: `${global.domain}m/messenger/get_user_info`, // get user info link with service name
};

/**
 * App's default values
 * @type {{default_page: string, per_page: number, sp_prefix: string, song_prefix: string, default_list: string, login_redirect_link: string, sp_folder: string, per_page_comments: number}}
 */

const config = {
    default_page: 'search',
    default_list: 'listen',
    sp_prefix: 'sp',
    sp_folder: 'new_profile/',
    song_prefix: 'song',
    login_redirect_link: 'page/login',
    per_page: 3,
    per_page_comments: 8
};

export default Object.assign(global, services, config);
