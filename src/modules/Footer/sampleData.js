import { ContactLink } from 'modules/ContactPage';

const supportLinks = new Map()
    .set('Support', null)
    .set('Help Center', '/faq/')
    .set('Terms of Use', '/buyer-terms')
    .set('Privacy Policy', '/privacy-policy')
    .set('Buy Now Pay Later', null)
    .set('Net 60 terms', '/net60-terms');

const companyLinks = new Map()
    .set('Company', null)
    .set('Contact Us', {
        path: '/contact-us',
        Component: ContactLink
    })
    .set('About Us', null)
    .set('Sell on TradeSquare', null)
    .set('Supplier Login', null);

const connectLinks = new Map()
    .set('Connect', null)
    .set('Learning Square', null)
    .set('TSQ Podcast', null);

export const DEFAULT_LINKS = new Map()
    .set('support', supportLinks)
    .set('company', companyLinks)
    .set('connect', connectLinks);
