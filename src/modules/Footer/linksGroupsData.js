import { ContactLink } from 'modules/ContactPage';

const supportLinks = new Map()
    .set('Support', null)
    .set('Help Center', '/faq/')
    .set('Terms of Use', '/buyer-terms')
    .set('Privacy Policy', '/privacy-policy')
    .set('Buy Now Pay Later', '/zip-business')
    .set('Net 60 terms', '/net60-terms');

const companyLinks = new Map()
    .set('Company', null)
    .set('Contact Us', {
        path: '/contact-us',
        Component: ContactLink
    })
    .set('About Us', '/about-us')
    .set('Sell on TradeSquare', '/sell')
    .set('Supplier Login', 'https://tradesquare.mirakl.net/');

const connectLinks = new Map()
    .set('Connect', null)
    .set('Learning Square', 'https://learn.tradesquare.com.au/blog')
    .set('TSQ Podcast', 'https://learn.tradesquare.com.au/en-au/tsq-podcast');

export const DEFAULT_LINKS = new Map()
    .set('support', supportLinks)
    .set('company', companyLinks)
    .set('connect', connectLinks);
