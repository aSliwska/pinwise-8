"use client";

import { Card } from 'antd';

interface PinCardProps {
    title: string;
    content: string;
  }

const PinCard = ({ title, content } : PinCardProps) => {
  return (
    <Card className="rounded-lg shadow-lg">
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 rounded-t-lg">
        <h2 className="text-center font-bold">{title}</h2>
      </div>
      <div className="p-4">
        <p>{content}</p>
      </div>
    </Card>
  );
};

export default PinCard;