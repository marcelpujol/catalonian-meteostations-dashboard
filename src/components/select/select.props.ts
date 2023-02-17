export interface SelectProps {
    options: SelectOption[];
    selectChanged: Function;
}

export interface SelectOption {
    name: string;
    value: string;
}