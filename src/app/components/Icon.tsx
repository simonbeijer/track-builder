"use client";
import React from "react";
import * as icons from "react-feather";

type IconProps = {
  name: keyof typeof icons; // Ensure the name matches one of the keys in react-feather
  size?: number
} & React.ComponentProps<"svg">; // Include standard SVG props like size, color, etc.

const Icon: React.FC<IconProps> = ({ name, ...rest }) => {
  const IconComponent = icons[name];
  if (!IconComponent) {
    console.error(`Icon "${name}" does not exist in react-feather.`);
    return null;
  }
  return <IconComponent {...rest} />;
};

export default Icon;
