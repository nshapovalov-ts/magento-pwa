import React from 'react';

import Heading from 'components/Heading';
import TextInput from 'components/TextInput';
import { ORGANISATION_PREFERENCES_SECTIONS } from '../../../constants';

import combine from '@magento/venia-ui/lib/util/combineValidators';
import { hasLengthExactly, isRequired } from '@magento/venia-ui/lib/util/formValidators';
import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

import classes from './lpo.module.css';

const Lpo = () => {
    const sectionId = ORGANISATION_PREFERENCES_SECTIONS.lpo;

    const { value: businessTypeValues = [] } = useFieldState(
        ORGANISATION_PREFERENCES_SECTIONS.businessType
    );

    const isLpoActive = businessTypeValues.includes('13908');

    if (!isLpoActive) {
        return null;
    }

    return (
        <section>
            <Heading>Store code</Heading>
            <div className={classes.container}>
                <TextInput
                    id={sectionId}
                    field={sectionId}
                    placeholder="6 digits code"
                    validate={combine([isRequired, [hasLengthExactly, 6]])}
                />
            </div>
        </section>
    );
};

export default Lpo;
