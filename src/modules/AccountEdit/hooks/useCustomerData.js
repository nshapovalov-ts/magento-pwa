import { useMemo } from 'react';

// import customerResponse from './customerResponse.json';
import { useFakeFetch } from 'common/hooks/useFakeFetch';

export const useCustomerData = () => {
    const { isLoading: isFetching, response } = useFakeFetch(null, 2000);

    // start real rest api requests

    /*     TODO: query real customer attributes on page load
    const { data, loading } = useQuery(getCustomerAttributes); */

    const customerData = useMemo(() => {
        if (response) {
            try {
                return response.custom_attributes.reduce((attributes, current) => {
                    if (
                        // this custom attributes must stay in string
                        // don't know how to define them automatically now
                        // all this logic will be deleted when server returned
                        // all available custom attributes with types
                        [
                            'business_name',
                            'abn',
                            'phone_number',
                            'lpo_code',
                            'registration_step'
                        ].includes(current.attribute_code)
                    ) {
                        attributes[current.attribute_code] = current.value;
                    } else {
                        // other custom attributes converted into arrays
                        attributes[current.attribute_code] = current.value.split(',');
                    }

                    return attributes;
                }, {});
            } catch (error) {
                console.error(error);
            }
        }
    }, [response]);

    return {
        isLoading: isFetching,
        customerData
    };
};
