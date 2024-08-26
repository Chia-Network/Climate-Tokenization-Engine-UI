import logo from '@/assets/img/Tokenization.svg';
import React from 'react';

interface AppLogoProps {
  width: string;
  height: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ width, height }) => {
  return (
    <div className="flex align-center items-center w-full md:max-w-md">
      <div className="flex">
        <img src={logo} alt="logo" width={width} height={height} />
      </div>
      <p className="text-white text-2xl font-bold pl-5">Carbon Tokenization Engine</p>
    </div>
  );
};

export { AppLogo };
