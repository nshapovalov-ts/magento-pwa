import { ContactLink } from '@magento/venia-ui/lib/components/ContactPage';

const supportLinks = new Map()
    .set('Support', null)
    .set('Help Center', '/faq/')
    .set('Terms of Use', null)
    .set('Privacy Policy', null)
    .set('Buy Now Pay Later', null)
    .set('Net 60 terms', null);

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
