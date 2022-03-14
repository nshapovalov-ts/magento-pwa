import { ContactLink } from '@magento/venia-ui/lib/components/ContactPage';

const aboutLinks = new Map()
    .set('About Market', null)
    .set('About Us', '/about-us')
    .set('Market Reviews', null)
    .set('Terms of Use', null)
    .set('Privacy Policy', null);

const customerLinks = new Map()
    .set('Customer service', null)
    .set('Shipping Policy', null)
    .set('Compensation First', null)
    .set('My Account', null)
    .set('Return Policy', null)
    .set('Contact Us', {
        path: '/contact-us',
        Component: ContactLink
    });

const shippingLinks = new Map()
    .set('Payment & Shippping', null)
    .set('Terms of Use', null)
    .set('Payment Methods', null)
    .set('Shippings Guide', null)
    .set('Locations We Ship To', null)
    .set('Estimated Delivery Time', null);

export const DEFAULT_LINKS = new Map()
    .set('about', aboutLinks)
    .set('customer', customerLinks)
    .set('shipping', shippingLinks);

export const SAMPLE_CONTACT =
    'No 40 Baria Sreet 44/135\n' +
    'New York, NY, United States\n\n' +
    'contact@retailplace.com\n\n' +
    '999 - 93455 - 6000';
