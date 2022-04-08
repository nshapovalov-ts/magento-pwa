import { gql } from '@apollo/client';

export const CONFIRM_EMAIL = gql`
    mutation ConfirmEmail(
        $current_url: String!
        $firstname: String!
        $email: String!
        $offers_checkbox: Boolean!
    ) {
        confirmEmail(
            input: {
                current_url: $current_url
                firstname: $firstname
                email: $email
                offers_checkbox: $offers_checkbox
            }
        ) @rest(path: "/sign-up-page/index/emailconfirmation/", method: "POST", bodyKey: "input") {
            NoResponse
        }
    }
`;

export const CREATE_ACCOUNT = gql`
    mutation CreateAccount(
        $email: String!
        $firstname: String!
        $lastname: String!
        $password: String!
        $phone_number: String!
        $is_subscribed: Boolean!
    ) {
        createCustomer(
            input: {
                email: $email
                firstname: $firstname
                lastname: $lastname
                password: $password
                phone_number: $phone_number
                is_subscribed: $is_subscribed
            }
        ) {
            # The createCustomer mutation returns a non-nullable CustomerOutput type
            # which requires that at least one of the sub fields be returned.

            # eslint-disable-next-line @graphql-eslint/require-id-when-available
            customer {
                email
            }
        }
    }
`;
