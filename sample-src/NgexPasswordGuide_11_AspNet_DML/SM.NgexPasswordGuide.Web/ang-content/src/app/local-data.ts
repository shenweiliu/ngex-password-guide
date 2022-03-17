import { guideItem } from './ngex-password-guide/password-guide.module';

export const passwordItemList: Array<guideItem> = [{
    key: 'required',
    status: '',
    label: 'Password is required.',
    scheme: 'ON-CHANGE'
}, {
    key: 'minLength',
    status: '',
    label: 'Password must be at least 8 characters long.',
    scheme: 'ON-CHANGE'
}, {
    key: 'hasMixOfCaseNumber',
    status: '',
    label: 'Password must contain a mix of uppercase, lowercase, and number characters.',
    scheme: 'ON-CHANGE'
}, {
    key: 'hasSpecialCharacter',
    status: '',
    label: 'Password must include at least one of these special characters !@#$%^&*()_+-=[]{}|<>.',
    scheme: 'ON-CHANGE'
}, {
    key: 'maxRepeatChars',
    status: '',
    label: 'Password cannot contain more than 3 identical characters in a row.',
    scheme: 'ON-CHANGE'
}, {
    key: 'fieldContain',
    status: '',
    label: 'Password is different enough from Username.',
    scheme: 'ON-CHANGE'
}, {
    key: 'restrictCommonPasswords',
    status: '',
    label: 'Entry is also restricted for commonly used password.',
    scheme: 'ON-SUBMIT'
}];

export const commonlyUsedpasswords: Array<string> = [
    'Password-123',
    'Password1+2=3',
    'Password+000',
    '123@Login',
    'Login#111',
    'Login+000'
];
