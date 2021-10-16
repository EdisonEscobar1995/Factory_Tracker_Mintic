import { FC } from 'react';

interface IResultProps {
  status: string,
  title: string,
  subTitle: string,
}

const Result: FC<IResultProps> = ({ subTitle }: IResultProps) => {  
  return (
    <div className="custom-page-container">
      Not Found {subTitle}
    </div>
  );
};

export default Result;