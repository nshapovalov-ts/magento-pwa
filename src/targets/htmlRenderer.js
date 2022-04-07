const { Targetables } = require('@magento/pwa-buildpack');
/**
 *
 * Updates the RichContent component to clean up dangerous code from html before rendering it
 */
const makeSafeHtmlRenderer = targets => {
    const targetables = Targetables.using(targets);

    const Component = targetables.esModule(
        '@magento/venia-ui/lib/components/RichContent/plainHtmlRenderer.js'
    );

    Component.addImport("dompurify from 'dompurify';");
    Component.insertBeforeSource(
        'const toHTML = str => ({ __html: str });',
        '\nconst clearHtml = dompurify.sanitize;\n'
    );
    Component.insertAfterSource('const toHTML = str => ({ __html: ', 'clearHtml(str)', {
        remove: 3
    });
};

exports.makeSafeHtmlRenderer = makeSafeHtmlRenderer;
