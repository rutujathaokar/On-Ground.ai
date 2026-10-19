import React, { useState } from 'react';
import { X, Phone, Delete } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DialpadModal = () => {
  const { isDialpadOpen, setIsDialpadOpen, startCall, sendDtmf } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('+91 ');

  if (!isDialpadOpen) return null;

  const keypad = [
    { num: '1', sub: '' },
    { num: '2', sub: 'ABC' },
    { num: '3', sub: 'DEF' },
    { num: '4', sub: 'GHI' },
    { num: '5', sub: 'JKL' },
    { num: '6', sub: 'MNO' },
    { num: '7', sub: 'PQRS' },
    { num: '8', sub: 'TUV' },
    { num: '9', sub: 'WXYZ' },
    { num: '*', sub: '' },
    { num: '0', sub: '+' },
    { num: '#', sub: '' },
  ];

  const handleDigit = (digit) => {
    sendDtmf(digit);
    setPhoneNumber(prev => prev + digit);
  };

  const handleDelete = () => {
    if (phoneNumber.length > 4) {
      setPhoneNumber(prev => prev.slice(0, -1));
    }
  };

  const handleCall = () => {
    startCall({
      name: "Custom Number",
      phone: phoneNumber,
      product: "Telecaller Inquiry"
    });
    setIsDialpadOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-xs shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gray-50/70">
          <span className="text-sm font-semibold text-gray-700">Dial Phone</span>
          <button
            onClick={() => setIsDialpadOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Number Display */}
        <div className="px-6 py-4 flex items-center justify-between bg-white">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="text-xl font-bold tracking-wider text-gray-900 w-full focus:outline-none bg-transparent"
          />
          {phoneNumber.length > 4 && (
            <button
              onClick={handleDelete}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Delete className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 3x4 Keypad Grid */}
        <div className="grid grid-cols-3 gap-3 p-5 pt-2">
          {keypad.map((k) => (
            <button
              key={k.num}
              onClick={() => handleDigit(k.num)}
              className="flex flex-col items-center justify-center h-14 rounded-2xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all text-gray-800"
            >
              <span className="text-lg font-semibold leading-tight">{k.num}</span>
              {k.sub && <span className="text-[9px] font-medium text-gray-400 tracking-wider">{k.sub}</span>}
            </button>
          ))}
        </div>

        {/* Bottom Call Action */}
        <div className="p-4 pt-0 flex justify-center pb-5">
          <button
            onClick={handleCall}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 active:scale-95 transition-transform"
          >
            <Phone className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
