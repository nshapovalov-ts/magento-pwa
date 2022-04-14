import React, { useEffect, useRef, useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { useFieldApi } from 'informed';
import { func, shape, string } from 'prop-types';

import TextInput from 'components/TextInput';

import { useStyle } from '@magento/venia-ui/lib/classify';
// TODO: Search why warning appears even with this wrapper
import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

import defaultClasses from './googleAutocomplete.module.css';

const GoogleAutocomplete = ({ classes: propClasses, apiKey, onSelect, ...props }) => {
    const classes = useStyle(defaultClasses, propClasses);
    const componentRef = useRef();
    const [isSuggestionVisible, setSuggestionVisible] = useState(false);
    const fieldApi = useFieldApi(props.field);
    const fieldState = useFieldState(props.field);

    const { setValue } = fieldApi;

    const handleClickOutside = e => {
        if (!componentRef.current.contains(e.target)) {
            setSuggestionVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    const { placesService, placePredictions, getPlacePredictions } = usePlacesService({
        apiKey,
        options: {
            componentRestrictions: { country: 'au' }
        }
    });

    const handleChange = value => {
        getPlacePredictions({ input: value });
    };

    const handlePlaceSelect = placeId => {
        placesService?.getDetails(
            {
                placeId: placeId
            },
            placeDetails => {
                if (onSelect) {
                    onSelect(placeDetails.address_components);
                }
                setValue(placeDetails.formatted_address);
                setSuggestionVisible(false);
            }
        );
    };

    const options = placePredictions.map(item => (
        <li
            className={classes.placeItem}
            key={item.place_id}
            role="option"
            aria-selected={fieldState.value === item.description}
            tabIndex={-1}
            onClick={() => handlePlaceSelect(item.place_id)}
            onKeyDown={() => handlePlaceSelect(item.place_id)}
        >
            {item.description}
        </li>
    ));

    return (
        <div className={classes.root} ref={componentRef}>
            <TextInput
                {...props}
                onValueChange={handleChange}
                onFocus={() => setSuggestionVisible(true)}
            />
            {options.length > 0 && isSuggestionVisible && (
                <ul className={classes.placesList}>{options}</ul>
            )}
        </div>
    );
};

export default GoogleAutocomplete;

GoogleAutocomplete.propTypes = {
    classes: shape({
        input: string
    }),
    apiKey: string.isRequired,
    field: string.isRequired,
    placeholder: string,
    onSelect: func
};
