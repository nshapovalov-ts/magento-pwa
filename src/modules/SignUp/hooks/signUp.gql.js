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
