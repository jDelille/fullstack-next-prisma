import { FieldValues, UseFormRegister } from 'react-hook-form';
import Select from 'react-select';

const confidenceLevels = [
 { value: 'Easy Money', label: 'Easy Money' },
 { value: 'Optimistic', label: 'Optimistic' },
 { value: 'Risky', label: 'Risky' }
];

const customStyles = {
 control: (provided: any) => ({
  ...provided,
  borderRadius: '8px',
  borderColor: '#484e56',
  boxShadow: 'none',
  backgroundColor: '#2a333f',
  color: '#fcfeff',
  cursor: 'pointer',
  height: '45px'
 }),
 option: (provided: any, state: any) => ({
  ...provided,
  backgroundColor: state.isSelected ? '#20b46a' : '#2a333f',
  color: state.isSelected ? '#fcfeff' : '#fcfeff',
  cursor: 'pointer',
  ':hover': {
   backgroundColor: state.isSelected ? '#20b46a' : '#2a333f',
   color: state.isSelected ? '#fcfeff' : '#fcfeff'
  }
 }),
 menu: (provided: any) => ({
  ...provided,
  backgroundColor: '#2a333f',

 }),
 menuList: (provided: any) => ({
  ...provided,
  backgroundColor: '#2a333f',
  color: '#fcfeff',
 }),
 singleValue: (provided: any) => ({
  ...provided,
  color: '#fcfeff',
 }),
 indicatorSeparator: (provided: any) => ({
  ...provided,
  backgroundColor: '#484e56',
 }),
};

type ConfidenceSelectProps = {
 onChange: (value: string) => void;
 id: string;
 required?: boolean;
 register: UseFormRegister<FieldValues>;
}

const ConfidenceSelect: React.FC<ConfidenceSelectProps> = ({ onChange, id, required, register }) => {
 return (
  <div>
   <Select placeholder="Easy Money" isClearable options={confidenceLevels} styles={customStyles} onChange={(value) => onChange(value?.value as string)} />
  </div>
 );
}

export default ConfidenceSelect;