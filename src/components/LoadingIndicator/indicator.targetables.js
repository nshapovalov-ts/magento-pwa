const interceptComponent = Component => {
    Component.addImport(
        "TradesquareLoadingIndicator from 'src/components/LoadingIndicator/loadingIndicator.jsx'"
    );
    Component.removeJSX('<Icon />').insertBeforeJSX(
        '<span className={classes.message}>{props.children}</span>',
        '<TradesquareLoadingIndicator />'
    );
};

exports.interceptComponent = interceptComponent;
