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
  borderColor: '#373737',
  boxShadow: 'none',
  backgroundColor: '#373737',
  color: '#fcfeff',
  cursor: 'pointer'
 }),
 option: (provided: any, state: any) => ({
  ...provided,
  backgroundColor: state.isSelected ? '#20b46a' : '#373737',
  color: state.isSelected ? '#fcfeff' : '#fcfeff',
  cursor: 'pointer',
  ':hover': {
   backgroundColor: state.isSelected ? '#20b46a' : '#373737',
   color: state.isSelected ? '#fcfeff' : '#fcfeff'
  }
 }),
 menu: (provided: any) => ({
  ...provided,
  backgroundColor: '#373737',

 }),
 menuList: (provided: any) => ({
  ...provided,
  backgroundColor: '#373737',
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