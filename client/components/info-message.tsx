import React from "react";

type InfoMessageProps = {
  className?: string;
  message: string;
}

export default function InfoMessage ({ className, message }: InfoMessageProps) {
  return (
    <p className={className || ''}>{message}</p>
  )
}
