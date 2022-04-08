import { useCreateAccountWithPhone } from './useCreateAccountWithPhone';

const wrapUseCreateAccount = original => {
    return function useCreateAccount(props, ...restArgs) {
        const { onSubmit } = props;
        const { handleSubmit, isDisabled, errors } = useCreateAccountWithPhone({ onSubmit });

        const { ...defaultReturnData } = original(props, ...restArgs);

        return {
            ...defaultReturnData,
            handleSubmit,
            isDisabled,
            errors
        };
    };
};

export default wrapUseCreateAccount;
