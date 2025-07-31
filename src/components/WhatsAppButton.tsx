
import React from 'react';
import { MessageCircle } from "lucide-react";
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber, 
  message = "Hello! I'm interested in your moving services.",
  className 
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-20 right-8 z-40 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300",
        className
      )}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppButton;
