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
  borderRadius: '4px',
  borderColor: '#27282f',
  boxShadow: 'none',
  backgroundColor: '#17181c',
  color: '#fcfeff',
  cursor: 'pointer'
 }),
 option: (provided: any, state: any) => ({
  ...provided,
  backgroundColor: state.isSelected ? '#537fe7' : '#17181c',
  color: state.isSelected ? '#fcfeff' : '#fcfeff',
  cursor: 'pointer',
  ':hover': {
   backgroundColor: state.isSelected ? '#537fe7' : '#1e1f23',
   color: state.isSelected ? '#fcfeff' : '#fcfeff'
  }
 }),
 menu: (provided: any) => ({
  ...provided,
  backgroundColor: '#17181c',

 }),
 menuList: (provided: any) => ({
  ...provided,
  backgroundColor: '#17181c',
  color: '#fcfeff',
 }),
 singleValue: (provided: any) => ({
  ...provided,
  color: '#fcfeff',
 }),
 indicatorSeparator: (provided: any) => ({
  ...provided,
  backgroundColor: '#fcfeff',
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