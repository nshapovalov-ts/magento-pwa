export const isAbsoluteUrl = url => url.indexOf('://') > -1;

// convert default google api address components array response into address object
export const getAddressObject = data => {
    if (!Array.isArray(data) || data.length === 0) {
        return {};
    }

    return data.reduce(
        (address, addressComponent) => {
            if (addressComponent.types[0] == 'route') {
                address['street'] = [addressComponent.long_name];
            }

            if (addressComponent.types[0] == 'locality') {
                address['city'] = addressComponent.long_name;
            }

            if (addressComponent.types[0] === 'administrative_area_level_1') {
                address['region'] = addressComponent.long_name;
            }

            if (addressComponent.types[0] === 'postal_code') {
                address['postcode'] = addressComponent.long_name;
            }

            return address;
        },
        {
            city: '',
            street: [''],
            region: {},
            postcode: ''
        }
    );
};
