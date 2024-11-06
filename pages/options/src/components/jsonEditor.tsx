type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const JsonEditor = ({ value, onChange }: Props) => {
  return <textarea>{value}</textarea>;
};
