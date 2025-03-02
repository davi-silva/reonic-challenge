import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

type InputType = 'text' | 'number';

export type InputProps = {
  name: string;
  required?: boolean;
  disabled?: boolean;
  id: string;
  value?: string;
  onChange?: any;
  register: any;
  type?: InputType;
  placeholder?: string;
  label?: string;
  errorMessage?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  width?: string;
  dataTestId?: string;
};
